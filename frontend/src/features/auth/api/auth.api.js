import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env['VITE_BACKEND_ENDPOINT'],
    withCredentials: true
});

export async function register(payload) {
    const res = await api.post('/api/auth/register', payload);

    return res;
}

export async function login(payload) {
    const res = await api.post('/api/auth/login', payload);

    return res;
}

export async function getMe() {
    const res = await api.get('/api/auth/get-me');

    return res;
}

export async function logout() {
    const res = await api.post('/api/auth/logout');

    return res;
}