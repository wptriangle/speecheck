<?php
namespace Speecheck\Frontend;

/**
 * The plugin front-end shortcode class
 */
class Templates {
	/**
	 * The class constructor
	 *
	 * @return void
	 */
	function __construct() {
		add_filter( 'single_template', [ $this, 'speecheck_templates' ] );
	}

	/**
	 * Set plugin templates
	 *
	 * @param $template The default template
	 *
	 * @return void
	 */
	public function speecheck_templates( $template ) {
		global $post;

		if (
			'speecheck-sentence' === $post->post_type &&
			locate_template( [ 'single-speecheck-sentence.php' ] ) !== $template
		) {
			return SPEECHECK_PATH . '/includes/Frontend/templates/single-speecheck-sentence.php';
		}

		return $template;
	}
}
