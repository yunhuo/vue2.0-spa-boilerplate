import Vue from 'vue';
import Vuex from 'vuex';
import login from './modules/login';
import user from './modules/user';
import widgets from './modules/widgets';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
    strict: debug,
    modules: {
        login,
        user,
        widgets
    }
});
