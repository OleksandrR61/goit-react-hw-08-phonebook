import { createAsyncThunk } from "@reduxjs/toolkit";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { instancePrivate, tokenUnset } from "services/axios";
import { userReset } from "redux/auth/authSlice";
import { cleanContacts } from "./contactsSlice";

export const fetchContacts = createAsyncThunk("contacts/fetchAll", async (_, thunkAPI) => {
    try {
        const response = await instancePrivate.get("/contacts");
        return response.data;
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

export const addContact = createAsyncThunk("contacts/addContact", async (contact, thunkAPI) => {
    try {
        const response = await instancePrivate.post('/contacts', contact);
        Notify.success(`Contact ${contact.name} created`);
        return response.data;
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

export const deleteContact = createAsyncThunk("contacts/deleteContact", async (contactId, thunkAPI) => {
    try {
        const response = await instancePrivate.delete(`/contacts/${contactId}`);
        Notify.success(`Contact removed`);
        return response.data;
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