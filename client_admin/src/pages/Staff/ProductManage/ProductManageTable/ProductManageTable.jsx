import * as React from 'react';
import "./ProductManageTable.scss";
import MaterialTable from 'material-table';
import VisibilityIcon from '@material-ui/icons/Visibility';
import {IconButton, Typography} from "@material-ui/core";
import {useEffect, useState} from "react";
import MenuItem from "@material-ui/core/MenuItem";
import {productURL} from "../../../../utils/imageURL";
import {ReceiptForm} from "../ReceiptForm/ReceiptForm";
import {getInventory} from "../../../../utils/func";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import {ProfitForm} from "../ProfitForm/ProfitForm";
import {getProfit} from "../../../../features/product";
import {useDispatch, useSelector} from "react-redux";
import Grid from "@material-ui/core/Grid";

export const ProductManageTable = ({data, user, warehouse}) => {
    const [openDialogForm, setOpenDialogForm] = useState(false);
    const [openProfitForm, setOpenProfitForm] = useState(false)
    const onCloseDialogForm = () => {
        setOpenDialogForm(false);
    }
    const onCloseDialogProfit = () => {
        setOpenProfitForm(false);
    }
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProfit());
    }, [dispatch]);
    const profit = useSelector(state => state.product.profit);
    const dataTable = [];
    if (data && data.result && data.result.length > 0) {
        let i = 1;
        for (const item of data.result) {
            const row = {
                stt: i,
                _id: item['_id'],
                name: item.name,
                price: item.idPrice.price,
                image: item.image
            }
            dataTable.push(row);
            i++;
        }
    }
    return (
        <>
            <ProfitForm open={openProfitForm} closeDialogForm={onCloseDialogProfit} profit={profit}/>
            <ReceiptForm open={openDialogForm} closeDialogForm={onCloseDialogForm} user={user}/>
            <Button variant="outlined" color="primary" className="mx-6 mt-6 mb-4" onClick={() => setOpenProfitForm(true)}>
                Cập nhật lợi nhuận
            </Button>
            <Typography  variant="h6" className="ml-6">Tỉ lệ lợi nhuận: { profit && profit.profit} %</Typography>

            <MaterialTable
                title="Quản lý kho hàng"
                columns={[
                    {
                        title: 'STT',
                        field: 'stt',
                        render: rowData => <Typography variant="subtitle1">{rowData.stt}</Typography>
                    },
                    {
                        title: 'Tên',
                        field: 'name',
                        render: rowData => <Typography variant="subtitle1">{rowData.name}</Typography>
                    },
                    {
                        title: 'Hình ảnh',
                        field: 'image',
                        render: rowData => <img className="image-cart mr-2" src={`${productURL}/${rowData.image}`} alt="img-product"/>

                    },
                    {
                        title: 'Giá gốc',
                        field: 'price',
                        render: rowData => <Typography variant="subtitle1">{rowData.price.toLocaleString()} VNĐ</Typography>

                    },
                    {
                        title: 'Giá bán ra',
                        render: rowData => <Typography variant="subtitle1">{profit && (rowData.price * ((100 + profit.profit))/100).toLocaleString()} VNĐ</Typography>

                    },
                    {
                        title: 'Tồn kho',
                        render: rowData => <div className="flex-row  align-items-center">
                                <Typography variant="subtitle1">{getInventory(warehouse, rowData._id)}</Typography>
                                {getInventory(warehouse, rowData._id) <= 10 && getInventory(warehouse, rowData._id) !== 0 ? <Chip className="ml-3" size="small" color="secondary" label="Gần hết hàng"/> : ''}
                                {getInventory(warehouse, rowData._id) === 0 ? <Chip className="ml-4" size="small" label="Chưa có sản phẩm"/> : ''}

                        </div>


                    },
                    {
                        title: 'Thao tác',
                        render: rowData => <MenuItem>
                            <IconButton ><VisibilityIcon/></IconButton>
                            <Typography variant="body2" style={{color: '#808080'}}>Xem</Typography>
                        </MenuItem>
                    }

                ]}
                data={dataTable}
                actions={

                    [
                        {
                            icon: 'add',
                            tooltip: 'Create receipt',
                            isFreeAction: true,
                            onClick: (event) => setOpenDialogForm(true)
                        },
                        {
                            icon: 'refresh',
                            tooltip: 'Refresh Data',
                            isFreeAction: true,
                            onClick: () => console.log(11)
                        }
                    ]}
                options={{
                    actionsColumnIndex: -1,
                    selection: true
                }}
                onSelectionChange={(rows) => console.log(11111)}
            />
        </>

    );
}
