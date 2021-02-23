import React from "react";
import Grid from "@material-ui/core/Grid";
import "./ProductSideBar.scss";
import {AccordionProduct} from "../AccordionProduct/AccordionProduct";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
export const ProductSideBar = ({id}) => {
    return (
        <Grid item xs={12}>
            <Grid className="pb-3">
                <Typography variant="h5" >
                    CATEGORY
                </Typography>
                <Divider style={{width: '50px', height: '4px'}}/>
            </Grid>
            <AccordionProduct id={id}></AccordionProduct>

        </Grid>
    )
}
