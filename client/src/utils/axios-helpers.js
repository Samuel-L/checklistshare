import axios from 'axios';

const baseURL = 'https://checklistshareapi.herokuapp.com/api';

export const axiosInstance = axios.create({
  baseURL,
});

export default baseURL;
