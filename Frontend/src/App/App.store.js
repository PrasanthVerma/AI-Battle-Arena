import {configureStore} from '@reduxjs/toolkit';
import authReducer from '../Features/Auth/auth.slice.js';

const store = configureStore({
    reducer: {
        auth: authReducer
    }
});

export default store;