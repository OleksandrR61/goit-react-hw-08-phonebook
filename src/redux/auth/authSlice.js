import { createSlice } from '@reduxjs/toolkit';

import { register, logIn, logOut, getCurrentUser } from './authOperation';

const initialState = {
    userName: "",
    token: null,
    isLoggedIn: false,
    isAuthLoading: true,
};

const handleLogFullfilled = (state, { payload }) => {
    state.userName = payload.user.name;
    state.token = payload.token;
    state.isLoggedIn = true;
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        userReset(state) {
            state.userName = "";
            state.token = null;
            state.isLoggedIn = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.fulfilled, handleLogFullfilled)
            .addCase(logIn.fulfilled, handleLogFullfilled)
            .addCase(logOut.fulfilled, (state) => {
                state.userName = "";
                state.token = null;
                state.isLoggedIn = false;
            })
            .addCase(getCurrentUser.pending, (state) => {
                state.isAuthLoading = true;
            })
            .addCase(getCurrentUser.fulfilled, (state, {payload}) => {
                state.userName = payload.name;
                state.isLoggedIn = true;
                state.isAuthLoading = false;
            })
            .addCase(getCurrentUser.rejected, (state) => {
                state.isAuthLoading = false;
            })
            .addDefaultCase((state) => state);
    },
});

export const { userReset } = authSlice.actions;
export const authReducer = authSlice.reducer;