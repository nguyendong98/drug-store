import React from "react";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
export const OrderDetailPanel = ({data}) => {

    console.log(data);
    return (
        <div className="py-3 px-16">
            <Typography variant="subtitle1" gutterBottom>Tên người nhận hàng: {data.idOrderDetail && data.idOrderDetail.customerName}</Typography>
            <Typography variant="subtitle1">Số điện thoại: {data.idOrderDetail && data.idOrderDetail.phone}</Typography>
            <Typography variant="subtitle1">Số điện thoại: {data.idOrderDetail && data.idOrderDetail.email}</Typography>
            <Typography variant="subtitle1">Hóa đơn: </Typography>
            {
               data.idOrderDetail && data.idOrderDetail.bill ? data.idOrderDetail.bill.map((val, i) => (
                   <Grid container key={i}>
                       <Grid item xs={2} key={i}>
                           <Typography  variant="body2" color="textSecondary">
                               {val.name} x {val.qty}
                           </Typography>
                       </Grid>
                       <Grid item xs={10}>
                           <Typography variant="body1">
                               {(val.qty * val.price).toLocaleString()} VNĐ
                           </Typography>
                       </Grid>

                   </Grid>

                    ))  : ''

            }
        </div>
    )
}
