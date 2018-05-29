import axios from 'axios';

const baseURL = process.env.API_URL;

export const axiosInstance = axios.create({
  baseURL,
});

export default baseURL;
