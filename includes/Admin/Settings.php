<?php
namespace Speecheck\Admin;

/**
 * The plugin admin settings class
 */
class Settings {
	/**
	 * The class constructor
	 *
	 * @return void
	 */
	function __construct() {
		add_action( 'admin_menu', [ $this, 'admin_menu' ] );
		add_action( 'admin_init', [ $this, 'settings_init' ] );
	}

	/**
	 * Add admin menu pages
	 *
	 * @return void
	 */
	public function admin_menu() {
		add_submenu_page(
			'edit.php?post_type=speecheck-sentence',
			__( 'Settings', 'speecheck' ),
			__( 'Settings', 'speecheck' ),
			'manage_options',
			'speecheck-settings',
			[ $this, 'settings_page' ],
		);
	}

	/**
	 * Specify content to display in the Speecheck page
	 *
	 * @return void
	 */
	public function settings_page() {
		?>
			<form action='options.php' method='post'>
				<?php
					settings_fields( 'speecheck_settings_page' );
					do_settings_sections( 'speecheck_settings_page' );
					submit_button();
				?>
			</form>
		<?php
	}

	/**
	 * Initialize settings
	 *
	 * @return void
	 */
	public function settings_init() { 
		register_setting(
			'speecheck_settings_page',
			'speecheck_settings',
			[ $this, 'sanitize_fields' ]
		);

		add_settings_section(
			'speecheck_settings_page_section',
			__( 'Speecheck Settings', 'speecheck' ),
			[ $this, 'settings_section_callback' ],
			'speecheck_settings_page'
		);

		add_settings_field(
			'speecheck_settings_apikey',
			__( 'Google API Key', 'speecheck' ),
			[ $this, 'settings_apikey_render' ],
			'speecheck_settings_page', 
			'speecheck_settings_page_section' 
		);

		add_settings_field( 
			'speecheck_settings_language', 
			__( 'Language for speech recognition', 'speecheck' ), 
			[ $this, 'settings_language_render' ],
			'speecheck_settings_page', 
			'speecheck_settings_page_section' 
		);
	}

	public function settings_section_callback() {
		echo __( 'Configure the plugin to interact with the Google API', 'speecheck' );
	}

	public function settings_apikey_render() {
		$options = get_option( 'speecheck_settings' );
		?>
			<input
				type='text'
				name='speecheck_settings[speecheck_settings_apikey]'
				value='<?php echo $options[ 'speecheck_settings_apikey' ]; ?>'
			>
		<?php
	}

	public function settings_language_render() {
		$options = get_option( 'speecheck_settings' );
		?>
			<input
				type='text'
				name='speecheck_settings[speecheck_settings_language]'
				value='<?php echo $options[ 'speecheck_settings_language' ]; ?>'
			>
		<?php
	}

	public function sanitize_fields( $input ) {
		$sanitized_values = [];

		if ( isset( $input[ 'speecheck_settings_apikey' ] ) ) {
			$sanitized_values[ 'speecheck_settings_apikey' ] = sanitize_text_field( $input[ 'speecheck_settings_apikey' ] );
		}

		if ( isset( $input[ 'speecheck_settings_language' ] ) ) {
			$sanitized_values[ 'speecheck_settings_language' ] = sanitize_text_field( $input[ 'speecheck_settings_language' ] );
		}

		return $sanitized_values;
	}
}
