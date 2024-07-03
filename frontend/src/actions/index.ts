import axios, { AxiosInstance } from "axios";

export const axiosInstance: AxiosInstance = axios.create({
  withCredentials: true,
  baseURL: `${window.location.protocol}//${window.location.host}/api/v1`,
});

axiosInstance.interceptors.response.use((response) => {
  return response;
});
