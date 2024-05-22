import axios from 'axios';

const baseURL = process.env.NODE_ENV === 'production' ? 'https://44.202.68.188/api' : 'http://192.168.137.95:3000/api';
const api = axios.create({
  baseURL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});


export const convertToJSONString = (obj) => {
  return JSON.stringify(obj);
}

export default api;
