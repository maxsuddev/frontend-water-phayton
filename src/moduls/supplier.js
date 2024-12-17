import SupplierService from "@/services/supplier.js";

const state = {
    suppliers: [],
    messageSupplier: '',
    totalPagesSupplier: null,
    countSupplier: null,
    currentPageSupplier: null,
    perPageSupplier: null,
    searchQuerySupplier: '',
    errorMessageSupplier: '',
    errorSupplier: {},
    isLoadingSupplier: false,
};

const getters = {
    allSuppliers: (state) => state.suppliers,
    totalCountSupplier: (state) => state.countSupplier,
    totalPagesSupplier: (state) => state.totalPagesSupplier,
    currentPageSupplier: (state) => state.currentPageSupplier,
    messageSupplier: (state) => state.messageSupplier,
    getErrorSupplier: (state) => state.errorSupplier,
    errorMessageSupplier: (state) => state.errorMessageSupplier,
};

const actions = {
    async fetchSuppliers({ commit, state }){
        commit('setLoadingSupplier', true);
        try {
            const response = await SupplierService.getAllSuppliers({
                page: state.currentPageSupplier,
                per_page: state.perPageSupplier,
                search: state.searchQuerySupplier,
            });
            commit('setSuppliers', response.data.data);
            commit('setPaginationSupplier', response.data.meta);
        } catch (error) {
            console.error(error);
            commit('errorMessageSupplier', 'Failed to fetch suppliers.');
        } finally {
            commit('setLoadingSupplier', false);
        }
    },

    changePageSupplier({ commit, dispatch }, page) {
        commit('setCurrentPageSupplier', page);
        dispatch('fetchSuppliers');
    },
    async searchSuppliers({ commit, dispatch }, searchQuery) {
        commit('setSearchQuerySupplier', searchQuery);
        commit('setCurrentPageSupplier', 1);
        dispatch('fetchSuppliers');
    },

    async addSupplier({ commit, dispatch }, newSupplier) {
        commit('setLoadingSupplier', true);
        try {
            const response = await SupplierService.addSupplier(newSupplier);
            dispatch('fetchSuppliers');
            commit('addSupplier', response.data.data);
            commit('messageSupplier', response.data.message);
            commit('clearMessageSupplier')
            commit('clearErrorSupplier');
        } catch (error) {
            commit('setErrorSupplier', error.response.data.data);
            commit('errorMessageSupplier', error.response.data.message);
            commit('clearMessageSupplier');
            commit('clearErrorSupplier');
        }finally {
            commit('setLoadingSupplier', false);
        }
    },

    async editSupplier({ commit, dispatch }, updatedSupplier) {
        commit('setLoadingSupplier', true);
        try {
            const response =   await SupplierService.editSupplier(updatedSupplier);
            dispatch('fetchSuppliers');
            commit('updatedSupplier', updatedSupplier);
            commit('messageSupplier', response.data.message);
            commit('clearMessageSupplier')
            commit('clearErrorSupplier')
        } catch (error) {
            commit('setErrorSupplier', error.response.data.data);
            commit('errorMessageSupplier', error.response.data.message);
            commit('clearMessageSupplier');
            commit('clearErrorSupplier')
        }finally {
            commit('setLoadingSupplier', false);

        }
    },

    async deleteSupplier({ commit, dispatch }, supplierId) {
        commit('setLoadingSupplier', true);
        try {
            const response =   await SupplierService.deleteSupplier(supplierId);
            dispatch('fetchSuppliers');
            commit('removeSupplier', supplierId);
            commit('messageSupplier', response.data.message);
            commit('clearMessageSupplier')
        } catch (error) {
            commit('errorMessageSupplier', error.response.data.data);
            commit('clearMessageSupplier')
        }finally {
            commit('setLoadingSupplier', false);
        }
    },
};

const mutations = {
    setSuppliers(state, suppliers) {
        state.suppliers = suppliers;
    },
    setPaginationSupplier(state, pagination) {
        state.totalPagesSupplier = pagination.total_pages;
        state.currentPageSupplier = pagination.current_page;
        state.perPageSupplier = pagination.per_page;
        state.countSupplier = pagination.total
    },
    setCurrentPageSupplier(state, current_page) {
        state.currentPageSupplier = current_page;
    },

    setSearchQuerySupplier(state, query) {
        state.searchQuerySupplier = query;
    },
    addSupplier(state, supplier) {
        state.suppliers.push(supplier);
    },
    updatedSupplier(state, updatedSupplier) {
        const index = state.suppliers.findIndex(c => c.id === updatedSupplier.id);
        if (index !== -1) {
            state.suppliers.splice(index, 1, updatedSupplier);
        }
    },
    removeSupplier(state, supplierId) {
        state.suppliers = state.suppliers.filter(supplier => supplier.id !== supplierId);
    },

    messageSupplier(state, message) {
        state.messageSupplier = message;
    },
    errorMessageSupplier(state, message) {
        state.errorMessageSupplier = message;
    },
    clearMessageSupplier(state) {
        setTimeout(() => {
            state.errorMessageSupplier = '';
            state.messageSupplier = '';
        }, 5000)
    },

    setErrorSupplier(state, errors) {
        state.errorSupplier = errors;
    },
    clearErrorSupplier(state) {
        setTimeout(() => {
            state.errorSupplier = {};
        }, 5000);
    },
    setLoadingSupplier(state, lod) {
        state.isLoadingSupplier = lod;
    }

};

export default {
    state,
    getters,
    actions,
    mutations,
};
