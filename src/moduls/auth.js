import AuthService from "@/services/auth.js";
import {getItem, removeItem, setItem} from "@/helpers/persistaneStorage.js";

const state = {
    isLoadingAuth: false,
    error: {},
    errorMessageAuth: '',
};

const getters = {
    errorAuth : (state) => state.error,
    errorMessageAuth:(state) => state.errorMessageAuth,
};


const actions = {
    async login({ commit }, user) {
        commit('setLoadingAuth', true);
        try {
            const response = await AuthService.login(user);
            const token = response.data.data.access_token;
            setItem("user_data", response.data.data.user_data);
            setItem("user", response.data.data.user_data.username);
            setItem("token", token);
        } catch (error) {
            commit('errorMessageAuth', error.response.data.message);
            commit('clearErrorMessageAuth');
            commit('getErrorAuth', error.response.data);
            commit('clearErrorAuth',);
        } finally {
            commit('setLoadingAuth', false);
        }
    },

    async logout({commit}) {
        commit("logout");
          const token = getItem('token');
          const logoutToken = {'access_token': token};
        removeItem("token");
        removeItem("user_data");
        removeItem("user");
        const response = await AuthService.logout(logoutToken);
    },
};
const mutations = {
    setLoadingAuth(state, loading) {
        state.isLoadingAuth = loading;
    },

    getErrorAuth(state, error) {
        state.error = error;
    },
    clearErrorAuth(state) {
        setTimeout( () => {
            state.error = {};
        },3000)
    },
    errorMessageAuth(state, error) {
        state.errorMessageAuth = error;
    },
    clearErrorMessageAuth(state) {
        setTimeout( () => {
        state.errorMessageAuth = '';
        }, 5000)
    },

    logout(state) {
        state.user = null;
        state.error = null;
    },
};

export default {
    state,
    mutations,
    actions,
    getters
};
