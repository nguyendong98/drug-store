import React from "react";
import Grid from "@material-ui/core/Grid";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import {Link} from "react-router-dom";
import HomeIcon from '@material-ui/icons/Home';
import Typography from "@material-ui/core/Typography";
import {useDispatch} from "react-redux";
import {getProduct, removeCategoryCurrent} from "../../../features/product";
import InputAdornment from "@material-ui/core/InputAdornment";
import SettingsVoiceIcon from '@material-ui/icons/SettingsVoice';
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import SpeechRecognition, {useSpeechRecognition} from "react-speech-recognition";
import {ThemeProvider} from '@material-ui/core/styles';
import theme from '../../../share/Theme/Theme';





export const ProductHead = ({currentCategory, id}) => {
    const dispatch = useDispatch();
    let { transcript } = useSpeechRecognition();
    // , interimTranscript, finalTranscript, resetTranscript
    if (transcript && transcript.length > 0) {
        if (id) {
            dispatch(getProduct({keyword: transcript, category: id, pageSize: 8, pageNumber: 1}));
        } else {
            dispatch(getProduct({keyword: transcript, pageSize: 8, pageNumber: 1}));
        }
    }
    const onChangeCurrentCategory = () => {
        dispatch(removeCategoryCurrent())
    }
    const onChangeKeyword = e => {
        if (id) {
            dispatch(getProduct({keyword: e.target.value, category: id, pageSize: 8, pageNumber: 1}));
        } else {
            dispatch(getProduct({keyword: e.target.value, pageSize: 8, pageNumber: 1}));
        }
    }

    return (
        <Grid container alignItems="center" className="px-5 pt-2 pb-0 py-md-5" justify="space-between">

            <Grid item xs={12} sm={12} md={8} className="mt-0 mt-md-6">

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
                                Sản phẩm
                            </Typography>
                        </Link>
                        {
                            currentCategory && (
                                <Link to={`/product/category/${currentCategory._id}`} exact="true">
                                    <Typography variant="h6" >
                                        {currentCategory['idGroup'].name}
                                    </Typography>
                                </Link>
                            )
                        }
                        {
                            currentCategory && (
                                <Link to={`/product/category/${currentCategory._id}`} exact="true">
                                    <Typography variant="h6" >
                                        {currentCategory.name}
                                    </Typography>
                                </Link>
                            )
                        }


                    </Breadcrumbs>

            </Grid>

            <Grid item xs={12} md={4} lg={4}>
                <TextField
                    fullWidth={true}
                    id="input-password"
                    label="Nhập sản phẩm bạn muốn tìm"
                    variant="standard"
                    onChange={e => onChangeKeyword(e)}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => {
                                        SpeechRecognition.startListening();
                                    }}
                                    aria-label="toggle password visibility"
                                >
                                    <SettingsVoiceIcon />
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                    name="keyword"
                />
            </Grid>
        </Grid>
    )
}
