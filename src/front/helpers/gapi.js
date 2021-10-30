const { gapi } = window;

/**
 * Load Gapi client
 *
 * @param {string}   apiKey  The Google API key
 * @param {Function} onLoad  The callback to run on successful load
 * @param {Function} onError The callback to run on fail
 *
 * @return {void}
 */
export const loadGapi = ( apiKey, onLoad = () => {}, onError = () => {} ) => {
	return gapi.load( 'client', () => {
		// Set Google API key
		gapi.client.setApiKey( apiKey );

		// Load Google speech client
		gapi.client
			.load(
				'https://speech.googleapis.com/$discovery/rest?version=v1p1beta1'
			)
			.then( () => {
				onLoad();
			} )
			.catch( () => {
				onError();
			} );
	} );
};

/**
 * Run Google Speech to Text API recognize
 *
 * @param {string} base64Audio The audio, converted to base64
 *
 * @return {void}
 */
export const recognizeSpeech = ( base64Audio ) => {
	return gapi.client.speech.speech.recognize( {
		resource: {
			audio: {
				content: base64Audio,
			},
			config: {
				encoding: 'LINEAR16',
				languageCode: 'en-US',
			},
		},
	} );
};
