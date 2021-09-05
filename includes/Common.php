<?php
namespace Speecheck;

/*
 * The plugin common class
 */
class Common {
	/**
	 * The class constructor
	 *
	 * @return void
	 */
	function __construct() {
		new Common\Sentence();
	}

	/**
	 * Utility function to truncate string
	 *
	 * @param string $string The string
	 * @param number $limit The limit to which the string should be truncated
	 *
	 * @return string The truncated string
	 */
	public function truncate_string( $string, $limit ) {
		if ( str_word_count( $string, 0 ) > $limit ) {
			$words = str_word_count( $string, 2 );
			$pos = array_keys( $words );
			$string = substr( $string, 0, $pos[ $limit ] ) . '...';
		}

		return $string;
	}
}
