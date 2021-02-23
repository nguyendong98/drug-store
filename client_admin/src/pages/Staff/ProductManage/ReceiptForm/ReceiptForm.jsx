import React, {useEffect} from "react";
import {useForm} from "react-hook-form";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import {getProduct} from "../../../../features/product";
import {useDispatch, useSelector} from "react-redux";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import Autocomplete from "@material-ui/lab/Autocomplete";
import AddIcon from '@material-ui/icons/Add';
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import {createReceipt} from "../../../../features/receipt";
export const ReceiptForm = ({open, closeDialogForm, user}) => {
    const [indexes, setIndexes] = React.useState([]);
    const [counter, setCounter] = React.useState(0);
    const { register, handleSubmit } = useForm();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getProduct({pageSize: 100, pageNumber: 1}));
    },[dispatch])
    const onSubmit = data => {
        dispatch(createReceipt(data));
        closeDialogForm();
    };
    const products = useSelector(state => state.product.products);
    const addItem = () => {
        setIndexes(prevIndexes => [...prevIndexes, counter]);
        setCounter(prevCounter => prevCounter + 1);
    };

    const removeItem = index => () => {
        setIndexes(prevIndexes => [...prevIndexes.filter(item => item !== index)]);
        setCounter(prevCounter => prevCounter - 1);
    };
    const onchangeProduct = (event, values) => {
        console.log(event, values)
    }
    return (
        <Dialog fullWidth={true} maxWidth="sm" onClose={closeDialogForm} aria-labelledby="dialog-login" open={open}>
            <div className="title py-3">Tạo phiếu nhập kho</div>
            <DialogContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid item container direction="column">
                        <TextField  name="creator" InputLabelProps={{ shrink: true }}
                                    label="Người tạo"
                                    defaultValue={user && user.fullName ? user.fullName : ''}
                                    disabled
                                    className="mb-2"/>
                        <Typography variant="body2" className="font-weight-bold mt-5">
                            Thêm sản phẩm
                        </Typography>
                        {indexes.map(index => {
                            const fieldName = `item[${index}]`;
                            return  (
                                <Grid item container key={index} direction="row" justify="flex-start" alignItems="center" spacing={3} className="mb-2">
                                    <Grid container item xs={8} >
                                        <Autocomplete
                                            fullWidth
                                            id="combo-box-demo"
                                            options={products.result}
                                            getOptionLabel={(option) => option.name}
                                            renderOption={(option) => (
                                                <React.Fragment>
                                                    {option.name}
                                                </React.Fragment>
                                            )}
                                            onChange={onchangeProduct}
                                            renderInput={(params) => <TextField name={`${fieldName}.product`} {...params} inputRef={register()} label="Sản phẩm" />}
                                        />
                                    </Grid>
                                    <Grid container item xs={2} >
                                        <TextField
                                            label="Số lượng"
                                            type="number"
                                            fullWidth
                                            InputProps={{
                                                inputProps: {
                                                    max: 20, min: 1
                                                }
                                            }}
                                            name={`${fieldName}.qty`}
                                            inputRef={register()}
                                        />
                                    </Grid>
                                    <Grid container justify="center" item xs={2} style={{paddingBottom: '0px', marginBottom: '-5px'}}>
                                        <DeleteOutlineIcon className="pointer" onClick={removeItem(index)}/>
                                    </Grid>
                                </Grid>



                            );
                        })}
                        <IconButton onClick={addItem} className="flex-row align-self-start">
                            <AddIcon />
                        </IconButton>
                        <TextField
                            className="mt-2"
                            id="date"
                            fullWidth
                            label="Hạn sử dụng"
                            name="expiryDate"
                            type="date"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputRef={register()}
                        />

                        <Button type="submit" variant="outlined" className="my-5" color="primary">Xác nhận</Button>
                    </Grid>

                </form>
            </DialogContent>
        </Dialog>

    )
}
