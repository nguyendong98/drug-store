import {createSlice} from "@reduxjs/toolkit";
import {api} from "../utils/api";
import {setAlert} from "./alert";
import {getSalarySuccess, updateSalarySuccess} from "./calendar";

const slice = createSlice({
    name: 'product',
    initialState: {
        productDetail: null,
        productTree: [],
        loading: true,
        products: [],
        productCategoryGroup: [],
        productCategory: [],
        categoryCurrent: null,
        listProduct: [],
        profit: null
    },
    reducers: {
        getAllProductCategoryGroupSuccess: (state, action) =>  {
            state.loading = false;
            state.productCategoryGroup = action.payload;
        },
        getProductCategorySuccess: (state, action) => {
            state.loading = false;
            state.productCategory = action.payload;
        },
        getProductTreeSuccess: (state, action) => {
            state.productTree = action.payload;
        },
        getProductSuccess: (state, action) => {
            state.products = action.payload;
        },
        getCategoryCurrentSuccess: (state, action) => {
            state.categoryCurrent = action.payload;
        },
        removeCategoryCurrent: (state, action) => {
            state.categoryCurrent = null;
        },
        getProductDetailSuccess: (state, action) => {
            state.productDetail = action.payload;
        },
        getListProductSuccess: (state, action) => {
            state.listProduct = action.payload;
        },
        getProfitSuccess: (state, action) => {
            state.profit = action.payload[0];
        },
        updateProfitSuccess: (state, action) => {
            state.profit = action.payload;
        }

    }
});
export default slice.reducer;
export const {
    getProductSuccess,
    getListProductSuccess,
    getProfitSuccess,
    updateProfitSuccess
} = slice.actions;

// Actions

export const getListProduct = query => async dispatch => {
    try {
        if (!query.keyword) {
            query.keyword = "";
        }
        if (!query.category) {
            const res = await api.get(`/product?keyword=${query.keyword}&pageSize=${query.pageSize}&pageNumber=${query.pageNumber}`);
            dispatch(getListProductSuccess(res.data));
            return ;
        }
        const res = await api.get(`/product?category=${query.category}&pageSize=${query.pageSize}&pageNumber=${query.pageNumber}`);
        dispatch(getProductSuccess(res.data));
    } catch (e) {
        throw e;
    }
}
export const getProduct = query => async dispatch => {
    try {
        if (!query.keyword) {
            query.keyword = "";
        }
        if (!query.category) {
            const res = await api.get(`/product?keyword=${query.keyword}&pageSize=${query.pageSize}&pageNumber=${query.pageNumber}`);
            dispatch(getProductSuccess(res.data));
            return ;
        }
        const res = await api.get(`/product?category=${query.category}&pageSize=${query.pageSize}&pageNumber=${query.pageNumber}`);
        dispatch(getProductSuccess(res.data));
    } catch (e) {
        throw e;
    }
}

export const  getProfit = () => async dispatch => {
    try {
        const res = await api.get('/product/profit/list');
        dispatch(getProfitSuccess(res.data));
    } catch (e) {
        throw e;
    }
}
export const updateProfit = (id, data) => async dispatch => {
    try {
        const res = await api.put(`/product/profit/${id}`, data);
        dispatch(updateProfitSuccess(res.data));
        dispatch(setAlert(true, 'update profit success!!'));
    } catch (e) {
        throw e;
    }
}
