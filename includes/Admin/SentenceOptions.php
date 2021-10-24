<?php
namespace Speecheck\Admin;

/**
 * Class to add sentence options meta box
 */
class SentenceOptions {
    /**
     * The class constructor
     */
	function __construct() {
		add_action( 'add_meta_boxes', [ $this, 'add' ] );
		add_action( 'save_post', [ $this, 'save' ] );
	}

	/**
     * Set up and add the meta box
     *
     * @return void
     */
    public function add() {
		add_meta_box(
			'speecheck_sentence_optionns',
			__( 'Sentence Options', 'speecheck' ),
			[ $this, 'html' ],
			'speecheck-sentence'
		);
    }

	/**
     * Save the meta box selections
     *
     * @param int $post_id  The post ID
     *
     * @return void
     */
    public function save( int $post_id ) {
        if ( array_key_exists( 'speecheck_field', $_POST ) ) {
            update_post_meta(
                $post_id,
                '_speecheck_meta_key',
                $_POST[ 'speecheck_field' ]
            );
        }
    }

	/**
     * Display the meta box HTML to the user
     *
     * @param \WP_Post $post Post object
     *
     * @return void
     */
    public static function html( $post ) {
		$value = get_post_meta( $post->ID, '_speecheck_meta_key', true );
        ?>
        <label for="wporg_field">Description for this field</label>
        <select name="speecheck_field" id="speecheck_field" class="postbox">
            <option value="">Select something...</option>
            <option value="something" <?php selected( $value, 'something' ); ?>>Something</option>
            <option value="else" <?php selected( $value, 'else' ); ?>>Else</option>
        </select>
        <?php
    }
}
