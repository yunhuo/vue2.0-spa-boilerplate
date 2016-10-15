import 'babel-polyfill';

import Vue from 'vue';
import App from './views/App';
import store from './store';
import router from './router';
import extension from './utils/extension';

extension();

window.router = router;
window.$refs = {};

//const local = sessionStorage.getItem('local-user');
//if(local) {
//    window.userinfo = JSON.parse(local);
//}

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});
//router.start({
//    store,
//    components: {App}
//}, 'body');
