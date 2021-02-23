import React from "react";
import "./CalendarTableByDate.scss";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Brightness1TwoToneIcon from "@material-ui/icons/Brightness1TwoTone";
import CheckBoxTwoToneIcon from "@material-ui/icons/CheckBoxTwoTone";
import CheckBoxOutlineBlankTwoToneIcon from "@material-ui/icons/CheckBoxOutlineBlankTwoTone";
import moment from "moment";

export const CalendarTableByDate = ({workShifts, calendars, typeTable}) => {
    return typeTable === 1 && (
        <>
            <Typography variant="h6" className="text-center font-weight-bold mb-8">
                Lịch làm việc vào {moment(new Date()).format('dddd DD/MM/yyyy')}
            </Typography>
            <Grid container direction="row">
                <Grid item container  xs={2} alignItems="center" >
                    <Typography variant="h6" className="font-weight-bold">Ca làm việc</Typography>
                </Grid>
                <Grid item xs={9} container direction="row" justify="center" alignItems="flex-start" spacing={3}>
                    {
                        workShifts && workShifts.map((val, i) => (
                            <Grid item container direction="column" key={i} xs className="calendar-item" style={{minHeight: 160}}>
                                <Grid item>
                                    <Typography variant="subtitle1" className="font-weight-bold text-center" color="textSecondary">{val.name} -   {val.startTime} ~ {val.endTime} </Typography>
                                </Grid>
                                <Divider light />
                                {
                                    <Grid item>
                                        {
                                            calendars && calendars.filter(value => val._id === value.idWorkShift).map((cal, index) => (
                                                <Grid container key={index}  alignItems="center" justify="space-between" >
                                                    <div className="flex-row align-items-center">
                                                        <Brightness1TwoToneIcon />
                                                        <Typography  variant="subtitle1" className="ml-1 my-2">
                                                            {cal.idStaff.fullName}
                                                        </Typography>
                                                    </div>

                                                    {
                                                        cal.completed === true ? <CheckBoxTwoToneIcon color="primary"/> : <CheckBoxOutlineBlankTwoToneIcon color="error"/>
                                                    }

                                                </Grid>

                                            ))
                                        }
                                    </Grid>
                                }
                            </Grid>
                        ))
                    }
                </Grid>
            </Grid>
        </>
    )
}
