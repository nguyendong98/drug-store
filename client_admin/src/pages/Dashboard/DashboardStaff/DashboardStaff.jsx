import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {confirmCalendar, getCalendarOfStaff} from "../../../features/calendar";
import moment from "moment";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Brightness1TwoToneIcon from "@material-ui/icons/Brightness1TwoTone";
import Paper from "@material-ui/core/Paper";
import AddAlarmIcon from '@material-ui/icons/AddAlarm';
import 'moment/locale/vi';
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";

export const DashBoardStaff = ({user}) => {
    const dispatch = useDispatch();
    useEffect(() => {
        if (user && user._id) {
            dispatch(getCalendarOfStaff(user._id));
        }
    }, [dispatch, user, user._id]);
    const myCalendar = useSelector(state => state.calendar.myCalendar);
    const myCalendarToDate = myCalendar.filter(val => moment(new Date()).format('DD/MM/YYYY') === moment(val.date).format('DD/MM/YYYY') && val.idWorkShift);
    return (
        <>
            <Grid className="px-12 mt-10" >
                <Typography variant="h6" color="textSecondary" gutterBottom>
                    Chào mừng {user.fullName} đến với DV Pharmacy
                </Typography>
                <Grid container alignItems="center">
                    <Brightness1TwoToneIcon />
                    <Typography  variant="subtitle1" className="ml-1">
                        Bạn có {myCalendarToDate.length} ca trực trong ngày hôm nay!!
                    </Typography>
                </Grid>
                <Grid container spacing={5} className="mt-5" justify="flex-start">
                    {
                        myCalendarToDate.map((val, i) => (
                            <Grid key={i} item xs={5}>
                                {
                                    val.idWorkShift && val.idWorkShift.startTime && val.idWorkShift.endTime &&
                                    <Paper elevation={3}  className={
                                        moment(new Date()).format('LT') >= val.idWorkShift.startTime &&
                                        moment(new Date()).format('LT') <= val.idWorkShift.endTime ?
                                            'px-5 py-5 revenue-card' : 'px-5 py-5 feedback-card'
                                    } >
                                        <Grid container justify="space-between" alignItems="center">
                                            <Typography variant="h6" className="color-white">{val.idWorkShift.name}</Typography>
                                            <AddAlarmIcon className={
                                                moment(new Date()).format('LT') >= val.idWorkShift.startTime &&
                                                moment(new Date()).format('LT') <= val.idWorkShift.endTime ?
                                                    'animate__animated animate__swing animate__infinite infinite color-blue' :
                                                    'color-white'
                                            }/>
                                        </Grid>
                                        <Typography variant="h6" className="mt-3 color-white">
                                            Bắt đầu: {val.idWorkShift.startTime} ~~ Kết thúc: {val.idWorkShift.endTime}
                                        </Typography>
                                        <Grid container className="mt-5" justify="space-between">
                                            {
                                                moment(new Date()).format('LT') >= val.idWorkShift.startTime &&
                                                moment(new Date()).format('LT') <= val.idWorkShift.endTime ?
                                                    <Typography variant="subtitle1" className="color-blue font-weight-bold">
                                                        Bạn đang trong ca trực
                                                    </Typography> :
                                                    <Typography variant="subtitle1" color="error" className="font-weight-bold">
                                                        Chưa đến thời gian ca trực
                                                    </Typography>
                                            }

                                            {
                                                val.completed
                                                    ? <Chip color="primary"  label="Đã xác nhận ca trực" size="small"/>
                                                    : <Chip color="secondary" label="Chưa xác nhận" size="small"/>
                                            }



                                        </Grid>
                                        <Button disabled={
                                            moment(new Date()).format('LT') >= val.idWorkShift.startTime &&
                                            moment(new Date()).format('LT') <= val.idWorkShift.endTime &&
                                            val.completed === false ? false : true
                                        }
                                                onClick={() => dispatch(confirmCalendar({
                                                    idStaff: val.idStaff,
                                                    idWorkShift: val.idWorkShift._id,
                                                    date: val.date
                                                }))}
                                                className="mt-5" type="button" variant="contained" color="inherit">Xác nhận ca trực
                                        </Button>
                                    </Paper>

                                }

                            </Grid>
                        ))
                    }

                </Grid>
            </Grid>
        </>

    )
}
