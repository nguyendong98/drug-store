import React, {useState} from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import {useForm} from "react-hook-form";
import Divider from "@material-ui/core/Divider";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import Button from "@material-ui/core/Button";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import Alert from "@material-ui/lab/Alert";
import {getTotalPrice} from "../../../utils/function";
import {useDispatch} from "react-redux";
import {updateCheckout} from "../../../features/checkout";
import {setAlert} from "../../../features/alert";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";

export const CheckoutStep = ({cart, completeStep, checkout, handleBack, user}) => {
    const { register, handleSubmit, errors } = useForm();
    const [note, setNote] = useState('');
    const dispatch = useDispatch();
    const onSubmit = data => {
        data.totalPrice = getTotalPrice(cart);
        data.note = note;
        dispatch(updateCheckout(data));
        dispatch(setAlert(true, 'Xác nhận thông tin thành công', 'success'))
        completeStep();
    }
    const onChangeNote = (e) => {
        setNote(e.target.value);
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container direction="row" alignItems="flex-start" className="mb-10 mt-5 mt-md-10 pl-3 pl-md-5 pr-3 pr-md-0">
                <Grid container item xs={12} md={8}   direction="column">
                    <Typography variant="h6" className="font-weight-bold text-uppercase text-center">
                        thông tin giao hàng
                    </Typography>
                    <Grid container item  className="mt-5" spacing={3}>
                        <Grid item xs={6} className="w-100">
                            <TextField variant="outlined" label="Họ tên" name="fullName"
                                       inputRef={register({ required: true })}
                                       placeholder="Họ và tên người nhận"
                                       defaultValue={user && user.fullName ? user.fullName : ''}
                                       InputLabelProps={{ shrink: true }}
                                       fullWidth={true}>
                            </TextField>
                            {errors.fullName && <Alert className="alert" severity="error">Vui lòng nhập họ tên của bạn!</Alert>}
                        </Grid>
                        <Grid item xs={6} className="w-100">
                            <TextField variant="outlined" label="Số điện thoại" name="phone"
                                       inputRef={register({ required: true })}
                                       placeholder="Vui lòng nhập số điện thoại của bạn"
                                       defaultValue={user && user.phone ? user.phone : ''}
                                       InputLabelProps={{ shrink: true }}
                                       fullWidth={true}>
                            </TextField>
                            {errors.phone && <Alert className="alert" severity="error">Vui lòng nhập số điện thoại của bạn!</Alert>}
                        </Grid>
                        <Grid item xs={6} className="w-100">
                            <TextField variant="outlined" label="Email" name="email"
                                       inputRef={register({ required: true })}
                                       placeholder="Vui lòng nhập email của bạn"
                                       defaultValue={user && user.email ? user.email : ''}
                                       InputLabelProps={{ shrink: true }}
                                       fullWidth={true}>
                            </TextField>
                            {errors.email && <Alert className="alert" severity="error">Vui lòng nhập email của bạn!</Alert>}

                        </Grid>
                        <Grid item xs={6} className="w-100">
                            <TextField variant="outlined" label="Tỉnh/Thành phố" name="city"
                                       inputRef={register()}
                                       placeholder="Vui lòng nhập tỉnh/thành phố của bạn"
                                       defaultValue={checkout && checkout.city ? checkout.city : ''}
                                       InputLabelProps={{ shrink: true }}
                                       fullWidth={true}>
                            </TextField>
                        </Grid>
                        <Grid item xs={6} className="w-100">
                            <TextField variant="outlined" label="Quận/Huyện" name="district"
                                       inputRef={register()}
                                       placeholder="Vui lòng nhập quận/huyện của bạn"
                                       defaultValue={checkout && checkout.district ? checkout.district : ''}
                                       InputLabelProps={{ shrink: true }}
                                       fullWidth={true}>
                            </TextField>
                        </Grid>
                        <Grid item xs={6} className="w-100">
                            <TextField variant="outlined" label="Phường/Xã/Thị trấn" name="town"
                                       inputRef={register()}
                                       placeholder="Vui lòng nhập phường/xã/thị trấn của bạn"
                                       defaultValue={checkout && checkout.town ? checkout.town : ''}
                                       InputLabelProps={{ shrink: true }}
                                       fullWidth={true}>
                            </TextField>
                        </Grid>
                        <Grid item xs={12} className="w-100">
                            <TextField variant="outlined" label="Địa chỉ cụ thể" name="addressDetail"
                                       inputRef={register({ required: true })}
                                       placeholder="Vui lòng nhập địa chỉ cụ thể để chúng tôi giao hàng"
                                       defaultValue={checkout && checkout.addressDetail ? checkout.addressDetail : ''}
                                       InputLabelProps={{ shrink: true }}
                                       fullWidth={true}>
                            </TextField>
                            {errors.addressDetail && <Alert className="alert" severity="error">Vui lòng nhập địa chỉ cụ thể của bạn!</Alert>}

                        </Grid>
                        <Grid item xs={12} className="w-100">
                            <TextareaAutosize
                                aria-label="note"
                                rowsMin={4} placeholder="Nếu có lưu ý gì, bạn hãy ghi chú tại đây"
                                defaultValue={checkout && checkout.note ? checkout.note : ''}
                                name="note"
                                className="w-100"
                                onChange={onChangeNote}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Divider orientation="vertical" flexItem className="ml-6 mr-6" />
                <Grid container item xs={12} md={3}>
                    <div className="w-100">
                        <Typography variant="subtitle1" className="text-uppercase font-weight-bold">
                            tổng số lượng
                        </Typography>
                        <Divider light style={{height: '4px'}} />
                        <Grid container justify="space-between" className="my-5">
                            <Typography variant="subtitle1">Tạm tính</Typography>
                            <Typography variant="subtitle1" className="font-weight-bold">{getTotalPrice(cart).toLocaleString()} VND</Typography>
                        </Grid>
                        <Divider light />
                        <Grid container className="my-3">
                            <LocalOfferIcon style={{color: '#d2d2d2'}} className="mr-2"/>
                            <Typography variant="subtitle1" className="font-weight-bold">Phiếu ưu đãi</Typography>
                        </Grid>
                        <Divider light />
                        <TextField className="mt-3 w-100"  id="filled-basic" label="Mã ưu đãi" variant="filled" />
                        <Button className="w-100 my-4" variant="outlined" color="primary">Áp dụng</Button>
                        <Divider light />
                        <Grid container justify="space-between" className="my-5">
                            <Typography variant="h6">Tổng tiền</Typography>
                            <Typography variant="h6" className="font-weight-bold">{getTotalPrice(cart).toLocaleString()} VND</Typography>
                        </Grid>
                        <Button variant="contained" color="primary"
                                type="submit"
                                className="text-uppercase w-100"
                                endIcon={<ArrowRightAltIcon />}>
                            xác nhận thông tin
                        </Button>
                        <Button variant="outlined" color="primary"
                                type="button"
                                onClick={handleBack}
                                className="text-uppercase w-100 mt-5">
                            Quay lại bước 1
                        </Button>
                    </div>
                </Grid>
            </Grid>
        </form>
    )
}
