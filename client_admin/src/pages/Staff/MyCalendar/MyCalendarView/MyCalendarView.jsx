import React from "react";
import Typography from "@material-ui/core/Typography";
import moment from "moment";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";

import {getDateOfISOWeek} from "../../../../utils/func";
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import Chip from "@material-ui/core/Chip";
export const MyCalendarView = ({myCalendar, workShifts}) => {
    const dataWeek = [];
    for(let i = 0; i < 7; i++) {
        dataWeek.push(moment(new Date(getDateOfISOWeek().ISOweekStart)).add(i, 'days'))
    }
    return (
        <>
            <Typography variant="h6" className="text-center font-weight-bold mb-8">
               Lịch làm việc của tôi trong tuần {moment().week()} từ {moment(new Date(getDateOfISOWeek().ISOweekStart)).format('DD/MM/YYYY')} ~ {moment(new Date(getDateOfISOWeek().ISOweekEnd)).format('DD/MM/YYYY')}
            </Typography>
            <Grid container direction="row">
                <Grid item container  xs={2} alignItems="flex-start" >
                </Grid>
                <Grid item xs={10} container direction="row" justify="center" alignItems="flex-start" spacing={3}>
                    {
                        workShifts && workShifts.map((val, i) => (
                            <Grid item container direction="column" key={i} xs className="calendar-item">
                                <Grid item>
                                    <Typography variant="subtitle1" className="font-weight-bold text-center" color="textSecondary">{val.name} -   {val.startTime} ~ {val.endTime} </Typography>
                                </Grid>
                            </Grid>
                        ))
                    }
                </Grid>
            </Grid>
            <Divider light />
            {
                dataWeek && dataWeek.length > 0 && dataWeek.map((val, i) => (
                    <div key={i}>
                        <Grid container  alignItems="center">
                            <Grid item container  xs={2} alignItems="center" style={{minHeight: 120}}>
                                <Typography variant="h6" className="font-weight-bold text-center">{moment(new Date(val)).format('DD/MM/YYYY')}</Typography>
                            </Grid>
                            <Grid item xs={10} container direction="row" justify="center" alignItems="flex-start" spacing={3}>
                                {
                                    workShifts && workShifts.map((value, index) => (
                                        <Grid item container direction="column" key={index} xs className="calendar-item" style={{minHeight: 100}} alignItems="center" justify="center">
                                            {
                                                myCalendar && myCalendar.length > 0 && myCalendar.filter(v1 =>
                                                    moment(new Date(val)).format('DD/MM/YYYY') === moment(new Date(v1.date)).format('DD/MM/YYYY') &&
                                                    v1.idWorkShift === value._id
                                                ).map((v2, i) => (
                                                    <div key={i} className="flex-column align-items-center justify-content-center">
                                                        <DoneOutlineIcon color="primary" className="mb-5"/>
                                                        {
                                                            v2.completed ? <Chip color="primary"  label="Đã hoàn thành" size="small"/>
                                                                : <Chip color="secondary" label="Chưa hoàn thành" size="small"/>
                                                        }

                                                    </div>

                                                ))
                                            }
                                        </Grid>
                                    ))
                                }
                            </Grid>
                        </Grid>
                        <Divider light />
                    </div>




                ))



            }
        </>
    )
}
