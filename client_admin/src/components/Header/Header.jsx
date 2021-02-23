import React from "react";
import clsx from "clsx";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AppBar from "@material-ui/core/AppBar";
import {makeStyles} from "@material-ui/core/styles";
import Badge from "@material-ui/core/Badge";
import {useDispatch, useSelector} from "react-redux";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import {avatarURL} from "../../utils/imageURL";
import NotificationsIcon from '@material-ui/icons/Notifications';
import withStyles from "@material-ui/core/styles/withStyles";
import PowerSettingsNewOutlinedIcon from '@material-ui/icons/PowerSettingsNewOutlined';
import "./Header.scss"
import {signOut} from "../../features/user";


const drawerWidth = 240;


const useStyles = makeStyles((theme) => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    toolBarEnd: {
        justifyContent: 'flex-end'
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
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
export const Header = ({handleDrawerOpen, open}) => {
    const classes = useStyles();
    const onHandleDrawerOpen = () => handleDrawerOpen();
    const userProps = useSelector(state => state.user);
    const dispatch = useDispatch();
    const onLogout = () => dispatch(signOut());
    return (
        <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
                [classes.appBarShift]: open,
            })}

        >
            <Toolbar className={clsx(classes.toolbar, {
                [classes.toolBarEnd]: open
            })}>
                <IconButton
                    aria-label="open drawer"
                    onClick={onHandleDrawerOpen}
                    color="inherit"
                    edge="start"
                    className={clsx(classes.menuButton, {
                        [classes.hide]: open,
                    })}
                >
                    <MenuIcon />
                </IconButton>
                <div className="flex-row justify-content-end ">
                    <IconButton aria-label="show 17 new notifications" color="inherit" className="icon-badge">
                        <Badge badgeContent={71} color="secondary">
                            <NotificationsIcon/>
                        </Badge>
                    </IconButton>
                    {
                        userProps && userProps.isAuthenticated && userProps.user ?
                            <Button
                                variant="contained"
                                color="secondary"
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

                            </Button> : ''

                    }
                    <IconButton color="inherit" onClick={onLogout}>
                        <PowerSettingsNewOutlinedIcon />
                    </IconButton>

                </div>

            </Toolbar>
        </AppBar>
    )
}
