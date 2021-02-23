import React, {useEffect} from "react";
import "./Sidebar.scss";
import clsx from "clsx";
import IconButton from "@material-ui/core/IconButton";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Drawer from "@material-ui/core/Drawer";
import {makeStyles, useTheme} from "@material-ui/core/styles";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import DashboardIcon from '@material-ui/icons/Dashboard';
import ReceiptIcon from '@material-ui/icons/Receipt';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import PermContactCalendarSharpIcon from '@material-ui/icons/PermContactCalendarSharp';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import InsertChartIcon from '@material-ui/icons/InsertChart';
import WatchLaterTwoToneIcon from '@material-ui/icons/WatchLaterTwoTone';
import TodayIcon from '@material-ui/icons/Today';
import {NavLink} from "react-router-dom";
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import {getCalendar, getCalendarOfStaff} from "../../features/calendar";
import moment from "moment";
import setAuthToken from "../../utils/setAuthToken";
import {loadUser} from "../../features/user";
import {checkTimeToWork} from "../../utils/func";
const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    }
}));

export const Sidebar = ({handleDrawerClose, open}) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const theme = useTheme();
    const user = useSelector(state => state.user);
    useEffect(() => {
        if (user && user._id) {
            dispatch(getCalendarOfStaff(user._id));
        }
    }, [dispatch, user, user._id]);
    const myCalendar = useSelector(state => state.calendar.myCalendar);
    const myCalendarToDate = myCalendar.filter(val => moment(new Date()).format('DD/MM/YYYY') === moment(val.date).format('DD/MM/YYYY') && val.idWorkShift);
    return (
        <Drawer
            variant="permanent"
            className={clsx(classes.drawer, {
                [classes.drawerOpen]: open,
                [classes.drawerClose]: !open,
            })}
            classes={{
                paper: clsx({
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                }),
            }}
        >
            <div className={classes.toolbar}>
                <IconButton onClick={() => handleDrawerClose()}>
                    {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </IconButton>
            </div>
            <Divider />
            {
                user && user.user && user.user.roleId && user.user.roleId.description === 'admin' && (
                    <List>
                        <NavLink to='/app/dashboard' activeClassName="is-active" exact={true}>
                            <ListItem button className="menu-item">
                                <ListItemIcon className="icon-item"><DashboardIcon /></ListItemIcon>
                                <ListItemText >Bảng điều khiển</ListItemText>
                            </ListItem>
                        </NavLink>
                        <Divider light />
                        <NavLink to='/app/order-manage' activeClassName="is-active" exact={true}>
                            <ListItem button className="menu-item">
                                <ListItemIcon className="icon-item"><ReceiptIcon /></ListItemIcon>
                                <ListItemText >Đơn hàng</ListItemText>
                            </ListItem>
                        </NavLink>
                        <NavLink to='/app/warehouse-manage' activeClassName="is-active" exact={true}>
                            <ListItem button className="menu-item">
                                <ListItemIcon className="icon-item"><HomeWorkIcon /></ListItemIcon>
                                <ListItemText>Kho hàng</ListItemText>
                            </ListItem>
                        </NavLink>
                        <NavLink to='/app/statistical' activeClassName="is-active" exact={true}>
                            <ListItem button className="menu-item">
                                <ListItemIcon className="icon-item"><InsertChartIcon /></ListItemIcon>
                                <ListItemText>Thống kê</ListItemText>
                            </ListItem>
                        </NavLink>
                        <Divider light />
                        <NavLink to='/app/staff-manage' activeClassName="is-active" exact={true}>
                            <ListItem button className="menu-item">
                                <ListItemIcon className="icon-item"><SupervisorAccountIcon /></ListItemIcon>
                                <ListItemText>Nhân viên</ListItemText>
                            </ListItem>
                        </NavLink>
                        <Link to='/app/customer-manage' exact="true">
                            <ListItem button className="menu-item">
                                <ListItemIcon className="icon-item"><PermContactCalendarSharpIcon /></ListItemIcon>
                                <ListItemText>Khách hàng</ListItemText>
                            </ListItem>
                        </Link>
                        <Divider light />
                        <NavLink to='/app/work-shift' activeClassName="is-active" exact={true}>
                            <ListItem button className="menu-item">
                                <ListItemIcon className="icon-item"><WatchLaterTwoToneIcon /></ListItemIcon>
                                <ListItemText>Ca trực</ListItemText>
                            </ListItem>
                        </NavLink>
                        <NavLink to='/app/calendar-manage' activeClassName="is-active" exact={true}>
                            <ListItem button className="menu-item">
                                <ListItemIcon className="icon-item"><TodayIcon /></ListItemIcon>
                                <ListItemText>Lịch làm việc</ListItemText>
                            </ListItem>
                        </NavLink>
                        <NavLink to='/app/time-keeping' activeClassName="is-active" exact={true}>
                            <ListItem button className="menu-item">
                                <ListItemIcon className="icon-item"><LocalAtmIcon /></ListItemIcon>
                                <ListItemText>Chấm công</ListItemText>
                            </ListItem>
                        </NavLink>
                    </List>
                )
            }
            {
                user && user.user && user.user.roleId && user.user.roleId.description === 'staff' && (
                    <List>
                        <NavLink to='/app/dashboard' activeClassName="is-active" exact={true}>
                            <ListItem button className="menu-item">
                                <ListItemIcon className="icon-item"><DashboardIcon /></ListItemIcon>
                                <ListItemText>Bảng điều khiển</ListItemText>
                            </ListItem>
                        </NavLink>
                        <Divider light />
                        {
                            checkTimeToWork(myCalendarToDate) &&
                                <>
                                    <NavLink to='/app/order-manage' activeClassName="is-active" exact={true}>
                                        <ListItem button className="menu-item">
                                            <ListItemIcon className="icon-item"><ReceiptIcon /></ListItemIcon>
                                            <ListItemText>Đơn hàng</ListItemText>
                                        </ListItem>
                                    </NavLink>
                                    <NavLink to='/app/warehouse-manage' activeClassName="is-active" exact={true}>
                                        <ListItem button className="menu-item">
                                            <ListItemIcon className="icon-item"><HomeWorkIcon /></ListItemIcon>
                                            <ListItemText>Kho hàng</ListItemText>
                                        </ListItem>
                                    </NavLink>
                                </>
                        }

                        <NavLink to='/app/my-calendar' activeClassName="is-active" exact={true}>
                            <ListItem button className="menu-item">
                                <ListItemIcon className="icon-item"><TodayIcon /></ListItemIcon>
                                <ListItemText>Lịch của tôi</ListItemText>
                            </ListItem>
                        </NavLink>
                    </List>
                )
            }



        </Drawer>
    )
}
