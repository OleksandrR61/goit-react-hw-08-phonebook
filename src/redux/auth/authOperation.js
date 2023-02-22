import { createAsyncThunk } from '@reduxjs/toolkit';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { instance, tokenSet, tokenUnset } from 'services/axios';

export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
    try { 
        const { data } = await instance.post('/users/signup', user);

        Notify.success(`User ${user.name} has been successfully registered.`);
        
        tokenSet(data.token);

        return data;
    } catch (error) {
        Notify.failure("Sorry, the server is temporarily unavailable.");
        return thunkAPI.rejectWithValue(error.message);
    };
});

export const logIn = createAsyncThunk('auth/login', async (user, thunkAPI) => {
    try {
        const { data } = await instance.post('/users/login', user);

        Notify.success(`Welcome back, ${data.user.name}!`);
        
        tokenSet(data.token);

        return data;
    } catch (error) {
        Notify.failure("Sorry, the server is temporarily unavailable.");
        return thunkAPI.rejectWithValue(error.message);
    };
});

export const logOut = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
    try {
        await instance.post('/users/logout');

        Notify.success(`Goodbye!`);

        tokenUnset();
    } catch (error) {
        Notify.failure("Sorry, the server is temporarily unavailable.");
        return thunkAPI.rejectWithValue(error.message);
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
        Notify.failure("Sorry, the server is temporarily unavailable, please login again.");
        tokenUnset();
        return thunkAPI.rejectWithValue();
    }
})