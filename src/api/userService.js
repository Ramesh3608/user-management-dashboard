import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

export const getUsers = () => api.get('/');
export const createUser = (user) => api.post('/', user);
export const updateUser = (id, user) => api.put(`/${id}`, user);
export const deleteUser = (id) => api.delete(`/${id}`);

export default api;
