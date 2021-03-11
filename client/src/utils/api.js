import axios from 'axios';

// export const baseURL = 'https://drugstore-v1-api.herokuapp.com';
export const baseURL = 'http://localhost:5000';
export const api = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});
