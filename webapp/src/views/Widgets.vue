<template>
	<div class="widgets-view">
		<div class="button button-blue" @click="onShowAlertSuccess">Alert Success</div>
		<div class="button button-blue" @click="onShowAlertWarning">Alert Warning</div>
		<div class="button button-blue" @click="onShowAlertError">Alert Error</div>
		<br/> <br/>
		<div class="button button-blue" @click="onShowConfirm">Confirm</div>
        <br/> <br/>
		<div class="button button-blue" @click="onShowModal">Modal</div>
		<br/> <br/>
		<div class="button button-blue" @click="onShowSpinner">Spinner</div>
		<br/> <br/>
		<spinner ref="spinner" v-show="isLoading"></spinner>
		<simple-modal ref="modal"></simple-modal>
	</div>
</template>

<script type="text/ecmascript-6">
    import { mapState } from 'vuex';
	import { root, widgets } from '../store/types';
	import utils from '../utils/index';
	import { load } from '../store/actions/widgets';
	import Spinner from './widgets/Spinner.vue';
	import SimpleModal from './modals/SimpleModal.vue';

	module.exports = {
		components: {
			Spinner,
			SimpleModal
		},

        beforeDestroy() {
            this.$store.commit(root.RESET);
        },

        computed: {
            ...mapState({
                isLoading: ({ widgets }) => widgets.isLoading
            })
        },


		watch: {

		},

		methods: {
			onShowAlertSuccess() {
				window.$refs.alert.success('success');
			},
			onShowAlertWarning() {
				window.$refs.alert.warning('warning');
			},
			onShowAlertError() {
				window.$refs.alert.error('error');
			},
			onShowConfirm() {
				window.$refs.confirm.show('are you sure?');
			},
			onShowModal() {
				this.$refs.modal.show();
			},
			onShowSpinner() {
                this.$store.dispatch(widgets.LOAD);
			}
		}
	};
</script>
