import React, {useEffect} from "react";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import Alert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {updateProfit} from "../../../../features/product";
export const ProfitForm = ({open, closeDialogForm, profit}) => {
    const { register, handleSubmit, errors } = useForm();
    const dispatch = useDispatch();

    const onSubmit = data => {
        dispatch(updateProfit(profit._id, data));
        closeDialogForm();
    };
    return (
        <Dialog fullWidth={true} maxWidth="xs" onClose={closeDialogForm} aria-labelledby="dialog-login" open={open}>
            <div className="title py-3">Cập nhật lợi nhuận</div>
            <DialogContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField variant="outlined" name="profit" inputRef={register({ required: true })}
                               label="Tỉ lệ lợi nhuận (%)" className="mb-2"
                               fullWidth
                               defaultValue={profit && profit.profit}
                               type="number"
                               InputLabelProps={{ shrink: true }}
                    />
                    {errors.profit && <Alert className="alert" severity="error">Profit is required!</Alert>}



                    <Button variant="outlined" color="primary" type="submit" fullWidth className="my-5">
                        Cập nhật
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}
