<template>
	<div class="modal-overlay">
		<div class="confirm-modal">
			<div class="inner">
				<h3 class="title">{{ title }}</h3>
				<img v-show="showIcon" class="icon" src="/static/images/hou-warning.png"/>
				<div v-show="hasContent" class="content">{{ content }}</div>
			</div>
			<div class="btn-box">
				<div :class="['button', 'button-cancel', cancelButtonCls]" @click="onClick(0)">{{ cancelButtonText }}</div>
				<div :class="['button', 'button-confirm', confirmButtonCls]" @click="onClick(1)">{{ confirmButtonText }}</div>
			</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	const data = {
		title: '',
		content: '',
		cancelButtonText: '取消',
		confirmButtonText: '确定',
		cancelButtonCls: 'button-white',
		confirmButtonCls: 'button-blue',
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
		 *     cancelButtonText:
		 *          说明: 按钮文字
		 *          default: 取消
		 *     confirmButtonText:
		 *          说明: 按钮文字
		 *          default: 确定
		 *     cancelButtonCls:
		 *          说明: 按钮class name
		 *          default: 'button-white'
		 *     confirmButtonCls:
		 *          说明: 按钮class name
		 *          default: 'button-blue'
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
				const top = $('body').scrollTop();
				$('html').css('overflow-y', 'hidden');

//				const $header = $('.app-header');
//				const $sidebar = $('.app-sidebar');
				const $modal = $(this.$el).find('.confirm-modal');
				const $el = $(this.$el);

				$el.css({
					display: 'block',
					top: top,
					height: $(window).height(),
					width: $(window).width()
				});

				$el.velocity('fadeIn', 120, () => {
					$modal.css({marginTop: -$modal.height() / 2 });
					$modal.velocity('transition.slideDownIn', 280);
				});
			},


			/**
			 * show
			 **/
			show(title, options) {
				options = options || {};
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
				const $modal = $(this.$el).find('.confirm-modal');

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
			},

			/**
			 * on click button
			 */
			onClick(index) {
				if(this.callback) {
					this.callback(index);
				}
				this.dismiss();
			}
		}
	};
</script>
