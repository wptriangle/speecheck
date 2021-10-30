/**
 * Import styles
 */
import './PreviewRecording.scss';

/**
 * The recording previewer
 *
 * @param {Object} props           The component props
 * @param {string} props.recording The recording blob URL
 *
 * @return {JSX} The recording previewer code
 */
const PreviewRecording = ( { recording } ) => {
	return (
		<div className="speecheck__preview">
			<audio controls="true" src={ recording } />
		</div>
	);
};

export default PreviewRecording;
