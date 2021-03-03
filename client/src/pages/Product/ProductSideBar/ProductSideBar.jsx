import React from "react";
import Grid from "@material-ui/core/Grid";
import "./ProductSideBar.scss";
import {AccordionProduct} from "../AccordionProduct/AccordionProduct";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import {Hidden} from '@material-ui/core';
export const ProductSideBar = ({id, productProps}) => {
    console.log(productProps);
    return (
        <>
            <Hidden smDown>
                <Grid className="pb-3">
                    <Typography variant="h5" >
                        Danh mục
                    </Typography>
                    <Divider style={{width: '50px', height: '4px'}}/>
                </Grid>
                <AccordionProduct id={id} productProps={productProps}></AccordionProduct>
            </Hidden>
            <Hidden mdUp>
                <Grid container style={{flexWrap: 'nowrap', overflowX: 'scroll'}}>
                    {
                        productProps && productProps.productTree && productProps.productTree.map((val, i) => (
                            <Grid item className="px-2">
                                <Typography variant="h5" noWrap>
                                    {val.name}
                                </Typography>
                            </Grid>
                        ))
                    }

                </Grid>
            </Hidden>
        </>

    )
}
