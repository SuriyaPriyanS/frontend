import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    currentUser: null,
    error: null,
    loading: false,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
       singnStart :(state)=> {
        state.loading = true;
        state.error = null;
       },
       singinSuccess : (state, action)=> {
        state.currentUser = action.payload;
        state.loading = false;
        state.error = null;
       },
       signinFailure : (state, action)=> {
        state.loading = false;
        state.error = action.payload;
            
       },
       updateStart: (state,action)=>{
        state.loading = true;
        state.error = null;
       },
       updateSuccess: (state, action)=>{
        state.currentUser.rest = action.payload;
        state.loading = false;
        state.error = action.payload;
       },
       updateFailure: (state, action)=>{
        state.loading = false;
        state.error = action.payload;
       },
       signOutSuccess: (state)=>{
        state.currentUser = null;
        state.loading = false;
        state.error = null;
       },
       deleteUserStart: (state) => {
        state.loading = true;
        state.error = null;

       },
       deleteUserSuccess: (state) => {
        state.currentUser = null;
        state.loading = false;
        state.error = null;
       },
       deleteUserFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
       }






}})

export const { singnStart, singnSuccess, signinFailure, updateStart, updateSuccess, updateFailure, signOutSuccess, deleteUserStart, deleteUserSuccess, deleteUserFailure } = userSlice.actions;

export default userSlice.reducer;