/**
 * Internal dependencies
 */
import PlayAudio from '../../ui-components/PlayButton/PlayAudio';

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
		<div className="speecheck__instructor-materials">
			<p className="speecheck__instructor-materials__sentence">
				{ postContent }
			</p>
			<div className="speecheck__instructor-materials__audio">
				<PlayAudio url={ sentenceAudio } />
			</div>
		</div>
	);
};

export default InstructorMaterials;
