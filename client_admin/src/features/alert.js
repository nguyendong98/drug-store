import {createSlice} from "@reduxjs/toolkit";
const slice = createSlice({
    name: 'alert',
    initialState: {
        open: false,
        message: null,
        type: null
    },
    reducers: {
        showAlert: (state, action) => {
            state.open = true;
            state.message = action.payload.message;
            state.type = action.payload.type;
        },
        closeAlert: (state, action) => {
            state.open = false;
        }
    },
})
export default slice.reducer
export const  { showAlert, closeAlert } = slice.actions;

// Actions
export const setAlert = (open, message, type) => dispatch => {
    dispatch(showAlert({open, message, type}));
}
