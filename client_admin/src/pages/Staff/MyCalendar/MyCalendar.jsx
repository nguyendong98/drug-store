import React, {useEffect} from "react";
import {Header} from "../../../components/Header/Header";
import {Sidebar} from "../../../components/Sidebar/Sidebar";
import {useDispatch, useSelector} from "react-redux";
import setAuthToken from "../../../utils/setAuthToken";
import {loadUser} from "../../../features/user";
import {makeStyles} from "@material-ui/core/styles";
import {MyCalendarView} from "./MyCalendarView/MyCalendarView";
import {getCalendar} from "../../../features/calendar";
import {getDateOfISOWeek} from "../../../utils/func";
import {getAllWorkShift} from "../../../features/work-shift";

const useStyles = makeStyles((theme) => ({
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar
    }
}));
export const MyCalendar = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        if (localStorage['x-auth-token']) {
            setAuthToken(localStorage['x-auth-token']);
            dispatch(loadUser());
            dispatch(getAllWorkShift());
            dispatch(getCalendar({
                weekFromDate: new Date(getDateOfISOWeek().ISOweekStart),
                weekToDate: new Date(getDateOfISOWeek().ISOweekEnd)
            }));
        }
    }, [dispatch]);

    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };
    const calendars = useSelector(state => state.calendar.calendars);
    const user = useSelector(state => state.user.user);
    const workShifts = useSelector(state => state.workShift.workShifts);

    const myCalendar = calendars.filter(val => val.idStaff._id === user._id && val.idWorkShift);
    return (
        <div className="flex-row">
            <Header handleDrawerOpen={handleDrawerOpen} open={open}/>
            <Sidebar handleDrawerClose={handleDrawerClose} open={open} />
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <MyCalendarView myCalendar={myCalendar} workShifts={workShifts}/>
            </main>
        </div>
    )
}
