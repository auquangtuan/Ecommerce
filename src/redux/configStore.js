import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from './Reducer/userReducer'
import { ProductReducer } from './Reducer/ProductReducer'
import { CartReducer } from "./Reducer/CartReducer";
import { AdminReducer } from "./Reducer/AdminReducer";
export const store = configureStore({
    reducer: {
        userReducer,
        ProductReducer,
        CartReducer,
        AdminReducer
    }
})