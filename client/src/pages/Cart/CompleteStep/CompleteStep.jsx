import React, {useState} from "react";
import Button from "@material-ui/core/Button";
import {PayPal} from "../PayPal/PayPal";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import {getTotalPrice} from "../../../utils/function";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import {useDispatch} from "react-redux";
import {createOrder} from "../../../features/order";
import {removeCart} from "../../../features/cart";
import {ThemeProvider} from '@material-ui/core/styles';
import theme from '../../../share/Theme/Theme';
export const CompleteStep = ({checkoutProps, cart, completeStep}) => {
    const [onlinePay, setOnlinePay] = useState(false);
    const dispatch = useDispatch();
    const onSubmit = () => {
        if (cart && checkoutProps) {
            const billDetail = [];
            for (const item of cart) {
                billDetail.push({
                    product: item.product._id,
                    qty:  parseInt(item.qty),
                    name: item.product.name,
                    price: item.price
                });
            }
            const data = {
                bill: billDetail,
                customerName: checkoutProps.fullName,
                phone: checkoutProps.phone,
                email: checkoutProps.email,
                address: checkoutProps.addressDetail,
                note: checkoutProps.note,
                totalAmount: getTotalPrice(cart),
                paymentType: 'in-place'
            }
            dispatch(createOrder(data));
            completeStep();
            dispatch(removeCart());
            sessionStorage.removeItem('checkout');
        }

    }
    return (
        <div>
            <Grid container direction="row" alignItems="flex-start" className="mb-10 mt-5 mt-md-10 pl-3 pl-md-5 pr-3 pr-md-0">
                <Grid container item xs={12} md={7}   direction="column">
                    <Typography variant="h6" className="font-weight-bold text-uppercase text-center">
                        thông tin thanh toán
                    </Typography>
                    <Grid container className="mt-3">
                        <Grid item xs={5} md={3}><Typography variant="subtitle1" className="font-weight-bold">Họ tên người nhận: </Typography></Grid>
                        <Grid item xs={7} md={9}><ThemeProvider theme={theme}><Typography variant="h6">{checkoutProps.fullName} </Typography></ThemeProvider></Grid>
                    </Grid>
                    <Grid container className="mt-3">
                        <Grid item xs={5} md={3}><Typography variant="subtitle1" className="font-weight-bold">Số điện thoại: </Typography></Grid>
                        <Grid item xs={7} md={9}><Typography variant="h6">{checkoutProps.phone} </Typography></Grid>
                    </Grid>
                    <Grid container className="mt-3">
                        <Grid item xs={5} md={3}><Typography variant="subtitle1" className="font-weight-bold">Email: </Typography></Grid>
                        <Grid item xs={7} md={9}><Typography variant="h6">{checkoutProps.email} </Typography></Grid>
                    </Grid>
                    <Grid container className="mt-3">
                        <Grid item xs={5} md={3}><Typography variant="subtitle1" className="font-weight-bold">Địa chỉ nhận hàng: </Typography></Grid>
                        <Grid item xs={7} md={9}><Typography variant="h6">{checkoutProps.addressDetail} </Typography></Grid>
                    </Grid>
                    <Grid container className="mt-3">
                        <Grid item xs={5} md={3}><Typography variant="subtitle1" className="font-weight-bold">Ghi chú: </Typography></Grid>
                        <Grid item xs={7} md={9}><Typography variant="h6">{checkoutProps.note} </Typography></Grid>
                    </Grid>
                </Grid>
                <Divider orientation="vertical" flexItem className="ml-6 mr-6" />
                <Grid container item xs={12} md={4} className="mt-5 mt-md-0">
                    <div className="w-100">
                        <Typography variant="h6" className="font-weight-bold text-uppercase text-center">
                            đơn hàng của bạn
                        </Typography>
                        <Grid container justify="space-between" className="mt-3">
                            <Typography variant="subtitle1" className="font-weight-bold text-uppercase">sản phẩm</Typography>
                            <Typography variant="subtitle1" className="font-weight-bold text-uppercase">tổng cộng</Typography>
                        </Grid>
                        <Divider light style={{height: '4px'}} className="mb-4"></Divider>
                        {
                            cart && cart.map((val, i) => (
                                <Grid container justify="space-between" className="mb-2" key={i}>
                                    <Typography variant="body2" style={{color: '#808080'}}>{val.product.name} x {val.qty}</Typography>
                                    <Typography variant="body1" className="font-weight-bold">{(val.qty * val.price).toLocaleString()} VND</Typography>
                                </Grid>
                            ))
                        }
                        <Divider light style={{height: '2px'}} ></Divider>
                        <Grid container justify="space-between" className="my-2">
                            <Typography variant="body2" >Tổng cộng</Typography>
                            <Typography variant="body1" className="font-weight-bold">{getTotalPrice(cart).toLocaleString()} VND</Typography>
                        </Grid>
                        <Divider light style={{height: '2px'}} ></Divider>
                        <Grid container justify="space-between" className="my-2">
                            <Typography variant="body2" >Phí giao hàng</Typography>
                            <Typography variant="body1" className="font-weight-bold">{!onlinePay ? (20000).toLocaleString() : 0} VND</Typography>
                        </Grid>
                        <Divider light style={{height: '2px'}} ></Divider>
                        <Grid container justify="space-between" className="my-2">
                            <Typography variant="body2" >Tổng cộng</Typography>
                            <Typography variant="body1" className="font-weight-bold">{!onlinePay ? (getTotalPrice(cart) + 20000).toLocaleString() : getTotalPrice(cart).toLocaleString()} VND</Typography>
                        </Grid>
                        <Divider light style={{height: '2px'}} ></Divider>
                        <RadioGroup value={onlinePay}  name="customized-radios">
                            <FormControlLabel value={false} control={<Radio />} label="Thanh toán khi nhận hàng" onChange={() => setOnlinePay(false)}/>
                            <FormControlLabel value={true} control={<Radio />} label="Thanh toán online" onChange={() => setOnlinePay(true)}/>
                        </RadioGroup>
                        {
                            onlinePay ? <PayPal cart={cart} checkout={checkoutProps} completeStep={completeStep}/> :
                                <Button type="button" onClick={onSubmit} variant="contained" color="primary">Xác nhận đặt hàng</Button>
                        }
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}
