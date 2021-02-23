import React from "react";
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import Alert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";
import {updateSalary} from "../../../../features/calendar";

export const SalaryForm = ({open, closeDialogForm, salary}) => {
    const { register, handleSubmit, errors } = useForm();
    const dispatch = useDispatch();


    const onSubmit = data => {

        dispatch(updateSalary(salary._id, data));
        closeDialogForm();
    };
    return (
        <Dialog fullWidth={true} maxWidth="xs" onClose={closeDialogForm} aria-labelledby="dialog-login" open={open}>
            <div className="title py-3">Cập nhật lương</div>
            <DialogContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField variant="outlined" name="valueOfHour" inputRef={register({ required: true })}
                               label="Lương trên 1 giờ" className="mb-2"
                               fullWidth
                               defaultValue={salary && salary.valueOfHour && salary.valueOfHour}
                               type="number"
                               InputLabelProps={{ shrink: true }}
                    />
                    {errors.valueOfHour && <Alert className="alert" severity="error">Salary is required!</Alert>}



                    <Button variant="outlined" color="primary" type="submit" fullWidth className="my-5">
                        Cập nhật
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}
