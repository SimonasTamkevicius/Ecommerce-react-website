import axios from "axios";

const backendBaseURL = "https://ecommerce-bead-store-backend.onrender.com";
// const backendBaseURL = "http://localhost:9000";

const axiosInstance = axios.create({
    baseURL: backendBaseURL,
});

export default axiosInstance;
