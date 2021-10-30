/**
 * Internal dependencies
 */
import { isEmpty, isSet } from '../helpers/common';

/**
 * Import styles
 */
import './index.scss';

const { speecheckVars } = window;
const { sentenceAudio } = speecheckVars;

if ( isSet( sentenceAudio ) && ! isEmpty( sentenceAudio ) ) {
	document.getElementById(
		'preview_speecheck_sentence_audio'
	).innerHTML = sentenceAudio.substring(
		sentenceAudio.lastIndexOf( '/' ) + 1
	);
}
