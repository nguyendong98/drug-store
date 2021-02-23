import React, {useEffect, useRef} from "react";
import {useDispatch} from "react-redux";
import {removeCart} from "../../../features/cart";
import {getTotalPrice} from "../../../utils/function";
import {createOrder} from "../../../features/order";

export const PayPal = ({cart, checkout, completeStep}) => {
    const paypal = useRef();
    const dispatch = useDispatch();
    const onCreateOrder = (order) => {
        if (cart && checkout) {
            const billDetail = [];
            for (const item of cart) {
                billDetail.push({
                    product: item.product._id,
                    name: item.product.name,
                    qty:  parseInt(item.qty),
                    price: item.price
                });
            }
            const data = {
                bill: billDetail,
                customerName: checkout.fullName,
                phone: checkout.phone,
                email: checkout.email,
                address: checkout.addressDetail,
                note: checkout.note,
                totalAmount: getTotalPrice(cart),
                paymentType: 'online',
                payerInfo: order.payer
            }
            dispatch(createOrder(data));
            completeStep();
            dispatch(removeCart());
            sessionStorage.removeItem('checkout');
        }
    }
    useEffect(() => {
        window.paypal.Buttons({
            createOrder: (data, actions, err) => {
                return actions.order.create({
                    intent: "CAPTURE",
                    purchase_units: [
                        {
                            description: "Cool looking table",
                            amount: {
                                currency_code: "USD",
                                value: Math.round(checkout.totalPrice/22000)
                            }
                        }
                    ]
                })
            },
            onApprove: async (data, actions) => {
                const order = await actions.order.capture();
                if (order) {
                    console.log(order);
                    onCreateOrder(order);
                }
            },
            onError: (err) => {
                console.log(err);
            }
        }).render(paypal.current)
    }, [cart, checkout])
    return (
        <>
            <div ref={paypal}></div>
        </>
    )
}
