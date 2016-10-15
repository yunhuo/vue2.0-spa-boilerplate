<template>
	<div class="search-modal">
		<modal ref="modal" :dismiss-on-mask="false">
			<div slot="content" class="content">
				<div class="iconfont icon-close" @click="onDismiss"></div>
                <header>
                    <div class="title">{{ title }}</div>
                </header>
                <table class="inner">
                    <tbody v-html="itemHTML"></tbody>
                </table>
                <footer>
                    <div class="button button-outline sm-button" @click="onReset">Reset</div>
                    <div class="button button-blue sm-button" @click="onSearch">Search</div>
                </footer>
			</div>
		</modal>
	</div>
</template>

<script type="text/ecmascript-6">
	import Modal from '../widgets/Modal.vue';

    const data = {
        items: [],
        itemHTML: '',
        callback: undefined
    };
    const __data = Object.assign({}, data);

	export default {
		components: {
			Modal
		},

		props: {
			title: String
		},

        data() {
            return data;
        },

        mounted() {

        },

        beforeDestroy() {
            Object.assign(this.$data, __data);
        },

        computed: {
            mTitle() {
                return this.title || 'Search';
            }
        },

		methods: {
			show(options) {
                const { items, callback } = options;
                this.items = items;
                this.callback = callback;
                const array = [];

                for(const item of items) {
                    switch (item.type) {
                        case 'text': {
                            const el = `
                                <tr>
                                    <td>${item.label}: </td>
                                    <td><input class="${item.name}" type="text" value="${item.value || ''}" name="${item.name}"/></td>
                                </tr>
                            `;
                            array.push(el);
                            break;
                        }
                    }
                }

                this.itemHTML = array.join('');
				this.$refs.modal.show();
			},

			onDismiss() {
				this.$refs.modal.dismiss();
                Object.assign(this.$data, __data);
			},


            onReset() {
                const $el = $(this.$el);
                $el.find('input, textarea').val('');
            },

            onSearch() {
                const $el = $(this.$el);
                const obj = {};
                for(const item of this.items) {
                    const v = $el.find('.' + item.name).val();
                    if(v) {
                        obj[item.name] = v;
                    }
                }

                this.callback(obj);
                this.onDismiss();
            }
		}
	};
</script>
