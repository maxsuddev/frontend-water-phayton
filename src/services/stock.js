import axiosInstance from "@/services/axios.js";


const StockService = {
    getAllStock ()  {
        return axiosInstance.get('/api/stocks/');
    },

    getAllStockMovement ()  {
        return axiosInstance.get('/api/stock-movements/');
    },

}
export default StockService;