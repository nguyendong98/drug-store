import React from "react";
import './OrderDetailView.scss';
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";
import {useSelector} from "react-redux";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Moment from "react-moment";

export const OrderDetailView = ({open, closeDialogLogin}) => {
    const order = useSelector(state => state.order.order);
    return order && order['idOrderDetail'] && order['idOrderDetail']['bill'] ? (
        <Dialog fullWidth={true} maxWidth="xs" onClose={closeDialogLogin} aria-labelledby="dialog-login" open={open}>
            <div className="title py-3">Chi tiết đơn hàng</div>
            <DialogContent>
                <Typography variant="subtitle1" className="font-weight-bold mb-2">1. Thông tin đơn hàng</Typography>
                {
                    order['idOrderDetail']['bill'].map((val, i) => (
                        <Typography key={i} variant="body2" style={{color: '#808080'}} className="ml-4">
                            {val.name} x {val.qty}
                        </Typography>
                    ))
                }
                <Typography variant="body2" className="ml-4 font-weight-bold my-2">Tổng tiền: {order.totalAmount.toLocaleString()} VNĐ</Typography>
                <Divider light />
                <Typography variant="subtitle1" className="font-weight-bold my-2">2. Thông tin giao hàng</Typography>
                <div className="ml-4 mb-2">
                    <Grid container>
                        <Grid item xs={5}><Typography variant="body2">Tên khách hàng:</Typography> </Grid>
                        <Grid item xs={7}><Typography variant="body2">{order.idOrderDetail.customerName}</Typography> </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={5}><Typography variant="body2">Email:</Typography> </Grid>
                        <Grid item xs={7}><Typography variant="body2">{order.idOrderDetail.email}</Typography> </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={5}><Typography variant="body2">Số điện thoại:</Typography> </Grid>
                        <Grid item xs={7}><Typography variant="body2">{order.idOrderDetail.phone}</Typography> </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={5}><Typography variant="body2">Địa chỉ giao hàng:</Typography> </Grid>
                        <Grid item xs={7}><Typography variant="body2">{order.idOrderDetail.address}</Typography> </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={5}><Typography variant="body2">Ghi chú:</Typography> </Grid>
                        <Grid item xs={7}><Typography variant="body2">{order.idOrderDetail.note}</Typography> </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={5}><Typography variant="body2">Ngày tạo:</Typography> </Grid>
                        <Grid item xs={7}><Typography variant="body2"><Moment format="lll">{order.createAt}</Moment></Typography> </Grid>
                    </Grid>
                </div>
                <Divider light />
                <Typography variant="subtitle1" className="font-weight-bold my-2">3. Thông tin thanh toán</Typography>
                <div className="ml-4 mb-2">
                    <Grid container>
                        <Grid item xs={5}><Typography variant="body2">Hình thức thanh toán:</Typography> </Grid>
                        <Grid item xs={7}><Typography variant="body2">{order.paymentType}</Typography> </Grid>
                    </Grid>
                    {
                        order.paymentType.toString().indexOf('online') !== -1 ? (
                            <>
                                <Grid container>
                                    <Grid item xs={5}><Typography variant="body2">Tài khoản:</Typography> </Grid>
                                    <Grid item xs={7}><Typography variant="body2">{order.idOrderDetail.payerInfo.payer_id}</Typography> </Grid>
                                </Grid>
                                <Grid container>
                                    <Grid item xs={5}><Typography variant="body2">Trạng thái thanh toán:</Typography> </Grid>
                                    <Grid item xs={7}><Typography variant="body2">Đã thanh toán</Typography> </Grid>
                                </Grid>
                            </>
                        ) : ''
                    }

                </div>
            </DialogContent>
        </Dialog>
    ) : null
}
