import React from "react";
import Grid from "@material-ui/core/Grid";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import {Link} from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import HomeIcon from "@material-ui/icons/Home";
import {useDispatch} from "react-redux";
import {removeCategoryCurrent} from "../../../features/product";
import {ThemeProvider} from '@material-ui/core/styles';
import theme from '../../../share/Theme/Theme';
export const Breadcrumb = ({product}) => {
    const dispatch = useDispatch();
    const onChangeCurrentCategory = () => {
        dispatch(removeCategoryCurrent())
    }
    return (
        <Grid container alignItems="center" className="pb-3">
            <Grid item xs={12} className="mt-0 mt-md-6">
                <Breadcrumbs aria-label="breadcrumb">
                    <Link to="/" exact="true" onClick={onChangeCurrentCategory}>
                        <ThemeProvider theme={theme}>
                            <Typography variant="h6" className="flex-row justify-content-center align-items-center">
                                <HomeIcon  className="mr-2"/>
                                <span>Trang chủ</span>
                            </Typography>
                        </ThemeProvider>
                    </Link>
                    <Link to="/product" exact="true" onClick={onChangeCurrentCategory}>
                        <Typography variant="h6" className="flex-row justify-content-center align-items-center">
                            <span>Sản phẩm</span>
                        </Typography>
                    </Link>
                    {
                        product && (
                            <Link to={`/product/category/${product['idCategory']._id}`} exact="true">
                                <Typography variant="h6" >
                                    {product['idCategory']['idGroup'].name}
                                </Typography>

                            </Link>
                        )
                    }
                    {
                        product && (
                            <Link to={`/product/category/${product['idCategory']._id}`} exact="true">
                                <Typography variant="h6" >
                                    {product['idCategory'].name}
                                </Typography>
                            </Link>
                        )
                    }

                </Breadcrumbs>
            </Grid>

        </Grid>
    )
}
