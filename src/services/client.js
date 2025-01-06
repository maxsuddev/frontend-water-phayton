import axiosInstance from "@/services/axios.js";


const ClientService = {
    async getAllClients({ page, per_page, search }) {
        let queryParams = new URLSearchParams();

        if (page) queryParams.append('page', page);
        if (per_page) queryParams.append('per_page', per_page);
        if (search) queryParams.append('search', search);

        const endpoint = queryParams.toString() ? `api/clients?${queryParams.toString()}` : `api/clients/`;

        return axiosInstance.get(endpoint);
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