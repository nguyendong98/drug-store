import React, {useEffect} from "react";
import Grid from "@material-ui/core/Grid";
import {ProductSideBar} from "./ProductSideBar/ProductSideBar"
import {ProductContain} from "./ProductContain/ProductContain";
import {ProductHead} from "./ProductHead/ProductHead";
import {getCategoryCurrent, getProfit} from "../../features/product";
import {useDispatch, useSelector} from "react-redux";
import {getWarehouse} from "../../features/receipt";
export const Product = ({match}) => {
    const dispatch = useDispatch();
    useEffect(() => {
        if (match.params.id) {
            dispatch(getCategoryCurrent(match.params.id));
        }
        dispatch(getWarehouse());
        dispatch(getProfit());
    }, [dispatch, match.params.id]);
    const warehouse = useSelector(state => state.receipt.warehouse);
    const currentCategory = useSelector(state => state.product.categoryCurrent);
    const profit = useSelector(state => state.product.profit);
    return (
        <>
            <ProductHead currentCategory={currentCategory} id={match.params.id}/>
            <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
                className="p-5"
            >
                <Grid container direction="column" justify="center" item xs={3}>
                    <ProductSideBar id={match.params.id} />
                </Grid>
                <Grid container item xs={9}>
                    <ProductContain id={match.params.id} warehouse={warehouse} profit={profit}/>
                </Grid>

            </Grid>
        </>
    )
}
