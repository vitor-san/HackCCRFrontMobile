import axios from 'axios';

const api = axios.create({
  baseURL: 'https://app-campanha.herokuapp.com/',
});

export default api;
