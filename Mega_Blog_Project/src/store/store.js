import {configureStore} from '@reduxjs/toolkit' 
import authSlice from './authSlice'
const store = configureStore({
    reducer:{
     auth:authSlice,
    //  todo: add more slices here for posts
    }
});

export default store;

// iske baad ek aur store banana hai auth ke liye