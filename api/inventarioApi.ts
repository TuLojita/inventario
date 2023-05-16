import axios from "axios";

const inventarioApi = axios.create({
  baseURL: '/api'
});

export default inventarioApi;