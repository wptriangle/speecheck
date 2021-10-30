export class Recorder {
	constructor() {
		this.onStart = () => {};
		this.onStop = () => {};
		this.onError = () => {};

		this.gumStream = false;
		this.rec = false;
		this.isRecording = false;
	}

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

	startRecording() {
		const { navigator, AudioContext, alert, Recorder: RecorderJS } = window;

		navigator.mediaDevices
			.getUserMedia( {
				audio: true,
				video: false,
			} )
			.then( ( stream ) => {
				this.isRecording = true;
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
				this.onError( err );
			} );
	}

	stopRecording() {
		this.isRecording = false;

		// Tell the recorder to stop the recording
		this.rec?.stop();

		// Stop microphone access
		this.gumStream?.getAudioTracks()[ 0 ].stop();

		// Create the wav blob and pass it on to createDownloadLink
		this.rec?.exportWAV( this.onStop );
	}
}
