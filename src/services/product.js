
import axiosInstance from "@/services/axios.js";

const ProductService = {
    async getAllProducts({ page, per_page, search }) {
        let queryParams = new URLSearchParams();

        if (page) queryParams.append('page', page);
        if (per_page) queryParams.append('per_page', per_page);
        if (search) queryParams.append('search', search);

        const endpoint = queryParams.toString() ? `api/products?${queryParams.toString()}` : `api/products/`;

        return axiosInstance.get(endpoint);
    },
    addProduct(productData) {
        return axiosInstance.post('/api/products/', productData);
    },
    editProduct(productData) {
        return axiosInstance.put(`/api/products/${productData.id}/`, productData);
    },
    deleteProduct(productId) {
        return axiosInstance.delete(`/api/products/${productId}/`);
    }
};

export default ProductService;
