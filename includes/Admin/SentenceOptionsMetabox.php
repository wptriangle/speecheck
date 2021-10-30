<?php
namespace Speecheck\Admin;
/**
 * The sentence options metabox class
 */
class SentenceOptionsMetabox {

	// Fields to display
	private $fields = [
		[
			'label' => 'Sentence to compare Google Speech to Text API response with',
			'id' => 'speecheck_sentence_comparison',
			'type' => 'textarea',
		],
		[
			'label' => 'Reference Audio',
			'id' => 'speecheck_sentence_audio',
			'type' => 'media',
			'returnvalue' => 'url',
		],
	];

	/**
	 * The class constructor
	 *
	 * @return void
	 */
	public function __construct() {
		add_action( 'add_meta_boxes', [ $this, 'add_meta_box' ] );
		add_action( 'save_post', [ $this, 'save_fields' ] );
		add_action( 'admin_footer', [ $this, 'add_media_fields' ] );
	}

	/**
	 * Method that adds the metabox
	 *
	 * @return void
	 */
	public function add_meta_box() {
		add_meta_box(
			'speecheck_sentence_options',
			__( 'Sentence Options', 'speecheck' ),
			[ $this, 'speecheck_sentence_options_callback' ],
			'speecheck-sentence',
			'advanced',
			'high'
		);
	}

	/**
	 * Callback method from adding the metabox
	 *
	 * @param WP_Post $post Current post object
	 *
	 * @return void
	 */
	public function speecheck_sentence_options_callback( $post ) {
		// Add hidden input field for nonce
		wp_nonce_field( 'sentence_options_data', 'sentence_options_nonce' );

		// Compose the fields
		$this->compose_fields( $post );
	}

	/**
	 * Generates fields based on $fields array
	 *
	 * @param WP_Post $post Current post object
	 *
	 * @return string The fields
	 */
	public function compose_fields( $post ) {
		$output = '';

		foreach ( $this->fields as $field ) {
			$label = '<label for="' . $field[ 'id' ] . '">' . $field[ 'label' ] . '</label>';
			$meta_value = get_post_meta( $post->ID, $field[ 'id' ], true );

			if ( empty( $meta_value ) ) {
				if ( isset( $field[ 'default' ] ) ) {
					$meta_value = $field[ 'default' ];
				}
			}

			switch ( $field[ 'type' ] ) {
				case 'media':
					$meta_url = '';

					if ( $meta_value ) {
						if ( $field[ 'returnvalue' ] == 'url' ) {
							$meta_url = $meta_value;
						} else {
							$meta_url = wp_get_attachment_url( $meta_value );
						}
					}

					$input = sprintf(
						'<input style="display:none;" id="%s" name="%s" type="text" value="%s" data-return="%s"><p id="preview_%s"></p><input style="width: 15%%;margin-right:5px;" class="button new-media" id="%s_button" name="%s_button" type="button" value="Select" /><input style="width: 15%%;" class="button remove-media" id="%s_buttonremove" name="%s_buttonremove" type="button" value="Delete" />',
						$field[ 'id' ],
						$field[ 'id' ],
						$meta_value,
						$field[ 'returnvalue' ],
						$field[ 'id' ],
						$field[ 'id' ],
						$field[ 'id' ],
						$field[ 'id' ],
						$field[ 'id' ]
					);
					break;

				case 'textarea':
					$input = sprintf(
						'<textarea style="width: 100%%" id="%s" name="%s" rows="5">%s</textarea>',
						$field[ 'id' ],
						$field[ 'id' ],
						$meta_value
					);
					break;

				default:
					$input = sprintf(
						'<input %s id="%s" name="%s" type="%s" value="%s">',
						$field[ 'type' ] !== 'color' ? 'style="width: 100%"' : '',
						$field[ 'id' ],
						$field[ 'id' ],
						$field[ 'type' ],
						$meta_value
					);
			}

			$output .= $this->format_rows( $label, $input );
		}

		echo '<table class="form-table"><tbody>' . $output . '</tbody></table>';
	}

	/**
	 * Formats each row
	 *
	 * @param string $label The label of the row
	 * @param string $input The input of the row
	 * 
	 * @return string The formatted row
	 */
	public function format_rows( $label, $input ) {
		return '<div style="margin-top: 10px;"><strong>'.$label.'</strong></div><div>'.$input.'</div>';
	}

	/**
	 * Adds required JS for media fields
	 *
	 * @return void
	 */
	public function add_media_fields() {
		?>
		<script>
			jQuery( document ).ready( function( $ ) {
				if ( typeof wp.media !== 'undefined' ) {
					var _custom_media = true,
					_orig_send_attachment = wp.media.editor.send.attachment;

					$( '.new-media' ).click( function( e ) {
						var send_attachment_bkp = wp.media.editor.send.attachment;
						var button = $( this );
						var id = button.attr( 'id' ).replace( '_button', '' );
						_custom_media = true;

						wp.media.editor.send.attachment = function( props, attachment ) {
							if ( _custom_media ) {
								if ( $( 'input#' + id ).data( 'return' ) == 'url' ) {
									$( 'input#' + id ).val( attachment.url );
								} else {
									$( 'input#' + id ).val(	attachment.id );
								}

								$( 'p#preview_' + id ).html( attachment.filename );
							} else {
								return _orig_send_attachment.apply( this, [ props, attachment ] );
							};
						}

						wp.media.editor.open( button );
						return false;
					} );

					$( '.add_media' ).on( 'click', function() {
						_custom_media = false;
					} );

					$( '.remove-media' ).on( 'click', function() {
						var parent = $( this ).parent();
						parent.find( 'input[ type="text" ]' ).val( '' );
						parent.find( 'div' ).css( 'background-image', 'url()' );
					} );
				}
			} );
		</script>
		<?php
	}

	/**
	 * Handles saving of the fields
	 *
	 * @param number $post_id The current post ID
	 *
	 * @return void
	 */
	public function save_fields( $post_id ) {
		if ( ! isset( $_POST[ 'sentence_options_nonce' ] ) ) {
			return $post_id;
		}

		$nonce = $_POST[ 'sentence_options_nonce' ];

		if ( ! wp_verify_nonce( $nonce, 'sentence_options_data' ) ) {
			return $post_id;
		}

		if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
			return $post_id;
		}

		foreach ( $this->fields as $field ) {
			if ( isset( $_POST[ $field[ 'id' ] ] ) ) {
				switch ( $field[ 'type' ] ) {
					case 'email':
						$_POST[ $field[ 'id' ] ] = sanitize_email( $_POST[ $field[ 'id' ] ] );
						break;

					case 'text':
					case 'textarea':
						$_POST[ $field[ 'id' ] ] = sanitize_text_field( $_POST[ $field[ 'id' ] ] );
						break;
				}

				update_post_meta( $post_id, $field[ 'id' ], $_POST[ $field[ 'id' ] ] );
			} else if ( $field[ 'type' ] === 'checkbox' ) {
				update_post_meta( $post_id, $field[ 'id' ], '0' );
			}
		}
	}
}
