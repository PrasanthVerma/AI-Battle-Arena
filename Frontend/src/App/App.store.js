import {configureStore} from '@reduxjs/toolkit';
import authReducer from '../Features/Auth/auth.slice.js';
import arenaReducer from '../Features/Arena/arena.slice.js'

const store = configureStore({
    reducer: {
        auth: authReducer,
        arena: arenaReducer,
    }
});

export default store;