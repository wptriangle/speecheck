<?php
get_header();
while ( have_posts() ) : the_post(); ?>
	<div class="entry-content">
		<div id="speecheck"></div>
    </div>
<?php endwhile;
get_footer();
