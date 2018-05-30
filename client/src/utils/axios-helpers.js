import axios from 'axios';

let baseURL;
if (process.env.NODE_ENV === 'production') {
  baseURL = 'https://checklistshareapi.herokuapp.com/api';
} else {
  baseURL = 'localhost:8000/api';
}

export const axiosInstance = axios.create({
  baseURL,
});

export default baseURL;
