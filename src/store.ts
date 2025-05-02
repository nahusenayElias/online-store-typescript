import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import productsReducer from "./features/productSlice";

export const store = configureStore({
    reducer:{
        products: productsReducer
    },
})

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
     ReturnType,
     RootState,
     unknown,
     Action<string>
     >;


