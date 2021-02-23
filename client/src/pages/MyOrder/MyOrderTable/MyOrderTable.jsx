import React from "react";
import MaterialTable from "material-table";
import Typography from "@material-ui/core/Typography";
import moment from "moment";
import Chip from "@material-ui/core/Chip";
import {OrderDetailPanel} from "../OrderDetailPanel/OrderDetailPanel";
export const MyOrderTable = ({myOrder}) => {
    const dataTable = [];
    console.log(myOrder);
    if (myOrder && myOrder.length > 0) {
        for (const item of myOrder) {
            const row = {
                _id: item['_id'],
                status: item['orderStatus'],
                totalPay: item['totalAmount'],
                createAt: item['createAt'],
                paymentType: item['paymentType']
            }
            dataTable.push(row);
        }
    }

    console.log(dataTable);
    return myOrder && (
        <>
            <MaterialTable
                title="Đơn hàng của tôi"
                columns={[
                    {
                        title: 'Mã đơn hàng',
                        render: rowData => <Typography variant="subtitle1">{rowData._id}</Typography>
                    },
                    {
                        title: 'Tổng tiền',
                        render: rowData => <Typography variant="subtitle1">{rowData.totalPay.toLocaleString()} VNĐ</Typography>
                    },
                    {
                        title: 'Ngày đặt hàng',
                        render: rowData => <Typography variant="subtitle1">{moment(rowData.createAt).format('llll')}</Typography>
                    },
                    {
                        title: 'Hình thức thanh toán',
                        render: rowData => <Typography variant="subtitle1">
                            {rowData.paymentType === 'online' ? 'Online' : 'Trực tiếp'}
                        </Typography>
                    },
                    {
                        title: 'Trạng thái đơn hàng',
                        render: rowData => rowData.status === 'waitingApproved' ?
                            <Chip size="small" label="Đang chờ duyệt" color="secondary" /> :
                            <Chip size="small" label="Đã được duyệt" color="primary" />
                    }
                ]}
                data={dataTable}
                detailPanel={rowData => <OrderDetailPanel data={myOrder.find(v => v._id === rowData._id)}/>}
            />
        </>
    )
}
