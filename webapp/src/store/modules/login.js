import { root, login } from '../types';
import actions from '../actions/login';

// initial state
const state = {
    error: undefined,
    response: undefined,
    isLoading: false
};
const __state = Object.assign({}, state);

// mutations
const mutations = {
    /**
     * init
     */
    [root.RESET] (state) {
        Object.assign(state, __state);
    },

    /**
     * init
     */
    [login.PRELOAD] (state) {
        state.preload = true;
    },

    /***
     *  login
     */
    [login.SUBMIT_REQUEST] (state) {
        state.isLoading = true;
    },
    [login.SUBMIT_SUCCESS] (state, result) {
        state.isLoading = false;
        state.response = result;
    },
    [login.SUBMIT_FAILURE] (state, error) {
        state.error = error;
        state.isLoading = false;
    }
};

export default {
    state,
    mutations,
    actions: { ...actions }
};
