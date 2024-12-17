import axiosInstance from "@/services/axios.js";


const ClientService = {
    getAllClient ()  {
        return axiosInstance.get('/api/clients/');
    },
    getClientById (id)  {
        return axiosInstance.get(`/api/clients/${id}/`);
    },

    addClient (client)  {
        return axiosInstance.post('/api/clients/', client);
    },
    editClient(clientData)  {
        return axiosInstance.put(`/api/clients/${clientData.id}/`, clientData);

    },
    deleteClient(clientId)  {
        return axiosInstance.delete(`/api/clients/${clientId}/`);
    }
}
export default ClientService;