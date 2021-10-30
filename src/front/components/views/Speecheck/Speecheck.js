/**
 * WordPress dependencies
 */
import { useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import InstructorMaterials from '../../ui-sections/InstructorMaterials/InstructorMaterials';
import Actions from '../../ui-sections/Actions/Actions';
import PreviewRecording from '../../ui-sections/PreviewRecording/PreviewRecording';
import Loader from '../../ui-components/Loader/Loader';
import Error from '../../ui-sections/Error/Error';

import { isSet } from '../../../helpers/common';
import { loadGapi } from '../../../helpers/gapi';

/**
 * Import styles
 */
import './Speecheck.scss';

/**
 * The main component
 *
 * @return {JSX} The main component code
 */
const Speecheck = () => {
	const [ recording, setRecording ] = useState( false );
	const [ isGapiLoaded, setIsGapiLoaded ] = useState( false );
	const [ error, setError ] = useState( false );

	loadGapi( 'AIzaSyCl1q2wgDNgXOlQy9BF1KJiIEHVrVSB53E' ).then( () =>
		setIsGapiLoaded( true )
	);

	return (
		<>
			<div className="speecheck__container">
				{ isSet( error ) && (
					<Error
						error={ error }
						closeError={ () => setError( false ) }
					/>
				) }
				{ ! isGapiLoaded ? (
					<Loader />
				) : (
					<div className="speecheck__content">
						<InstructorMaterials />
						{ isSet( recording ) && (
							<PreviewRecording recording={ recording } />
						) }
						<Actions
							getRecording={ ( blob ) => {
								setRecording(
									isSet( blob )
										? URL.createObjectURL( blob )
										: blob
								);
							} }
							getResults={ ( res ) => {
								if ( ! isSet( res.results ) ) {
									return setError(
										'We did not receive a valid response from your microphone. Please try again'
									);
								}
							} }
						/>
					</div>
				) }
			</div>
		</>
	);
};

export default Speecheck;
