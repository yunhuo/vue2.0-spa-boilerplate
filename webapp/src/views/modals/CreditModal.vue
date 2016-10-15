<template>
	<div class="credit-modal">
		<modal ref="modal" :dismiss-on-mask="false">
			<div slot="content" class="content">
				<div class="iconfont icon-close" @click="onDismiss"></div>
                <header>
                    <div class="title">{{ title }}</div>
                </header>
				<ul class="inner">
					<li>
                        <div class="label">Type: </div>
                        <select class="type field">
                            <option value="1">Purchasing</option>
                        </select>
                    </li>
                    <li>
                        <div class="label">Score: </div>
                        <input type="number" class="credit field"/>
                    </li>
                    <li>
                        <div class="button button-blue" @click="onConfirm">Confirm</div>
                    </li>
				</ul>
			</div>
		</modal>
	</div>
</template>

<script type="text/ecmascript-6">
	import Modal from '../widgets/Modal.vue';

    let uid;
	export default {
		components: {
			Modal
		},

		props: {
			title: String,
            onChangeCredit: Function
		},

		methods: {
			show(id) {
                uid = id;
				this.$refs.modal.show();
			},

			onDismiss() {
				this.$refs.modal.dismiss();
			},

            onConfirm() {
                const $el = $(this.$el);
                const type = $el.find('.type').val();
                let credit = $el.find('.credit').val();
                credit = credit * 1;

                if(credit !== 0) {
                    this.onChangeCredit({
                        id: uid,
                        type: type,
                        credit: credit
                    });
                    this.onDismiss();
                }
            }
		}
	};
</script>
