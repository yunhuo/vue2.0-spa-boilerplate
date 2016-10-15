<template>
	<div class="fullscreen login-view">
		<form class="center-form">
			<h3 class="title">Login</h3>
			<div class="username control hint--right hint--rounded" aria-label="">
				<input type="text" placeholder="Username" class="field"
                       @focus="onFocus($event)" @blur="onBlur('.username')"/>
			</div>
			<div class="password control hint--right hint--rounded" aria-label="">
				<input type="password" placeholder="Password" class="field"
                       @focus="onFocus($event)" @blur="onBlur('.password')" @keyup.enter="onSubmit"/>
			</div>
            <div @click="onSubmit" :class="['button', 'button-blue', 'button-login', { 'button-disabled': isLoading }]">
                <span class="spinner-circle iconfont icon-loading" v-show="isLoading"></span>&nbsp;Login&nbsp;
            </div>
		</form>
	</div>
</template>

<script type="text/ecmascript-6">
    import { mapState } from 'vuex';
	import { root, login } from '../store/types';
	import { is } from '../utils/index';

	export default {

		mounted() {
            sessionStorage.removeItem('local-user');
            window.userinfo = null;
		},

		beforeDestroy() {
            this.$store.commit(root.RESET);

			const $el = $(this.$el);
			$el.find('.center-form input').val('').removeClass('error');
			$el.find('.center-form .control').attr('aria-label', '');
			$el.find('.center-form').show();
			$el.find('.success-tip').hide();
		},

		watch: {
            error(v) {
                if(v) {
                    window.$refs.alert.error(v.message);
                }
            },
            response(v) {
                if(v) {
                    sessionStorage.setItem('local-user', JSON.stringify(v.data));
                    window.userinfo = v.data;
                    window.router.push('/');
                }
            }
		},

        computed: {
            ...mapState({
                error: (state) => state.login.error,
                response: (state) => state.login.response,
                isLoading: (state) => state.login.isLoading
            })
        },

		methods: {
			/**
			 * on focus event
			 */
			onFocus(event) {
				const $el = $(event.target);
				// remove error class
				$el.removeClass('error');
				// hide tooltip
				$el.parent('.control').attr('aria-label', '');
			},

			/**
			 * on blur event
			 */
			onBlur(query) {
				this.checked(query);
			},

			/**
			 * validate form
			 */
			checked(query) {
				query = query || ['.username', '.password'];
				if(is.string(query)) {
					query = [query];
				}

				const $el = $(this.$el);
				const errors = [];
				for(const q of query) {
					// field value
					const value = $el.find(q).find('input,select').val();
					// remove error class
					$el.find(q).find('input,select').removeClass('error');
					switch (q) {
						case '.username': {
							if(is.empty(value)) {
								errors.push({ $el: $el.find(q), message: 'Please input username' });
								break;
							}
							break;
						}
						case '.password': {
							if(is.empty(value)) {
								errors.push({ $el: $el.find(q), message: 'Please input password' });
								break;
							}
							break;
						}
					}
				}

				if(errors.length === 0) {
					return true;
				}

				for(const error of errors) {
					error.$el.find('input,select').addClass('error');
					// shake
					error.$el.velocity('callout.shake', 380);
					// show tooltip
					error.$el.attr('aria-label', error.message);
				}
				return false;
			},

			/***
			 * on submit
			 */
			onSubmit() {
				if(!this.checked()) {
					return;
				}
                const $el = $(this.$el);
                const username = $el.find('.username input').val();
                const password = $el.find('.password input').val();
				this.$store.dispatch(login.LOGIN, {
                    username,
                    password
                });
			}
		}
	};
</script>
