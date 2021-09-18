<?php
get_header();
while ( have_posts() ) : the_post(); ?>
	<div class="entry-content">
		<div class="sc__container">
			<div class="sc__sentence">
				<?php the_content(); ?>
			</div>
			<div class="sc__preview">
				<audio controls="true" id="sc-preview"></audio>
			</div>
			<div class="sc__actions">
				<button id="sc-start" class="sc__button sc__button--primary">
					<span class="material-icons">mic</span>
					<?php _e( 'Record', 'speecheck' ); ?>
				</button>
				<button id="sc-start-again" class="sc__button sc__button--primary">
					<span class="material-icons">mic</span>
					<?php _e( 'Record Again', 'speecheck' ); ?>
				</button>
				<button id="sc-stop" class="sc__button sc__button--danger">
					<span class="material-icons">stop</span>
					<?php _e( 'Stop', 'speecheck' ); ?>
				</button>
				<button id="sc-submit" class="sc__button sc__button--good">
					<span class="material-icons">check_circle</span>
					<?php _e( 'Submit', 'speecheck' ); ?>
				</button>
			</div>
		</div>
    </div>
<?php endwhile;
get_footer();
