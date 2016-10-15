<template>
	<div class="spinner-wrapper modal-overlay">
		<div class="spinner-inner center">
			<div class="spinner">
				<div class="rect1"></div>
				<div class="rect2"></div>
				<div class="rect3"></div>
				<div class="rect4"></div>
				<div class="rect5"></div>
			</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	export default {
		mounted() {
			const $el = $(this.$el);
			const $sidebar = $('.app-sidebar');
			const $header = $('.app-header');
//			const m = $('body').hasScrollBar() ? 15 : 0;

			$el.css({
				width: $(window).width() - $sidebar.width() - 1
			});
			$el.find('.spinner-inner').css({
				top: ($(window).height() - $header.innerHeight())/2
			});
		}
	};
</script>
