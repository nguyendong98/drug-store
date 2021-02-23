import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import {avatarURL} from "../../../utils/imageURL";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Moment from "react-moment";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import "./ListFeedBack.scss";
import {PaginationControlled} from "../../../share/Pagination/Pagination";
export const ListFeedBack = ({feedBack, id}) => {
    return (
        <>
            <List>
                {feedBack && feedBack.result && feedBack.result.length > 0 && feedBack.result.map(val => {
                    return (
                        <React.Fragment key={val._id}>
                            <ListItem key={val._id} alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar alt="avatar" src={`${avatarURL}/${val.idAccount.avatar}`} />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={
                                        <Grid container direction="row" alignItems="center">
                                            <Typography>
                                                {val.idAccount.username}
                                            </Typography>
                                            <Moment className="ml-2 date" fromNow ago>{val.createAt}</Moment>
                                            <small className="date ml-1"> ago</small>
                                        </Grid>
                                    }
                                    secondary={
                                        <>
                                            <Typography
                                                component="span"
                                                variant="body2"
                                                color="textPrimary"
                                                dangerouslySetInnerHTML={{__html: val.comment}}
                                            >
                                            </Typography>
                                            {` - ${val.star}`}
                                        </>
                                    }
                                />
                            </ListItem>
                            <Divider />
                        </React.Fragment>
                    );
                })}
            </List>

            <PaginationControlled data={feedBack} id={id}  type={"feedback"} />
        </>
    )
}
