import axiosInstance from "@/services/axios.js";


const SizeService = {
    async getAllSizes({ page, per_page, search }) {
        let queryParams = new URLSearchParams();

        if (page) queryParams.append('page', page);
        if (per_page) queryParams.append('per_page', per_page);
        if (search) queryParams.append('search', search);

        const endpoint = queryParams.toString() ? `api/sizes?${queryParams.toString()}` : `api/sizes/`;

        return axiosInstance.get(endpoint);
    },

    addSize (size)  {
        return axiosInstance.post('/api/sizes/', size);
    },
    editSize(sizeData)  {
        return axiosInstance.put(`/api/sizes/${sizeData.id}/`, sizeData);

    },
    deleteSize(sizeId)  {
        return axiosInstance.delete(`/api/sizes/${sizeId}/`);
    }
}
export default SizeService;