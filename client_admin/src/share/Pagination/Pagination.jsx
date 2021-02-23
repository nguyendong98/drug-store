import React from 'react';
import Pagination from '@material-ui/lab/Pagination';
import {useDispatch} from "react-redux";
import {getProduct} from "../../features/product";
import {getAllFeedBack} from "../../features/feedback";
export const PaginationControlled = ({data, id, type}) => {
    const [page, setPage] = React.useState(1);
    const dispatch = useDispatch();
    const handleChange = (event, value) => {
        switch (type) {
            case "product":
                dispatch(getProduct({category: id, pageNumber: value, pageSize: 6}));
                setPage(value);
                break;
            case "feedback":
                dispatch(getAllFeedBack({product: id, pageNumber: value, pageSize: 5}));
                setPage(value);
                break;
            default:
                break
        }
    };
    return data && (
        <div className="mt-3">
            <Pagination color="primary" count={data.totalPage} page={page} onChange={handleChange} />
        </div>
    );
}
