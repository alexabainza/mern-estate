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
    }
    
}})

export const { signInStart, signInSuccess, signInFailure } = userSlice.actions

export default userSlice.reducer