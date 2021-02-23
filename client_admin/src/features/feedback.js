import {createSlice} from "@reduxjs/toolkit";
import {api} from "../utils/api";
import {setAlert} from "./alert";

const slice = createSlice({
    name: 'feedback',
    initialState: {
        feedBacks: [],
    },
    reducers: {
        getAllFeedbackSuccess: (state, action) =>  {
            state.feedBacks = action.payload;
        },
        commentSuccess: (state, action) => {
            state.feedBacks.result.unshift(action.payload);
        }
    },
});
export default slice.reducer;
export const {
    getAllFeedbackSuccess,
    commentSuccess
} = slice.actions;

// Actions
export const getAllFeedBack = (query) => async dispatch => {
    try {
        if (query && query.product) {
            const res = await api.get(`/feedback?product=${query.product}&pageSize=${query.pageSize}&pageNumber=${query.pageNumber}`);
            dispatch(getAllFeedbackSuccess(res.data));
        } else {
            const res = await api.get(`/feedback?pageSize=${query.pageSize}&pageNumber=${query.pageNumber}` );
            dispatch(getAllFeedbackSuccess(res.data));
        }
    } catch (e) {
        throw e;
    }
}
export const createComment = (data) => async dispatch => {
    try {
        const res = await api.post(`/feedback`, data);
        dispatch(commentSuccess(res.data));
        dispatch(setAlert(true, 'Tks for feedback', 'success'));
    } catch (e) {

    }
}

