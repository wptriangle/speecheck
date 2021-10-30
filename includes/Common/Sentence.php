<?php
namespace Speecheck\Common;
use Speecheck\Common as Common;

/**
 * The sentence post type class
 */
class Sentence {
	/**
	 * The class constructor
	 *
	 * @return void
	 */
	function __construct() {
		add_action( 'init', [ $this, 'register_sentence' ] );
		add_filter( 'post_type_link', [ $this, 'custom_sentence_permalink' ], 1, 3 );
		add_filter( 'wp_insert_post_data', [ $this, 'sentence_title' ], 10, 2 );
	}

	/**
	 * Register the post type
	 *
	 * @return void
	 */
	public function register_sentence() {
		// Registers post type
		register_post_type(
			'speecheck-sentence',
			[
				'labels' => [
					'name' => __( 'Sentences', 'speecheck' ),
					'menu_name' => __( 'Speecheck', 'speecheck' ),
					'singular_name' => __( 'Sentence', 'speecheck' ),
					'add_new' => __( 'Add New Sentence', 'speecheck' ),
					'add_new_item' => __( 'Add New Sentence', 'speecheck' ),
					'edit_item' => __( 'Edit Sentence', 'speecheck' ),
					'new_item' => __( 'New Sentence', 'speecheck' ),
					'view_item' => __( 'View Sentence', 'speecheck' ),
					'search_items' => __( 'Search Sentence', 'speecheck' ),
					'not_found' => __( 'No sentence found', 'speecheck' ),
					'not_found_in_trash' => __( 'No sentence found in trash', 'speecheck' ),
					'parent_item_colon' => __( 'Parent sentence:', 'speecheck' ),
					'all_items' => __( 'Sentences', 'speecheck' ),
					'attributes' => __( 'Sentence Options', 'speecheck' ),
				],
				'public' => true,
				'has_archive' => true,
				'show_ui' => true,
				'show_in_admin_bar' => false,
				'menu_icon' => 'dashicons-microphone',
				'hierarchical' => false,
				'show_in_rest' => false,
				'supports' => [ 'title', 'editor' ],
				'publicly_queryable' => true,
				'rewrite' => [
					'slug' => 'sentence',
				],
			]
		);

		// Adds rewrite rule
		add_rewrite_rule(
			'sentence/([0-9]+)?$',
			'index.php?post_type=speecheck-sentence&p=$matches[1]',
			'top'
		);
	}

	/**
	 * Customize the sentence permalink to replace post slug with post ID
	 *
	 * @param string $post_link The original link of the post
	 * @param Object $post The WP_Post object
	 *
	 * @return string The updated post link
	 */
	public function custom_sentence_permalink( $post_link, $post = WP_Post ) {
		if ( $post->post_type === 'speecheck-sentence' ) {
			return home_url( 'sentence/' . $post->ID . '/' );
		}

		return $post_link;
	}

	/**
	 * Dynamically update the sentence title
	 *
	 * @param Array $data Contains post data
	 *
	 * @return Array Updated post data
	 */
	public function sentence_title( $data ) {
		$data[ 'post_title' ] = Common::truncate_string( $data[ 'post_content' ], 5 );

		return $data;
	}
}
