import axios from "axios";

export default axios.create({
    baseURL: ["https://ecommerce-bead-store-backend.onrender.com", "http://localhost:9000"]
});