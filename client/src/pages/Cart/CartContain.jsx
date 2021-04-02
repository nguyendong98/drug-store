import React, {useEffect} from "react";
import Grid from "@material-ui/core/Grid";
import Stepper from "@material-ui/core/Stepper";
import Typography from "@material-ui/core/Typography";
import Step from "@material-ui/core/Step";
import StepButton from "@material-ui/core/StepButton";
import {useDispatch, useSelector} from "react-redux";
import {getCartDetail} from "../../features/cart";
import {CartStep} from "./CartStep/CartStep";
import {CheckoutStep} from "./CheckoutStep/CheckoutStep";
import {CompleteStep} from "./CompleteStep/CompleteStep";
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import {getWarehouse} from "../../features/receipt";
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import {ThemeProvider} from '@material-ui/core/styles';
import theme from '../../share/Theme/Theme';
import HomeIcon from '@material-ui/icons/Home';

export const Cart = () => {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart.cartDetail);
    const checkout = JSON.parse(sessionStorage.getItem('checkout'));
    const [activeStep, setActiveStep] = React.useState(checkout ? 2 : 0);
    const [completed, setCompleted] = React.useState(new Set());
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);
    useEffect(() => {
        dispatch(getCartDetail());
        if (checkout) {
            const newComplete = new Set(completed);
            newComplete.add(activeStep - 2);
            newComplete.add(activeStep - 1);
            setCompleted(new Set(newComplete));
        }
        dispatch(getWarehouse());
    }, [dispatch]);
    const warehouse = useSelector(state => state.receipt.warehouse);
    const user = useSelector(state => state.user.user);
    function getSteps() {
        return ['Xác nhận giỏ hàng', 'Xác nhận thông tin', 'Thanh toán'];
    }

    function getStepContent(step) {
        switch (step) {
            case 0:
                return <CartStep cart={cart} warehouse={warehouse} checkout={checkout} completeStep={handleComplete}/>;
            case 1:
                if (!isAuthenticated) {
                    setActiveStep(0);
                }
                return <CheckoutStep user={user} cart={cart} checkout={checkout} completeStep={handleComplete} handleBack={handleBack}/>;
            case 2:
                if (!isAuthenticated) {
                    setActiveStep(0);
                }
                return <CompleteStep cart={cart} checkoutProps={checkout} completeStep={handleComplete}/>;
            default:
                return 'Unknown step';
        }
    }


    const steps = getSteps();
    const totalSteps = () => {
        return getSteps().length;
    };
    const completedSteps = () => {
        return completed.size;
    };

    const allStepsCompleted = () => {
        return completedSteps() === totalSteps();
    };

    const isLastStep = () => {
        return activeStep === totalSteps() - 1;
    };

    const handleNext = () => {
        const newActiveStep =
            isLastStep() && !allStepsCompleted()
                ? // It's the last step, but not all steps have been completed
                  // find the first step that has been completed
                steps.findIndex((step, i) => !completed.has(i))
                : activeStep + 1;

        setActiveStep(newActiveStep);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStep = (step) => () => {
        setActiveStep(step);
    };

    const handleComplete = () => {
        const newCompleted = new Set(completed);
        newCompleted.add(activeStep);
        setCompleted(newCompleted);

        if (completed.size !== totalSteps()) {
            handleNext();
        }
    };

    function isStepComplete(step) {
        return completed.has(step);
    }

    return cart && cart.length > 0 ? (
        <div className="px-md-16 pb-md-10 ">
            <Grid container alignItems="center" className="px-2 pt-5 pt-md-0 px-md-0">
                <Grid item xs={12} className="mt-0 mt-md-6">
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link to="/" exact="true">
                            <ThemeProvider theme={theme}>
                                <Typography variant="h6" className="flex-row justify-content-center align-items-center">
                                    <HomeIcon  className="mr-2"/>
                                    <span>Trang chủ</span>
                                </Typography>
                            </ThemeProvider>
                        </Link>
                        <Link to="/cart" exact="true">
                            <Typography variant="h6" className="flex-row justify-content-center align-items-center">
                                <span>Giỏ hàng</span>
                            </Typography>
                        </Link>
                    </Breadcrumbs>
                </Grid>
            </Grid>
            <Grid container justify="center" className="w-100">
                <Stepper alternativeLabel  activeStep={activeStep} className="w-md-80">
                    {steps.map((label, index) => {
                        const stepProps = {};
                        const buttonProps = {};

                        return (
                            <Step key={label} {...stepProps}>
                                <StepButton
                                    onClick={handleStep(index)}
                                    completed={isStepComplete(index)}
                                    {...buttonProps}
                                >
                                    {label}
                                </StepButton>
                            </Step>
                        );
                    })}
                </Stepper>
            </Grid>

            <Grid container>
                {allStepsCompleted() ? (
                    <Grid container item xs={12} className="px-5" direction="column" alignItems="center" justify="center">
                        <CheckCircleOutlineIcon style={{fontSize: '40px', color: 'green'}} />
                        <Typography variant="h6" className="my-3 text-center">
                            Đặt hàng thành công, hãy check mail của bạn để theo dõi tiến độ đơn hàng
                        </Typography>
                        <Link to="/product" exact="true">
                            <Button variant="outlined" color="primary">Tiếp tục mua sắm</Button>
                        </Link>
                    </Grid>
                ) : (
                    <Grid item xs={12}>
                        {getStepContent(activeStep)}
                    </Grid>
                )}
            </Grid>
        </div>
    ) : (
        <Grid container direction="column" justify="center" alignItems="center" className="pt-5 pb-16">
            <Typography variant="h6" className="mt-3 px-5 text-center">Giỏ hàng hiện tại chưa có sản phẩm nào</Typography>
            <Link to="/product" exact="true">
                <Button className="mb-16 mt-5" variant="outlined" color="primary">Tiếp tục mua sắm</Button>
            </Link>
        </Grid>
    );

}
