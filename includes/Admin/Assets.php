<?php
namespace Speecheck\Admin;

/*
 * The plugin assets class
 */
class Assets {
	/**
	 * The class constructor
	 *
	 * @return void
	 */
	function __construct() {
		add_action( 'admin_enqueue_scripts', [ $this, 'load_admin_scripts' ] );
	}

	/**
	 * Enqueue front-end scripts/styles
	 *
	 * @return void
	 */
	public function load_admin_scripts() {
		global $pagenow;

		// Do not load if not sentence post type and not edit screen
		if (
			! (
				'speecheck-sentence' === get_post_type() &&
				in_array( $pagenow, [ 'post.php', 'post-new.php' ] )
			)
		) {
			return;
		}

		global $post;
		$asset_file = include( SPEECHECK_PATH . '/build/admin.asset.php');

		// Plugin admin styles
		wp_enqueue_style(
			'speecheck-admin-styles',
			SPEECHECK_URL . '/build/admin.css',
			[],
			SPEECHECK_VERSION
		);

		// Plugin admin scripts
		wp_enqueue_script(
			'speecheck-admin-scripts',
			SPEECHECK_URL . '/build/admin.js',
			$asset_file[ 'dependencies' ],
    		$asset_file[ 'version' ],
			true
		);

		// Pass post content to JS
		wp_localize_script( 'speecheck-admin-scripts', 'speecheckVars', [
			'sentenceAudio' => get_post_meta( $post->ID, 'speecheck_sentence_audio', true ),
		] );
	}
}
