import { createSlice } from '@reduxjs/toolkit';

import { register, logIn, logOut, getCurrentUser } from './authOperation';

const initialState = {
    userName: "",
    token: null,
    isLoggedIn: false,
};

const handleLogFullfilled = (state, { payload }) => {
    state.userName = payload.user.name;
    state.token = payload.token;
    state.isLoggedIn = true;
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(register.fulfilled, handleLogFullfilled)
            .addCase(logIn.fulfilled, handleLogFullfilled)
            .addCase(logOut.fulfilled, (state) => {
                state.userName = "";
                state.token = null;
                state.isLoggedIn = false;
            })
            .addCase(getCurrentUser.fulfilled, (state, {payload}) => {
                state.userName = payload.name;
                state.isLoggedIn = true;
            })
            .addDefaultCase((state) => state);
    },
});

export const authReducer = authSlice.reducer;