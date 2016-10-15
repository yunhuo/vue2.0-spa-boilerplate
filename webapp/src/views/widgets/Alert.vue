<template>
	<div class="modal-overlay">
		<div class="alert-modal">
			<div class="inner">
				<h3 class="title">{{ title }}</h3>

				<div v-show="showIcon">
					<div v-show="tag==='success'" class="sa-icon sa-success animate">
						<span class="sa-line sa-tip animateSuccessTip"></span>
						<span class="sa-line sa-long animateSuccessLong"></span>
						<div class="sa-placeholder"></div>
						<div class="sa-fix"></div>
					</div>
					<img v-show="tag==='warning'" class="icon" src="/static/images/hou-warning.png"/>
					<img v-show="tag==='error'" class="icon" src="/static/images/hou-error.png"/>
				</div>

				<div v-show="hasContent" class="content">{{ content }}</div>
				<div class="button button-blue" @click="dismiss(callback)">{{ buttonText }}</div>
			</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	const data = {
		title: '',
		content: '',
		tag: '',
		buttonText: '确定',
		showIcon: true,
		callback: null
	};
	const __data = Object.assign({}, data);

	export default {
		/***
		 * options:
		 *     content:
		 *           说明: 正文
		 *           default: ''
		 *     buttonText:
		 *          说明: 按钮文字
		 *          default: 确定
		 *     tag:
		 *          说明: 标记(success, warning, error)
		 *          default: ''
		 *     showIcon:
		 *          说明: 显示图标
		 *          default: true
		 *     callback:
		 *          说明: 回调
		 *          default: null
		 */
		data() {
			return data;
		},

        beforeDestroy () {
			Object.assign(this.$data, __data);
		},

		computed: {
			hasContent() {
				return !!this.content;
			}
		},

		methods: {
			/**
			 * show modal
			 */
			__show() {
				//noinspection JSValidateTypes
				const top = $('body').scrollTop();
				$('html').css('overflow-y', 'hidden');
//				const $header = $('.app-header');
//				const $sidebar = $('.app-sidebar');
				const $modal = $(this.$el).find('.alert-modal');
				const $el = $(this.$el);

				//noinspection JSValidateTypes
				$el.css({
					display: 'block',
					top: top,
					height: $(window).height(),
					width: $(window).width()
				});

				$el.velocity('fadeIn', 120, () => {
					$modal.css({marginTop: -$modal.height() / 2});
					$modal.velocity('transition.slideDownIn', 280);
				});
			},

			/**
			 * success alert
			 */
			success(title, options) {
				this.alert(title, 'success', options);
			},

			/**
			 * warning alert
			 */
			warning(title, options) {
				this.alert(title, 'warning', options);
			},

			/**
			 * error alert
			 */
			error(title, options) {
				this.alert(title, 'error', options);
			},

			/**
			 * alert
			 */
			alert (title, tag, options) {
				options = options || {};
				options.tag = tag;
				options.title = title;
				for (const option in this.$data) {
					if (this.$data.hasOwnProperty(option)) {
						if (options[option] !== undefined) {
							this.$data[option] = options[option];
						}
					}
				}
				// show
				this.__show();
			},

			/***
			 * dismiss
			 * */
			dismiss(callback) {
				const $modal = $(this.$el).find('.alert-modal');

				$modal.velocity('transition.slideUpOut', {
					duration: 280,
					complete: () => {
						$(this.$el).velocity('fadeOut', 120, () => {
							$('html').css('overflow-y', 'auto');
						});
						if (callback) {
							callback();
						}
					}
				});
			},

			/**
			 * destroy
			 **/
			destroy() {
				this.dismiss(() => {
					$(this.$el).remove();
				});
			}
		}
	};
</script>
