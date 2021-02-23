import React, {useEffect} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {useDispatch, useSelector} from "react-redux";
import setAuthToken from "../../../utils/setAuthToken";
import {loadUser} from "../../../features/user";
import {Header} from "../../../components/Header/Header";
import {Sidebar} from "../../../components/Sidebar/Sidebar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import {CalendarForm} from "./CalendarForm/CalendarForm";
import {CalendarView} from "./CalendarView/CalendarView";
import AddSharpIcon from "@material-ui/icons/AddSharp";
import {getAllWorkShift} from "../../../features/work-shift";

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

export const CalendarManage = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    const [openForm, setOpenForm] = React.useState(false);
    const onCloseDialogForm = () => {
        setOpenForm(false);
    }

    useEffect(() => {
        if (localStorage['x-auth-token']) {
            setAuthToken(localStorage['x-auth-token']);
            dispatch(loadUser());
        }
        dispatch(getAllWorkShift());
    }, [dispatch]);
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };
    const workShifts = useSelector(state => state.workShift.workShifts);

    return  (
        <>
            <CalendarForm open={openForm} closeDialogForm={onCloseDialogForm} workShifts={workShifts}/>
            <div className="flex-row">
                <Header handleDrawerOpen={handleDrawerOpen} open={open}/>
                <Sidebar handleDrawerClose={handleDrawerClose} open={open} />
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <Paper className="py-4 px-6">
                        <Typography className="mb-4" variant="h6">Quản lý lịch làm việc</Typography>
                        <Button type="button" variant="outlined" color="primary" endIcon={<AddSharpIcon />} onClick={() => setOpenForm(true)}>
                            Tạo lịch làm việc
                        </Button>
                        <CalendarView workShifts={workShifts}/>
                    </Paper>
                </main>
            </div>
        </>

    );
}
