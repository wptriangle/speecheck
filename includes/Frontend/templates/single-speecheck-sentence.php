<?php
get_header();
while ( have_posts() ) : the_post(); ?>
	<div class="entry-content">
		<div class="sc__container">
			<div id="sc-loader" class="sc-loading-icon material-icons">
				<span class="sc-loading-icon material-icons">
					autorenew
				</span>
			</div>
			<div class="sc__content" style="display: none">
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
						<span id="sc-submit-icon" class="material-icons">check_circle</span>
						<span id="sc-submitting-icon" class="sc-loading-icon material-icons">
							autorenew
						</span>
						<?php _e( 'Submit', 'speecheck' ); ?>
					</button>
					<button id="sc-try-again" class="sc__button sc__button--good">
						<?php _e( 'Try Again', 'speecheck' ); ?>
					</button>
				</div>
			</div>
		</div>
    </div>
<?php endwhile;
get_footer();
