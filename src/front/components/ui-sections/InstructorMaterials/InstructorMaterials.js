/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import PlayAudio from '../../ui-components/PlayButton/PlayAudio';
import Section from '../../ui-components/Section/Section';

import { isEmpty, isSet } from '../../../../helpers/common';

/**
 * Import styles
 */
import './InstructorMaterials.scss';

/**
 * The instructor materials
 *
 * @return {JSX} The Instructor materials
 */
const InstructorMaterials = () => {
	const { speecheckVars } = window;
	const { postContent, sentenceAudio } = speecheckVars;

	return (
		<Section
			className="speecheck__instructor-materials"
			label={ __(
				'Record yourself while reading this sentence',
				'speecheck'
			) }
		>
			<p className="speecheck__instructor-materials__sentence">
				{ postContent }
			</p>
			{ isSet( sentenceAudio ) && ! isEmpty( sentenceAudio ) && (
				<div className="speecheck__instructor-materials__audio">
					<PlayAudio url={ sentenceAudio } />
				</div>
			) }
		</Section>
	);
};

export default InstructorMaterials;
