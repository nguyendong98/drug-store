import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import {connect, useDispatch} from 'react-redux';
import {closeAlert} from "../../features/alert";

const MessageNotify = ({alert}) => {
    const dispatch = useDispatch();
    const close = () => dispatch(closeAlert());
    return alert && alert.open && (
        <Snackbar
            open={alert.open}
            autoHideDuration={3000}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            onClose={close}
        >
            <Alert  severity={alert.type}>
                {alert.message}
            </Alert>
        </Snackbar>
    )
}
const mapStateToProps = state => {
    return {
        alert: state.alert
    }
}
export default connect(mapStateToProps, null)(MessageNotify)
