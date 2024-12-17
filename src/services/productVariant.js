
import axiosInstance from "@/services/axios.js";


const ProductVariantService = {
    async getAllProductVariants({ page, per_page, search }) {
        let queryParams = new URLSearchParams();

        if (page) queryParams.append('page', page);
        if (per_page) queryParams.append('per_page', per_page);
        if (search) queryParams.append('search', search);

        const endpoint = queryParams.toString() ? `api/product-variants?${queryParams.toString()}` : `api/product-variants/`;

        return axiosInstance.get(endpoint);
    },
    addProductVariant: (productVariantData) => {
        return axiosInstance.post('/api/product-variants/', productVariantData);
    },
    editProductVariant: (productVariantData) => {
        return axiosInstance.put(`/api/product-variants/${productVariantData.id}/`, productVariantData);
    },

    deleteProductVariant: (productVariantId) => {
        return axiosInstance.delete(`/api/product-variants/${productVariantId}/`);
    }
};
export default ProductVariantService;