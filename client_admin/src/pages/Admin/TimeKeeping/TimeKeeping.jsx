import React, {useEffect} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {useDispatch, useSelector} from "react-redux";
import setAuthToken from "../../../utils/setAuthToken";
import {getAllUser, loadUser} from "../../../features/user";
import {Header} from "../../../components/Header/Header";
import {Sidebar} from "../../../components/Sidebar/Sidebar";
import {TimeKeepingTable} from "./TimeKeepingTable/TimeKeepingTable";
import Paper from "@material-ui/core/Paper";
import {getSalary} from "../../../features/calendar";


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
export const TimeKeeping = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);


    useEffect(() => {
        if (localStorage['x-auth-token']) {
            setAuthToken(localStorage['x-auth-token']);
            dispatch(loadUser());
            dispatch(getSalary());
        }
        dispatch(getAllUser({pageSize: 1000, pageNumber: 1, idRole: '5f8c5388c931110a4acf9b69'}));
    }, [dispatch]);

    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };
    const users = useSelector(state => state.user.users);
    const salary = useSelector(state => state.calendar.salary);

    return (
        <div className="flex-row">
            <Header handleDrawerOpen={handleDrawerOpen} open={open}/>
            <Sidebar handleDrawerClose={handleDrawerClose} open={open} />
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Paper>
                    <TimeKeepingTable data={users} salary={salary}/>
                </Paper>
            </main>
        </div>
    )
}
