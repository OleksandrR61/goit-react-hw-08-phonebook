import axios from 'axios';

export const instancePublic = axios.create({
    baseURL: 'https://connections-api.herokuapp.com',
});

export const instancePrivate = axios.create({
    baseURL: 'https://connections-api.herokuapp.com',
});

export const tokenSet = token => {
    instancePrivate.defaults.headers.common.Authorization = `Bearer ${token}`; 
};

export const tokenUnset = () => {
    instancePrivate.defaults.headers.common.Authorization = "";
};