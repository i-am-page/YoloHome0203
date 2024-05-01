import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://192.168.0.100:8080',
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json'
    }
})

export default instance