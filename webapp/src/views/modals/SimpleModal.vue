<template>
	<div class="simple-modal">
		<modal ref="modal" :title="title" :dismiss-on-mask="false">
			<div slot="content" class="content">
				<div class="iconfont icon-close" @click="onDismiss"></div>
				<div>
					this is simple modal
				</div>
				<textarea></textarea>
			</div>
		</modal>
	</div>
</template>

<script type="text/ecmascript-6">
	import Modal from '../widgets/Modal.vue';

	export default {
		components: {
			Modal
		},

		props: {
			title: String
		},

		methods: {
			show() {
				this.$refs.modal.show();
			},

			onDismiss() {
				this.$refs.modal.dismiss();
			}
		}
	};
</script>

<style lang="stylus">

</style>
