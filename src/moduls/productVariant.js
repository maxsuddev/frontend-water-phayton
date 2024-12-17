import ProductVariantService from "@/services/productVariant.js";


const state = {
    productVariants: [],
    totalPagesProductVariant: null,
    countProductVariant: null,
    currentPageProductVariant: null,
    perPageProductVariant: null,
    searchQueryProductVariant: '',
    messageVariant: '',
    errorMessageVariant: '',
    errorVariant: {},
    isLoadingVariant: false,
};


const getters = {
    allProductVariants: (state) => state.productVariants,
    totalCountProductVariant: (state) => state.countProductVariant,
    totalPagesProductVariant: (state) => state.totalPagesProductVariant,
    currentPageProductVariant: (state) => state.currentPageProductVariant,
    getProductVariantErrorMessage: (state) => state.errorMessageVariant,
    getProductVariantErrors: (state) => state.errorVariant,
    getMessageProductVariant: (state) => state.messageVariant,
};
const mutations = {
    setProductVariants(state, productsVariants) {
        state.productVariants = productsVariants;
    },

    setPaginationProductVariant(state, pagination) {
        state.totalPagesProductVariant = pagination.total_pages;
        state.currentPageProductVariant = pagination.current_page;
        state.perPageProductVariant = pagination.per_page;
        state.countProductVariant = pagination.total
    },
    setCurrentPageProductVariant(state, current_page) {
        state.currentPageProductVariant = current_page;
    },

    setSearchQueryProductVariant(state, query) {
        state.searchQueryProductVariant = query;
    },

    addProductVariant(state, product) {
        state.productVariants.push(product);
    },

    updateProductVariant(state, updatedProduct) {
        const index = state.productVariants.findIndex(c => c.id === updatedProduct.id);
        if (index !== -1) {
            state.productVariants.splice(index, 1, updatedProduct);
        }
    },
    removeProductVariant(state, productVariantId) {
        state.productVariants = state.productVariants.filter(productVariant => productVariant.id !== productVariantId);
    },
    messageVariant(state, message) {
        state.messageVariants = message;
    },
    errorMessageVariant(state, message) {
        state.errorMessageVariant = message;
    },
    clearMessageVariant(state) {
        setTimeout(() => {
            state.messageVariant = '';
            state.errorMessageVariant = '';
        },5000)
    },
    setLoadingVariant(state, isLoading) {
        state.isLoadingVariant = isLoading;
    },
    setErrorVariant(state, error) {
        state.errorVariant = error;
    },
    clearErrorsVariant(state) {
        setTimeout(() => {
            state.errorVariant = {};
        }, 5000)
    },
};

const actions = {
    async fetchProductVariants({ commit, state }){
        commit('setLoadingVariant', true);
        try {
            const response = await ProductVariantService.getAllProductVariants({
                page: state.currentPageProductVariant,
                per_page: state.perPageProductVariant,
                search: state.searchQueryProductVariant,
            });
            console.log('Product', response.data.data);

            commit('setProductVariants', response.data.data);
            commit('setPaginationProductVariant', response.data.meta);
        } catch (error) {
            console.error(error);
            commit('errorMessageProductVariant', 'Failed to fetch Product variants.');
        } finally {
            commit('setLoadingVariant', false);
        }
    },

    changePageProductVariant({ commit, dispatch }, page) {
        commit('setCurrentPageProductVariant', page);
        dispatch('fetchProductVariants');
    },
    async searchProductVariants({ commit, dispatch }, searchQuery) {
        commit('setSearchQueryProductVariant', searchQuery);
        commit('setCurrentPageProductVariant', 1);
        dispatch('fetchProductVariants');
    },

    async addProductVariant({ commit, dispatch }, newVariant) {
        try {
            commit('setLoadingVariant', true);
            const response = await ProductVariantService.addProductVariant(newVariant);
            dispatch('fetchProductVariants')
            commit('addProductVariant', response.data.data);
            commit('messageVariant', response.data.message);
            commit('clearMessageVariant')
        }catch (error) {
            commit('setErrorVariant', error.response.data.data);
            commit('clearErrorsVariant')
            commit('errorMessageVariant', error.response.data.message);
            commit('clearMessageVariant')
        }finally {
            commit('setLoadingVariant', false);
        }
    },

    async editProductVariant({ commit, dispatch }, editVariant) {
        try {
            commit('setLoadingVariant', true);
            const response = await ProductVariantService.editProductVariant(editVariant);
            dispatch('fetchProductVariants')
            commit('updateProductVariant', response.data.data);
            commit('messageVariant', response.data.message);
        }catch (error) {
            commit('errorMessageVariant', error.response.data.data);
        }finally {
            commit('setLoadingVariant', false);
        }
    },

    async deleteProductVariant({ commit, dispatch }, deleteVariant) {
        try {
            commit('setLoadingVariant', true);
            const response = await ProductVariantService.deleteProductVariant(deleteVariant);
            dispatch('fetchProductVariants')
            commit('removeProductVariant', deleteVariant );
            commit('messageVariant', response.data.message);
            commit('clearMessageVariant')
        }catch (error) {
            commit('errorMessageVariant', error.data.message);
            commit('clearMessageVariant')
        }finally {
            commit('setLoadingVariant', false);
        }
    }

};


export default {
    state,
    getters,
    actions,
    mutations,
};