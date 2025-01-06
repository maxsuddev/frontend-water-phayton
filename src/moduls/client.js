import ClientService from "@/services/client.js";

const state = {
    clients: [],
    messageClient: '',
    totalPagesClient: null,
    countClient: null,
    currentPageClient: null,
    perPageClient: null,
    searchQueryClient: '',
    errorMessageClient: '',
    errorClient: {},
    client: {},
    isLoadingClient: false,
};

const getters = {
    getClientById: (state) => state.client,
    totalCountClient: (state) => state.countClient,
    totalPagesClient: (state) => state.totalPagesClient,
    currentPageClient: (state) => state.currentPageClient,
    allClient: (state) => state.clients,
    messageClient: (state) => state.messageClient,
    getErrorClient: (state) => state.errorClient,
    errorMessageClient: (state) => state.errorMessageClient,
};

const actions = {
    async fetchClients({ commit, state }){
        commit('setLoadingClient', true);
        try {
            const response = await ClientService.getAllClients({
                page: state.currentPageClient,
                per_page: state.perPageClient,
                search: state.searchQueryClient,
            });
            commit('setClients', response.data.data);
            commit('setPaginationClient', response.data.meta);
        } catch (error) {
            console.error(error);
            commit('errorMessageClient', 'Failed to fetch clients.');
        } finally {
            commit('setLoadingClient', false);
        }
    },

    changePageClient({ commit, dispatch }, page) {
        commit('setCurrentPageClient', page);
        dispatch('fetchClients');
    },
    async searchClients({ commit, dispatch }, searchQuery) {
        commit('setSearchQueryClient', searchQuery);
        commit('setCurrentPageClient', 1);
        dispatch('fetchClients');
    },

    async addClient({ commit }, newClient) {
        commit('setLoadingClient', true);
        try {
            const response = await ClientService.addClient(newClient);
            commit('addClient', response.data.data);
            commit('messageClient', response.data.message);
            commit('clearMessageClient')
            commit('clearErrorClient');
        } catch (error) {
            commit('setErrorClient', error.response.data.data);
            commit('errorMessageClient', error.response.data.message);
            commit('clearMessageClient');
            commit('clearErrorClient');
        }finally {
            commit('setLoadingClient', false);
        }
    },

    async editClient({ commit }, updatedClient) {
        commit('setLoadingClient', true);
        try {
            const response =   await ClientService.editClient(updatedClient);
            commit('updatedClient', updatedClient);
            commit('messageClient', response.data.message);
            commit('clearMessageClient')
            commit('clearErrorClient')
        } catch (error) {
            commit('setErrorClient', error.response.data.data);
            commit('errorMessageClient', error.response.data.message);
            commit('clearMessageClient');
            commit('clearErrorClient')
        }finally {
            commit('setLoadingClient', false);

        }
    },

    async deleteClient({ commit }, clientId) {
        commit('setLoadingClient', true);
        try {
            const response =   await ClientService.deleteClient(clientId);
            commit('removeClient', clientId);
            commit('messageClient', response.data.message);
            commit('clearMessageClient')
        } catch (error) {
            commit('errorMessageClient', error.response.data.data);
            commit('clearMessageClient')
        }finally {
            commit('setLoadingClient', false);
        }
    },
};

const mutations = {
    setClients(state, clients) {
        state.clients = clients;
    },
     setClientById (state, client) {
        state.client = client;
},
    setPaginationClient(state, pagination) {
        state.totalPagesClient = pagination.total_pages;
        state.currentPageClient = pagination.current_page;
        state.perPageClient = pagination.per_page;
        state.countClient = pagination.total
    },
    setCurrentPageClient(state, current_page) {
        state.currentPageClient = current_page;
    },

    setSearchQueryClient(state, query) {
        state.searchQueryClient = query;
    },
    addClient(state, client) {
        state.clients.push(client);
    },
    updatedClient(state, updatedClient) {
        const index = state.clients.findIndex(c => c.id === updatedClient.id);
        if (index !== -1) {
            state.clients.splice(index, 1, updatedClient);
        }
    },
    removeClient(state, clientId) {
        state.clients = state.clients.filter(client => client.id !== clientId);
    },

    messageClient(state, message) {
        state.messageClient = message;
    },
    errorMessageClient(state, message) {
        state.errorMessageClient = message;
    },
    clearMessageClient(state) {
        setTimeout(() => {
            state.errorMessageClient = '';
            state.messageClient = '';
        }, 5000)
    },

    setErrorClient(state, errors) {
        state.errorClient = errors;
    },
    clearErrorClient(state) {
        setTimeout(() => {
            state.errorClient = {};
        }, 5000);
    },
    setLoadingClient(state, lod) {
        state.isLoadingClient = lod;
    }

};

export default {
    state,
    getters,
    actions,
    mutations,
};
