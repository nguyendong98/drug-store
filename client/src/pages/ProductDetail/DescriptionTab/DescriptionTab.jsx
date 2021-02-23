import React from "react";
import Typography from "@material-ui/core/Typography";

export const DescriptionTab = ({product}) => {
    return product && (
        <>
            <Typography variant="h5" gutterBottom className="font-weight-bold">
                1. Chống chỉ định:
            </Typography>
            <Typography variant="h6" gutterBottom dangerouslySetInnerHTML={{__html: product.contraindicated}} />

            <Typography variant="h5" gutterBottom className="mt-5 font-weight-bold">
                2. Hướng dẫn sử dụng:
            </Typography>
            <Typography variant="h5" gutterBottom className="font-weight-bold">
                Chỉ định:
            </Typography>
            <Typography variant="h6" gutterBottom dangerouslySetInnerHTML={{__html: product.dative}} />
            <Typography variant="h5" gutterBottom className="font-weight-bold">
                Liều dùng và cách dùng:
            </Typography>
            <Typography variant="h6" gutterBottom dangerouslySetInnerHTML={{__html: product.dosageAndUsage}} />
            <Typography variant="h5" gutterBottom className="font-weight-bold">
                Bảo quản:
            </Typography>
            <Typography variant="h6" gutterBottom dangerouslySetInnerHTML={{__html: product.presenvation}} />
            <Typography variant="h5" gutterBottom className="mt-5 font-weight-bold" >
                3. Thông tin thuốc:
            </Typography>
            <Typography variant="h5" gutterBottom className="font-weight-bold">
                Thành phần:
            </Typography>
            <Typography variant="h6" gutterBottom dangerouslySetInnerHTML={{__html: product.ingredient}} />
            <Typography variant="h5" gutterBottom className="font-weight-bold">
                Quy cách đóng gói:
            </Typography>
            <Typography variant="h6" gutterBottom dangerouslySetInnerHTML={{__html: product.packing}} />
            <Typography variant="h5" gutterBottom className="font-weight-bold">
                Xuất xứ thương hiệu:
            </Typography>
            <Typography variant="h6" gutterBottom>
                {product.idTradeMark.origin}
            </Typography>
            <Typography variant="h5" gutterBottom className="font-weight-bold">
                Nhà sản xuất:
            </Typography>
            <Typography variant="h6" gutterBottom>
                {product.idProducer.name}
            </Typography>

            <i><Typography variant="h6" gutterBottom className="mt-5" >
                Đọc kỹ hướng dẫn sử dụng trước khi dùng.
            </Typography>
            <Typography variant="h6" gutterBottom>
                Không dùng quá liều quy định. Nếu cần thêm thông tin xin hỏi ý kiến Bác sĩ.
            </Typography>
            <Typography variant="h6" gutterBottom className="mt-5">
                *DV Pharmacity cam kết chỉ bán sản phẩm còn dài hạn sử dụng.
            </Typography></i>
        </>
    )
}
