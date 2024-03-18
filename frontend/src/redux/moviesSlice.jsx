import { createSlice } from "@reduxjs/toolkit";

const initialState = {}

const moviesSlice = createSlice({
    name:"movies",
    initialState,
    reducers:{
        movieRequest : (state) => {
            state.loading = true;
        },
        movieSuccess : (state,action) => {
            state.loading = false;
            state.movies = action.payload;
        },
        movieFailure : (state) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
})

export const {movieRequest,movieSuccess,movieFailure} = moviesSlice.actions;

export default moviesSlice.reducer;





















