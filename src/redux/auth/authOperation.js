import { createAsyncThunk } from '@reduxjs/toolkit';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { instance, tokenSet, tokenUnset } from 'services/axios';

export const register = createAsyncThunk('auth/register', async user => {
    try { console.log(user);
        const { data } = await instance.post('/users/signup', user);

        Notify.success(`User ${user.name} has been successfully registered.`);
        console.log(data);

        tokenSet(data.token);

        return data;
    } catch (error) {
        Notify.failure("Sorry, the server is temporarily unavailable.");
    };
});

export const logIn = createAsyncThunk('auth/login', async user => {
    try {
        const { data } = await instance.post('/users/login', user);

        Notify.success(`Welcome back, ${data.user.name}!`);
        
        tokenSet(data.token);

        return data;
    } catch (error) {
        Notify.failure("Sorry, the server is temporarily unavailable.");
    };
});

export const logOut = createAsyncThunk('auth/logout', async () => {
    try {
        await instance.post('/users/logout');

        Notify.success(`Goodbye!`);

        tokenUnset();
    } catch (error) {
        Notify.failure("Sorry, the server is temporarily unavailable.");
    };
});

export const getCurrentUser = createAsyncThunk('auth/current', async (_, thunkAPI) => {
    const persistedToken = thunkAPI.getState().auth.token;
    
    if (!persistedToken) {
        return thunkAPI.rejectWithValue();
    };

    tokenSet(persistedToken);
    try {
        const { data } = await instance.get('/users/current');
        
        return data;
    } catch (error) {
        Notify.failure("Sorry, the server is temporarily unavailable.");
        return thunkAPI.rejectWithValue();
    }
})