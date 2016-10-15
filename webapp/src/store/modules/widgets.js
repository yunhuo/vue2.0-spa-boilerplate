import { root, widgets } from '../types';
import actions from '../actions/widgets';

// initial state
const state = {
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
	 * load
	 */
	[widgets.LOAD_REQUEST] (state) {
		state.isLoading = true;
	},
	[widgets.LOAD_SUCCESS] (state) {
		state.isLoading = false;
	}
};

export default {
    state,
    mutations,
    actions: { ...actions }
};
