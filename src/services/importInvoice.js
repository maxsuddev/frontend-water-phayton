import axiosInstance from "@/services/axios.js";


const ImportInvoiceService = {
    async getAllImportInvoice({ page, per_page, search }) {
        let queryParams = new URLSearchParams();

        if (page) queryParams.append('page', page);
        if (per_page) queryParams.append('per_page', per_page);
        if (search) queryParams.append('search', search);

        const endpoint = queryParams.toString() ? `api/import-invoices?${queryParams.toString()}` : `api/import-invoices/`;

        return axiosInstance.get(endpoint);
    },

    addImportInvoice(importInvoice)  {
        return axiosInstance.post('/api/import-invoices/', importInvoice);
    },
    editImportInvoice(importInvoiceData)  {
        return axiosInstance.put(`/api/import-invoices/${importInvoiceData.id}/`, importInvoiceData);

    },

}
export default ImportInvoiceService;