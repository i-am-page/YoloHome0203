//require('dotenv').config()
import axios from 'axios';


const instance = axios.create({
    baseURL: 'https://yolohome-0203-server-fb7b81448a09.herokuapp.com',
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json'
    }
})

export default instance 