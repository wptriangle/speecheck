<?php
namespace Speecheck;

/*
 * The plugin admin class
 */
class Admin {
	/**
	 * The class constructor
	 *
	 * @return void
	 */
	function __construct() {
		new Admin\Assets();
		new Admin\Settings();
		new Admin\SentenceOptionsMetabox();
	}
}
