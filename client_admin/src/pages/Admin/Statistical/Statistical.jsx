import React, {useEffect, useState} from "react";
import "./Statistical.scss";
import {makeStyles} from "@material-ui/core/styles";
import {useDispatch} from "react-redux";
import setAuthToken from "../../../utils/setAuthToken";
import {loadUser} from "../../../features/user";
import {Header} from "../../../components/Header/Header";
import {Sidebar} from "../../../components/Sidebar/Sidebar";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import TabPanel from "@material-ui/lab/TabPanel";
import TabContext from "@material-ui/lab/TabContext";
import AppBar from "@material-ui/core/AppBar";
import TabList from "@material-ui/lab/TabList";
import Tab from "@material-ui/core/Tab";
import {RevenueStatisticTab} from "./RevenueStatisticTab/RevenueStatisticTab";
import {UserStatisticTab} from "./UserStatisticTab/UserStatisticTab";



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

export const Statistical = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);


    useEffect(() => {
        if (localStorage['x-auth-token']) {
            setAuthToken(localStorage['x-auth-token']);
            dispatch(loadUser());
        }
    }, [dispatch]);
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };
    const [value, setValue] = useState('1');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return  (
        <div className="flex-row">
            <Header handleDrawerOpen={handleDrawerOpen} open={open}/>
            <Sidebar handleDrawerClose={handleDrawerClose} open={open} />
            <main className={classes.content}>
                <div className={classes.toolbar} />
                    <Paper className="py-4">
                        <Typography className="ml-6 mb-4" variant="h6">Thống kê</Typography>
                        <Divider light />
                        <TabContext value={value}>
                            <AppBar position="static" className="detail-tabs" color="primary">
                                <TabList onChange={handleChange} aria-label="simple tabs example">
                                    <Tab label="Doanh thu" value="1"/>
                                    <Tab label="Người dùng" value="2" />
                                </TabList>
                            </AppBar>
                            <TabPanel value="1" className="p-4">
                                <RevenueStatisticTab />
                            </TabPanel>
                            <TabPanel value="2" className="p-4">
                                <UserStatisticTab />
                            </TabPanel>
                        </TabContext>
                    </Paper>

            </main>
        </div>
    );
}
