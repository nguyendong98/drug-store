import React from "react";
import Grid from "@material-ui/core/Grid";
import "./ProductSideBar.scss";
import {AccordionProduct} from "../AccordionProduct/AccordionProduct";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import {Hidden} from '@material-ui/core';
import {ThemeProvider} from '@material-ui/core/styles';
import theme from '../../../share/Theme/Theme';


export const ProductSideBar = ({id, productProps, currentCategory}) => {
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
                <Grid container style={{flexWrap: 'nowrap', overflowX: 'scroll'}} className="nav">
                    {
                        productProps && productProps.productTree && productProps.productTree.map((val, i) => (
                            <Grid key={i} item className={id === currentCategory ? 'px-2 py-2 mr-2 active_nav' : 'px-2 py-2 mr-2'}>
                                <ThemeProvider theme={theme}>
                                    <Typography variant="h5" noWrap>
                                        {val.name}
                                    </Typography>
                                </ThemeProvider>
                            </Grid>
                        ))
                    }
                </Grid>
            </Hidden>
        </>

    )
}
