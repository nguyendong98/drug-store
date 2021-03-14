import React, {useState} from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";
import {productURL} from "../../../utils/imageURL";
import TextField from "@material-ui/core/TextField";
import {useForm} from "react-hook-form";
import Button from "@material-ui/core/Button";
import KeyboardBackspaceRoundedIcon from '@material-ui/icons/KeyboardBackspaceRounded';
import {removeCartItemSuccess, updateCart} from "../../../features/cart";
import {useDispatch, useSelector} from "react-redux";
import {setAlert} from "../../../features/alert";
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import {getInventory, getTotalPrice} from "../../../utils/function";
import {Link} from "react-router-dom";
export const CartStep = ({cart, completeStep, warehouse}) => {
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const onSubmit = data => {
        const dataUpdate = [];
        let index = 0;
        for (const i in data) {
            if (data.hasOwnProperty(i)) {
                dataUpdate.push({index, qty: data[i]});
            }
            index++;
        }
        dispatch(updateCart(dataUpdate));
        dispatch(setAlert(true, 'Update cart success', 'success'));
        setDisabled(true);
    }
    const [disabled, setDisabled] = useState(true);
    const isAuthenticated = useSelector(state => state.user.isAuthenticated)
    const onRemoveItemCart = (id) => {
        dispatch(removeCartItemSuccess(id));
    }
    const onNextStep = () => {
        if (!isAuthenticated) {
            dispatch(setAlert(true, 'Hãy đăng nhập để thực hiện các thao tác sau!!', 'error'));
        } else {
            completeStep();
        }
    }
    return (
        <Grid container direction="row" alignItems="flex-start" className="mb-10 mt-10 pl-3 pl-md-5 pr-3 pr-md-0">
            <Grid container item xs={12} md={8}  direction="column">
                <Grid container item xs={12}>
                    <Grid item xs={4} md={6}>
                        <Typography variant="subtitle1" className="text-uppercase font-weight-bold">sản phẩm</Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography variant="subtitle1" className="text-uppercase font-weight-bold">giá</Typography>
                    </Grid>
                    <Grid item xs={3} md={2}>
                        <Typography variant="subtitle1" className="text-uppercase font-weight-bold">số lượng</Typography>
                    </Grid>
                    <Grid item xs={3} md={2} className="text-right">
                        <Typography variant="subtitle1" className="text-uppercase font-weight-bold">tổng cộng</Typography>
                    </Grid>
                </Grid>
                <Divider light style={{height: '4px'}}>
                </Divider>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {
                        cart && cart.map((val, i) => (
                            <React.Fragment key={i}>
                                <Grid container item xs={12} className="mt-5 mb-5">
                                    <Grid container item xs={4} md={6} direction="row" alignItems="center" >
                                        <Grid><CancelOutlinedIcon style={{color: '#7c7c7c'}}
                                                                  className="pointer mr-2"
                                                                  onClick={() => onRemoveItemCart(val.product._id)}/></Grid>
                                        <Grid><img className="image-cart mr-2" src={`${productURL}/${val.product.image}`} alt="img-product"/></Grid>
                                        <Grid item><Typography variant="body2">{val.product.name}</Typography></Grid>
                                    </Grid>
                                    <Grid container item xs={3} md={2} alignItems="center">
                                        <Typography variant="body2" >{val.price.toLocaleString()} VND</Typography>
                                    </Grid>
                                    <Grid container item xs={2} md={2}  alignItems="center">
                                        <TextField
                                            type="number"
                                            InputProps={{
                                                inputProps: {
                                                    max: getInventory(warehouse, val.product._id), min: 1
                                                }
                                            }}
                                            onChange={() => setDisabled(false)}
                                            name={`qty${i}`}
                                            defaultValue={val.qty}
                                            inputRef={register({ required: true })}
                                        />
                                    </Grid>
                                    <Grid container item xs={3} md={2} alignItems="center" justify="flex-end" >
                                        <Typography  variant="body2" >{(val.price * val.qty).toLocaleString()} VND</Typography>
                                    </Grid>
                                </Grid>
                                <Divider light />
                            </React.Fragment>
                        ))
                    }
                    <Grid container className="mt-5 mt-md-10" justify="flex-end">
                        <Button startIcon={<KeyboardBackspaceRoundedIcon />} variant="outlined" color="primary"
                                  type="button" className="text-uppercase mr-0 mr-md-5">
                            <Link to='/product' exact="true">tiếp tục xem sản phẩm</Link>
                        </Button>
                        <Button className="mt-4 mt-md-0" variant="outlined" color="primary" disableElevation  type="submit" disabled={disabled}>
                            cập nhật giỏ hàng
                        </Button>
                    </Grid>
                </form>


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
                        <Typography variant="subtitle1" className="font-weight-bold">
                            { getTotalPrice(cart).toLocaleString() } VND
                        </Typography>
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
                            className="text-uppercase w-100" onClick={onNextStep}
                            endIcon={<ArrowRightAltIcon />}>
                        xác nhận giỏ hàng

                    </Button>

                </div>
            </Grid>

        </Grid>
    )
}
