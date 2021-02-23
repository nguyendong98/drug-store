import React, {useEffect} from "react";
import Typography from "@material-ui/core/Typography";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
import {useDispatch, useSelector} from "react-redux";
import {createComment, getAllFeedBack} from "../../../features/feedback";
import Grid from "@material-ui/core/Grid";
import "./FeedbackTab.scss";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {ListFeedBack} from "../ListFeedBack/ListFeedBack";
import {avatarURL} from "../../../utils/imageURL";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
const labels = {
    0.5: 'Useless',
    1: 'Useless+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+',
};
export const FeedbackTab = ({id}) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllFeedBack({product: id, pageSize: 5, pageNumber: 1}));
    }, [dispatch, id]);
    const feedBack = useSelector(state => state.feedback);
    const auth = useSelector(state => state.user.user);

    const [value, setValue] = React.useState(null);
    const [hover, setHover] = React.useState(-1);
    const [comment, setComment] = React.useState('');
    const onSubmitFeedback = () => {
        const data = {
            idProduct: id,
            idAccount: auth._id,
            comment,
            star: value
        }
        dispatch(createComment(data));
        setValue(null);
        setComment('');
    }
    return (
        <>
            <Typography variant="h4" gutterBottom className="font-weight-bold">
                Đánh giá
            </Typography>
            {
                feedBack.feedBacks && feedBack.feedBacks.result.length === 0 ?
                    <Typography variant="subtitle1" gutterBottom className="font-weight-bold">
                    Chưa có đánh giá nào cho sản phẩm này
                </Typography> : ''
            }
            <Grid className="feedback-contain py-5 px-5 mt-5">
                {
                    auth ? <>
                        <Typography variant="h6" className="font-weight-bold">
                            Đánh giá của bạn
                        </Typography>
                        <Grid container direction="row" justify="flex-start" alignItems="center" className="mt-2 mb-3">
                            <Rating
                                name="hover-feedback"
                                value={value}
                                precision={0.5}
                                onChange={(event, newValue) => {
                                    setValue(newValue);
                                    console.log(value);
                                }}
                                onChangeActive={(event, newHover) => {
                                    setHover(newHover);
                                }}
                            />
                            <Grid item>
                                {value !== null && <Box ml={2}>{labels[hover !== -1 ? hover : value]}</Box>}
                            </Grid>
                        </Grid>
                        <Typography variant="h6" className="font-weight-bold mb-2">
                            Nhận xét của bạn
                        </Typography>
                        <Grid container item className="mb-3" alignItems="center">
                            <Avatar alt="avatar" src={`${avatarURL}/${auth.avatar}`} />
                            <Typography className="ml-2 email">{auth.email}</Typography>
                        </Grid>
                        <CKEditor
                            editor={ ClassicEditor }
                            data={comment}
                            onChange={ ( event, editor ) => {
                                const data = editor.getData();
                                setComment(data);
                            } }
                            onBlur={ ( event, editor ) => {
                                console.log( 'Blur.', editor );
                            } }
                            onFocus={ ( event, editor ) => {
                                console.log( 'Focus.', editor );
                            } }
                        />
                        <Button className="mt-1" variant="contained" color="primary" disabled={comment === '' || value === null} onClick={onSubmitFeedback}>
                            Bình luận
                        </Button>
                    </> : <Typography variant="subtitle1" className=" mb-2">
                        Hãy đăng nhập để đưa ra đánh giá của bạn về sản phẩm
                    </Typography>
                }

                <ListFeedBack feedBack={feedBack.feedBacks} id={id}/>

            </Grid>


        </>
    )
}
