import axiosInstance from "./axios.js";


const AuthService = {

    login(user) {
        return axiosInstance.post('/api-auth/login/', user);
    },

    logout(token){
        return axiosInstance.post('/api-auth/logout/', token );
    }

}
export default AuthService;