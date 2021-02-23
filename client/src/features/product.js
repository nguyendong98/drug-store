import {createSlice} from "@reduxjs/toolkit";
import {api} from "../utils/api";

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
        getProfitSuccess: (state, action) => {
            state.profit = action.payload[0];
        },
    },
});
export default slice.reducer;
export const {
    getAllProductCategoryGroupSuccess,
    getProductCategorySuccess,
    getProductTreeSuccess,
    getProductSuccess,
    getCategoryCurrentSuccess,
    getProductDetailSuccess,
    removeCategoryCurrent,
    getProfitSuccess
    } = slice.actions;

// Actions
export const getAllProductCategoryGroup = () => async dispatch => {
    try {
        const res = await api.get('/product/category-group');
        dispatch(getAllProductCategoryGroupSuccess(res.data));
    } catch (e) {
        throw e;
    }
}
export const getProductCategory = query => async dispatch => {
    try {
        if (query) {
            const res = await api.get(`/product/category?group-id=${query['group-id']}`);
            dispatch(getProductCategorySuccess(res.data));
        } else {
            const res = await api.get(`/product/category`);
            dispatch(getProductCategorySuccess(res.data));
        }
    } catch (e) {
        throw e;
    }
}
export const getProductTree = () => async dispatch => {
    try {
        const res = await api.get('/product/category-group/tree');
        dispatch(getProductTreeSuccess(res.data));
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
export const getCategoryCurrent = id => async dispatch => {
    try {
        const res = await api.get(`/product/category/${id}`);
        dispatch(getCategoryCurrentSuccess(res.data));
    } catch (e) {
        throw e;
    }
}
export const getProductDetail = id => async dispatch => {
    try {
        const res = await api.get(`product/${id}`);
        dispatch(getProductDetailSuccess(res.data));
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
