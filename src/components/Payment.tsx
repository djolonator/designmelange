import React, { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useSelector } from "react-redux";

const Payment: React.FC = () => {
// Renders errors or successfull transactions on the screen.
// function Message({ content }) {
//     return <p>{content}</p>;
// }
    const initialOptions = {
        "clientId": "test",
        "enable-funding": "venmo",
        "disable-funding": "",
        "buyer-country": "US",
        "currency": "USD",
        "data-page-type": "product-details",
        "components": "buttons",
        "data-sdk-integration-source": "developer-studio",
    };

    const [message, setMessage] = useState("");
    const recipient = useSelector((state: any) => state.recipient.recipient);
    const cartItems = useSelector((state: any) => state.cart.cartItems);


    if (!recipient.email || !recipient.phone || !recipient.country || !recipient.firstName || !recipient.lastName || !recipient.address || !recipient.city || !recipient.zip) {
        return <div>Please fill all fields</div>; // ovo cu videti kako da resim, bez ovog ifa po unosu podataka u formi na chekout pageu recipient je sve prazna string, tek kada se uradi back pa return, "upuni se"
    }

return (
<>
<PayPalScriptProvider options={initialOptions}>
<PayPalButtons
    style={{
        shape: "rect",
        layout: "vertical",
        color: "gold",
        label: "paypal",
    }} 
    createOrder={async () => {
        try {
            const response = await fetch(process.env.REACT_APP_API_BASE_URL + '/initiatePaypallOrder', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const orderData = await response.json();
            console.log('orderData', orderData);
            if (orderData.isSuccess && orderData.value.data.id) {
                console.log('orderData.value.data.id', orderData.value.data.id);
                return orderData.value.data.id;
            } else {
                const errorDetail = orderData?.details?.[0];
                const errorMessage = errorDetail
                    ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
                    : JSON.stringify(orderData);

                throw new Error(errorMessage);
            }
        } catch (error) {
            console.error(error);
            setMessage(
                `Could not initiate PayPal Checkout...${error}`
            );
        }
    }} 
    onApprove={async (data, actions) => {
        try {
            const response = await fetch(
                `/api/orders/${data.orderID}/capture`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            const orderData = await response.json();
            // Three cases to handle:
            //   (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
            //   (2) Other non-recoverable errors -> Show a failure message
            //   (3) Successful transaction -> Show confirmation or thank you message

            const errorDetail = orderData?.details?.[0];

            if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
                // (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
                // recoverable state, per https://developer.paypal.com/docs/checkout/standard/customize/handle-funding-failures/
                return actions.restart();
            } else if (errorDetail) {
                // (2) Other non-recoverable errors -> Show a failure message
                throw new Error(
                    `${errorDetail.description} (${orderData.debug_id})`
                );
            } else {
                // (3) Successful transaction -> Show confirmation or thank you message
                // Or go to another URL:  actions.redirect('thank_you.html');
                const transaction =
                    orderData.purchase_units[0].payments
                        .captures[0];
                setMessage(
                    `Transaction ${transaction.status}: ${transaction.id}. See console for all available details`
                );
                console.log(
                    "Capture result",
                    orderData,
                    JSON.stringify(orderData, null, 2)
                );
            }
        } catch (error) {
            console.error(error);
            setMessage(
                `Sorry, your transaction could not be processed...${error}`
            );
        }
    }} 
/>
</PayPalScriptProvider>
</>)
}

export default Payment;