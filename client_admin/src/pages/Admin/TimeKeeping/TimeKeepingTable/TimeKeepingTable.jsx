import React, {useEffect, useState} from "react";
import Button from "@material-ui/core/Button";
import {SalaryForm} from "../SalaryForm/SalaryForm";
import Typography from "@material-ui/core/Typography";
import MaterialTable from "material-table";
import moment from "moment";
import {useDispatch, useSelector} from "react-redux";
import {getCalendar} from "../../../../features/calendar";
import setAuthToken from "../../../../utils/setAuthToken";
import {loadUser} from "../../../../features/user";
import {countHourNumber, countShiftNumber} from "../../../../utils/func";
import Chip from "@material-ui/core/Chip";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
export const TimeKeepingTable = ({data, salary}) => {
    const dispatch = useDispatch();
    const [month, setMonth] = useState(`${moment().year()}-${moment(new Date()).format('MM')}`);

    useEffect(() => {
        if (localStorage['x-auth-token']) {
            setAuthToken(localStorage['x-auth-token']);
            dispatch(loadUser());
        }
        dispatch(getCalendar({year: moment().year(), month: moment().month() + 1}))
    }, [dispatch]);
    const calendars = useSelector(state => state.calendar.calendars);
    const [openForm, setOpenForm] = React.useState(false);
    const onCloseDialogForm = () => {
        setOpenForm(false);
    }
    let dataTable = [];
    if (data && data.result && data.result.length > 0) {
        let i = 1;
        for (const item of data.result) {
            const row = {
                stt: i,
                _id: item['_id'],
                fullName: item.fullName,
            }
            dataTable.push(row);
            i++;
        }
    }
    return (
        <>
            <SalaryForm open={openForm} closeDialogForm={onCloseDialogForm} salary={salary}/>
            <Button variant="outlined" color="primary" className="mx-6 mt-6 mb-4" onClick={() => setOpenForm(true)}>
                Cập nhật lương
            </Button>
            <Grid className="ml-6" container justify="space-between" alignItems="center">
                    <Typography  variant="h6" >Lương 1 giờ: { salary && salary.valueOfHour.toLocaleString()} VNĐ</Typography>

                    <TextField
                        className="mr-12"
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
                            dispatch(getCalendar({year: value[0], month: value[1]}))
                        }}
                    />
            </Grid>
            <MaterialTable
                title={`Bảng chấm công nhân viên trong tháng ${month.split('-')[1]}/${month.split('-')[0]}`}
                columns={[
                    {
                        title: 'STT',
                        render: rowData => <Typography variant="subtitle1">{rowData.stt}</Typography>
                    },
                    {
                        title: 'Họ tên',
                        field: 'fullName',
                        render: rowData => <Typography variant="subtitle1">{rowData.fullName}</Typography>
                    },
                    {
                        title: 'Số ca trực',
                        render: rowData => <Typography variant="subtitle1">{countShiftNumber(calendars, rowData._id, 1)} ca</Typography>
                    },
                    {
                        title: 'Số ca hoàn thành',
                        render: rowData => <Chip size="small" color="primary" label={countShiftNumber(calendars, rowData._id, 2) + ' ca'} />
                    },
                    {
                        title: 'Số ca vắng',
                        render: rowData => <Chip size="small" color="secondary" label={countShiftNumber(calendars, rowData._id, 3) + ' ca'} />
                    },
                    {
                        title: 'Tổng giờ làm việc',
                        render: rowData => <Typography variant="subtitle1">{countHourNumber(calendars, rowData._id)} hours</Typography>
                    },
                    {
                        title: 'Tổng lương',
                        render: rowData => <Typography variant="subtitle1">{salary && (countHourNumber(calendars, rowData._id) * salary.valueOfHour).toLocaleString()} VNĐ</Typography>
                    }

                ]}
                data={dataTable}

            />
        </>

    )
}
