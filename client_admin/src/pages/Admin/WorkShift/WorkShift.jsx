import React, {useEffect} from "react";
import "./WorkShift.scss";
import {makeStyles} from "@material-ui/core/styles";
import {useDispatch, useSelector} from "react-redux";
import setAuthToken from "../../../utils/setAuthToken";
import {loadUser} from "../../../features/user";
import {Header} from "../../../components/Header/Header";
import {Sidebar} from "../../../components/Sidebar/Sidebar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import AddSharpIcon from '@material-ui/icons/AddSharp';
import {WorkShiftForm} from "./WorkShiftForm/WorkShiftForm";
import {deleteWorkShift, getAllWorkShift} from "../../../features/work-shift";
import {Spinner} from "../../../share/Spinner/Spinner";
import DoneOutlineRoundedIcon from '@material-ui/icons/DoneOutlineRounded';
import RadioButtonCheckedTwoToneIcon from '@material-ui/icons/RadioButtonCheckedTwoTone';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import Divider from "@material-ui/core/Divider";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

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

export const WorkShift = () => {
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

    const workShifts = useSelector(state => state.workShift.workShifts);
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    return workShifts && workShifts.length > 0 ?  (
        <>
            <WorkShiftForm open={openForm} closeDialogForm={onCloseDialogForm} />
            <div className="flex-row">
                <Header handleDrawerOpen={handleDrawerOpen} open={open}/>
                <Sidebar handleDrawerClose={handleDrawerClose} open={open} />
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <Paper className="py-4">
                        <Typography className="ml-6 mb-4" variant="h6">Quản lý ca trực</Typography>
                        <Grid className="work-shift-contain py-5 px-5 my-5 mx-6" >
                            <Grid container className="mb-8" alignItems="center">
                                <RadioButtonCheckedTwoToneIcon style={{color: "#10847e"}}/>
                                <Typography className="font-weight-bold ml-3" variant="subtitle1">Thiết lập ca trực theo khung giờ</Typography>

                            </Grid>
                            {
                                workShifts.map((val, i) => (
                                    <div key={i}>
                                        <Grid container justify="flex-start" alignItems="center"  className="py-2 px-8  work-shift-item">
                                            <Grid item xs={2}>
                                                <DoneOutlineRoundedIcon style={{color: "#10847e"}}/>
                                            </Grid>
                                            <Grid item xs={3}>
                                                <Typography variant="subtitle1" className="font-weight-bold">
                                                    {val.name}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={5}>
                                                <Typography variant="subtitle1" className="font-weight-bold" color="textSecondary">
                                                    Bắt đầu {val.startTime} ~ {val.endTime}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={1}>
                                                <EditTwoToneIcon />
                                            </Grid>
                                            <Grid item xs={1}>
                                                <HighlightOffIcon onClick={() => dispatch(deleteWorkShift(val._id))}/>
                                            </Grid>
                                        </Grid>
                                        <Divider light />
                                    </div>


                                ))
                            }
                            <Grid container justify="center" className="mt-10">
                                <Button variant="outlined" color="primary"
                                        type="button"
                                        onClick={() => setOpenForm(true)}
                                        className="text-uppercase w-20"
                                        endIcon={<AddSharpIcon />}>

                                    Thêm ca trực
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>

                </main>
            </div>
        </>

    ) : <Spinner />;
}
