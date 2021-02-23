import React, {useEffect, useState} from "react";
import  "./Dashboard.scss";
import {makeStyles} from "@material-ui/core/styles";
import {Header} from "../../components/Header/Header";
import {Sidebar} from "../../components/Sidebar/Sidebar";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import {useSelector} from "react-redux";
import {avatarURL} from "../../utils/imageURL";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {DashBoardAdmin} from "./DashboardAdmin/DashboardAdmin";
import {DashBoardStaff} from "./DashboardStaff/DashboardStaff";
import Clock from "react-clock";
import 'react-clock/dist/Clock.css';
import moment from "moment";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
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
export const Dashboard = () => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(new Date());
    useEffect(() => {
        const interval = setInterval(
            () => setValue(new Date()),
            1000
        );

        return () => {
            clearInterval(interval);
        }
    })

    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const user = useSelector(state => state.user.user);
    const handleDrawerClose = () => {
        setOpen(false);
    };
    return  (
        <div className="flex-row">
            <Header handleDrawerOpen={handleDrawerOpen} open={open}/>
            <Sidebar handleDrawerClose={handleDrawerClose} open={open} />
            <main className={classes.content}>
                <div className={classes.toolbar} />
                {
                    user && (

                        <Grid container spacing={3}>
                            <Grid item xs={2} >
                                <Avatar className="avt"  src={`${avatarURL}/${user.avatar}`} alt={user.fullName} />
                                <Typography variant="h6" color="textSecondary" className="mt-4">{user.fullName}</Typography>
                                <Typography variant="body1" color="textSecondary">{user.email}</Typography>
                                <Button variant="outlined" color="primary" fullWidth className="my-5">
                                    Cập nhật hồ sơ
                                </Button>
                                <Grid container justify="center" className="mt-5">
                                    <Clock value={value} />
                                </Grid>
                                <Typography style={{fontSize: '12px'}} className="mt-2 text-center" color="textSecondary">{moment().format('MMMM Do YYYY, h:mm:ss a')}</Typography>

                            </Grid>
                            <Grid item xs={10}>
                                {
                                    user.roleId && user.roleId.description.toLowerCase().indexOf('admin') !== -1 ?
                                        <DashBoardAdmin/> :
                                        <DashBoardStaff user={user}/>
                                }
                            </Grid>

                        </Grid>

                    )
                }

            </main>

        </div>
    )
}
