import axios from "axios";

const Api = axios.create({
  baseURL: `http://localhost:3001`,
});

// Api.interceptors.request.use((config) => {
//   // apply jwt token here
//   return config;
// });

Api.interceptors.response.use(
  (res: any) => {
    return res;
  },
  async (error: any) => {
    return Promise.reject(error);
  }
);

export default Api;
