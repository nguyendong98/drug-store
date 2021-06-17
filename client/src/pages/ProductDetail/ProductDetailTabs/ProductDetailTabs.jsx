import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import './ProductDetailTabs.scss';
import TabContext from "@material-ui/lab/TabContext";
import AppBar from "@material-ui/core/AppBar";
import TabList from "@material-ui/lab/TabList";
import Tab from "@material-ui/core/Tab";
import TabPanel from "@material-ui/lab/TabPanel";
import Paper from "@material-ui/core/Paper";
import Spinner from 'share/Spinner/Spinner';
import Typography from "@material-ui/core/Typography";
import {FeedbackTab} from "../FeedbackTab/FeedbackTab";
import {DescriptionTab} from "../DescriptionTab/DescriptionTab";
import {getAllFeedBack} from 'features/feedback';

export const ProductDetailTabs = ({product, id}) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllFeedBack({product: id, pageSize: 1000, pageNumber: 1}));
    });
    const totalFeedback = useSelector(state => state.feedback.feedBacks.totalElement)
    const [value, setValue] = useState('1');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return !product ? <Spinner/> : (
        <TabContext value={value} className="w-100">
            <AppBar position="static" className="detail-tabs" color="primary">
                <TabList onChange={handleChange} aria-label="simple tabs example">
                    <Tab label="Mô tả" value="1"/>
                    <Tab label="Thương hiệu" value="2" />
                    <Tab label={`Đánh giá (${totalFeedback})`} value="3" />
                </TabList>
            </AppBar>
            <TabPanel value="1">
                <Paper className="pl-5 py-7 pr-10">
                    <DescriptionTab product={product}/>
                </Paper>
            </TabPanel>
            <TabPanel value="2">
                <Paper className="pl-5 py-7 pr-10">
                    <Typography variant="h4" gutterBottom className="font-weight-bold">
                        Thương hiệu
                    </Typography>
                    <Typography variant="h5" gutterBottom className="font-weight-bold">
                        {product.idTradeMark.name}
                    </Typography>
                </Paper>
            </TabPanel>
            <TabPanel value="3">
                <Paper className="pl-5 py-7 pr-10">
                    <FeedbackTab id={id} />
                </Paper>
            </TabPanel>
        </TabContext>
    )
}
