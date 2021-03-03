import React from "react";
import Grid from "@material-ui/core/Grid";
import {ProductCard} from "../ProductCard/ProductCard";
import {PaginationControlled} from "../../../share/Pagination/Pagination";
import {Spinner} from "../../../share/Spinner/Spinner";
export const ProductContain = ({id, warehouse, profit, products}) => {

    return !products && products.result.length === 0 ? <Spinner /> : (
        <>
            <Grid container  spacing={2} className="pl-0 mt-2 pl-md-8 pl-lg-8 " direction="row" alignItems="stretch" justify="flex-start">
                {
                    products && products.result && products.result.map((val, i) => (
                        <Grid item xs={12}  sm={5} md={5} lg={3} key={i}>
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
