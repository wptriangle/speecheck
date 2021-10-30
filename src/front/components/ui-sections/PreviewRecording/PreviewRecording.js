/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import Section from '../../ui-components/Section/Section';

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
		<Section
			className="speecheck__preview"
			label={ __( 'Preview your recording', 'speecheck' ) }
		>
			<audio controls="true" src={ recording } />
		</Section>
	);
};

export default PreviewRecording;
