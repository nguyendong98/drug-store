import {createSlice} from "@reduxjs/toolkit";
import {api} from '../utils/api';
import {setAlert} from "./alert";
import {closeLogin, closeRegister} from "./show-dialog";
import setToken from "../utils/set-token";
const slice = createSlice({
    name: 'user',
    initialState: {
        token: localStorage.getItem('x-auth-token'),
        isAuthenticated: false,
        loading: true,
        users: [],
        user: null,
    },
    reducers: {
        loginSuccess: (state, action) =>  {
            localStorage.setItem('x-auth-token', action.payload);
            state.isAuthenticated = true;
        },
        userLoaded: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        signOut: (state, action) => {
            localStorage.removeItem('x-auth-token');
            state.isAuthenticated = false;
            state.user = null;
        }
    },
});
export default slice.reducer;
export const { loginSuccess, userLoaded, signOut } = slice.actions;
// Actions
export const loadUser = () => async dispatch => {
    const token = localStorage['x-auth-token'];
    if (token) {
        setToken(token);
    }
    try {
        const res = await api.get('/auth/me');
        dispatch(userLoaded(res.data));
    } catch (e) {
        throw e;
    }
};
export const registerAccount = (data) => async dispatch => {
    try {
        await api.post('/auth/account/sign-up', data);
        dispatch(setAlert(true, 'Register account success', 'success'));
        dispatch(closeRegister());
    } catch (e) {
        dispatch(setAlert(true, 'Register account fail', 'error'));
        return console.log(e.message);
    }
};
export const signIn = (data) => async dispatch => {
    try {
        const res = await api.post('/auth/account/sign-in', data);
        dispatch(setAlert(true, 'Login success, welcome you to DV pharmacy', 'success'));
        dispatch(loginSuccess(res.data.accessToken));
        dispatch(loadUser());
        dispatch(closeLogin());
    } catch (e) {
        dispatch(setAlert(true, 'Login fail', 'error'));
        throw e;
    }
};

export const loginSocial = (data) => async dispatch => {
    try {
        const res = await api.post('auth/account/sign-in/social', data);
        dispatch(setAlert(true, 'Login success, welcome you to DV pharmacy', 'success'));
        dispatch(loginSuccess(res.data.accessToken));
        dispatch(loadUser());
        dispatch(closeLogin());
    } catch (e) {
        dispatch(setAlert(true, 'Login fail', 'error'));
        throw e;
    }
}
