import React from "react";
import Grid from "@material-ui/core/Grid";
import {productURL} from "../../../utils/constant";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import {createCartSuccess} from "../../../features/cart";
import {useDispatch} from "react-redux";
import {getInventory} from "../../../utils/function";
import Chip from "@material-ui/core/Chip";
import './DetailDescription.scss';
import {setAlert} from '../../../features/alert';
export const DetailDescription = ({product, warehouse, profit}) => {
    const dispatch = useDispatch();
    const addToCart = (data) => {
        const product = {
            _id: data._id,
            name: data.name,
            image: data.image
        }
        dispatch(createCartSuccess(product));
    }
    return product && (
        <>
            <Grid container item xs={12} sm={5} md={6} direction="row" justify="center">
                <img src={`${productURL}/${product.image}`} className="detail-img" alt="product-img"/>
                <i><Typography className="product-title" variant="h6" gutterBottom>
                    Sản phẩm chính hãng, mẫu mã thay đổi theo lô hàng
                </Typography></i>
            </Grid>
            <Grid item xs={12} sm={7} md={6} >
                <Typography className="product-title" variant="h3" gutterBottom>
                    {product.name}
                </Typography>
                <Divider style={{width: '50px', height: '3px'}} className="mb-3"/>
                <Typography variant="h5" gutterBottom>{profit && (product.idPrice.price * (100 + profit.profit)/100).toLocaleString()}/ {product.idUnit.name}</Typography>
                <Typography variant="h6" gutterBottom>{product.description}</Typography>
                <Grid item container direction="row" justify="flex-start" alignItems="center" className="mt-3 mb-5">
                    <Button variant="contained" color="primary"
                            className="mr-5"
                            disabled={getInventory(warehouse, product._id) === 0 ? true : false}
                            onClick={() => {
                                addToCart(product);
                                dispatch(setAlert(true, 'Thêm vào giỏ thành công', 'success'))
                            }}>
                        THÊM VÀO GIỎ
                    </Button>
                </Grid>
                { getInventory(warehouse, product._id) === 0  ?
                    <Chip size="small" className="mb-5" color="secondary" label="Hết hàng"/> :
                    <Chip  size="small" className="mb-5" color="primary" label="Còn hàng"/>
                }
                <Divider className="mb-1"/>
                <Typography variant="h6" gutterBottom>
                    Danh mục: {product.idCategory.idGroup.name}, {product.idCategory.name}
                </Typography>
                <Divider />
            </Grid>

        </>
    )
}
