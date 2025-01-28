
import {configureStore} from "@reduxjs/toolkit";
import productsReducer from "../features/products/productSlice"
import themeReducer from "../features/theme/themeSlice"
export const store = configureStore({
    reducer:{
        products:productsReducer,
        theme:themeReducer
    }
})