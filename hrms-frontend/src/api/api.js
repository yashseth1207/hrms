import axios from "axios";

const api = axios.create({
  baseURL: "https://hrms-backend-zg8t.onrender.com/api",
});

export default api;