"use client"
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import thunk from "redux-thunk";
import storage from "./storage"
import { persistReducer } from "redux-persist";
import cart from "./cartSlice";


const reducers = combineReducers({ cart });

const config = {
    key: "root",
    storage
};

const reducer = persistReducer(config, reducers);

const store = configureStore({
    reducer: reducer,
    devTools: process.env.NODE_ENV !== "production",
    middleware: [thunk]
});
export default store;