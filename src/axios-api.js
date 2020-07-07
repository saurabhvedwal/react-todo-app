import axios from 'axios';

const api = axios.create({
    baseURL: 'https://react-todo-app-c394a.firebaseio.com/'
});

export default api;