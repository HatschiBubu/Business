import React from 'react';
import { useStripe } from '@stripe/react-stripe-js';
import { CartContext } from '../../../context/cart-context';
import { fetchFromAPI } from '../../../helpers';
import { useState } from 'react';
import { useContext } from 'react';

const StripeCheckout = () => {
    const [email, setEmail] = useState('');
    const { cartItems } = useContext(CartContext);
    const stripe = useStripe();
    const handleGuestCheckout = async (e) => {
       e.preventDefault();
       const line_items = cartItems.map(item => {
        return {
            quantity: item.quantity,
            price_data: {
                currency: 'eur',
                unit_amount: item.price * 100, // amount is in cents
                product_data: {
                    name: item.title,
                    description: item.description,
                    images: [item.imageUrl],
                }
            }
        }
       });

       const response = await fetchFromAPI('create-checkout-session', {
        body: { line_items, customer_email: email },
       });
       const { sessionId } = response;
       const { error } = await stripe.redirectToCheckout({
        sessionId
       });

       if (error) {
        console.log(error);
       }
    }

    return (
        <form onSubmit={handleGuestCheckout}>
            <div>
                <input
                    type='email'
                    onChange={e => setEmail(e.target.value)}
                    placeholder='Email'
                    calue={email}
                    className='trendyproducts-input'
                />
            </div>
            <div className='submit-btn'>
                <button type='submit' className='button is-black trendyproducts-btn submit'>
                    Checkout
                </button>
            </div>
        </form>
    );
}

export default StripeCheckout;