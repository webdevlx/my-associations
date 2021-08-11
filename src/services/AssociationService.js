import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://my-json-server.typicode.com/webdevlx/my-associations",
  // baseURL: "http://localhost:3000",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});

export default {
  getAssociations() {
    return apiClient.get("/associations")
  }
}