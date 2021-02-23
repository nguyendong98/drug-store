import React, {useEffect} from "react";
import Grid from "@material-ui/core/Grid";
import {useDispatch, useSelector} from "react-redux";
import {getProduct} from "../../../features/product";
import {ProductCard} from "../ProductCard/ProductCard";
import {PaginationControlled} from "../../../share/Pagination/Pagination";
import {Spinner} from "../../../share/Spinner/Spinner";
export const ProductContain = ({id, warehouse, profit}) => {
    const dispatch = useDispatch();
    useEffect(() => {
        if (id) {
            dispatch(getProduct({category: id, pageSize: 8, pageNumber: 1 }));
        } else {
            dispatch(getProduct({pageSize: 8, pageNumber: 1}))
        }

    }, [dispatch, id]);
    const products = useSelector(state => state.product.products);
    return !products && products.result.length === 0 ? <Spinner /> : (
        <>
            <Grid container spacing={2} className="pl-8" direction="row" alignItems="stretch" justify="flex-start">
                {
                    products && products.result && products.result.map((val, i) => (
                        <Grid item xs={3} key={i}>
                            <ProductCard data={val} warehouse={warehouse} profit={profit}></ProductCard>
                        </Grid>
                    ))
                }
            </Grid>
            <Grid container direction="row" justify="center" className="mt-5">
                <PaginationControlled data={products} id={id} type={"product"}></PaginationControlled>
            </Grid>
        </>

    )
}
