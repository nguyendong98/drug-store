import React, {useEffect} from 'react';
import { makeStyles} from '@material-ui/core/styles';
import {Header} from "../../../components/Header/Header";
import {Sidebar} from "../../../components/Sidebar/Sidebar";
import {useDispatch, useSelector} from "react-redux";
import {getOrder} from "../../../features/order";
import {OrderManageTable} from "./OrderManageTable/OrderManageTable";
import setAuthToken from "../../../utils/setAuthToken";
import {loadUser} from "../../../features/user";




const useStyles = makeStyles((theme) => ({
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar
    }
}));

const OrderManage = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);


    useEffect(() => {
        if (localStorage['x-auth-token']) {
            setAuthToken(localStorage['x-auth-token']);
            dispatch(loadUser());
        }
        dispatch(getOrder({pageSize: 1000, pageNumber: 1}));
    }, [dispatch]);

    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };
    const orders = useSelector(state => state.order.orders);
    return  (
        <div className="flex-row">
            <Header handleDrawerOpen={handleDrawerOpen} open={open}/>
            <Sidebar handleDrawerClose={handleDrawerClose} open={open} />
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <OrderManageTable data={orders}/>
            </main>
        </div>
    );
}
export default OrderManage
