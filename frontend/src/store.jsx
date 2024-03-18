import { configureStore } from "@reduxjs/toolkit";
import moviesSlice from "./redux/moviesSlice";

const store = configureStore({
    reducer:{
      imdbMovies:moviesSlice
    }
})
export default store;