import React, {useEffect} from "react";
import "./DashboardAdmin.scss";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {useDispatch, useSelector} from "react-redux";
import {getOrder} from "../../../features/order";
import Typography from "@material-ui/core/Typography";
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import {getAllUser} from "../../../features/user";
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import {getAllFeedBack} from "../../../features/feedback";
import MessageIcon from '@material-ui/icons/Message';
import moment from "moment";


export const DashBoardAdmin = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getOrder({pageSize: 1000, pageNumber: 1}));
        dispatch(getAllUser({pageSize: 1000, pageNumber: 1, idRole: '5f8c5363c931110a4acf9b54'}));
        dispatch(getAllFeedBack({pageSize: 1000, pageNumber: 1}))

    }, [dispatch]);
    const orders = useSelector(state => state.order.orders);
    const feedBacks = useSelector(state => state.feedback.feedBacks);
    const users = useSelector(state => state.user.users);

    const toDate = new Date();
    let totalRevenue = 0;
    let totalRevenueMonth = 0;
    let totalOrderMonth = 0;
    let totalVisitorMonth = 0;
    let totalFeedbackMonth = 0;
    if (orders && orders.result  && orders.result.length > 0) {
        orders.result.filter(v1 => v1.orderStatus.toLowerCase().indexOf('approved') !== -1)
                     .forEach(v2 => totalRevenue += v2.totalAmount);
        orders.result.filter(v1 => moment(toDate).format('MM/YYYY') === moment(v1.createAt).format('MM/YYYY'))
                     .forEach(v2 => {
                         totalOrderMonth += 1;
                         totalRevenueMonth += v2.totalAmount;
                     }

        )
    }
    if (users && users.result && users.result.length > 0) {
        users.result.filter(v1 => moment(toDate).format('MM/YYYY') === moment(v1.createAt).format('MM/YYYY'))
            .forEach(() => {
                    totalVisitorMonth += 1;
               }
            )
    }
    if (feedBacks && feedBacks.result && feedBacks.result.length > 0) {
        feedBacks.result.filter(v1 => moment(toDate).format('MM/YYYY') === moment(v1.createAt).format('MM/YYYY'))
            .forEach(() => {
                    totalFeedbackMonth += 1;
                }
            )
    }

    return  (
        <>
            <Grid container spacing={5} className="px-12 mt-10" justify="center">
                <Grid item xs={5}>
                    <Paper elevation={3} className="px-5 py-5 revenue-card" >
                        <Grid container justify="space-between" alignItems="center">
                            <Typography variant="h6" className="color-white">Tổng doanh thu</Typography>
                            <MonetizationOnIcon className="color-white"/>
                        </Grid>
                        <Typography variant="h4" className="mt-8 color-white">{totalRevenue.toLocaleString()} VND</Typography>
                        <Grid container className="mt-5" justify="space-between">
                            <Typography variant="subtitle1" className="color-white">{totalRevenueMonth.toLocaleString()} VND trong tháng</Typography>
                            <Typography variant="subtitle1" className="color-white">+{((totalRevenueMonth/totalRevenue)*100).toFixed(1)}%</Typography>

                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={5}>
                    <Paper elevation={3} className="px-5 py-5 order-card" >
                        <Grid container justify="space-between" alignItems="center">
                            <Typography variant="h6" className="color-white">Tổng đơn hàng</Typography>
                            <ShoppingCartIcon className="color-white"/>
                        </Grid>
                        <Typography variant="h4" className="mt-8 color-white">{orders && orders.result && orders.result.length} đơn hàng</Typography>
                        <Grid container className="mt-5" justify="space-between">
                            <Typography variant="subtitle1" className="color-white">{totalOrderMonth} đơn hàn trong tháng</Typography>
                            <Typography variant="subtitle1" className="color-white">+{orders && orders.result && ((totalOrderMonth/orders.result.length)*100).toFixed(1)}%</Typography>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={5}>
                    <Paper elevation={3} className="px-5 py-5 visitor-card" >
                        <Grid container justify="space-between" alignItems="center">
                            <Typography variant="h6" className="color-white">Tổng người dùng</Typography>
                            <SupervisorAccountIcon className="color-white"/>
                        </Grid>
                        <Typography variant="h4" className="mt-8 color-white">{users && users.result && users.result.length} visitor</Typography>
                        <Grid container className="mt-5" justify="space-between">
                            <Typography variant="subtitle1" className="color-white">{totalVisitorMonth} người dùng tron tháng</Typography>
                            <Typography variant="subtitle1" className="color-white">+{users && users.result && ((totalVisitorMonth/users.result.length)*100).toFixed(1)}%</Typography>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={5}>
                    <Paper elevation={3} className="px-5 py-5 feedback-card" >
                        <Grid container justify="space-between" alignItems="center">
                            <Typography variant="h6" className="color-white">Tổng đánh giá </Typography>
                            <MessageIcon className="color-white"/>
                        </Grid>
                        <Typography variant="h4" className="mt-8 color-white">{feedBacks && feedBacks.result && feedBacks.result.length} đánh giá</Typography>
                        <Grid container className="mt-5" justify="space-between">
                            <Typography variant="subtitle1" className="color-white">{totalFeedbackMonth} đánh giá trong tháng</Typography>
                            <Typography variant="subtitle1" className="color-white">+{feedBacks && feedBacks.result && ((totalFeedbackMonth/feedBacks.result.length)*100).toFixed(1)}%</Typography>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </>


    )
}
