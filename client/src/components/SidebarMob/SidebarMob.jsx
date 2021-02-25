import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Button from '@material-ui/core/Button';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';


const useStyles = makeStyles({
    list: {
        width: 250,
    },
});
export const SidebarMob = ({anchor}) => {
    const classes = useStyles();




    return (
        <React.Fragment key='left'>
            <SwipeableDrawer
                anchor='left'
                open={anchor['left']}
                onClose={toggleDrawer('left', false)}
                onOpen={toggleDrawer('left', true)}
            >
                <div>dadsadsadsa</div>
            </SwipeableDrawer>
        </React.Fragment>

    )
}
