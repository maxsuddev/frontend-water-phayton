import SizeService from "@/services/size.js";

const state = {
    sizes: [],
    totalPagesSize: null,
    countSize: null,
    currentPageSize: null,
    perPageSize: null,
    messageSize: '',
    errorMessageSize: '',
    errorSize: {},
    isLoadingSize: false,
    searchQuerySize: '',

};

const getters = {
    allSizes: (state) => state.sizes,
    totalCountSize: (state) => state.countSize,
    totalPagesSize: (state) => state.totalPagesSize,
    currentPageSize: (state) => state.currentPageSize,
    messageSize: (state) => state.messageSize,
    getErrorSize: (state) => state.errorSize,
    errorMessageSize: (state) => state.errorMessageSize,
};

const actions = {
    async fetchSizes({ commit, state }) {
        commit('setLoadingSize', true);
        try {
            const response = await SizeService.getAllSizes({
                page: state.currentPageSize,
                per_page: state.perPageSize,
                search: state.searchQuerySize,
            });
            console.log('Size', response.data)

            commit('setSizes', response.data.data);
            commit('setPaginationSize', response.data.meta);
        } catch (error) {
            console.error(error);
            commit('errorMessageSize', 'Failed to fetch Sizes.');
        } finally {
            commit('setLoadingSize', false);
        }
    },

    changePageSize({ commit, dispatch }, page) {
        commit('setCurrentPageSize', page);
        dispatch('fetchSizes');
    },

    async searchSizes({ commit, dispatch }, searchQuery) {
        commit('setSearchQuerySize', searchQuery);
        commit('setCurrentPageSize', 1);
        dispatch('fetchSizes');
    },


    async addSize({ commit, dispatch }, newSize) {
        commit('setLoadingSize', true);
        try {
            const response = await SizeService.addSize(newSize);
            dispatch('fetchSizes')
            commit('addSize', response.data.data);
            commit('messageSize', response.data.message);
            commit('clearMessageSize')
            commit('clearErrorSize');
        } catch (error) {
            commit('setErrorSize', error.response.data.data);
            commit('errorMessageSize', error.response.data.message);
            commit('clearMessageSize');
            commit('clearErrorSize');
        }finally {
            commit('setLoadingSize', false);
        }
    },

    async editSize({ commit, dispatch }, updatedSize) {
        commit('setLoadingSize', true);
        try {
            const response =   await SizeService.editSize(updatedSize);
            dispatch('fetchSizes')
            commit('updatedSize', updatedSize);
            commit('messageSize', response.data.message);
            commit('clearMessageSize')
            commit('clearErrorSize')
        } catch (error) {
            commit('setErrorSize', error.response.data.data);
            commit('errorMessageSize', error.response.data.message);
            commit('clearMessageSize');
            commit('clearErrorSize')
        }finally {
            commit('setLoadingSize', false);

        }
    },

    async deleteSize({ commit, dispatch }, sizeId) {
        commit('setLoadingSize', true);
        try {
         const response =   await SizeService.deleteSize(sizeId);
            dispatch('fetchSizes')
            commit('removeSize', sizeId);
            commit('messageSize', response.data.message);
            commit('clearMessageSize')
        } catch (error) {
            commit('errorMessageSize', error.response.data.data);
            commit('clearMessageSize')
        }finally {
            commit('setLoadingSize', false);
        }
    },
};

const mutations = {
    setSizes(state, sizes) {
        state.sizes = sizes;
    },

    setPaginationSize(state, pagination) {
        state.totalPagesSize = pagination.total_pages;
        state.currentPageSize = pagination.current_page;
        state.perPageSize = pagination.per_page;
        state.countSize = pagination.total
    },
    setCurrentPageSize(state, current_page) {
        state.currentPageSize = current_page;
    },

    setSearchQuerySize(state, query) {
        state.searchQuerySize = query;
    },
    addSize(state, size) {
        state.sizes.push(size);
    },
    updatedSize(state, updatedSize) {
        const index = state.sizes.findIndex(c => c.id === updatedSize.id);
        if (index !== -1) {
            state.sizes.splice(index, 1, updatedSize);
        }
    },
    removeSize(state, sizeId) {
        state.sizes = state.sizes.filter(size => size.id !== sizeId);
    },

    messageSize(state, message) {
        state.messageSize = message;
    },
    errorMessageSize(state, message) {
        state.errorMessageSize = message;
    },
    clearMessageSize(state) {
        setTimeout(() => {
        state.errorMessageSize = '';
        state.messageSize = '';
        }, 5000)
    },

    setErrorSize(state, errors) {
        state.errorSize = errors;
    },
    clearErrorSize(state) {
        setTimeout(() => {
        state.errorSize = {};
        }, 5000);
    },
    setLoadingSize(state, lod) {
        state.isLoadingSize = lod;
    }

};

export default {
    state,
    getters,
    actions,
    mutations,
};
