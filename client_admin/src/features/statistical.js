import {createSlice} from "@reduxjs/toolkit";
import {api} from "../utils/api";




const slice = createSlice({
    name: 'statistical',
    initialState: {
        revenue: null,
        user: []
    },
    reducers: {
        getStatisticSuccess: (state, action) => {
            state.revenue = action.payload;
        },
        getStatisticUserByMonthSuccess: (state, action) => {
            state.user = action.payload;
        }
    }
});
export const {
    getStatisticSuccess,
    getStatisticUserByMonthSuccess
} = slice.actions;

export default slice.reducer;




export const getStatistical = query => async dispatch => {
    try {
        if(query && query.year) {
            const res = await api.get(`/statistical/revenue?year=${query.year}`);
            dispatch(getStatisticSuccess(res.data));
        } else {
            const res = await api.get(`/statistical/revenue`);
            dispatch(getStatisticSuccess(res.data));
        }

    } catch (e) {
        throw e;
    }
}
export const getStatisticalByDay = query => async dispatch => {
    try {
        const res = await api.get(`/statistical/revenue/date?from=${new Date(query[0])}&to=${new Date(query[1])}`);
        dispatch(getStatisticSuccess(res.data));
    } catch (e) {
        throw e;
    }
}

export const getStatisticUserByMonth = query => async dispatch => {
    try {
        const res = await api.get(`/statistical/user?year=${query.year}&month=${query.month}`);
        dispatch(getStatisticUserByMonthSuccess(res.data));
    } catch (e) {
        throw e;
    }
}
