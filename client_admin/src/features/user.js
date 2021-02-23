import {createSlice} from "@reduxjs/toolkit";
import {api} from '../utils/api';
import {setAlert} from "./alert";
import setAuthToken from "../utils/setAuthToken";
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
        getUserSuccess: (state, action) => {
            state.users = action.payload;
        },
        loginSuccess: (state, action) =>  {
            state.loading = false;
            localStorage.setItem('x-auth-token', action.payload);
            state.isAuthenticated = true;
        },
        userLoaded: (state, action) => {
            state.isAuthenticated = true;
            state.loading = false;
            state.user = action.payload;
        },
        createStaffAccountSuccess: (state, action) => {
          state.users.result.unshift(action.payload);
        },
        signOut: (state, action) => {
            localStorage.removeItem('x-auth-token');
            localStorage.removeItem('checkout');
            state.isAuthenticated = false;
            state.user = null;
            state.token = null;
        }
    },
});
export default slice.reducer;
export const {
    loginSuccess,
    userLoaded,
    signOut,
    getUserSuccess,
    createStaffAccountSuccess
} = slice.actions;
// Actions
export const loadUser = () => async dispatch => {
    const token = localStorage['x-auth-token'];
    if (token) {
        setAuthToken(token);
    }
    try {
        const res = await api.get('auth/me');
        dispatch(userLoaded(res.data));
    } catch (e) {
        throw e;
    }
};
export const createStaffAccount = (data) => async dispatch => {
    try {
        const res = await api.post('/auth/account/staff', data);
        dispatch(setAlert(true, 'create staff account success', 'success'));
        dispatch(createStaffAccountSuccess(res.data.account));
    } catch (e) {
        dispatch(setAlert(true, 'create account fail', 'error'));
        return console.log(e.message);
    }
};
export const signIn = (data, history) => async dispatch => {
    try {
        const res = await api.post('/auth/account/sign-in', data);
        dispatch(setAlert(true, 'Login success, welcome you!!!!!!', 'success'));
        dispatch(loginSuccess(res.data.accessToken));
        dispatch(loadUser());
        history.push('/app/dashboard');
    } catch (e) {
        dispatch(setAlert(true, 'Login fail', 'error'));
        throw e;
    }
};
export const getAllUser = query => async dispatch => {
    try {
        if (!query.idRole) {
            const res = await api.get(`/auth/account?pageSize=${query.pageSize}&pageNumber=${query.pageNumber}`);
            dispatch(getUserSuccess(res.data));
        }
        const res = await api.get(`/auth/account?idRole=${query.idRole}&pageSize=${query.pageSize}&pageNumber=${query.pageNumber}`);
        dispatch(getUserSuccess(res.data));
    } catch (e) {
        return ;
    }
}

