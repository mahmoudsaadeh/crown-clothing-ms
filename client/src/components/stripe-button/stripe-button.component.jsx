
import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

import axios from 'axios';


const StripeCheckoutButton = ({ price }) => {
    // stripe requires the price in 'cents' and not in USD so that a proper charge can be made
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51JSFHDGFHfRN6rtksYpRoKKMj8dQUAWAZsOFDXgO4grWbaJuKH5cSxRzjeJWryjevPE7dNZJq1kXZcI9rzmZdyUf00WM0xWEOb';

    const onToken = (token) => {
        // console.log(token);
        // alert('Payment Successful');
        axios({
            url: 'payment',
            method: 'post',
            data: {
                amount: priceForStripe,
                token
            }
        }).then(response => {
            alert('Payment Successful!');
        }).catch(error => {
            console.log('Payment error: ', JSON.parse(error));
            alert('There was an issue with your payment. Please make sure you use the correct credit card.')
        });
    }

    return (
        // StripeCheckout component takes a bunch of different possible properties that enable or disable different features that we have access to inside of our checkout dropdown
        <StripeCheckout 
            label='Pay Now'
            name='Crown Clothing Ltd.'
            billingAddress
            shippingAddress
            image='https://svgshare.com/i/CUz.svg'
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    );
};

export default StripeCheckoutButton;