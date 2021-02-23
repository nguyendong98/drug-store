import React from 'react';
import "./ProductCard.scss";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ShareIcon from '@material-ui/icons/Share';
import {productURL} from "../../../utils/imageURL";
import {Link} from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {useDispatch} from "react-redux";
import {createCartSuccess} from "../../../features/cart";
import {getInventory} from "../../../utils/function";
import Chip from "@material-ui/core/Chip";


export const ProductCard = ({data, warehouse, profit}) => {
    const dispatch = useDispatch();
    const addToCart = (data) => {
        const product = {
            _id: data._id,
            name: data.name,
            image: data.image
        }
        dispatch(createCartSuccess(product));
    }
    return (
        <Card>

            <img style={{cursor: 'pointer'}} className="product-img" src={`${productURL}/${data.image}`} alt="product-img"/>


            <CardContent>
                <Typography className="text-uppercase font-weight-bold" variant="body2" color="textSecondary" gutterBottom>
                    {data['idCategory'] && data['idCategory']['idGroup'] && data['idCategory']['idGroup'].name}
                </Typography>
                <Link style={{cursor: 'pointer'}} to={`/product/${data._id}`} exact="true">
                    <Typography className="product-name font-weight-bold" variant="subtitle1">
                        {data.name}
                    </Typography>
                    <div className="flex-row align-items-center justify-content-between">
                        <Typography  variant="subtitle1">
                            <span style={{color: '#10847e', fontSize: '20px'}}>{profit && (data.idPrice.price * (100 + profit.profit)/100).toLocaleString()}</span>/{data.idUnit.name}
                        </Typography>
                        { getInventory(warehouse, data._id) === 0  ?
                            <Chip size="small" color="secondary" label="Hết hàng"/> :
                            <Chip  size="small" color="primary" label="Còn hàng"/>
                        }
                    </div>
                </Link>
            </CardContent>
            <CardActions disableSpacing>
                <Grid container direction="row" alignItems="center">
                    <Grid item xs={4} container direction="row">
                        <IconButton aria-label="share">
                            <ShareIcon />
                        </IconButton>
                    </Grid>
                    <Grid  item xs={8} container  direction="row" justify="flex-end" alignItems="center">
                        <Button disabled={getInventory(warehouse, data._id) === 0 ? true : false} variant="outlined" color="primary" onClick={() => addToCart(data)}>
                            Thêm vào giỏ
                        </Button>
                    </Grid>
                </Grid>


            </CardActions>

        </Card>
    );
}
