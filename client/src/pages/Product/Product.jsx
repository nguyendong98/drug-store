import React, {useEffect} from "react";
import Grid from "@material-ui/core/Grid";
import {ProductSideBar} from "./ProductSideBar/ProductSideBar"
import {ProductContain} from "./ProductContain/ProductContain";
import {ProductHead} from "./ProductHead/ProductHead";
import {getCategoryCurrent, getProduct, getProductTree, getProfit} from "../../features/product";
import {useDispatch, useSelector} from "react-redux";
import {getWarehouse} from "../../features/receipt";
import {Spinner} from '../../share/Spinner/Spinner';
export const Product = ({match}) => {
    const dispatch = useDispatch();
    useEffect(() => {
        if (match.params.id) {
            dispatch(getCategoryCurrent(match.params.id));
            dispatch(getProduct({category: match.params.id, pageSize: 8, pageNumber: 1 }));
        } else {
            dispatch(getProduct({pageSize: 8, pageNumber: 1}));
        }
    }, [dispatch, match.params.id]);
    useEffect(() => {
        dispatch(getProductTree());
        dispatch(getWarehouse());
        dispatch(getProfit());
    }, [dispatch])
    const warehouse = useSelector(state => state.receipt.warehouse);
    const currentCategory = useSelector(state => state.product.categoryCurrent);
    const profit = useSelector(state => state.product.profit);
    const productProps = useSelector(state => state.product);
    const products = productProps.products;
    return productProps && productProps.productTree ? (
        <>
            <ProductHead currentCategory={currentCategory} id={match.params.id}/>
            <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
                className="p-5"
            >
                <Grid container direction="column" justify="center" item  xs={12} md={3}>
                    <ProductSideBar id={match.params.id} productProps={productProps}/>
                </Grid>
                <Grid container item xs={12} md={9}>
                    <ProductContain id={match.params.id} warehouse={warehouse} products={products} profit={profit}/>
                </Grid>

            </Grid>
        </>
    ) : <Spinner />
}
