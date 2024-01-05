import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    error: null,
    loading: false
}

const userSlice = createSlice({
    //set a name
    name: "user",
    initialState,
    reducers: {
    signInStart: (state) =>{
        state.loading = true;
    },
    signInSuccess: (state, action)=>{
        //action is action to take when we receive data
        state.currentUser = action.payload;
        state.loading = false;
        state.error = null;
    },
    signInFailure: (state, action) => {
        state.error = action.payload
        state.loading = false;
    },
    updateUserStart: (state) => {
        state.loading = true;
    },
    updateUserSuccess: (state, action) => {
        state.currentUser = action.payload;
        state.loading = false;
        state.error = null;
    },
    updateUserFailure: (state, action) => {
        state.error = action.payload;
        state.loading = false
    },
    deleteUserStart: (state) => {
        state.loading = true;
    },
    deleteUserSuccess: (state) => {
        state.currentUser = null;
        state.loading = false;
        state.error = null;
    },
    deleteUserFailure: (state) => {
        state.currentUser = null;
        state.loading = false;
        state.error = null;
    }
}})

export const { signInStart, signInSuccess, signInFailure, updateUserStart, updateUserSuccess, updateUserFailure, deleteUserStart, deleteUserFailure, deleteUserSuccess} = userSlice.actions

export default userSlice.reducer