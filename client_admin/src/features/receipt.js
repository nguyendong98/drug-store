import {createSlice} from "@reduxjs/toolkit";
import {api} from "../utils/api";
import {setAlert} from "./alert";




const slice = createSlice({
    name: 'receipt',
    initialState: {
        warehouse: [],
        orders: []
    },
    reducers: {
        getWarehouseSuccess: (state, action) => {
            state.warehouse = action.payload;
        }
    }
});
export const {
    getWarehouseSuccess
} = slice.actions;

export default slice.reducer;


export const createReceipt = data => async dispatch => {
    try {
        await api.post('/receipt', data);
        dispatch(setAlert(true, 'Create order success!!'));
    } catch (e) {
        throw e;
    }
}

export const getWarehouse = query => async dispatch => {
    try {
        if(query && query['idProduct']) {
            const res = await api.get(`/receipt/warehouse?idProduct=${query['idProduct']}`);
            dispatch(getWarehouseSuccess(res.data));
        } else {
            const res = await api.get(`/receipt/warehouse`);
            dispatch(getWarehouseSuccess(res.data));
        }

    } catch (e) {
        throw e;
    }
}

