import axiosInstance from "@/services/axios.js";


const ExportInvoiceService = {
    getAllExportInvoice ()  {
        return axiosInstance.get('/api/export-invoices/');
    },

    addExportInvoice(exportInvoice)  {
        return axiosInstance.post('/api/export-invoices/', exportInvoice);
    },
    editExportInvoice(exportInvoiceData)  {
        return axiosInstance.put(`/api/export-invoices/${exportInvoiceData.id}/`, exportInvoiceData);

    },

}
export default ExportInvoiceService;