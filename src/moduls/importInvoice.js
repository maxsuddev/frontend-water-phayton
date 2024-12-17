import ImportInvoiceService from "@/services/importInvoice.js";

const state = {
    importInvoices: [],
    messageImportInvoice: '',
    totalPagesImportInvoice: null,
    countImportInvoice: null,
    currentPageImportInvoice: null,
    perPageImportInvoice: null,
    searchQueryImportInvoice: '',
    errorMessageImportInvoice: '',
    errorImportInvoice: {},
    isLoadingImportInvoice: false,
};

const getters = {
    allImportInvoice: (state) => state.importInvoices,
    totalCountImportInvoice: (state) => state.countImportInvoice,
    totalPagesImportInvoice: (state) => state.totalPagesImportInvoice,
    currentPageImportInvoice: (state) => state.currentPageImportInvoice,
    messageImportInvoice: (state) => state.messageImportInvoice,
    getErrorImportInvoice: (state) => state.errorImportInvoice,
    errorMessageImportInvoice: (state) => state.errorMessageImportInvoice,
};

const actions = {
    async fetchImportInvoices({ commit, state }){
        commit('setLoadingImportInvoice', true);
        try {
            const response = await ImportInvoiceService.getAllImportInvoice({
                page: state.currentPageImportInvoice,
                per_page: state.perPageImportInvoice,
                // search: state.searchQueryImportInvoice,
            });
            commit('setImportInvoice', response.data.data);
            commit('setPaginationImportInvoice', response.data.meta);
        } catch (error) {
            console.error(error);
            commit('errorMessageImportInvoice', 'Failed to fetch Import Invoices.');
        } finally {
            commit('setLoadingImportInvoice', false);
        }
    },

    changePageImportInvoice({ commit, dispatch }, page) {
        commit('setCurrentPageImportInvoice', page);
        dispatch('fetchImportInvoices');
    },
    async searchImportInvoices({ commit, dispatch }, searchQuery) {
        commit('setSearchQueryImportInvoice', searchQuery);
        commit('setCurrentPageImportInvoice', 1);
        dispatch('fetchImportInvoices');
    },


    async addImportInvoice({ commit }, newImportInvoice) {
        commit('setLoadingImportInvoice', true);
        try {
            const response = await ImportInvoiceService.addImportInvoice(newImportInvoice);
            commit('addImportInvoice', response.data.data);
            commit('messageImportInvoice', response.data.message);
            commit('clearMessageImportInvoice')
            commit('clearErrorImportInvoice');
        } catch (error) {
            commit('setErrorImportInvoice', error.response.data.data);
            commit('errorMessageImportInvoice', error.response.data.message);
            commit('clearMessageImportInvoice');
            commit('clearErrorImportInvoice');
        }finally {
            commit('setLoadingImportInvoice', false);
        }
    },

    async editImportInvoice({ commit }, updatedImportInvoice) {
        commit('setLoadingImportInvoice', true);
        try {
            const response =   await ImportInvoiceService.editImportInvoice(updatedImportInvoice);
            commit('updatedImportInvoice', updatedImportInvoice);
            commit('messageImportInvoice', response.data.message);
            commit('clearMessageImportInvoice')
            commit('clearErrorImportInvoice')
        } catch (error) {
            commit('setErrorImportInvoice', error.response.data.data);
            commit('errorMessageImportInvoice', error.response.data.message);
            commit('clearMessageImportInvoice');
            commit('clearErrorImportInvoice')
        }finally {
            commit('setLoadingImportInvoice', false);

        }
    },


};

const mutations = {
    setImportInvoice(state, importInvoices) {
        state.importInvoices = importInvoices;
    },

    setPaginationImportInvoice(state, pagination) {
        state.totalPagesImportInvoice = pagination.total_pages;
        state.currentPageImportInvoice = pagination.current_page;
        state.perPageImportInvoice = pagination.per_page;
        state.countImportInvoice = pagination.total
    },
    setCurrentPageImportInvoice(state, current_page) {
        state.currentPageImportInvoice = current_page;
    },

    setSearchQueryImportInvoice(state, query) {
        state.searchQueryImportInvoice = query;
    },


    addImportInvoice(state, importInvoice) {
        state.importInvoices.push(importInvoice);
    },


    updatedImportInvoice(state, updatedImportInvoice) {
        const index = state.importInvoices.findIndex(c => c.id === updatedImportInvoice.id);
        if (index !== -1) {
            state.importInvoices.splice(index, 1, updatedImportInvoice);
        }
    },


    messageImportInvoice(state, message) {
        state.messageImportInvoice = message;
    },
    errorMessageImportInvoice(state, message) {
        state.errorMessageImportInvoice = message;
    },
    clearMessageImportInvoice(state) {
        setTimeout(() => {
            state.errorMessageImportInvoice = '';
            state.messageImportInvoice = '';
        }, 5000)
    },

    setErrorImportInvoice(state, errors) {
        state.errorImportInvoice = errors;
    },
    clearErrorImportInvoice(state) {
        setTimeout(() => {
            state.errorImportInvoice = {};
        }, 5000);
    },
    setLoadingImportInvoice(state, lod) {
        state.isLoadingImportInvoice = lod;
    }

};

export default {
    state,
    getters,
    actions,
    mutations,
};
