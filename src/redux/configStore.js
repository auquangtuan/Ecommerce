import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from './Reducer/userReducer'
import { ProductReducer } from './Reducer/ProductReducer'
import { CartReducer } from "./Reducer/CartReducer";
export const store = configureStore({
    reducer: {
        userReducer,
        ProductReducer,
        CartReducer,
    }
})