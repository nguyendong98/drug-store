import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import user from '../features/user';
import alert from '../features/alert';
import order from '../features/order';
import product from '../features/product';
import receipt from '../features/receipt';
import statistical from '../features/statistical';
import workShift from '../features/work-shift';
import calendar from '../features/calendar';
import feedback from '../features/feedback';
const reducer = combineReducers({
    // here we will be adding features
    user,
    alert,
    order,
    product,
    receipt,
    statistical,
    workShift,
    calendar,
    feedback
})
const store = configureStore({
    reducer,
})
export default store;
