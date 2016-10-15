import { root, user } from '../types';
import actions from '../actions/user';

// initial state
const state = {
    error: undefined,
    items: []
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
     * list data loaded
     */
     [user.LIST_LOADED] (state, data) {
        const { items, page=1 } = data;
        if(page === 1) {
            state.items = [];
        }
        for(const item of items) {
//            item.createdAt = new Date(item.created_at).format('yyyy.MM.dd');
            state.items.push(item);
        }
    },
    /**
     * list data error
     */
     [user.LIST_ERROR] (state, error) {
        state.error = error;
    }
};

export default {
    state,
    mutations,
    actions: { ...actions }
};
