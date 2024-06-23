import { configureStore } from '@reduxjs/toolkit';
import userReducer from "./slice"

const store = configureStore({
    reducer: {
        value: userReducer,
    },
})

export default store;

export type RootState = ReturnType<typeof store.getState>;  
export type AppDispatch = typeof store.dispatch;