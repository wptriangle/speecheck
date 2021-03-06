/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import Section from '../../ui-components/Section/Section';

import { isEmpty, isSet } from '../../../../helpers/common';

/**
 * Import styles
 */
import './Response.scss';

/**
 * The final response
 *
 * @param {Object} props              The component props
 * @param {string} props.returnedText The returned text from Gapi
 *
 * @return {JSX} The final response code
 */
const Response = ( { returnedText } ) => {
	const { speecheckVars, stringSimilarity } = window;
	const { sentenceRaw, postContent } = speecheckVars;

	// The reference text
	const referenceText =
		isSet( sentenceRaw ) && ! isEmpty( sentenceRaw )
			? sentenceRaw.toLowerCase()
			: postContent.toLowerCase();

	/**
	 * Parse out words from a sentence
	 *
	 * @param {string} s The sentence string
	 *
	 * @return {Array} The words in an array
	 */
	const getWords = ( s ) => {
		return s.toLowerCase().split( ' ' );
	};

	/**
	 * Formats response text and highlights different words
	 *
	 * @param {Array} words       The words to return
	 * @param {Array} differences The different words
	 *
	 * @return {string} The formatted text
	 */
	const formatResponseText = ( words, differences ) => {
		let text = '';

		words.forEach( ( word ) => {
			const hasValue = differences.includes( word );

			if ( hasValue ) {
				text += " <span class='highlighted'>" + word + '</span> ';
			} else {
				text += ' ' + word + ' ';
			}
		} );

		return text;
	};

	return (
		<Section
			className="speecheck__response"
			label={ __( 'Results', 'speecheck' ) }
		>
			<p
				className="speecheck__response__sentence"
				dangerouslySetInnerHTML={ {
					__html: formatResponseText(
						getWords( returnedText ),
						getWords( returnedText ).filter(
							( word ) =>
								! getWords( referenceText ).includes( word )
						)
					),
				} }
			/>
			<span className="speecheck__response__score">
				{ stringSimilarity
					.compareTwoStrings( referenceText, returnedText )
					.toFixed( 2 ) * 100 }
				%
			</span>
		</Section>
	);
};

export default Response;
