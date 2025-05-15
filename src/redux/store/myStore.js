import { combineReducers, configureStore } from "@reduxjs/toolkit";
import favReducer from '../slice/favitems'
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import AsyncStorage from '@react-native-async-storage/async-storage';
import productsReducer from "../slice/products";
import cartItemsReducer from '../slice/myCart'

const rootReducer=combineReducers({
    favs:favReducer,
    products:productsReducer,
    cartItems:cartItemsReducer
});

const persistConfig = {
  key: 'root',
  storage:AsyncStorage,
}

const persistedReducer=persistReducer(persistConfig,rootReducer);

export const mystore=configureStore(
    {
        reducer:persistedReducer,
        middleware:getDefaultMiddleware=>getDefaultMiddleware({serializableCheck:false})
    }
);

export const persistedStore=persistStore(mystore);

