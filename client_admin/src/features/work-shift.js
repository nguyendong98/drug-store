import {createSlice} from "@reduxjs/toolkit";
import {api} from "../utils/api";
import {setAlert} from "./alert";




const slice = createSlice({
    name: 'workShift',
    initialState: {
        workShift: null,
        workShifts: []
    },
    reducers: {
        getWorkShiftSuccess: (state, action) => {
            state.workShifts = action.payload;
        },
        createWorkShiftSuccess: (state, action) => {
            state.workShifts.push(action.payload);
        },
        deleteWorkShiftSuccess: (state, action) => {
            const index = state.workShifts.findIndex(val => val._id === action.payload);
            if (index !== -1) {
                console.log(index);
                state.workShifts.splice(index, 1);
            }
        }
    }
});
export const {
    getWorkShiftSuccess,
    createWorkShiftSuccess,
    deleteWorkShiftSuccess
} = slice.actions;

export default slice.reducer;



export const getAllWorkShift = () => async dispatch => {
    try {
        const res = await api.get('/time-keeping/work-shift');
        dispatch(getWorkShiftSuccess(res.data));
    } catch (e) {
        throw e;
    }
}
export const createWorkShift = data => async dispatch => {
    try {
        const res = await api.post('/time-keeping/work-shift', data);
        dispatch(createWorkShiftSuccess(res.data));
        dispatch(setAlert(true, 'create work shift success', 'success'));
    } catch (e) {
        throw e;
    }
}
export const deleteWorkShift = id => async dispatch => {
    try {
        await api.delete(`/time-keeping/work-shift/${id}`);
        dispatch(deleteWorkShiftSuccess(id));
        dispatch(setAlert(true, 'Xóa ca trực thành công', 'success'));
    } catch (e) {
        throw e;
    }
}
