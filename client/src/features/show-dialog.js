import {createSlice} from "@reduxjs/toolkit";
const slice = createSlice({
    name: 'showDialog',
    initialState: {
        isOpenLogin: false,
        isOpenRegister: false,
    },
    reducers: {
        showLogin: (state, action) => {
            state.isOpenLogin = true;
            state.isOpenRegister = false;
        },
        closeLogin: (state, action) =>  {
            state.isOpenLogin = false;
        },
        showRegister: (state, action) => {
            state.isOpenRegister = true;
            state.isOpenLogin = false;
        },
        closeRegister: (state, action) =>  {
            state.isOpenRegister = false;
        },
    },
})
export default slice.reducer
export const { showLogin, closeLogin, showRegister, closeRegister } = slice.actions;
