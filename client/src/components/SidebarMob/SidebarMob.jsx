import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import BeachAccessTwoToneIcon from '@material-ui/icons/BeachAccessTwoTone';
import {Link} from 'react-router-dom';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Badge from '@material-ui/core/Badge';
import LocalGroceryStoreIcon from '@material-ui/icons/LocalGroceryStore';
import {avatarURL} from '../../utils/imageURL';
import Avatar from '@material-ui/core/Avatar';
import AccountCircle from '@material-ui/icons/AccountCircle';
import {useDispatch} from 'react-redux';
import {showLogin} from './../../features/show-dialog';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import withStyles from '@material-ui/core/styles/withStyles';
import {signOut} from '../../features/user';

const useStyles = makeStyles({
    list: {
        width: 350,
    },
});
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
export const SidebarMob = ({anchor, open, close, cart, user}) => {
    const classes = useStyles();
    const dispatch = useDispatch();



    return (
        <React.Fragment key='left'>
            <SwipeableDrawer
                anchor='left'
                open={anchor['left']}
                onClose={close}
                onOpen={open}
            >
                <div
                    className={classes.list}
                    role="presentation"
                    onClick={close}
                    onKeyDown={close}
                >
                    <List></List>
                    {
                        user && user.user ? (
                            <ListItem button>
                                <ListItemIcon>
                                    <StyledBadge
                                        className="badge"
                                        overlap="circle"
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'right',
                                        }}
                                        variant="dot"
                                    >
                                        <Avatar className="img-avt mr-2" src={`${avatarURL}/${user.user.avatar}`} alt={user.user.fullName} />
                                    </StyledBadge>
                                </ListItemIcon>

                                <ListItemText>{user.user.fullName}</ListItemText>
                            </ListItem>
                        ) : (
                            <ListItem button onClick={() => dispatch(showLogin())}>
                                <ListItemIcon><AccountCircle /></ListItemIcon>
                                <ListItemText>Đăng ký/ Đăng nhập</ListItemText>
                            </ListItem>
                        )

                    }

                    <List>
                        <Link to="/product">
                            <ListItem button>
                                <ListItemIcon><BeachAccessTwoToneIcon /></ListItemIcon>
                                <ListItemText>Sản phẩm</ListItemText>
                            </ListItem>
                        </Link>
                    </List>
                    <List>
                        <ListItem button>
                            <ListItemIcon>
                                <Badge badgeContent={71} color="secondary">
                                    <NotificationsIcon />
                                </Badge>
                            </ListItemIcon>
                            <ListItemText>Thông báo</ListItemText>
                        </ListItem>
                    </List>
                    <Divider />
                    <List>
                        <Link to="/cart">
                            <ListItem button>
                                <ListItemIcon>
                                    <Badge badgeContent={cart && cart.length > 0 ? cart.length : 0} color="secondary">
                                        <LocalGroceryStoreIcon />
                                    </Badge>
                                </ListItemIcon>
                                <ListItemText>Giỏ hàng của bạn</ListItemText>
                            </ListItem>
                        </Link>
                    </List>
                    {

                        user && user.user && (
                            <React.Fragment>
                                <ListItem button onClick={() => dispatch(signOut())}>
                                    <ListItemIcon><ExitToAppIcon /></ListItemIcon>
                                    <ListItemText>Đăng xuất</ListItemText>
                                </ListItem>
                            </React.Fragment>

                        )


                    }

                </div>
            </SwipeableDrawer>
        </React.Fragment>

    )
}
