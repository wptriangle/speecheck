const { gapi } = window;

export const loadGapi = ( apiKey ) => {
	// Set Google API key
	gapi.client.setApiKey( apiKey );

	// Load Google speech client
	return gapi.client.load(
		'https://speech.googleapis.com/$discovery/rest?version=v1p1beta1'
	);
};

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
