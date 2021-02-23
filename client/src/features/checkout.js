import {createSlice} from "@reduxjs/toolkit";




const slice = createSlice({
    name: 'checkout',
    initialState: {
        checkout: null
    },
    reducers: {
        getCheckout: (state , action) => {
            if (sessionStorage.getItem('checkout')) {
                state.checkout = JSON.parse(sessionStorage.getItem('checkout')) ? JSON.parse(sessionStorage.getItem('checkout')) : null ;
            }
        },
        updateCheckout: (state, action) => {
            state.checkout = action.payload;
            sessionStorage.setItem('checkout', JSON.stringify(state.checkout));
        },
        removeCheckout: (state, action) => {
            state.checkout = null;
            sessionStorage.removeItem('checkout')
        }
    }
});
export const {
    getCheckout,
    updateCheckout
} = slice.actions;
export default slice.reducer;

