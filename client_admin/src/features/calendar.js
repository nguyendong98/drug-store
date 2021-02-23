import {createSlice} from "@reduxjs/toolkit";
import {api} from "../utils/api";
import {setAlert} from "./alert";
import moment from "moment";




const slice = createSlice({
    name: 'calendar',
    initialState: {
        calendar: null,
        calendars: [],
        myCalendar: [],
        salary: null,
    },
    reducers: {
        getCalendarSuccess: (state, action) => {
            state.calendars = action.payload;
        },
        createCalendarSuccess: (state, action) => {
            for (const item of action.payload) {
                if (moment(item.date).format('DD/MM/YYYY') === moment(new Date()).format('DD/MM/YYYY')) {
                    state.calendars.push(item);
                }
            }
        },
        getCalendarOfStaffSuccess: (state, action) => {
            state.myCalendar = action.payload;
        },
        confirmCalendarSuccess: (state, action) => {
            const index = state.myCalendar.findIndex(val => val._id === action.payload._id);
            if (index !== -1) {
                state.myCalendar[index].completed = true;
            }
        },
        getSalarySuccess: (state, action) => {
            state.salary = action.payload[0];
        },
        updateSalarySuccess: (state, action) => {
            state.salary = action.payload;
        }


    }
});
export const {
    getCalendarSuccess,
    createCalendarSuccess,
    getCalendarOfStaffSuccess,
    confirmCalendarSuccess,
    getSalarySuccess,
    updateSalarySuccess
} = slice.actions;

export default slice.reducer;



export const getCalendar = query => async dispatch => {
    try {
        if (query && query.date) {
            const res = await api.get(`/time-keeping/calendar?date=${new Date(query.date)}`);
            dispatch(getCalendarSuccess(res.data));
        }
        else if (query && query.weekFromDate && query.weekToDate) {
            const res = await api.get(`/time-keeping/calendar?weekFromDate=${new Date(query.weekFromDate)}&weekToDate=${new Date(query.weekToDate)}`)
            dispatch(getCalendarSuccess(res.data));
        }
        else if (query && query.year && query.month) {
            const res = await api.get(`/time-keeping/calendar?year=${query.year}&month=${query.month}`);
            console.log(res.data);
            dispatch(getCalendarSuccess(res.data));

        } else {
            const res = await api.get(`/time-keeping/calendar`);
            dispatch(getCalendarSuccess(res.data));
        }

    } catch (e) {
        throw e;
    }
}
export const createCalendar = data => async dispatch => {
    try {
        const res = await api.post('/time-keeping/calendar', data);
        dispatch(createCalendarSuccess(res.data));
        dispatch(setAlert(true, 'create calendar success', 'success'));

    } catch (e) {
        dispatch(setAlert(true, 'create calendar fail', 'error'))
        throw e;
    }
}

export const getCalendarOfStaff = id => async dispatch => {
    try {
        const res = await api.get(`/time-keeping/calendar/${id}`);
        dispatch(getCalendarOfStaffSuccess(res.data));
    } catch (e) {
        throw e;
    }
}

export const confirmCalendar = data => async dispatch => {
    try {
        const res = await api.put('/time-keeping/calendar/confirm', data)
        dispatch(confirmCalendarSuccess(res.data));
        dispatch(setAlert(true, 'confirm work shift success'));
    } catch (e) {
        throw e;
    }
}
export const  getSalary = () => async dispatch => {
    try {
        const res = await api.get('/time-keeping/salary');
        dispatch(getSalarySuccess(res.data));
    } catch (e) {
        throw e;
    }
}
export const updateSalary = (id, data) => async dispatch => {
    try {
        const res = await api.put(`/time-keeping/salary/${id}`, data);
        dispatch(updateSalarySuccess(res.data));
        dispatch(setAlert(true, 'update salary success!!'));
    } catch (e) {
        throw e;
    }
}
