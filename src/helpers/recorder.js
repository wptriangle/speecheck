/**
 * Recorder class
 */
export class Recorder {
	/**
	 * The class constructor
	 *
	 * @return {void}
	 */
	constructor() {
		// Callback function definitions
		this.onStart = () => {};
		this.onStop = () => {};
		this.onError = () => {};

		// getUserMeta() stream
		this.gumStream = false;

		// RecorderJS object
		this.rec = false;

		// Recording state
		this.isRecording = false;
	}

	/**
	 * Fire callbacks on different actions
	 *
	 * @param {string}   action The callback to fire the action on
	 * @param {Function} fn     The callback function
	 *
	 * @return {void}
	 */
	on( action, fn = () => {} ) {
		switch ( action ) {
			case 'start':
				this.onStart = fn;
				return;
			case 'stop':
				this.onStop = fn;
				return;
			case 'error':
				this.onError = fn;
		}
	}

	/**
	 * Starts the recording
	 *
	 * @return {void}
	 */
	startRecording() {
		const { navigator, AudioContext, Recorder: RecorderJS } = window;

		navigator.mediaDevices
			.getUserMedia( {
				audio: true,
				video: false,
			} )
			.then( ( stream ) => {
				// Update recording state
				this.isRecording = true;

				// Run callback function
				this.onStart();

				const audioContext = new AudioContext();

				// Assign to gumStream for later use
				this.gumStream = stream;

				// Use the stream
				const input = audioContext.createMediaStreamSource( stream );

				this.rec = new RecorderJS( input, { numChannels: 1 } );

				// Start the recording process
				this.rec?.record();

				// Set max recording length to 30 seconds
				setTimeout( () => {
					if ( true === this.isRecording ) {
						this.stopRecording();
					}
				}, 30000 );
			} )
			.catch( ( err ) => {
				// Send error through callback
				this.onError( err );
			} );
	}

	stopRecording() {
		// Update recording state
		this.isRecording = false;

		// Tell the recorder to stop the recording
		this.rec?.stop();

		// Stop microphone access
		this.gumStream?.getAudioTracks()[ 0 ].stop();

		// Create the wav blob and pass it on to createDownloadLink
		this.rec?.exportWAV( this.onStop );
	}
}
