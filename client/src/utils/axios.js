import Axios from "axios";

const axiosInstance = Axios.create({
  // baseURL: "http://3.34.185.127/",
  baseURL: "http://52.79.198.207/",
  timeout: 12000,
});

export default axiosInstance;
