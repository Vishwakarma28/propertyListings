import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

export const getProperties = () => API.get("/properties");
export const addProperty = (data) => API.post("/properties", data);