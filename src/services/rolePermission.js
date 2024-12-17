
import axiosInstance from "@/services/axios.js";

const RoleService = {
    getAllRoles() {
        return axiosInstance.get('/api/groups/');
    },
    getAllPermission() {
        return axiosInstance.get('/api/permissions/');
    },
    addRole(roleData) {
        return axiosInstance.post('/api/groups/', roleData);
    },
    editRole(roleData) {
        return axiosInstance.put(`/api/groups/${roleData.id}/`, roleData);
    },
    deleteRole(roleId) {
        return axiosInstance.delete(`/api/groups/${roleId}/`);
    }
};

export default RoleService;
