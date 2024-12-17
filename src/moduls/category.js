import CategoryService from "@/services/category.js";

const state = {
    categories: [],
    messageCategory: '',
    totalPagesCategory: null,
    countCategory: null,
    currentPageCategory: null,
    perPageCategory: null,
    searchQueryCategory: '',
    errorMessageCategory: '',
    errorCategory: {},
    isLoadingCategory: false,

};

const getters = {
    allCategories: (state) => state.categories,
    totalCountCategory: (state) => state.countCategory,
    totalPagesCategory: (state) => state.totalPagesCategory,
    currentPageCategory: (state) => state.currentPageCategory,
    messageCategory: (state) => state.messageCategory,
    getErrorsCategory: (state) => state.errorCategory,
    errorMessageCategory: (state) => state.errorMessageCategory,
};
const actions = {
    async fetchCategories({ commit, state }){
        commit('setLoadingCategory', true);
        try {
            const response = await CategoryService.getAllCategories({
                page: state.currentPageCategory,
                per_page: state.perPageCategory,
                search: state.searchQueryCategory,
            });
            commit('setCategories', response.data.data);
            commit('setPaginationCategory', response.data.meta);
        } catch (error) {
            console.error(error);
            commit('errorMessageCategory', 'Failed to fetch categories.');
        } finally {
            commit('setLoadingCategory', false);
        }
    },

    changePageCategory({ commit, dispatch }, page) {
        commit('setCurrentPageCategory', page);
        dispatch('fetchCategories');
    },
    async searchCategories({ commit, dispatch }, searchQuery) {
        commit('setSearchQueryCategory', searchQuery);
        commit('setCurrentPageCategory', 1);
        dispatch('fetchCategories');
    },

    async addCategory({ commit, dispatch }, newCategory) {
            commit('setLoadingCategory', true);
        try {
            const response = await CategoryService.addCategory(newCategory);
            dispatch('fetchCategories');
            commit('addCategory', response.data.data);
            commit('messageCategory', response.data.message);
            commit('clearMessagesCategory');
            commit('clearErrorsCategory');
        } catch (error) {
            //false
            commit('setErrorCategory', error.response.data.data);
            commit('errorMessageCategory', error.response.data.message);
            commit('clearMessagesCategory');
            commit('clearErrorsCategory');
        }finally {
            //final
            commit('setLoadingCategory', false);
        }
    },

    async editCategory({ commit, dispatch }, updatedCategory) {
            commit('setLoadingCategory', true);
        try {
            //true
            const response =   await CategoryService.editCategory(updatedCategory);
            dispatch('fetchCategories');
            commit('updateCategory', updatedCategory);
            commit('messageCategory', response.data.message);
            commit('clearMessagesCategory');
            commit('clearErrorsCategory');
        } catch (error) {
            //false
            commit('setErrorCategory', error.response.data.data );
            commit('errorMessageCategory', error.response.data.message);
            commit('clearMessagesCategory');
            commit('clearErrorsCategory');
        }finally {
            //final
            commit('setLoadingCategory', false);

        }
    },

    async deleteCategory({ commit, dispatch }, categoryId) {
            commit('setLoadingCategory', true);
        try {
            const  response  =   await CategoryService.deleteCategory(categoryId);
            dispatch('fetchCategories');
            commit('removeCategory', categoryId);
            commit('messageCategory', 'Deleted Successfully!');
            commit('clearMessagesCategory');

        } catch (error) {
            commit('errorMessageCategory', error.response.data.message);
            commit('clearMessagesCategory');
        }finally {
            commit('setLoadingCategory', false);

        }
    },
};


const mutations = {
    setCategories(state, categories) {
        state.categories = categories;
    },
    setPaginationCategory(state, pagination) {
        state.totalPagesCategory = pagination.total_pages;
        state.currentPageCategory = pagination.current_page;
        state.perPageCategory = pagination.per_page;
        state.countCategory = pagination.total
    },
    setCurrentPageCategory(state, current_page) {
        state.currentPageCategory = current_page;
    },

    setSearchQueryCategory(state, query) {
        state.searchQueryCategory = query;
    },



    addCategory(state, category) {
        state.categories.push(category);
    },
    updateCategory(state, updatedCategory) {
        const index = state.categories.findIndex(c => c.id === updatedCategory.id);
        if (index !== -1) {
            state.categories.splice(index, 1, updatedCategory);
        }
    },
    removeCategory(state, categoryId) {
        state.categories = state.categories.filter(category => category.id !== categoryId);
    },
    setErrorCategory(state, errorCategory) {
        state.errorCategory = errorCategory;
    },
    clearErrorsCategory(state) {
        setTimeout(() => {
        state.errorCategory = {};
        }, 3000 );
    },
    setLoadingCategory(state, isLoadingCategory) {
        state.isLoadingCategory = isLoadingCategory;
    },
    messageCategory(state, message) {
        state.messageCategory = message;
    },
    errorMessageCategory(state, error) {
        state.errormessageCategory = error;
    },
    clearMessagesCategory(state) {
        setTimeout(() => {
            state.messageCategory = ''
            state.errormessageCategory = ''
        }, 5000 )
    }

};

export default {
    state,
    getters,
    actions,
    mutations,
};
