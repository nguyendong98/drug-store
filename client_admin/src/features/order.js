import {createSlice} from "@reduxjs/toolkit";
import {api} from "../utils/api";
import {setAlert} from "./alert";




const slice = createSlice({
    name: 'order',
    initialState: {
        order: null,
        orders: []
    },
    reducers: {
        createOrderSuccess: (state, action) => {
            state.orders.result.unshift(action.payload);
        },
        getOrderSuccess: (state, action) => {
            state.orders = action.payload;
        },
        approveOrderSuccess: (state, action) => {
            for (const item of action.payload) {
                const index = state.orders.result.findIndex(val => val._id === item.id);
                if (state.orders.result[index].orderStatus.toString().indexOf('waitingApproved') !== -1) {
                    state.orders.result[index].orderStatus = 'approved'
                }
            }
        },
        getOrderDetailSuccess: (state, action) => {
            state.order = action.payload;
        }
    }
});
export const {
    createOrderSuccess,
    getOrderSuccess,
    approveOrderSuccess,
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

export const createOrder = data => async dispatch => {
    try {
        const res = await api.post('/order/now', data);
        dispatch(createOrderSuccess(res.data));
        dispatch(setAlert(true, 'Create order success!!'));
    } catch (e) {
        throw e;
    }
}
export const approveOrder = data => async dispatch => {
    try {
        await api.put('/order/approve', data);
        dispatch(approveOrderSuccess(data));
        for (const item of data) {
            if (item.orderStatus.toString().indexOf('waitingApproved') !== -1) {
                await api.post('/mail/approve', {email: item.email})
            }
        }
        dispatch(setAlert(true, 'Duyệt đơn hàng thành công', 'success'));

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
