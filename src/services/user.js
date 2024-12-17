import axiosInstance from "@/services/axios.js";


const UserService = {
    async getAllUser({ page, per_page, search }) {
        const queryParams = new URLSearchParams({ page, per_page, search });
        return axiosInstance.get(`/users?${queryParams.toString()}`);
    },

    addUser (user)  {
        return axiosInstance.post('/api/users/', user);
    },
    editUser(userData)  {
        return axiosInstance.put(`/api/users/${userData.id}/`, userData);

    },
    deleteUser(userId)  {
        return axiosInstance.delete(`/api/users/${userId}/`);
    }
}
export default UserService;

