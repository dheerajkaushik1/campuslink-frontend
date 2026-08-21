import axios from "axios";

const API = axios.create({
    baseURL: "https://campuslink-backend-wv2h.onrender.com/api",
});

API.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");

    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }

    return req;
    },
    (error) => Promise.reject(error)
);

API.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("email");
            alert("Session expired. Please login again.");
            window.location.href = "/login";
        }

        return Promise.reject(error);
    }
);

export default API;