import React, {useEffect} from 'react';
import Login from "./pages/Login/Login";
import OrderManage from "./pages/Staff/OrderManage/OrderManage";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import MessageNotify from "./share/Snackbar/Snackbar";
import setAuthToken from "./utils/setAuthToken";
import {loadUser} from "./features/user";
import {useDispatch} from "react-redux";
import PrivateRoute from "./share/Route/PrivateRoute";
import {Redirect} from "react-router-dom";
import {Dashboard} from "./pages/Dashboard/Dashboard";
import {StaffManage} from "./pages/Admin/StaffManage/StaffManage";
import {CustomerManage} from "./pages/Admin/CustomerManage/CustomerManage";
import {ProductManage} from "./pages/Staff/ProductManage/ProductManage";
import {Statistical} from "./pages/Admin/Statistical/Statistical";
import {WorkShift} from "./pages/Admin/WorkShift/WorkShift";
import {CalendarManage} from "./pages/Admin/CalendarManage/CalendarManage";
import {MyCalendar} from "./pages/Staff/MyCalendar/MyCalendar";
import {TimeKeeping} from "./pages/Admin/TimeKeeping/TimeKeeping";
const App = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        if (localStorage['x-auth-token']) {
            setAuthToken(localStorage['x-auth-token']);
            dispatch(loadUser());
        }
    },[dispatch]);
    return (
          <Router>
            <MessageNotify />
            <Switch>
                <Route path='/login' exact component={Login} />
                <Redirect  from="/" to="/app/dashboard"  exact  />
                <Redirect  from="/app" to="/app/dashboard"  exact  />
                <PrivateRoute path='/app/dashboard' exact component={Dashboard} />
                <PrivateRoute path='/app/order-manage' exact component={OrderManage} />
                <PrivateRoute path='/app/staff-manage' exact component={StaffManage} />
                <PrivateRoute path='/app/customer-manage' exact component={CustomerManage} />
                <PrivateRoute path='/app/warehouse-manage' exact component={ProductManage} />
                <PrivateRoute path='/app/statistical' exact component={Statistical} />
                <PrivateRoute path='/app/work-shift' exact component={WorkShift} />
                <PrivateRoute path='/app/calendar-manage' exact component={CalendarManage} />
                <PrivateRoute path='/app/my-calendar' exact component={MyCalendar} />
                <PrivateRoute path='/app/time-keeping' exact component={TimeKeeping} />
            </Switch>
          </Router>
    );
}

export default App;
