import axios from 'axios';

// aula 05 axios 42:10
// nao esquecer de dar start no server
const api = axios.create({
    baseURL: 'http://192.168.0.3:3333'
})

export default api;