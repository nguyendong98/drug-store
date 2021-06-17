import React from "react";
import {useDispatch, useSelector} from 'react-redux';

import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import {closeAlert} from "features/alert";

export default function MessageNotify() {
    const dispatch = useDispatch();
    const alert = useSelector(state => state.alert)
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

