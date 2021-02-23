import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";

//MATERIAL COMPONENT
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

//MATERIAL ICON
import withStyles from "@material-ui/core/styles/withStyles";
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import KeyboardArrowDown from "@material-ui/icons/KeyboardArrowDown";
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import LocalGroceryStoreIcon from '@material-ui/icons/LocalGroceryStore';

//OTHER IMPORT
import logo from './../../assets/images/logo.png'
import Login from '../Login/Login';
import Register from "../Register/Register";
import {showLogin} from "../../features/show-dialog";
import {signOut} from "../../features/user";
import {avatarURL, productURL} from "../../utils/imageURL";
import './Header.scss';
import {getAllProductCategoryGroup, getProductCategory} from "../../features/product";
import {getCartSuccess, removeCartItemSuccess} from "../../features/cart";

//STYLE
const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
}));
const StyledBadge = withStyles((theme) => ({
    badge: {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: '$ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}))(Badge);
//--------------------------------------------------------------------------------------------
export const Header = () => {
    const dispatch = useDispatch();

    //effect
    useEffect(() => {
        dispatch(getAllProductCategoryGroup());
        dispatch(getCartSuccess());
    }, [dispatch])
    //--------------------------------------------------------------------------------------------

    const classes = useStyles();
    // state
    const [anchorEl, setAnchorEl] = useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
    const [authAnchorEl, setAuthAnchorEl] = useState(null);
    const [productAnchorEl, setProductAnchorEl] = useState(null);
    const [categoryAnchorEl, setCategoryAnchorEl] = useState(null);
    const [cartAnchorEl, setCartAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const isAuthAnchorEl = Boolean(authAnchorEl);
    const isCartAnchorEl = Boolean(cartAnchorEl);
    //--------------------------------------------------------------------------------------------

    //props
    const cart = useSelector(state => state.cart.cart);
    const userProps = useSelector(state => state.user);
    const productProps = useSelector(state => state.product);
    //--------------------------------------------------------------------------------------------

    //handle dialog login
    const showDialogLogin = () => {
        dispatch(showLogin());
    }
    //--------------------------------------------------------------------------------------------

    //handle menu mobile
    const handleMobileMenuOpen = event => {
        setMobileMoreAnchorEl(event.currentTarget);
    };
    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };
    //--------------------------------------------------------------------------------------------
    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    // handle menu profile user
    const handleAuthMenuOpen = event => {
        setAuthAnchorEl(event.currentTarget);
    };
    const handleAuthMenuClose = () => {
        setAuthAnchorEl(null);
    }
    //--------------------------------------------------------------------------------------------

    //handle menu product group
    const handleProductMenuOpen = event => {
        setProductAnchorEl(event.currentTarget);
    }
    const handleProductMenuClose = () => setProductAnchorEl(null);
    //--------------------------------------------------------------------------------------------

    //handle menu product category
    const handleCategoryMenuOpen = (event, idGroup) => {
        setCategoryAnchorEl(event.currentTarget);
        dispatch(getProductCategory({'group-id': idGroup}))
    }
    const handleCategoryMenuClose = () => setCategoryAnchorEl(null);
    //--------------------------------------------------------------------------------------------

    //handle menu cart
    const handleCartMenuOpen = (event) => {
        setCartAnchorEl(event.currentTarget);
    }
    const handleCartMenuClose = () => setCartAnchorEl(null);
    const onRemoveItemCart = (id) => {
        dispatch(removeCartItemSuccess(id));
    }
    //--------------------------------------------------------------------------------------------

    const handleCloseAll = () => {
        setCategoryAnchorEl(null);
        setProductAnchorEl(null);
    }
    const logOut = () => {
        dispatch(signOut());
        setAuthAnchorEl(null);
    }

    // MENU PRODUCT GROUP
    const renderProductMenu = productProps && productProps.productCategoryGroup && (
        <Menu className='product-menu'
            anchorEl={productAnchorEl}
            id="product-menu"
            keepMounted
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={Boolean(productAnchorEl)}
            onClose={handleProductMenuClose}
        >
            <Link to={'/product'} exact="true" >
                <MenuItem onClick={handleCloseAll}>
                    Tất cả sản phẩm
                </MenuItem>
            </Link>
            <Divider light />
            {
                productProps.productCategoryGroup.map((val, i) => {
                    return (
                        <div key={i}>
                            <MenuItem
                                onClick={e => handleCategoryMenuOpen(e, val._id)}
                            >
                                {val.name}
                            </MenuItem>
                            <Divider light />
                        </div>
                    )
                })
            }
        </Menu>
    );
    //--------------------------------------------------------------------------------------------

    //MENU PRODUCT CATEGORY
    const renderCategoryMenu = productProps && productProps.productCategory && (
        <Menu
            anchorEl={categoryAnchorEl}
            id="category-menu"
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={Boolean(categoryAnchorEl)}
            onClose={handleCategoryMenuClose}
        >
            {
                productProps.productCategory.map((val, i) => {
                    return productProps.productCategory ? (
                        <div key={i}>
                            <MenuItem
                                onClick={handleCloseAll}
                            >
                                <Link to={`/product/category/${val._id}`} exact="true">{val.name}</Link>
                            </MenuItem>
                            <Divider light />
                        </div>
                    ) : null
                })
            }
        </Menu>
    );
    //--------------------------------------------------------------------------------------------

    // MENU MOBILE CẤP 2
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id='primary-search-account-menu'
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}

            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        </Menu>
    );
    //--------------------------------------------------------------------------------------------

    //MENU MOBILE CẤP 1
    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton  color="inherit">
                    <LocalGroceryStoreIcon />
                </IconButton>
                <p>Cart</p>
            </MenuItem>
            <MenuItem>
                <IconButton  color="inherit">
                    <Badge badgeContent={11} color="secondary">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem onClick={showDialogLogin}>
                <IconButton
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>Login/ Register</p>
            </MenuItem>
        </Menu>
    );
    //--------------------------------------------------------------------------------------------

    //MENU PROFILE AFTER LOGIN
    const renderAuthMenu = userProps && userProps.user && (
        <Menu className="authMenu"
            anchorEl={authAnchorEl}
            getContentAnchorEl={null}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            id='auth-menu'
            keepMounted
            transformOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            open={isAuthAnchorEl}
            onClose={handleAuthMenuClose}
        >

            <Grid container className="pl-4 pr-8">
                <Typography variant="h6" >
                    { userProps.user.fullName }
                </Typography>
            </Grid>
            <Grid container className="px-4 pr-8">
                <Typography variant="body1" >
                    { userProps.user.email }
                </Typography>
            </Grid>
            <Divider className="my-2"/>
            <MenuItem>
                <Typography variant="body1" >
                    Profile
                </Typography>
            </MenuItem>
            <Link to="/my-order" exact="true">
                <MenuItem >
                    <Typography variant="body1" >
                        Đơn hàng của tôi
                    </Typography>
                </MenuItem>
            </Link>
            <MenuItem onClick={logOut}>
                <Typography variant="body1" >
                    Sign out
                </Typography>
            </MenuItem>
        </Menu>
    )
    //--------------------------------------------------------------------------------------------

    // MENU CART
    const renderCartMenu = cart && cart.length > 0  ? (
        <Menu className='cart-menu'
              anchorEl={cartAnchorEl}
              id="cart-menu"
              keepMounted
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              open={Boolean(isCartAnchorEl)}
              onClose={handleCartMenuClose}
        >
            <Grid className="px-4 py-3">
                {
                    cart.map((val, i) => (
                        <div key={i}>
                            <Grid container  direction="row" alignItems="center">
                                <Grid item xs={3}>
                                    <img className="image-cart" src={`${productURL}/${val.product.image}`} alt="img-product" />
                                </Grid>
                                <Grid item xs={7} style={{width: '180px'}}>
                                    <Typography variant={"subtitle2"}>{val.product.name}</Typography>
                                    <Typography variant={"body2"} color="textSecondary">Số lượng: {val.qty}</Typography>
                                </Grid>
                                <Grid item xs={2} container justify="center" alignItems="center">
                                    <CancelOutlinedIcon style={{color: '#7c7c7c'}} className="pointer" onClick={() => onRemoveItemCart(val.product._id)}/>
                                </Grid>
                            </Grid>
                            <Divider light/>
                        </div>

                    ))
                }
                <Link to='/cart' exact="true">
                    <Button variant="contained" color="primary"
                            className="text-uppercase w-100 mt-4"
                            onClick={handleCartMenuClose}>xem giỏ hàng
                    </Button>
                </Link>
            </Grid>
        </Menu>

    ) : (
        <Menu className='cart-menu'
              anchorEl={cartAnchorEl}
              id="cart-menu"
              keepMounted
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              open={Boolean(isCartAnchorEl)}
              onClose={handleCartMenuClose}
        >
            <Typography className="px-4 py-3" variant="subtitle2">Chưa có sản phẩm nào trong giỏ</Typography>
        </Menu>
    );
    //--------------------------------------------------------------------------------------------
    return (
        <div>
            <Login />
            <Register />
            <AppBar className="header">
                <Toolbar className="py-4">
                    <Link to={'/'} exact="true"><img src={logo} alt={logo}/></Link>

                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                        <Button
                            variant="contained"
                            color="secondary"
                            startIcon={<LocalHospitalIcon />}
                            onClick={handleProductMenuOpen}
                        >
                            <h4>Sản phẩm </h4>
                        </Button>

                        <IconButton aria-label="show cart notifications"
                                    color="inherit" className="mr-2"
                                    onClick={handleCartMenuOpen}>
                            {
                                <Badge badgeContent={cart && cart.length > 0 ? cart.length : 0} color="secondary">
                                    <LocalGroceryStoreIcon />
                                </Badge>
                            }
                        </IconButton>
                        <IconButton aria-label="show 17 new notifications" color="inherit" className="mr-2">
                            <Badge badgeContent={71} color="secondary">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                        {
                            userProps && userProps.isAuthenticated && userProps.user ?
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={handleAuthMenuOpen}
                            >
                                <StyledBadge
                                    className="badge"
                                    overlap="circle"
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'right',
                                    }}
                                    variant="dot"
                                >
                                    <Avatar className="img-avt mr-2" src={`${avatarURL}/${userProps.user.avatar}`} alt={userProps.user.fullName} />

                                </StyledBadge>
                                <KeyboardArrowDown/>
                            </Button> :
                            <Button
                                variant="contained"
                                color="secondary"
                                startIcon={<AccountCircle />}
                                onClick={showDialogLogin}
                            >
                                <h4>Login/ SignUp</h4>
                            </Button>
                        }
                    </div>
                    <div className={classes.sectionMobile}>
                        <IconButton
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
            {renderAuthMenu}
            {renderProductMenu}
            {renderCategoryMenu}
            {renderCartMenu}
        </div>
    );
}

