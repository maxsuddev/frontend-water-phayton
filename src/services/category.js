import axiosInstance from "@/services/axios.js";


const CategoryService = {
    async getAllCategories({ page, per_page, search }) {
        let queryParams = new URLSearchParams();

        if (page) queryParams.append('page', page);
        if (per_page) queryParams.append('per_page', per_page);
        if (search) queryParams.append('search', search);

        const endpoint = queryParams.toString() ? `api/categories?${queryParams.toString()}` : `api/categories/`;

        return axiosInstance.get(endpoint);
    },

    addCategory (category)  {
        return axiosInstance.post('/api/categories/', category);
    },
    editCategory(categoryData)  {
        return axiosInstance.put(`/api/categories/${categoryData.id}/`, categoryData);

    },
    deleteCategory(categoryId)  {
        return axiosInstance.delete(`/api/categories/${categoryId}/`);
    }
}
export default CategoryService;