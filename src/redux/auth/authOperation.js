import { createAsyncThunk } from '@reduxjs/toolkit';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { instancePrivate, instancePublic, tokenSet, tokenUnset } from 'services/axios';
import { userReset } from './authSlice';
import { cleanContacts } from 'redux/contacts/contactsSlice';

export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
    try { 
        const { data } = await instancePublic.post('/users/signup', user);

        Notify.success(`User ${user.name} has been successfully registered.`);
        
        tokenSet(data.token);

        return data;
    } catch (error) {
        Notify.failure(error.response.data.message || "Sorry, the server is temporarily unavailable.");
        return thunkAPI.rejectWithValue(error.message);
    };
});

export const logIn = createAsyncThunk('auth/login', async (user, thunkAPI) => {
    try {
        const { data } = await instancePublic.post('/users/login', user);

        Notify.success(`Welcome back, ${data.user.name}!`);
        
        tokenSet(data.token);

        return data;
    } catch (error) {
        Notify.failure(error.response.data.message || "Sorry, the server is temporarily unavailable.");
        return thunkAPI.rejectWithValue(error.message);
    };
});

export const logOut = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
    try {
        await instancePrivate.post('/users/logout');

        Notify.success(`Goodbye!`);

        tokenUnset();
    } catch (error) {
        if (error.request.status === 401) {
            tokenUnset();
            thunkAPI.dispatch(userReset());
            thunkAPI.dispatch(cleanContacts());
            Notify.failure("Please login again");
        } else {
            Notify.failure(error.response.data.message || "Sorry, the server is temporarily unavailable.");
        };

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
        const { data } = await instancePrivate.get('/users/current');
        
        return data;
    } catch (error) {
        if (error.request.status === 401) {
            tokenUnset();
            thunkAPI.dispatch(userReset());
            thunkAPI.dispatch(cleanContacts());
            Notify.failure("Please login again");
        } else {
            Notify.failure(error.response.data.message ||
                "Sorry, the server is temporarily unavailable, please login again.");
        };

        return thunkAPI.rejectWithValue(error.message);
    }
})