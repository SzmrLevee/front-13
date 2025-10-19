import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://jsonserver.vm1.test',
});
