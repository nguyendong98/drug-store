import React, {useEffect, useState} from "react";
import Typography from "@material-ui/core/Typography";
import moment from "moment";
import Grid from "@material-ui/core/Grid";
import {useDispatch, useSelector} from "react-redux";
import {getCalendar} from "../../../../features/calendar";
import CheckBoxTwoToneIcon from '@material-ui/icons/CheckBoxTwoTone';
import CheckBoxOutlineBlankTwoToneIcon from '@material-ui/icons/CheckBoxOutlineBlankTwoTone';
import {getDateOfISOWeek} from "../../../../utils/func";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import {CalendarTableByDate} from "../CalendarTableByDate/CalendarTableByDate";
import {CalendarTableByWeek} from "../CalendarTableByWeek/CalendarTableByWeek";
import {CalendarTableByMonth} from "../CalendarTableByMonth/CalendarTableByMonth";
export const CalendarView = ({workShifts}) => {
    const y = moment().year();
    const m = moment().month();
    const dispatch = useDispatch();
    const [typeSearch, setTypeSearch] = useState(1);
    const [week, setWeek] = useState("");
    const [year, setYear] = useState("");
    const [month, setMonth] = useState([]);
    const [typeTable, setTypeTable] = useState(1);
    const [weekList, setWeekList] = useState([]);
    const listYear = [2016, 2017, 2018, 2019, 2020, 2021, 2022];

    useEffect(() => {
        dispatch(getCalendar({date: new Date(y,m, Number(moment(new Date()).format('DD')),-1)}));
    }, [dispatch, m, y]);
    const calendars = useSelector(state => state.calendar.calendars);

    const createWeekList = (event) => {
        const weeks = [];
        const dayTep = '12-30-' + event;
        const wMaxNumber = moment(dayTep, 'MM-DD-YYYY').isoWeeksInYear();

        for (let i = 1; i <= wMaxNumber; i++) {
            weeks.push(i);
        }
        setWeekList(weeks);

    }

    const getTypeSearch = (typeSearch) => {
        switch (typeSearch) {
            case 1:
                return (
                    <Grid item container xs={4} alignItems="flex-end">
                        <Grid item xs={4}>
                            <Typography variant="subtitle1" className="font-weight-bold">
                                Ngày
                            </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                label="Chọn ngày"
                                type="date"
                                defaultValue={moment(new Date()).format('YYYY-MM-DD')}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={e => {
                                    dispatch(getCalendar({date: e.target.value}));
                                    setTypeTable(1);
                                }}
                            />
                        </Grid>
                    </Grid>
                )
            case 2:
                return (
                    <Grid item container xs={8} alignItems="flex-end" spacing={3}>
                        <Grid item xs={1}>
                            <Typography variant="subtitle1" className="font-weight-bold text-center">
                                Năm
                            </Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <FormControl fullWidth>
                                <Select
                                    onChange={e => {
                                        createWeekList(e.target.value);
                                        setYear(e.target.value);
                                    }}
                                    value={year}>
                                    {
                                        listYear.map(val => (
                                            <MenuItem  value={val} key={val}>{val}</MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={1}>
                            <Typography variant="subtitle1" className="font-weight-bold text-center">
                                Tuần
                            </Typography>
                        </Grid>
                        <Grid item xs={7}>
                            <FormControl fullWidth>
                                <Select
                                    labelId="demo-controlled-open-select-label"
                                    value={week}
                                    onChange={e => {
                                        setWeek(e.target.value);
                                        let weekEndDate = new Date(e.target.value);
                                        weekEndDate = new Date(weekEndDate.setDate(weekEndDate.getDate() + 6));

                                        dispatch(getCalendar({
                                            weekFromDate: e.target.value,
                                            weekToDate: weekEndDate
                                        }))
                                        setTypeTable(2);
                                    }}
                                >
                                    {
                                        weekList && weekList.length > 0 && weekList.map((val, i) => (
                                            <MenuItem key={i}
                                                      value={`${new Date(getDateOfISOWeek(val, year).ISOweekStart)}`} >
                                                Tuần {val} - {moment(getDateOfISOWeek(val, year).ISOweekStart).format('DD/MM/YYYY')} ~ {moment(getDateOfISOWeek(val, year).ISOweekEnd).format('DD/MM/YYYY')}
                                            </MenuItem>

                                        ))
                                    }
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                )
            case 3:
                return (
                    <Grid item container xs={4} alignItems="flex-end">
                        <Grid item xs={4}>
                            <Typography variant="subtitle1" className="font-weight-bold">
                                Tháng
                            </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                id="date"
                                label="Chọn tháng"
                                type="month"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={e => {
                                    setTypeTable(3);
                                    const value = e.target.value.split('-');
                                    setMonth(value);
                                    dispatch(getCalendar({year: value[0], month: value[1]}))
                                }}
                            />
                        </Grid>
                    </Grid>
                )
            default:
                break;
        }
    }
    return (
        <div className="my-10">
            <Grid container spacing={5} className="mb-8">
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

                                <MenuItem value={1} >Lọc theo ngày</MenuItem>
                                <MenuItem value={2} >Lọc theo tuần</MenuItem>
                                <MenuItem value={3} >Lọc theo tháng</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                {
                    getTypeSearch(typeSearch)
                }
            </Grid>
            <Grid container alignItems="center">
                <CheckBoxTwoToneIcon color="primary"/>
                <Typography variant="subtitle1" color="textSecondary" className="ml-2 mr-6">Đã hoàn thành</Typography>
                <CheckBoxOutlineBlankTwoToneIcon color="error"/>
                <Typography variant="subtitle1" color="textSecondary" className="ml-2">Chưa hoàn thành</Typography>

            </Grid>
            <CalendarTableByDate workShifts={workShifts} calendars={calendars} typeTable={typeTable}/>
            <CalendarTableByWeek workShifts={workShifts} calendars={calendars} typeTable={typeTable} week={week} />
            <CalendarTableByMonth workShifts={workShifts} calendars={calendars} typeTable={typeTable} month={month} />
        </div>
    )
}
