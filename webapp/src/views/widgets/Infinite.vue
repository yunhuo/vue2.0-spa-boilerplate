<template>
	<div class="infinite">
		<slot name="content"></slot>
		<div v-show="isBusy && page !== 0" class="loading-more-bar" @click="onClickMore">
			<div class="inner">
				<span class="spinner-circle iconfont icon-loading"></span>
				<span class="text">{{ barText }}</span>
			</div>
		</div>
		<spinner ref="spinner" v-show="isBusy && page === 0"></spinner>
	</div>
</template>

<script type="text/ecmascript-6">
	/*****************************************
	 * Infinite vue
	 * Vue 组件
	 *****************************************/
	import http from '../../utils/http';
	import Spinner from './Spinner.vue';

	const data = {
        page: 0,
		isBusy: false,
		isCompleted: false,
        params: {}
	};
	const __data = Object.assign({}, data);

	export default {
		/***
		 * props:
		 *       url:
		 *           说明: URL
		 *           default: ''
		 *     target:
		 *           说明: 绑定的DOM
		 *           default: document
		 *     limit:
		 *           说明: 每页条数
		 *           default: 30
		 *     delay:
		 *           说明: load加载延时
		 *           default: 500
		 *     autoScroll:
		 *           说明: 是否自动加载
		 *           default: true
		 *     loadingText:
		 *           说明: 加载中文字
		 *           default: '加载中...'
		 *     loadMoreText:
		 *           说明: 加载更多
		 *           default: '加载更多'
		 *     loadMoreClickText:
		 *           说明: 点击加载更多
		 *           default: '点击加载更多'
		 */
		props: {
            store: Object,
			url: {type: String, requried: true},
			target: {type: String, requried: false},
			limit: {type: Number, default: 20},
			delay: {type: Number, default: 500},
			autoScroll: {type: Boolean, default: true},
			loadingText: {type: String, default: '加载中...'},
			loadMoreText: {type: String, default: '加载更多'},
			loadMoreClickText: {type: String, default: '点击加载更多'},
			onLoadSuccess: Function, // data nofity
			onLoadFailure: Function
		},

		components: {
			Spinner
		},

		data() {
			return data;
		},

        beforeDestroy() {
			Object.assign(this.$data, __data);
		},

		computed: {
			barText() {
				if (this.autoScroll) {
					return this.isBusy ? this.loadingText : this.loadMoreText;
				} else {
					return this.isBusy ? this.loadingText : this.loadMoreClickText;
				}
			}
		},

		mounted () {
			if (this.autoScroll) {
				this.bindScrollEvent();
			}
		},

		methods: {
			/**
			 * refresh
			 */
			refresh() {
				this.page = 0;
				this.loadData(1);
			},

            filter(params) {
                this.params = params;
                this.refresh();
            },

			/**
			 * bind scroll event
			 */
			bindScrollEvent() {
				var $target = $(this.target || document);
				$target.scroll(() => {
					//noinspection JSValidateTypes
					if (($target.scrollTop() + $(window).height() >= $target.height())
						&& !this.isBusy && !this.isCompleted) {

						this.isBusy = true;
						// load next page
						setTimeout(() => {
							this.loadData(this.page + 1);
						}, this.delay);
					}
				});
			},

			/**
			 * load remote data
			 **/
			loadData(page) {
				this.isBusy = true;
                let params = {page: page, limit: this.limit};
                params = Object.assign(params, this.params);

				http.get(this.url, params)
					.then((resp) => {
						const data = resp.data;
						if (data.length < this.limit) {
							this.isCompleted = true;
						}
						this.page++;
						this.isBusy = false;

						if (this.onLoadSuccess) {
							this.onLoadSuccess({ items: data, page: this.page });
						}
					})
					.catch((err) => {
						this.isBusy = false;
						this.onLoadFailure({ message: err.message, __timestamp__: Date.now() });
					});
			},

			/**
			 * on click more text
			 */
			onClickMore() {
				if (!this.autoScroll) {
					if (!this.isBusy && !this.isCompleted) {
						this.loadData(this.page + 1);
					}
				}
			}
		}
	};
</script>
