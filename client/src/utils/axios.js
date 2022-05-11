import Axios from "axios";

const axiosInstance = Axios.create({
  baseURL: "http://3.34.185.127/",
  timeout: 3000,
});

export default axiosInstance;
