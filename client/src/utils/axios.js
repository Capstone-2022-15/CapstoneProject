import Axios from "axios";

const axiosInstance = Axios.create({
  // baseURL: "http://3.34.185.127/",
  // baseURL: "http://52.79.198.207/",
  // baseURL: "http://3.39.233.120/",
  baseURL: "http://13.125.221.73/",
  timeout: 10000,
});

export default axiosInstance;
