import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const api = "https://fakestoreapi.com/products";

export interface Rating {
    rate: number;
    count: number;
}

export interface Product {
    id: number;
    image: string;
    title: string;
    price: number;
    description: string;
    rating: Rating;
}

interface ProductState {
    products: Product[];
    cart: Product[];
}

const initialState: ProductState = {
    products: [],
    cart: [],
};

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    const response = await axios.get<Product[]>(api);
    return response.data;
});

export const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<Product>) => {
            state.cart.push(action.payload);
        },
        removeFromCart: (state, action: PayloadAction<number>) => {
            state.cart = state.cart.filter(item => item.id !== action.payload);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
            state.products = action.payload;
        });
    }
});

export const { addToCart, removeFromCart } = productSlice.actions;
export default productSlice.reducer;