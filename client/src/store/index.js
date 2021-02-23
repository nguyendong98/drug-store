import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import user from '../features/user';
import alert from '../features/alert';
import showDialog from '../features/show-dialog';
import product from '../features/product';
import feedback from '../features/feedback';
import cart from '../features/cart';
import checkout from '../features/checkout';
import order from '../features/order';
import receipt from '../features/receipt';
const reducer = combineReducers({
    // here we will be adding features
    user,
    alert,
    showDialog,
    product,
    feedback,
    cart,
    checkout,
    order,
    receipt
})
const store = configureStore({
    reducer
})
export default store;
