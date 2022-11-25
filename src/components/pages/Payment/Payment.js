import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Checkout from './Checkout';

const stripePromise = loadStripe('pk_test_51Io76EFe9X02hyfxVZXsDFf3unwvgWvOLQ2xEWwGMJerjP8FiTXRjpUF3yxdfjr0sIU2WyiV5gnh1r6Qf5CZVodN00lFph4UVi');
console.log(stripePromise);

const Payment = () => {
    const bookings = useLoaderData();
    const { productname, productprice, yourname } = bookings;

    return (
        <div>
            <div>
                <h2 className='text-2xl'>Hello Dear, <span className='font-bold'>{yourname}</span></h2>
                <h2>Please complete your payment for <span className='font-bold'>{productname}</span></h2>
                <h2>The price is: <strong>${productprice}</strong></h2>
                <div className='w-96 mt-20 mx-auto'>
                    <Elements stripe={stripePromise}>
                        <Checkout
                            bookings={bookings}
                        ></Checkout>
                    </Elements>
                </div>
            </div>
        </div>
    );
};

export default Payment;