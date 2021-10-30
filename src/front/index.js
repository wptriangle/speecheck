/**
 * External dependencies
 */
import { render } from '@wordpress/element';
import domReady from '@wordpress/dom-ready';

/**
 * Internal dependencies
 */
import Speecheck from './components/views/Speecheck/Speecheck';

/**
 * Import global styles
 */
import './index.scss';

domReady( () => {
	setTimeout( () => {
		const speecheck = document.getElementById( 'speecheck' );

		render( <Speecheck />, speecheck );
	}, 500 );
} );
