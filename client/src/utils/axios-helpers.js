import axios from 'axios';

const baseURL = process.env.API_URL;
console.log(baseURL);

export const axiosInstance = axios.create({
  baseURL,
});

export default baseURL;
