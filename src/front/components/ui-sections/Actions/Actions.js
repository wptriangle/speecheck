/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState, useEffect } from '@wordpress/element';

/**
 * Internal dependencies
 */
import Button from '../../ui-components/Button/Button';

import { Recorder } from '../../../helpers/recorder';
import { convertToBase64, isSet } from '../../../helpers/common';
import { recognizeSpeech } from '../../../helpers/gapi';
import { usePrevious } from '../../../helpers/hooks/usePrevious';

/**
 * Import styles
 */
import './Actions.scss';

/**
 * The actions
 *
 * @param {Object}   props              The component props
 * @param {Function} props.getRecording Send recording blob to parent component
 * @param {Function} props.getResults   Send results from Gapi to parent component
 *
 * @return {JSX} The actions code
 */
const Actions = ( { getRecording = () => {}, getResults = () => {} } ) => {
	const [ recorder ] = useState( new Recorder() );
	const [ isRecording, setIsRecording ] = useState( false );
	const [ recording, setRecording ] = useState( false );
	const [ isSubmitting, setIsSubmitting ] = useState( false );
	const [ isComplete, setIsComplete ] = useState( false );

	useEffect( () => {
		recorder.on( 'start', () => setIsRecording( true ) );
		recorder.on( 'stop', ( blob ) => {
			setIsRecording( false );
			setRecording( blob );
			getRecording( blob );
		} );
	}, [] );

	// Previous value of isSubmitting state
	const prevIsSubmitting = usePrevious( isSubmitting );

	useEffect( () => {
		if ( true === prevIsSubmitting && false === isSubmitting ) {
			setIsComplete( true );
		}
	}, [ isSubmitting ] );

	return (
		<div className="speecheck__actions">
			{ isComplete ? (
				<Button
					onClick={ () => {
						setRecording( false );
						getRecording( false );
						setIsComplete( false );
					} }
				>
					{ __( 'Try Again', 'speecheck' ) }
				</Button>
			) : (
				<>
					{ isRecording ? (
						<Button
							icon="stop"
							state="danger"
							onClick={ () => {
								recorder.stopRecording();
							} }
							iconAnimation="blink"
						>
							{ __( 'Stop', 'speecheck' ) }
						</Button>
					) : (
						<>
							<Button
								icon="mic"
								onClick={ () => {
									recorder.startRecording();
								} }
							>
								{ isSet( recording )
									? __( 'Record Again', 'speecheck' )
									: __( 'Record', 'speecheck' ) }
							</Button>
							{ isSet( recording ) && (
								<Button
									icon={
										isSubmitting
											? 'autorenew'
											: 'check_circle'
									}
									onClick={ () => {
										setIsSubmitting( true );

										convertToBase64(
											recording,
											( base64 ) => {
												recognizeSpeech( base64 ).then(
													( response ) => {
														setIsSubmitting(
															false
														);

														getResults(
															response.result
														);
													}
												);
											}
										);
									} }
									state="good"
									iconAnimation={ isSubmitting && 'rotate' }
								>
									{ __( 'Submit', 'speecheck' ) }
								</Button>
							) }
						</>
					) }
				</>
			) }
		</div>
	);
};

export default Actions;
