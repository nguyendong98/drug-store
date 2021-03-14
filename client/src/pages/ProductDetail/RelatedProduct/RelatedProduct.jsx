import React, {useEffect} from "react";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import {useDispatch, useSelector} from "react-redux";
import {getProduct} from "../../../features/product";
import Grid from "@material-ui/core/Grid";
import Slider from "react-slick";
import {ProductCard} from "../../Product/ProductCard/ProductCard";
export const RelatedProduct = ({product, warehouse, profit}) => {
    const dispatch = useDispatch();
    const idCategory = product && product['idCategory']._id ? product['idCategory']._id : '';
    useEffect(() => {
        dispatch(getProduct({category: idCategory, pageNumber: 1, pageSize: 1000}));
    }, [dispatch, idCategory]);
    const products = useSelector(state => state.product.products.result);
    const productsRelated = products && product && products.filter(val => val._id !== product._id);
    const showProductRelated = () => {
        if (productsRelated && productsRelated.length > 0) {
            const data = []
            for (let i = 0; i < Math.ceil(productsRelated.length / 4); i++) {
                const productSlide = productsRelated.splice(Math.floor(Math.random() * productsRelated.length) - 3, 4);
                data.push(productSlide);
            }
            return data.map((val1, i) => (
                <Grid direction="row" container key={i} className="px-4 py-4">
                    <Grid direction="row" container spacing={3}>
                        {
                            val1.map((val, i) => (
                                <Grid xs={12} sm={6} md={3} item key={i}>
                                    <ProductCard data={val} warehouse={warehouse} profit={profit}/>
                                </Grid>
                            ))
                        }
                    </Grid>
                </Grid>
            ))
        }
    }
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    return (
        <>
            <Divider light style={{height: '4px'}}></Divider>
            <Typography variant="h5" className="mt-3 mb-5 font-weight-bold">SẢN PHẨM LIÊN QUAN</Typography>
            <Grid xs={12} item>
                <Slider {...settings}>
                    {showProductRelated()}
                </Slider>

            </Grid>
        </>
    )
}
