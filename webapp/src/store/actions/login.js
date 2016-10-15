import { login } from '../types';
//import http from '../../utils/http';

export default {
    /***
     * login
     */
    [login.LOGIN] ({ commit }, data) {
        commit(login.SUBMIT_REQUEST);
        setTimeout(() => {
            commit(login.SUBMIT_SUCCESS, { data: {username:'fedor'} });
        }, 500);

//        http.post('/api/anon/login', data)
//            .then((result) => commit(login.SUBMIT_SUCCESS, result))
//            .catch((error) => commit(login.SUBMIT_FAILURE, error));
    }
};
