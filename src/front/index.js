/**
 * External dependencies
 */
import { render } from '@wordpress/element';
import domReady from '@wordpress/dom-ready';

/**
 * Internal dependencies
 */
import Speecheck from './components/views/Speecheck/Speecheck';

/**
 * Import global styles
 */
import './index.scss';

domReady( () => {
	setTimeout( () => {
		const speecheck = document.getElementById( 'speecheck' );

		render( <Speecheck />, speecheck );
	}, 500 );
} );

///// TO BE REMOVED

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

// Variable to store the converted base64 text
let audioBase64;

// Application states
let isRecording = false;

// DOM elements
const loader = document.getElementById( 'sc-loader' );
const container = document.querySelector( '.sc__content' );
const recordButton = document.getElementById( 'sc-start' );
const recordAgainButton = document.getElementById( 'sc-start-again' );
const stopButton = document.getElementById( 'sc-stop' );
const submitButton = document.getElementById( 'sc-submit' );
const playerContainer = document.querySelector( '.sc__preview' );
const player = document.getElementById( 'sc-preview' );
const submitIcon = document.getElementById( 'sc-submit-icon' );
const submittingIcon = document.getElementById( 'sc-submitting-icon' );
const sentence = document.querySelector( '.sc__sentence' );
const tryAgainButton = document.getElementById( 'sc-try-again' );

/**
 * Set DOM elements to initial state
 *
 * @return {void}
 */
const resetDom = () => {
	recordButton.style.display = 'flex';
	recordAgainButton.style.display = 'none';
	stopButton.style.display = 'none';
	submitButton.style.display = 'none';
	playerContainer.style.display = 'none';
	submitIcon.style.display = 'inline-block';
	submittingIcon.style.display = 'none';
	tryAgainButton.style.display = 'none';
	sentence.innerHTML = window?.speecheckVars?.postContent;
};

/**
 * Convert a blob to base64
 *
 * @param {blob}     blob       The blob to convert
 * @param {Function} callbackFn The function to run after conversion
 *
 * @return {void}
 */
const convertToBase64 = ( blob, callbackFn = () => {} ) => {
	const reader = new FileReader();

	reader.onloadend = () => {
		callbackFn( reader.result.split( ',' )[ 1 ] );
	};

	// Conversion
	reader.readAsDataURL( blob );
};

/**
 * Start recording
 *
 * @return {void}
 */
const startRecording = () => {
	const constraints = {
		audio: true,
		video: false,
	};

	navigator.mediaDevices
		.getUserMedia( constraints )
		.then( ( stream ) => {
			// Update DOM element displays after recording start
			recordButton.style.display = 'none';
			recordAgainButton.style.display = 'none';
			stopButton.style.display = 'flex';
			submitButton.style.display = 'none';
			playerContainer.style.display = 'none';

			// Set recording state
			isRecording = true;

			audioContext = new AudioContext();

			// Assign to gumStream for later use
			gumStream = stream;

			// Use the stream
			input = audioContext.createMediaStreamSource( stream );

			rec = new Recorder( input, { numChannels: 1 } );

			// Start the recording process
			rec.record();

			// Set max recording length to 30 seconds
			window.setTimeout( () => {
				if ( true === isRecording ) {
					stopRecording();
				}
			}, 30000 );
		} )
		.catch( ( err ) => {
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

	// Set recording state
	isRecording = false;

	// Tell the recorder to stop the recording
	rec.stop();

	// Stop microphone access
	gumStream.getAudioTracks()[ 0 ].stop();

	// Create the wav blob and pass it on to createDownloadLink
	rec.exportWAV( processRecording );
};

/**
 * Submit recording
 *
 * @return {void}
 */
const submitRecording = () => {
	// Update DOM element displays after recording is submitted
	recordAgainButton.style.display = 'none';

	// Set submitting state
	submitIcon.style.display = 'none';
	submittingIcon.style.display = 'inline-block';

	// Send speech to Google
	gapi.client.speech.speech
		.recognize( {
			resource: {
				audio: {
					content: audioBase64,
				},
				config: {
					encoding: 'LINEAR16',
					languageCode: 'en-US',
				},
			},
		} )
		.then( ( response ) => {
			// Update DOM element displays after Google responds
			submitButton.style.display = 'none';
			recordAgainButton.style.display = 'flex';

			// Set submitting state
			submitIcon.style.display = 'inline-block';
			submittingIcon.style.display = 'none';

			// Analyse the text
			analyseText(
				response.result.results[ 0 ].alternatives[ 0 ].transcript
			);
		} );
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

	// Convert the recording to base64 for Google
	convertToBase64( blob, ( base64 ) => {
		audioBase64 = base64;

		// Update DOM displays after conversion (allow submit)
		submitButton.style.display = 'flex';
	} );
};

/**
 * Load Google speech client
 *
 * @return {void}
 */
const loadClient = () => {
	// Set Google API key
	gapi.client.setApiKey( 'AIzaSyCl1q2wgDNgXOlQy9BF1KJiIEHVrVSB53E' );

	// Load Google speech client
	return gapi.client
		.load(
			'https://speech.googleapis.com/$discovery/rest?version=v1p1beta1'
		)
		.then( () => {
			// Update DOM displays after load
			loader.style.display = 'none';
			container.style.display = 'block';
		} )
		.catch( ( err ) =>
			console.error( 'Error loading GAPI client for API', err )
		);
};

/**
 * Compare recorded text with the original text and return a score
 *
 * @param {string} recordedText The recorded text
 */
const analyseText = ( recordedText ) => {
	const originalText = speecheckVars?.postContent.toLowerCase();
	const score =
		stringSimilarity
			.compareTwoStrings( originalText, recordedText )
			.toFixed( 2 ) * 100;

	// Display score
	sentence.innerHTML = `You have scored ${ score }%.`;

	// Adjust DOM display after analysis
	playerContainer.style.display = 'none';
	recordAgainButton.style.display = 'none';
	tryAgainButton.style.display = 'flex';
};

// Set initial dom state
resetDom();

// Add events to DOM elements
recordButton.addEventListener( 'click', startRecording );
recordAgainButton.addEventListener( 'click', startRecording );
stopButton.addEventListener( 'click', stopRecording );
submitButton.addEventListener( 'click', submitRecording );
tryAgainButton.addEventListener( 'click', resetDom );

// Show initial loader
loader.style.display = 'block';
container.style.display = 'none';

// Run after Google api client has loaded
gapi.load( 'client', loadClient );
