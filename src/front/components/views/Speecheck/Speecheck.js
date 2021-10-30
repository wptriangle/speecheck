/**
 * WordPress dependencies
 */
import { useState, useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import InstructorMaterials from '../../ui-sections/InstructorMaterials/InstructorMaterials';
import Actions from '../../ui-sections/Actions/Actions';
import PreviewRecording from '../../ui-sections/PreviewRecording/PreviewRecording';
import Loader from '../../ui-components/Loader/Loader';
import Error from '../../ui-sections/Error/Error';
import Response from '../../ui-sections/Response/Response';

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
	const [ returnedText, setReturnedText ] = useState( false );

	// Load Gapi
	useEffect( () => {
		loadGapi(
			'AIzaSyCl1q2wgDNgXOlQy9BF1KJiIEHVrVSB53E',
			() => {
				setIsGapiLoaded( true );
			},
			() => {
				setError(
					__(
						'Failed to load required APIs. Please try again later.',
						'speecheck'
					)
				);
			}
		);
	}, [] );

	return (
		<>
			<div className="speecheck__container">
				{ isSet( error ) && (
					<Error
						error={ error }
						closeError={ () => setError( false ) }
					/>
				) }
				{ ! isGapiLoaded && false === error && <Loader /> }
				{ isGapiLoaded && (
					<div className="speecheck__content">
						<InstructorMaterials />
						{ isSet( recording ) && (
							<PreviewRecording recording={ recording } />
						) }
						{ isSet( returnedText ) && (
							<Response returnedText={ returnedText } />
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
								if ( false === res ) {
									return setReturnedText( false );
								}

								if ( ! isSet( res?.results ) ) {
									return setError(
										__(
											'We did not receive a valid response from your microphone. Please try again',
											'speecheck'
										)
									);
								}

								setReturnedText(
									res?.results?.[ 0 ].alternatives?.[ 0 ]
										?.transcript
								);
							} }
							showError={ ( err ) => setError( err ) }
						/>
					</div>
				) }
			</div>
		</>
	);
};

export default Speecheck;
