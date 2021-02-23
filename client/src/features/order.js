import {createSlice} from "@reduxjs/toolkit";
import {api} from "../utils/api";




const slice = createSlice({
    name: 'order',
    initialState: {
        order: null,
        orders: []
    },
    reducers: {
        getOrderSuccess: (state, action) => {
            state.orders = action.payload;
        },
        createOrderSuccess: (state, action) => {
            // state.order = action.payload;
        },
        getOrderDetailSuccess: (state, action) => {
            state.order = action.payload;
        }
    }
});
export const {
    getOrderSuccess,
    createOrderSuccess,
    getOrderDetailSuccess
} = slice.actions;

export default slice.reducer;


export const getOrder = query => async dispatch => {
    try {
        const res = await api.get(`/order?pageSize=${query.pageSize}&pageNumber=${query.pageNumber}`);
        dispatch(getOrderSuccess(res.data))
    } catch (e) {
        throw e;
    }
}
export const createOrder = (data) => async dispatch => {
   try {
       const res = await api.post('/order', data);
       dispatch(createOrderSuccess(res.data))

       await api.post('/mail', data);
   } catch (e) {
       throw e;
   }
}

export const getOrderDetail = id => async dispatch => {
    try {
        const res = await api.get(`/order/${id}`);
        dispatch(getOrderDetailSuccess(res.data));
    } catch (e) {
        throw e;
    }
}
