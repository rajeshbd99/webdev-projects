import CheckoutForm from './CheckoutForm';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const PaymentPage = () => {
  const location = useLocation();
  useEffect(() => {
    const pageTitle = "PropertyPulse | Payment";
    document.title = pageTitle;
  }, [location]);
  const { state } = useLocation();
  const [clientSecret, setClientSecret] = useState(null);
  const totalPrice = state.property.offerAmount;

  useEffect(() => {
    if (totalPrice > 0) {
      const roundedPrice = Math.round(totalPrice * 100);
      axios.post("https://real-estate-flax-psi.vercel.app/create-payment-intent", { price: roundedPrice }, { withCredentials: true })
        .then((res) => setClientSecret(res.data.clientSecret))
        .catch(() => console.error("Failed to fetch payment intent"));
    }
  }, [axios, totalPrice]);

  const appearance = { theme: 'stripe' };
  const options = { clientSecret, appearance };

  return (
    <div>
      <div className="max-w-3xl mx-auto mt-36 mb-28">
        {clientSecret ? (
          <Elements stripe={stripePromise} options={options}>
            <CheckoutForm property={state.property} />
          </Elements>
        ) : (
          <p>Loading payment details...</p>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;