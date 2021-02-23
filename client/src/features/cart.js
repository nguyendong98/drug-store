import {createSlice} from "@reduxjs/toolkit";
import {api} from "../utils/api";




const slice = createSlice({
    name: 'cart',
    initialState: {
        cart: [],
        cartDetail: []
    },
    reducers: {
        getCartDetailSuccess: (state, action) => {
          state.cartDetail = action.payload;
        },
        getCartSuccess: (state , action) => {
            if (sessionStorage.getItem('cart') && sessionStorage.getItem('cart').length > 0) {
                state.cart = JSON.parse(sessionStorage.getItem('cart')) ? JSON.parse(sessionStorage.getItem('cart')) : [] ;
            }
        },
        createCartSuccess: (state, action) => {
            if (sessionStorage.getItem('cart') && sessionStorage.getItem('cart').length > 0) {
                state.cart = JSON.parse(sessionStorage.getItem('cart')) ? JSON.parse(sessionStorage.getItem('cart')) : [] ;
            }
            const index = state.cart.findIndex(val => val.product._id === action.payload._id);
            if (index !== -1) {
                state.cart[index].qty += 1;

            } else {
                state.cart.push({product: action.payload, qty: 1})
            }
            sessionStorage.setItem('cart', JSON.stringify(state.cart));
        },
        removeCartItemSuccess: (state, action) => {
            const index = state.cart.findIndex(val => val.product._id === action.payload);
            if (index !== -1) {
                state.cart.splice(index, 1);
                sessionStorage.setItem('cart', JSON.stringify(state.cart));
                if (state.cartDetail && state.cartDetail.length > 0) {
                    state.cartDetail.splice(index, 1);
                }
            }
            if (state.cart.length === 0) {
                sessionStorage.removeItem('cart');
                sessionStorage.removeItem('checkout');
            }
        },
        updateCart: (state, action) => {
            action.payload.map((val, i) => {
                state.cart[i].qty = val.qty;
                state.cartDetail[i].qty = val.qty;
                return true;
            });
            sessionStorage.setItem('cart', JSON.stringify(state.cart));
        },
        removeCart: (state, action) => {
            state.cart.length = 0;
            sessionStorage.removeItem('cart');
        }

    }
});
export const {
    getCartDetailSuccess,
    createCartSuccess,
    getCartSuccess,
    removeCartItemSuccess,
    updateCart,
    removeCart
} = slice.actions;
export default slice.reducer;
export const getCartDetail = () => async dispatch => {
    const data = [];
    if (sessionStorage.getItem('cart') && sessionStorage.getItem('cart').length > 0) {
        const carts = JSON.parse(sessionStorage.getItem('cart')) ? JSON.parse(sessionStorage.getItem('cart')) : [] ;
        for (const item of carts) {
            try {
                const res = await api.get(`/product/${item.product._id}`);
                const profit = await api.get('/product/profit/list');
                data.push({product: res.data, qty: item.qty, price: res.data['idPrice'].price * (100 + profit.data[0].profit)/100});
            } catch (e) {
                return ;
            }
        }
        dispatch(getCartDetailSuccess(data));
    }
}
