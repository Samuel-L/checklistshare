import axios from 'axios';

let url;
if (process.env.NODE_ENV === 'production') {
  url = 'https://checklistshareapi.herokuapp.com/api';
} else {
  url = 'http://localhost:8000/api';
}

const baseURL = url;

export const axiosInstance = axios.create({
  baseURL,
});

export default baseURL;
