import React from "react";
import "./WorkShiftForm.scss";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import ArrowForwardIosSharpIcon from '@material-ui/icons/ArrowForwardIosSharp';
import Alert from "@material-ui/lab/Alert";
import {createWorkShift} from "../../../../features/work-shift";

export const WorkShiftForm = ({open, closeDialogForm}) => {
    const { register, handleSubmit, errors } = useForm();
    const dispatch = useDispatch();
    const onSubmit = data => {
        dispatch(createWorkShift(data));
        closeDialogForm();
    };
    return (
        <Dialog fullWidth={true} maxWidth="xs" onClose={closeDialogForm} aria-labelledby="dialog-login" open={open}>
            <div className="title py-3">Thiết lập ca trực theo khung giờ</div>
            <DialogContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField variant="outlined" name="name" inputRef={register({ required: true })}
                               label="Tên ca trực" className="mb-2"
                               fullWidth
                               InputLabelProps={{ shrink: true }}
                    />
                    {errors.name && <Alert className="alert" severity="error">Shift name is required!</Alert>}

                    <Grid container alignItems="flex-end" justify="flex-start">
                        <Grid item xs={5}>
                            <TextField
                                id="time"
                                label="Giờ bắt đầu"
                                type="time"
                                name="startTime"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    step: 300, // 5 min
                                }}
                                inputRef={register({ required: true })}
                            />
                            {errors.startTime && <Alert className="alert" severity="error">Start time is required!</Alert>}

                        </Grid>

                        <Grid item xs={2}>
                            <ArrowForwardIosSharpIcon />
                        </Grid>
                        <Grid item xs={5}>
                            <TextField
                                id="time"
                                label="Giờ kết thúc"
                                type="time"
                                name="endTime"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    step: 300, // 5 min
                                }}
                                inputRef={register({ required: true })}
                            />
                            {errors.endTime && <Alert className="alert" severity="error">End time is required!</Alert>}

                        </Grid>

                    </Grid>

                    <Button variant="outlined" color="primary" type="submit" fullWidth className="my-5">
                        Thiết lập
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}
