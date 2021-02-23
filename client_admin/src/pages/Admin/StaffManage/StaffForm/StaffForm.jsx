import React, {Fragment, useState} from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import TextField from "@material-ui/core/TextField";
import Alert from "@material-ui/lab/Alert";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import {Visibility, VisibilityOff} from "@material-ui/icons";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {createStaffAccount} from "../../../../features/user";

export const StaffForm = ({open, closeDialogForm}) => {
    const { register, handleSubmit, errors } = useForm();
    const [showPass, setShowPass] = useState(false);
    const [showRePass, setShowRePass] = useState(false);
    const dispatch = useDispatch();
    const onSubmit =  data => {
        dispatch(createStaffAccount(data));
        closeDialogForm();
    }
    const handleMouseDownPassword = (event) => event.preventDefault();
    return (
        <Fragment>
            <Dialog fullWidth={true} maxWidth="xs" onClose={closeDialogForm} aria-labelledby="dialog-login" open={open} className="register">
                <div className="title py-3 text-uppercase">Tạo tài khoản nhân viên</div>
                <DialogContent>
                    <form  onSubmit={handleSubmit(onSubmit)}>
                        <TextField
                            fullWidth={true}
                            id="input-fullname"
                            label="Họ tên"
                            type="text"
                            name="fullName"
                            inputRef={register({ required: true })}
                        />
                        {errors.fullName && <Alert className="alert" severity="error">Fullname is required!</Alert>}
                        <TextField
                            className="mt-2"
                            fullWidth={true}
                            id="input-username"
                            label="Tài khoản"
                            type="text"
                            name="username"
                            inputRef={register({ required: true })}
                        />
                        {errors.username && <Alert className="alert" severity="error">Username is required!</Alert>}
                        <TextField
                            className="mt-2"
                            fullWidth={true}
                            id="input-email"
                            label="Email"
                            name="email"
                            inputRef={register({
                                required: "Email is required!",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Invalid email address"
                                }
                            })}
                        />
                        {errors.email &&  <Alert className="alert" severity="error">{ errors.email.message }</Alert>}
                        <TextField
                            className="mt-2"
                            fullWidth={true}
                            id="input-phone"
                            label="Số điện thoại"
                            type="text"
                            name="phone"
                            inputRef={register({ required: true })}
                        />
                        {errors.phone &&  <Alert className="alert" severity="error">Phone is required!</Alert>}
                        <TextField
                            className="mt-2"
                            fullWidth={true}
                            id="input-password"
                            label="Mật khẩu"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => setShowPass(!showPass)}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {showPass ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                            type={showPass ? 'text' : 'password'}
                            name="password"
                            inputRef={register({ required: true, minLength: 4 })}
                        />
                        {errors.password?.type === 'required' && <Alert className="alert" severity="error">Password is required!</Alert>}
                        {errors.password?.type === 'minLength' && <Alert className="alert" severity="error">Password is too short!</Alert>}
                        <TextField
                            className="mt-2"
                            fullWidth={true}
                            id="input-re-password"
                            label="Nhập lại password"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => setShowRePass(!showRePass)}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {showRePass ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                            type={showRePass ? 'text' : 'password'}
                            name="rePassword"
                            inputRef={register({ required: true })}
                        />
                        {errors.rePassword && <Alert className="alert" severity="error">Password is required!</Alert>}
                        <Grid container className="pt-6 pb-3" >
                            <Button variant="contained" color="primary" disableElevation className="w-100" type="submit">
                                Xác nhận
                            </Button>
                        </Grid>
                    </form>
                </DialogContent>
            </Dialog>
        </Fragment>
    )
}
