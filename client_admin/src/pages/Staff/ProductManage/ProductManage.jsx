import React, {useEffect} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {useDispatch, useSelector} from "react-redux";
import setAuthToken from "../../../utils/setAuthToken";
import {loadUser} from "../../../features/user";
import {Header} from "../../../components/Header/Header";
import {Sidebar} from "../../../components/Sidebar/Sidebar";
import {getListProduct} from "../../../features/product";
import {ProductManageTable} from "./ProductManageTable/ProductManageTable";
import {getWarehouse} from "../../../features/receipt";
import Paper from "@material-ui/core/Paper";

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

export const ProductManage = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);


    useEffect(() => {
        if (localStorage['x-auth-token']) {
            setAuthToken(localStorage['x-auth-token']);
            dispatch(loadUser());
        }
        dispatch(getListProduct({pageSize: 1000, pageNumber: 1}));
        dispatch(getWarehouse());
    }, [dispatch]);
    const warehouse = useSelector(state => state.receipt.warehouse)
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };
    const listProduct = useSelector(state => state.product.listProduct);
    const user = useSelector(state => state.user.user);
    return  (
        <div className="flex-row">
            <Header handleDrawerOpen={handleDrawerOpen} open={open}/>
            <Sidebar handleDrawerClose={handleDrawerClose} open={open} />
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Paper>
                    <ProductManageTable user={user} data={listProduct} warehouse={warehouse}/>
                </Paper>
            </main>
        </div>
    );
}
