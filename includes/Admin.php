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
		new Admin\Menu();
		new Admin\SentenceOptionsMetabox();
	}
}
