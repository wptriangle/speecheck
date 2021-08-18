<?php
namespace Speecheck\Frontend;

/**
 * The plugin front-end shortcode class
 */
class Shortcode {
	/**
	 * The class constructor
	 *
	 * @return void
	 */
	function __construct() {
		add_shortcode( 'speecheck', [ $this, 'render_speecheck_shortcode' ] );
	}

	/**
	 * Render contents of the speecheck shortcode
	 *
	 * @return void
	 */
	public function render_speecheck_shortcode( $atts, $content = '' ) {
		return 'Hello from shortcode';
	}
}
