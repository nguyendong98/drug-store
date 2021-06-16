import React, {useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import {getOrder} from "../../features/order";
import setAuthToken from "../../utils/setAuthToken";
import {loadUser} from "../../features/user";
import {MyOrderTable} from "./MyOrderTable/MyOrderTable";

export default function MyOrder() {
    const dispatch = useDispatch();
    useEffect(() => {
        if (localStorage['x-auth-token']) {
            setAuthToken(localStorage['x-auth-token']);
            dispatch(loadUser());
            dispatch(getOrder({pageSize: 1000, pageNumber: 1}));
        }
    }, [dispatch]);
    const user = useSelector(state =>  state.user.user);
    const orders = useSelector(state => state.order.orders);
    let myOrder = [];
    if (orders && orders.result && user) {
        myOrder = orders.result.filter(val => val.customer === user._id);
    }
    return (
        <>
            <div className="p-5">
                <MyOrderTable myOrder={myOrder} />
            </div>
        </>
    )
}

