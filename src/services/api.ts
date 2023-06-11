import axios from 'axios';

import { getToken } from './auth';

const baseUrl = process.env.NEXT_PUBLIC_URL_API;

const api = axios.create({
    baseURL: baseUrl,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
    }
});

const authApi = axios.create({
    baseURL: baseUrl,
    headers: {
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'application/json',
        Accept: '/'
    }
});


export { api, authApi };
