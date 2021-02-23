import React, {useEffect, useState} from "react";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import Alert from "@material-ui/lab/Alert";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import setAuthToken from "../../../../utils/setAuthToken";
import {getAllUser, loadUser} from "../../../../features/user";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Autocomplete from "@material-ui/lab/Autocomplete";
import InputLabel from "@material-ui/core/InputLabel";
import {createCalendar} from "../../../../features/calendar";
import {Spinner} from "../../../../share/Spinner/Spinner";


export const CalendarForm = ({open, closeDialogForm, workShifts}) => {
    const { register, handleSubmit, errors } = useForm();
    const dispatch = useDispatch();
    useEffect(() => {
        if (localStorage['x-auth-token']) {
            setAuthToken(localStorage['x-auth-token']);
            dispatch(loadUser());
        }
        dispatch(getAllUser({pageSize: 1000, pageNumber: 1, idRole: '5f8c5388c931110a4acf9b69'}));
    }, [dispatch]);
    const users = useSelector(state => state.user.users);
    const [workShift, setWorkShift] = useState(workShifts && workShifts.length > 0 ? workShifts[0]._id : '');
    const [staffSelect, setStaffSelect] = useState([]);
    const onSubmit = data => {
        const dataSubmit = {
            date: data.date,
            idWorkShift: workShift,
            staff: staffSelect
        }
        dispatch(createCalendar(dataSubmit));
        closeDialogForm();
    };
    const onChangeStaff = (event, values) => {
        setStaffSelect(values);
    }
    return users && workShifts ?  (

        <Dialog fullWidth={true} maxWidth="xs" onClose={closeDialogForm} aria-labelledby="dialog-login" open={open}>
            <div className="title py-3">Create calendar</div>
            <DialogContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        fullWidth
                        id="date"
                        label="Ngày"
                        name="date"
                        type="date"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        inputRef={register({ required: true })}
                    />
                    {errors.date && <Alert className="alert" severity="error">Date is required!</Alert>}
                    <FormControl fullWidth className="mt-5">
                        <InputLabel id="demo-simple-select-label">Ca trực</InputLabel>
                        <Select
                            labelId="demo-controlled-open-select-label"
                            id="demo-controlled-open-select"
                            onChange={async e => {
                                setWorkShift(e.target.value);
                            }}
                            name="workShift"
                            value={workShift}
                        >
                            {
                                workShifts && workShifts.length > 0 && workShifts.map((val, i) => (
                                    <MenuItem key={i} value={val._id} >{val.name} - {val.startTime} ~ {val.endTime}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                    <Autocomplete
                        className="mt-5"
                        multiple
                        id="tags-standard"
                        onChange={onChangeStaff}
                        options={users.result}
                        getOptionLabel={(option) => option.fullName}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                variant="standard"
                                label="Chọn nhân viên"
                                placeholder="Multiple staff"
                                name="staff"
                                inputRef={register()}
                            />
                        )}
                    />
                    <Button type="submit" variant="outlined" color="primary" fullWidth className="my-10">
                        Tạo lịch
                    </Button>

                </form>
            </DialogContent>
        </Dialog>

    ) : <Spinner/>
}
