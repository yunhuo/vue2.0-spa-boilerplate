import { widgets } from '../types';
/**
 * load
 */

export default {
    [widgets.LOAD] ({ commit }) {
        commit(widgets.LOAD_REQUEST);
        setTimeout(() => {
            commit(widgets.LOAD_SUCCESS, true);
        }, 2000);
    }
};
