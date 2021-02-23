import * as React from 'react';
import MaterialTable from 'material-table';
import Avatar from "@material-ui/core/Avatar";
import Moment from "react-moment";
import VisibilityIcon from '@material-ui/icons/Visibility';
import {IconButton, Typography} from "@material-ui/core";
import {useState} from "react";
import MenuItem from "@material-ui/core/MenuItem";
import {avatarURL} from "../../../../utils/imageURL";
import {StaffForm} from "../StaffForm/StaffForm";

export const StaffManageTable = ({data}) => {
    const [openDialogForm, setOpenDialogForm] = useState(false);
    const onCloseDialogForm = () => {
        setOpenDialogForm(false);
    }
    const dataTable = [];
    if (data && data.result && data.result.length > 0) {
        for (const item of data.result) {
            const row = {
                _id: item['_id'],
                fullName: item.fullName,
                avatar: item.avatar,
                username: item.username,
                email: item.email,
                createAt: item['createAt'],
            }
            dataTable.push(row);
        }
    }
    return (
        <>
            {/*<OrderDetailView open={openDialogView} closeDialogLogin={onCloseDialogView}/>*/}
            <StaffForm open={openDialogForm} closeDialogForm={onCloseDialogForm} />
            <MaterialTable
                title="Quản lý nhân viên"
                columns={[
                    {
                        title: 'Họ tên',
                        field: 'fullName',
                        render: rowData => <Typography variant="subtitle1">{rowData.fullName}</Typography>
                    },
                    {
                        title: 'Ảnh đại diện',
                        field: 'avatar',
                        render: rowData => <Avatar className="mr-2" src={`${avatarURL}/${rowData.avatar}`} alt={rowData.avatar} />

                    },
                    {
                        title: 'Tài khoản',
                        field: 'username',
                        render: rowData => <Typography variant="subtitle1">{rowData.username}</Typography>

                    },
                    {
                        title: 'Email',
                        field: 'email',
                        render: rowData => <Typography variant="subtitle1">{rowData.email}</Typography>

                    },
                    {
                        title: 'Tạo ngày',
                        field: 'createAt',
                        render: rowData => <Typography variant="body2">
                            <Moment format="lll">{rowData.createAt}</Moment></Typography>
                    },
                    {
                        title: 'Action',
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
                            tooltip: 'Add Staff',
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
