import RoleService from "@/services/rolePermission.js";

const state = {
    roles:{},
    permissions:{},
    messageRole: '',
    errorMessageRole: '',
    errorRole: {},
    isLoadingRole: false,
};

const getters = {
    allRoles: (state) => state.roles,
    allPermission : (state) => state.permissions,
    errorMessageRole: (state) => state.errorMessageRole,
    messageRole: (state) => state.messageRole,
    getErrorRole: (state) => state.errorRole,
};

const actions = {
    async fetchRoles({ commit }) {
        try {
            const response = await RoleService.getAllRoles();
            commit('setRoles', response.data.data);
        } catch (error) {
            commit('messageRole', error.data.message);
        }
    },
    async fetchPermissions({ commit }) {
        try {
            const response = await RoleService.getAllPermission();
            commit('setPermissions', response.data.data);
        } catch (error) {
            commit('messageRole', error.data.message);
        }
    },
    async addRole({ commit }, newRole) {
        commit('setLoadingRole', true);
        try {
            const response = await RoleService.addRole(newRole);
            commit('addRole', response.data.data);
            // await  store.dispatch('fetchProducts')
            commit('messageRole', response.data.message);
            commit('clearMessagesRole');
            commit('clearErrors');
        } catch (error) {
            commit('setErrorRole', error.response.data.data);
            commit('errorMessageRole', error.response.data.message);
            commit('clearMessagesRole');
            commit('clearErrorRole');
        }finally {
            commit('setLoadingRole', false);
        }
    },


    async editRole({ commit }, updatedRole) {
        commit('setLoadingRole', true);
        try {
            const response =   await RoleService.editRole(updatedRole);
            commit('updateRole', updatedRole);
            commit('messageRole', response.data.message);
            commit('clearMessagesRole');
            commit('clearErrors');
        } catch (error) {
            commit('setErrorRole', error.response.data.data );
            commit('errorMessageRole', error.response.data.message);
            commit('clearMessagesRole');
            commit('clearErrorsRole');
        }finally {
            commit('setLoadingRole', false);
        }
    },

    async deleteRole({ commit }, roleId) {
        commit('setLoadingRole', true);
        try {
            const  response =  await RoleService.deleteRole(roleId);
            commit('removeRole', roleId);
            commit('messageRole', response.data.message);
            commit('clearMessagesRole');
        } catch (error) {
            commit('errorMessageRole', error.response.data.message);
            commit('clearMessagesRole');
        }finally {
            commit('setLoadingRole', false);
        }
    },
};



const mutations = {
    setRoles(state, roles) {
        state.roles = roles;
    },
    setPermissions(state, permissions) {
        state.permissions = permissions;
    },
    addRole(state, role) {
        state.roles.push(role);
    },
    updateRole(state, updatedRole) {
        const index = state.roles.findIndex(c => c.id === updatedRole.id);
        if (index !== -1) {
            state.roles.splice(index, 1, updatedRole);
        }
    },
    removeRole(state, roleId) {
        state.roles = state.roles.filter(role => role.id !== roleId);
    },
    messageRole(state, message) {
        state.messageRole = message;
    },
    clearMessagesRole(state) {
        setTimeout(() => {
            state.messageRole = '';
            state.errorMessageRole = '';
        }, 3000);
    },
    errorMessageRole(state, error) {
        state.errorMessageRole = error;
    },
    setErrorRole(state, error) {
        state.errorRole = error;
    },
    clearErrorRole(state) {
        setTimeout(() =>{
            state.errorRole = {};
        }, 3000);
    },
    setLoadingRole(state, isLoading) {
        state.isLoadingRole = isLoading;
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
};
