import React, {useEffect, useState} from "react";
import "./RevenueStatisticTab.scss";
import {useDispatch, useSelector} from "react-redux";
import {getStatistical, getStatisticalByDay} from "../../../../features/statistical";
import setAuthToken from "../../../../utils/setAuthToken";
import {loadUser} from "../../../../features/user";
import { Line } from "react-chartjs-2";
import Grid from "@material-ui/core/Grid";
import Filter1Icon from '@material-ui/icons/Filter1';
import Filter2Icon from '@material-ui/icons/Filter2';
import Filter3Icon from '@material-ui/icons/Filter3';
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import DateTimeRangePicker from '@wojtekmaj/react-datetimerange-picker';
import moment from "moment";


export const RevenueStatisticTab = () => {
    const dispatch = useDispatch();
    const [typeSearch, setTypeSearch] = useState(1);
    const [value, setValue] = useState([new Date(), new Date()]);
    const [byDate, setByDate] = useState(false);

    useEffect(() => {
        if (localStorage['x-auth-token']) {
            setAuthToken(localStorage['x-auth-token']);
            dispatch(loadUser());
        }
        dispatch(getStatistical());

    }, [dispatch]);

    const revenue = useSelector(state => state.statistical.revenue);
    const labelMonth = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const lineChart = revenue ? (
        <Line
            height={80}
            data={{
                labels: !byDate ? labelMonth.map(val => val) : revenue.statistical.map(val => val.label),
                datasets: [{
                    data: revenue.statistical.map(val => val.revenue),
                    label: 'Doanh thu',
                    borderColor: '#7BC5AE',
                    fill: true
                }, {
                    data: revenue.statistical.map(val => val.capital),
                    label: 'Tổng vốn',
                    borderColor: 'red',
                    fill: true,
                }],
            }}
            options={{
                legend: { display: true },
                title: {
                    display: true,
                    text: !byDate ?`Doanh thu và tổng vốn vào các tháng của năm ${revenue.year}` :
                        `Doanh thu và tổng vốn từ ${moment(new Date(value[0])).format('DD/MM/YYYY')} đến ${moment(new Date(value[1])).format('DD/MM/YYYY')}`
                }
            }}

        />
    ) : null
    return revenue && (
        <>
            <Grid container spacing={5}>
                <Grid item container xs={4} alignItems="flex-end">
                    <Grid item xs={4}>
                        <Typography variant="subtitle1" className="font-weight-bold">
                            Loại thời gian
                        </Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <FormControl fullWidth>
                            <Select
                                labelId="demo-controlled-open-select-label"
                                id="demo-controlled-open-select"
                                onChange={async e => {
                                    setTypeSearch(e.target.value);
                                }}
                                defaultValue={1}
                            >

                                <MenuItem value={1} >Báo cáo theo năm</MenuItem>
                                <MenuItem value={2} >Báo cáo theo ngày</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                {
                    typeSearch === 1 ? (
                        <Grid item container xs={4} alignItems="flex-end">
                            <Grid item xs={4}>
                                <Typography variant="subtitle1" className="font-weight-bold">
                                    Năm
                                </Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <FormControl fullWidth>
                                    <Select
                                        labelId="demo-controlled-open-select-label"
                                        id="demo-controlled-open-select"
                                        onChange={e => {
                                            dispatch(getStatistical({year: e.target.value}))
                                        }}
                                        defaultValue={Number(new Date().getFullYear())}
                                    >
                                        <MenuItem  value={2016} >2016</MenuItem>
                                        <MenuItem  value={2017} >2017</MenuItem>
                                        <MenuItem  value={2018} >2018</MenuItem>
                                        <MenuItem  value={2019} >2019</MenuItem>
                                        <MenuItem  value={2020} >2020</MenuItem>
                                        <MenuItem  value={2021} >2021</MenuItem>
                                        <MenuItem  value={2022} >2022</MenuItem>
                                        <MenuItem  value={2023} >2023</MenuItem>


                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    ) : (
                        <Grid item container xs={6} alignItems="flex-end">
                            <Grid item xs={3}>
                                <Typography variant="subtitle1" className="font-weight-bold">
                                    Từ ngày đến ngày
                                </Typography>
                            </Grid>
                            <Grid item xs={9}>
                                <DateTimeRangePicker
                                    className="ml-10"
                                    onChange={e => {
                                        setValue(e);
                                        setByDate(true);
                                        dispatch(getStatisticalByDay(e))
                                    }}
                                    value={value}
                                />
                            </Grid>
                        </Grid>


                    )
                }
            </Grid>
            <Grid container className="my-8">
                <Grid item xs={4}>
                    <div className="flex-row align-items-center justify-content-center">
                        <Filter1Icon />
                        <div className="flex-column ml-3">
                            <Typography variant="subtitle1" className="font-weight-bold">{revenue.totalRevenue.toLocaleString()}</Typography>
                            <Typography variant="body2" style={{color: '#808080'}}>Doanh thu</Typography>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={4}>
                    <div className="flex-row align-items-center justify-content-center">
                        <Filter2Icon/>
                        <div className="flex-column ml-3">
                            <Typography variant="subtitle1" className="font-weight-bold">{revenue.totalCapital.toLocaleString()}</Typography>
                            <Typography variant="body2" style={{color: '#808080'}}>Tổng vốn</Typography>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={4}>
                    <div className="flex-row align-items-center justify-content-center">
                        <Filter3Icon />
                        <div className="flex-column ml-3">
                            <Typography variant="subtitle1" className="font-weight-bold">{(revenue.totalRevenue - revenue.totalCapital).toLocaleString()}</Typography>
                            <Typography variant="body2" style={{color: '#808080'}}>Lợi nhuận</Typography>
                        </div>
                    </div>
                </Grid>
            </Grid>
            <Grid className="w-100">
                {
                    lineChart
                }
            </Grid>
        </>

    )
}
