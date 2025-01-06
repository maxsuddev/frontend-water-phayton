import UserService from "@/services/user.js";

const state = {
    users: [],
    totalPages: null,
    count: null,
    currentPage: null,
    perPage: null,
    messageUser: '',
    errorMessageUser: '',
    errorUser: {},
    isLoadingUser: false,
    searchQuery: '',
};

const getters = {
    allUsers: (state) => state.users,
    totalCount: (state) => state.count,
    totalPages: (state) => state.totalPages,
    currentPage: (state) => state.currentPage,
    perPage: (state) => state.perPage,
    messageUser: (state) => state.messageUser,
    getErrorUser: (state) => state.errorUser,
    errorMessageUser: (state) => state.errorMessageUser,
};

const actions = {
    async fetchUsers({ commit, state }) {
        commit('setLoadingUser', true);
        try {
            const response = await UserService.getAllUser({
                page: state.currentPage,
                per_page: state.perPage,
                search: state.searchQuery,
            });
            console.log('User', response.data)

            commit('setUsers', response.data.users);
            commit('setPaginationUsers', response.data.meta.pagination);
        } catch (error) {
            console.error(error);
            commit('errorMessageUser', 'Failed to fetch users.');
        } finally {
            commit('setLoadingUser', false);
        }
    },

    changePage({ commit, dispatch }, page) {
        commit('setCurrentPageUsers', page);
        dispatch('fetchUsers');
    },

    async searchUsers({ commit, dispatch }, searchQuery) {
        commit('setSearchQueryUsers', searchQuery);
        commit('setCurrentPageUsers', 1);
        dispatch('fetchUsers');
    },

    async addUser({ commit, dispatch }, newUser) {
        commit('setLoadingUser', true);
        try {
            const response = await UserService.addUser(newUser);
            commit('messageUser', response.data.message);
            dispatch('fetchUsers');
        } catch (error) {
            commit('errorMessageUser', 'Failed to add user.');
            console.error(error);
        } finally {
            commit('setLoadingUser', false);
        }
    },

    async deleteUser({ commit, dispatch }, userId) {
        commit('setLoadingUser', true);
        try {
            const response = await UserService.deleteUser(userId);
            commit('messageUser', response.data.message);
            dispatch('fetchUsers');
        } catch (error) {
            commit('errorMessageUser', 'Failed to delete user.');
            console.error(error);
        } finally {
            commit('setLoadingUser', false);
        }
    },
};

const mutations = {
    setUsers(state, users) {
        state.users = users;
    },
    setPaginationUsers(state, pagination) {
        state.totalPages = pagination.total_pages;
        state.currentPage = pagination.current_page;
        state.perPage = pagination.per_page;
        state.count = pagination.total
    },
    setCurrentPageUsers(state, current_page) {
        state.currentPage = current_page;
    },

    setSearchQueryUsers(state, query) {
        state.searchQuery = query;
    },
    messageUser(state, message) {
        state.messageUser = message;
    },
    errorMessageUser(state, message) {
        state.errorMessageUser = message;
    },
    setLoadingUser(state, isLoading) {
        state.isLoadingUser = isLoading;
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
};