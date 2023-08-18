import axios from "axios";

const backendBaseURL = "https://ecommerce-bead-store-backend.onrender.com"; // Replace with your actual backend URL

const axiosInstance = axios.create({
    baseURL: backendBaseURL,
});

export default axiosInstance;
