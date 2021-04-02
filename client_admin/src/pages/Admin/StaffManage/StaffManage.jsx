import React, {useEffect} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {useDispatch, useSelector} from "react-redux";
import setAuthToken from "../../../utils/setAuthToken";
import {getAllUser, loadUser} from "../../../features/user";
import {Header} from "../../../components/Header/Header";
import {Sidebar} from "../../../components/Sidebar/Sidebar";
import {StaffManageTable} from "./StaffManageTable/StaffManageTable";

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
export const StaffManage = () => {

        const classes = useStyles();
        const dispatch = useDispatch();
        const [open, setOpen] = React.useState(false);


        useEffect(() => {
            if (localStorage['x-auth-token']) {
                setAuthToken(localStorage['x-auth-token']);
                dispatch(loadUser());
            }
            dispatch(getAllUser({pageSize: 1000, pageNumber: 1, idRole: '60352e5531071b084cbe4db8'}));
        }, [dispatch]);

        const handleDrawerOpen = () => {
            setOpen(true);
        };
        const handleDrawerClose = () => {
            setOpen(false);
        };
        const users = useSelector(state => state.user.users);
        return  (
            <div className="flex-row">
                <Header handleDrawerOpen={handleDrawerOpen} open={open}/>
                <Sidebar handleDrawerClose={handleDrawerClose} open={open} />
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <StaffManageTable data={users} />
                </main>
            </div>
        );

}
