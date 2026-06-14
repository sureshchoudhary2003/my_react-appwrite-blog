import {configureStore} from '@reduxjs/toolkit';
import userReducer from './authSlice';  
import postReducer from './postSlice';

const store = configureStore({
  reducer: {
    auth: userReducer,
    posts: postReducer,
  },
});

export default store;