import * as React from 'react';
import MaterialTable from 'material-table';
import Chip from "@material-ui/core/Chip";
import DoneIcon from '@material-ui/icons/Done';
import Avatar from "@material-ui/core/Avatar";
import Moment from "react-moment";
import VisibilityIcon from '@material-ui/icons/Visibility';
import {IconButton, Typography} from "@material-ui/core";
import {useDispatch} from "react-redux";
import {approveOrder, getOrderDetail} from "../../../../features/order";
import {useState} from "react";
import {OrderDetailView} from "../OrderDetailView/OrderDetailView";
import MenuItem from "@material-ui/core/MenuItem";
import {OrderForm} from "../OrderForm/OrderForm";

export const OrderManageTable = ({data}) => {
    const dispatch = useDispatch();
    const [openDialogView, setOpenDialogView] = useState(false);
    const [openDialogForm, setOpenDialogForm] = useState(false);
    const onCloseDialogView = () => {
        setOpenDialogView(false);
    }
    const onCloseDialogForm = () => {
        setOpenDialogForm(false);
    }
    const handleApproveOrder = (data) => {
        const dataHandle = {
            id: data._id,
            email: data.email,
            orderStatus: data.status
        };

        dispatch(approveOrder([dataHandle]));
    }
    const dataTable = [];
    if (data && data.result && data.result.length > 0) {
        for (const item of data.result) {
            const row = {
                _id: item['_id'],
                email: item['idOrderDetail'].email,
                customerName: item['idOrderDetail'].customerName,
                status: item['orderStatus'],
                totalPay: item['totalAmount'],
                createAt: item['createAt'],
                paymentType: item['paymentType']
            }
            dataTable.push(row);
        }
    }
    return (
        <>
            <OrderDetailView open={openDialogView} closeDialogLogin={onCloseDialogView}/>
            <OrderForm open={openDialogForm} closeDialogForm={onCloseDialogForm} />
            <MaterialTable
                title="Quản lý đơn hàng"
                columns={[
                    {
                        title: 'Tên khách hàng',
                        field: 'customerName',
                        render: rowData => <Typography variant="subtitle1">{rowData.customerName}</Typography>
                    },
                    {
                        title: 'Trạng thái đơn hàng',
                        field: 'status',
                        render: rowData => rowData.status.toString().indexOf('waitingApproved') !== -1 ?
                            <Chip
                                avatar={<Avatar>W</Avatar>}
                                label="Chờ xác nhận"
                                clickable
                                color="secondary"
                                onDelete={() => handleApproveOrder(rowData)}
                                deleteIcon={<DoneIcon />}
                            /> : <Chip
                                avatar={<Avatar>D</Avatar>}
                                label="Đã xác nhận"
                                color="primary"
                            />
                    },
                    {
                        title: 'Hình thức thanh toán',
                        field: 'paymentType',
                        render: rowData => <Typography variant="subtitle1" style={{textTransform: 'capitalize '}}>{rowData.paymentType}</Typography>

                    },
                    {
                        title: 'Tổng tiền',
                        field: 'totalPay',
                        render: rowData => <Typography variant="subtitle1">{rowData.totalPay.toLocaleString()} VND</Typography>

                    },
                    {
                        title: 'Tạo ngày',
                        field: 'createAt',
                        render: rowData => <Typography variant="body2">
                            <Moment format="lll">{rowData.createAt}</Moment></Typography>
                    },
                    {
                        title: 'Thao tác',
                        render: rowData => <MenuItem onClick={() => {
                            setOpenDialogView(true);
                            dispatch(getOrderDetail(rowData._id));
                        }}>
                            <IconButton ><VisibilityIcon/></IconButton>
                                <Typography variant="body2" style={{color: '#808080'}}>Xem chi tiết</Typography>
                        </MenuItem>
                    }

                ]}
                data={dataTable}
                actions={

                    [
                        {
                            icon: 'add',
                            tooltip: 'Add Order',
                            isFreeAction: true,
                            onClick: (event) => setOpenDialogForm(true)
                        }
                    ]}
                options={{
                    actionsColumnIndex: -1,
                    selection: true
                }}
                onSelectionChange={(rows) => console.log(rows)}
            />
        </>

    );
}
