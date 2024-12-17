import axiosInstance from "@/services/axios.js";


const SupplierService = {
    async getAllSuppliers({ page, per_page, search }) {
        let queryParams = new URLSearchParams();

        if (page) queryParams.append('page', page);
        if (per_page) queryParams.append('per_page', per_page);
        if (search) queryParams.append('search', search);

        const endpoint = queryParams.toString() ? `api/suppliers?${queryParams.toString()}` : `api/suppliers/`;

        return axiosInstance.get(endpoint);
    },
    addSupplier (supplier)  {
        return axiosInstance.post('/api/suppliers/', supplier);
    },
    editSupplier(supplierData)  {
        return axiosInstance.put(`/api/suppliers/${supplierData.id}/`, supplierData);

    },
    deleteSupplier(supplierId)  {
        return axiosInstance.delete(`/api/suppliers/${supplierId}/`);
    }
}
export default SupplierService;