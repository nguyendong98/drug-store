import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import setAuthToken from "../../../../utils/setAuthToken";
import {loadUser} from "../../../../features/user";
import {getStatisticUserByMonth} from "../../../../features/statistical";
import moment from "moment";
import {Pie} from "react-chartjs-2";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Filter1Icon from "@material-ui/icons/Filter1";

import Filter2Icon from "@material-ui/icons/Filter2";
import Filter3Icon from "@material-ui/icons/Filter3";


export const UserStatisticTab = () => {
    const dispatch = useDispatch();
    const [month, setMonth] = useState(`${moment().year()}-${moment(new Date()).format('MM')}`);
    useEffect(() => {
        if (localStorage['x-auth-token']) {
            setAuthToken(localStorage['x-auth-token']);
            dispatch(loadUser());
        }
        dispatch(getStatisticUserByMonth({year: moment().year(), month: moment().month() + 1}));

    }, [dispatch]);
    const userStatistical = useSelector(state => state.statistical.user);
    const split = month.split('-');
    const data = {
        labels: [
            'Nhân viên',
            'Khách hàng',
        ],
        datasets: [{
            data: userStatistical ? [userStatistical[0], userStatistical[1]] : "",
            backgroundColor: [
                '#FF6384',
                '#36A2EB',
            ],
            hoverBackgroundColor: [
                '#FF6384',
                '#36A2EB',
            ]
        }]
    };
    return data && (
        <Grid>
            <Typography variant="h6" color="textSecondary" className="text-center mt-2 mb-8">
                Nhân viên và khách hàng vào {split[1]} - {split[0]}
            </Typography>
            <Grid container spacing={5}>
                <Grid item container xs={4} alignItems="flex-end">
                    <Grid item xs={4}>
                        <Typography variant="subtitle1" className="font-weight-bold">
                            Chọn thời gian
                        </Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <TextField
                            fullWidth
                            id="date"
                            label="Chọn tháng"
                            type="month"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={month}
                            onChange={e => {
                                const value = e.target.value.split('-');
                                setMonth(e.target.value);
                                dispatch(getStatisticUserByMonth({year: value[0], month: value[1]}))
                            }}
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Grid container className="mt-10" alignItems="center">
                <Grid container item xs={6}  justify="center">
                    <Pie data={data} />
                </Grid>
                <Grid item xs={6}>
                    {
                        userStatistical &&
                            <>
                                <div className="flex-row align-items-center justify-content-start">
                                    <Filter1Icon/>
                                    <div className="flex-column ml-3 mb-8">
                                        <Typography variant="subtitle1" className="font-weight-bold">{userStatistical ? String(userStatistical[0]) : '0'}</Typography>
                                        <Typography variant="body2" style={{color: '#808080'}}>Nhân viên</Typography>
                                    </div>
                                </div>
                                <div className="flex-row align-items-center justify-content-start">
                                    <Filter2Icon/>
                                    <div className="flex-column ml-3 mb-8">
                                        <Typography variant="subtitle1" className="font-weight-bold">{userStatistical ? String(userStatistical[1]) : '0'}</Typography>
                                        <Typography variant="body2" style={{color: '#808080'}}>Khách hàng</Typography>
                                    </div>
                                </div>
                                <div className="flex-row align-items-center justify-content-start">
                                    <Filter3Icon/>
                                    <div className="flex-column ml-3">
                                        <Typography variant="subtitle1" className="font-weight-bold">{userStatistical ? String(userStatistical[0] + userStatistical[1]) : '0'}</Typography>
                                        <Typography variant="body2" style={{color: '#808080'}}>Tổng người dùng trong tháng</Typography>
                                    </div>
                                </div>
                            </>



                    }

                </Grid>
            </Grid>

        </Grid>


    )
}
