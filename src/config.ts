import Axios from "axios";

const baseURLBack = "http://127.0.0.1:5000";
const baseURLFile = "http://127.0.0.1:5001";

const axiosBack = Axios.create({ baseURL: baseURLBack })
const axiosFile = Axios.create({ baseURL: baseURLFile })

export {
  axiosBack, axiosFile
};

