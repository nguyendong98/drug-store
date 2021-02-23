import React from "react";
import moment from "moment";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Brightness1TwoToneIcon from "@material-ui/icons/Brightness1TwoTone";
import CheckBoxTwoToneIcon from "@material-ui/icons/CheckBoxTwoTone";
import CheckBoxOutlineBlankTwoToneIcon from "@material-ui/icons/CheckBoxOutlineBlankTwoTone";

export const CalendarTableByMonth = ({workShifts, calendars, typeTable,  month}) => {
    const y = Number(month[0]);
    const m = Number(month[1]);
    const daysInMonth = new Date(y,m,1,-1).getDate();
    const firstDay = new Date(y, m - 1, 1);
    console.log(firstDay);
    const dataMonth = [];
    for (let i=0; i<daysInMonth; i++) {
        dataMonth.push(moment(new Date(firstDay)).add(i, 'days'))
    }
    console.log(dataMonth);

    return typeTable === 3 && (
        <>
            <Typography variant="h6" className="text-center font-weight-bold mb-8">
                Lịch làm việc vào tháng {moment(new Date(firstDay)).format('MM/YYYY')}
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
                dataMonth && dataMonth.length > 0 && dataMonth.map((val, i) => (
                    <div key={i}>
                        <Grid container  alignItems="center">
                            <Grid item container  xs={2} alignItems="center" style={{minHeight: 160}}>
                                <Typography variant="h6" className="font-weight-bold text-center">{moment(new Date(val)).format('DD/MM/YYYY')}</Typography>
                            </Grid>
                            <Grid item xs={10} container direction="row" justify="center" alignItems="flex-start" spacing={3}>
                                {
                                    workShifts && workShifts.map((value, index) => (
                                        <Grid item container direction="column" key={index} xs className="calendar-item" style={{minHeight: 160}}>
                                            {
                                                calendars && calendars.length > 0 && calendars.filter(v1 =>
                                                    moment(new Date(val)).format('DD/MM/YYYY') === moment(new Date(v1.date)).format('DD/MM/YYYY') &&
                                                    v1.idWorkShift ? v1.idWorkShift._id === value._id : ''
                                                ).map((v2, i) => (

                                                    <Grid container key={i}  alignItems="center" justify="space-between">
                                                        <div className="flex-row align-items-center">
                                                            <Brightness1TwoToneIcon />
                                                            <Typography  variant="subtitle1" className="ml-1 my-2">
                                                                {v2.idStaff.fullName}
                                                            </Typography>
                                                        </div>

                                                        {
                                                            v2.completed === true ? <CheckBoxTwoToneIcon color="primary"/> : <CheckBoxOutlineBlankTwoToneIcon color="error"/>
                                                        }

                                                    </Grid>
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
