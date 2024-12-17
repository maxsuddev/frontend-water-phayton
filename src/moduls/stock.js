import StockService from "@/services/stock.js";

const state = {
    stocks: [],
    summary: [],
    stockMovements: []
};

const getters = {
    allStocks: (state) => state.stocks,
    getSummary: (state) => state.summary,
    getStockMovements: (state) => state.stockMovements,
};

const actions = {
    async fetchStocks({ commit }) {
        try {
            const response = await  StockService.getAllStock();
            commit('setStockSum', response.data);
            commit('setStocks', response.data.data);
        } catch (error) {
        }
    },


    async fetchStockMovements({ commit }) {
        try {
            const response = await  StockService.getAllStockMovement();
            commit('setStockMovements', response.data.data);
        } catch (error) {
        }
    },
};

const mutations = {
    setStocks(state, stocks) {
        state.stocks = stocks;
    },
    setStockSum (state, data) {
        state.summary = data.summary;
    },
    setStockMovements (state, movements) {
        state.stockMovements = movements;
    }



};

export default {
    state,
    getters,
    actions,
    mutations,
};
