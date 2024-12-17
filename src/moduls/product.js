import ProductService from "@/services/product.js";

const state = {
    products:{},
    messageProduct: '',
    totalPagesProduct: null,
    countProduct: null,
    currentPageProduct: null,
    perPageProduct: null,
    errorMessageProduct: '',
    errorProduct: {},
    isLoadingProduct: false,
    searchQueryProduct: '',

};

const getters = {
    allProducts: (state) => state.products,
    totalCountProduct: (state) => state.countProduct,
    totalPagesProduct: (state) => state.totalPagesProduct,
    currentPageProduct: (state) => state.currentPageProduct,
    errorMessageProduct: (state) => state.errorMessageProduct,
    messageProduct: (state) => state.messageProduct,
    getErrorProduct: (state) => state.errorProduct,
};

const mutations = {
    setProducts(state, products) {
        state.products = products;
    },
    setPaginationProduct(state, pagination) {
        state.totalPagesProduct = pagination.total_pages;
        state.currentPageProduct = pagination.current_page;
        state.perPageProduct = pagination.per_page;
        state.countProduct = pagination.total
    },
    setCurrentPageProduct(state, current_page) {
        state.countProduct = current_page;
    },

    setSearchQueryProduct(state, query) {
        state.searchQueryProduct = query;
    },
    addProduct(state, product) {
        state.products.push(product);
    },
    updateProduct(state, updatedProduct) {
        const index = state.products.findIndex(c => c.id === updatedProduct.id);
        if (index !== -1) {
            state.products.splice(index, 1, updatedProduct);
        }
    },
    removeProduct(state, productId) {
        state.products = state.products.filter(product => product.id !== productId);
    },
    messageProduct(state, message) {
        state.messageProduct = message;
    },
    clearMessagesProduct(state) {
        setTimeout(() => {
        state.messageProduct = '';
        state.errorMessageProduct = '';
        }, 3000);
    },
    errorMessageProduct(state, error) {
        state.errorMessageProduct = error;
    },
    setErrorProduct(state, error) {
        state.errorProduct = error;
    },
    clearErrorProduct(state) {
        setTimeout(() =>{
        state.errorProduct = {};
        }, 3000);
    },
    setLoadingProduct(state, isLoading) {
        state.isLoadingProduct = isLoading;
    },
};
const actions = {
    async fetchProducts({ commit, state }) {

        commit('setLoadingProduct', true);
        try {
            const response = await ProductService.getAllProducts({
                page: state.currentPage,
                per_page: state.perPageProduct,
                search: state.searchQueryProduct,
            });
            console.log('Product', response.data)

            commit('setProducts', response.data.data);
            commit('setPaginationProduct', response.data.meta);
        } catch (error) {
            console.error(error);
            commit('errorMessageProduct', 'Failed to fetch Products.');
        } finally {
            commit('setLoadingProduct', false);
        }
    },

    changePageProduct({ commit, dispatch }, page) {
        commit('setCurrentPageProduct', page);
        dispatch('fetchProducts');
    },

    async searchProducts({ commit, dispatch }, searchQuery) {
        commit('setSearchQueryProduct', searchQuery);
        commit('setCurrentPageProduct', 1);
        dispatch('fetchProducts');
    },

    async addProduct({ commit, dispatch }, newProduct) {
        commit('setLoadingProduct', true);
        try {
            const response = await ProductService.addProduct(newProduct);
            commit('addProduct', response.data.data);
            dispatch('fetchProducts')
            commit('messageProduct', response.data.message);
            commit('clearMessagesProduct');
            commit('clearErrors');
        } catch (error) {
            commit('setErrorProduct', error.response.data.data);
            commit('errorMessageProduct', error.response.data.message);
            commit('clearMessagesProduct');
            commit('clearErrorProduct');
        }finally {
            commit('setLoadingProduct', false);
        }
    },


    async editProduct({ commit, dispatch }, updatedProduct) {
        commit('setLoadingProduct', true);
        try {
            const response =   await ProductService.editProduct(updatedProduct);
            dispatch('fetchProducts')
            commit('updateProduct', updatedProduct);
            commit('messageProduct', response.data.message);
            commit('clearMessagesProduct');
            commit('clearErrors');
        } catch (error) {
            commit('setErrorProduct', error.response.data.data );
            commit('errorMessageProduct', error.response.data.message);
            commit('clearMessagesProduct');
            commit('clearErrorsProduct');
        }finally {
            commit('setLoadingProduct', false);
        }
    },

    async deleteProduct({ commit, dispatch }, productId) {
        commit('setLoadingProduct', true);
        try {
            const  response =  await ProductService.deleteProduct(productId);
            dispatch('fetchProducts');
            commit('removeProduct', productId);
            commit('messageProduct', response.data.message);
            commit('clearMessagesProduct');
        } catch (error) {
            commit('errorMessageProduct', error.response.data.message);
            commit('clearMessagesProduct');
        }finally {
            commit('setLoadingProduct', false);
        }
    },
};




export default {
    state,
    getters,
    actions,
    mutations,
};
