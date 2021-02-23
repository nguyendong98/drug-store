import {createSlice} from "@reduxjs/toolkit";
import {api} from "../utils/api";




const slice = createSlice({
    name: 'receipt',
    initialState: {
        warehouse: [],
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

