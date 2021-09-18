// URL interface
URL = window.URL || window.webkitURL;

// Stream from getUserMedia()
let gumStream;

// Recorder.js object
let rec;

// MediaStreamAudioSourceNode we'll be recording
let input;

// Shim for AudioContext when it's not avb.
const AudioContext = window.AudioContext || window.webkitAudioContext;

// Audio context to help us record
let audioContext;

// DOM elements
const recordButton = document.getElementById( 'sc-start' );
const recordAgainButton = document.getElementById( 'sc-start-again' );
const stopButton = document.getElementById( 'sc-stop' );
const playerContainer = document.querySelector( '.sc__preview' );
const player = document.getElementById( 'sc-preview' );

/**
 * Set DOM elements to initial state
 *
 * @return {void}
 */
const resetDom = () => {
	recordButton.style.display = 'flex';
	recordAgainButton.style.display = 'none';
	stopButton.style.display = 'none';
	playerContainer.style.display = 'none';
};

/**
 * Start recording
 *
 * @return {void}
 */
const startRecording = () => {
    const constraints = {
		audio: true,
		video:false
	};

	navigator.mediaDevices.getUserMedia( constraints ).then( ( stream ) => {
		// Update DOM element displays after recording start
		recordButton.style.display = 'none';
		recordAgainButton.style.display = 'none';
		stopButton.style.display = 'flex';
		playerContainer.style.display = 'none';

		audioContext = new AudioContext();

		// Assign to gumStream for later use
		gumStream = stream;
		
		// Use the stream
		input = audioContext.createMediaStreamSource( stream );

		rec = new Recorder(
			input,
			{ numChannels: 1 }
		);

		// Start the recording process
		rec.record();

		// Set max recording length to 30 seconds
		window.setTimeout( stopRecording, 30000 );
	} ).catch( ( err ) => {
		alert( err );
	} );
};

/**
 * Stop recording
 *
 * @return {void}
 */
const stopRecording = () => {
	// Update DOM element displays after recording stop
	recordButton.style.display = 'none';
	recordAgainButton.style.display = 'flex';
	stopButton.style.display = 'none';
	
	// Tell the recorder to stop the recording
	rec.stop();

	// Stop microphone access
	gumStream.getAudioTracks()[ 0 ].stop();

	// Create the wav blob and pass it on to createDownloadLink
	rec.exportWAV( processRecording );
};

/**
 * Process the recorded audio
 *
 * @param {blob} blob The recording buffer
 *
 * @reutrn {void}
 */
const processRecording = ( blob ) => {	
	const url = URL.createObjectURL( blob );

	// Update DOM element displays after recording available
	playerContainer.style.display = 'block';

	// Set player src
	player.src = url;
	
	// //upload link
	// var upload = document.createElement('a');
	// upload.href="#";
	// upload.innerHTML = "Upload";
	// upload.addEventListener("click", function(event){
	// 	  var xhr=new XMLHttpRequest();
	// 	  xhr.onload=function(e) {
	// 	      if(this.readyState === 4) {
	// 	          console.log("Server returned: ",e.target.responseText);
	// 	      }
	// 	  };
	// 	  var fd=new FormData();
	// 	  fd.append("audio_data",blob, filename);
	// 	  xhr.open("POST","upload.php",true);
	// 	  xhr.send(fd);
	// })
	// li.appendChild(document.createTextNode (" "))//add a space in between
	// li.appendChild(upload)//add the upload link to li
};

// Set initial dom state
resetDom();

// Add events to DOM elements
recordButton.addEventListener( 'click', startRecording );
recordAgainButton.addEventListener( 'click', startRecording );
stopButton.addEventListener( 'click', stopRecording );
