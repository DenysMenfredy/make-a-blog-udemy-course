import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080',
    timeout: 3000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        // 'Access-Control-Allow-Origin': '*'
    }
});

export default api;