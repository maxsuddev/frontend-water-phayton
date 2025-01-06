import ExportInvoiceService from "@/services/exportInvoice.js";

const state = {
    exportInvoices: [],
    messageExportInvoice: '',
    errorMessageExportInvoice: '',
    errorExportInvoice: {},
    isLoadingExportInvoice: false,
};

const getters = {
    allExportInvoice: (state) => state.exportInvoices,
    messageExportInvoice: (state) => state.messageExportInvoice,
    errorMessageExportInvoice: (state) => state.errorMessageExportInvoice,
    getErrorExportInvoice: (state) => state.errorExportInvoice,
};

const actions = {
    async fetchExportInvoices({ commit }) {
        try {
            const response = await  ExportInvoiceService.getAllExportInvoice();
            commit('setExportInvoice', response.data.data);
        } catch (error) {
        }
    },

    async addExportInvoice({ commit }, newExportInvoice) {
        commit('setLoadingExportInvoice', true);
        try {
            const response = await ExportInvoiceService.addExportInvoice(newExportInvoice);
            commit('addExportInvoice', response.data.data);
            commit('messageExportInvoice', response.data.message);
            commit('clearMessageExportInvoice')
            commit('clearErrorExportInvoice');
        } catch (error) {
            commit('setErrorExportInvoice', error.response.data.data);
            commit('errorMessageExportInvoice', error.response.data.message);
            commit('clearMessageExportInvoice');
            commit('clearErrorExportInvoice');
        }finally {
            commit('setLoadingExportInvoice', false);
        }
    },

    async editExportInvoice({ commit }, updatedExportInvoice) {
        commit('setLoadingExportInvoice', true);
        try {
            const response =   await ExportInvoiceService.editExportInvoice(updatedExportInvoice);
            console.log(response.data)
            commit('updatedExportInvoice', updatedExportInvoice);
            commit('messageExportInvoice', response.data.message);
            commit('clearMessageExportInvoice')
            commit('clearErrorExportInvoice')
        } catch (error) {
            commit('setErrorExportInvoice', error.response.data.data);
            commit('errorMessageExportInvoice', error.response.data.message);
            commit('clearMessageExportInvoice');
            commit('clearErrorExportInvoice')
        }finally {
            commit('setLoadingExportInvoice', false);

        }
    },


};

const mutations = {
    setExportInvoice(state, exportInvoices) {
        state.exportInvoices = exportInvoices;
    },
    addExportInvoice(state, exportInvoice) {
        state.exportInvoices.push(exportInvoice);
    },


    updatedExportInvoice(state, updatedExportInvoice) {
        const index = state.exportInvoices.findIndex(c => c.id === updatedExportInvoice.id);
        if (index !== -1) {
            state.exportInvoices.splice(index, 1, updatedExportInvoice);
        }
    },

    messageExportInvoice(state, message) {
        state.messageExportInvoice = message;
    },
    errorMessageExportInvoice(state, message) {
        state.errorMessageExportInvoice = message;
    },
    clearMessageExportInvoice(state) {
        setTimeout(() => {
            state.errorMessageExportInvoice = '';
            state.messageExportInvoice = '';
        }, 5000)
    },

    setErrorExportInvoice(state, errors) {
        state.errorExportInvoice = errors;
    },
    clearErrorExportInvoice(state) {
        setTimeout(() => {
            state.errorExportInvoice = {};
        }, 5000);
    },
    setLoadingExportInvoice(state, lod) {
        state.isLoadingExportInvoice = lod;
    }

};

export default {
    state,
    getters,
    actions,
    mutations,
};
