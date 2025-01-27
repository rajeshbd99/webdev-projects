import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../providers/AuthProvider';
import axios from 'axios';
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import { HiOutlineCheckCircle, HiOutlineCreditCard, HiOutlineExclamationCircle, HiOutlineRefresh, HiOutlineShieldCheck, HiOutlineArrowCircleRight } from 'react-icons/hi';

const CheckoutForm = ({ property }) => {
  const location = useLocation();
  useEffect(() => {
    const pageTitle = "PropertyPulse | Checkout";
    document.title = pageTitle;
  }, [location]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState(null);
  const [transactionId, setTransactionId] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      setErrorMessage("Stripe is not properly initialized.");
      return;
    }

    setLoading(true);

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          payment_method_data: {
            billing_details: {
              name: user?.displayName,
              email: user?.email,
            },
          },
        },
        redirect: "if_required",
      });

      if (error) {
        setErrorMessage(error.message);
      } else if (paymentIntent?.status === "succeeded") {
        setTransactionId(paymentIntent.id);

        const contactRequest = {
          propertyId: property._id,
          propertyTitle: property.propertyTitle,
          location: property.location,
          buyerName: property.buyerName,
          buyerEmail: property.buyerEmail,
          agentEmail: property.agentEmail,
          transactionId: paymentIntent.id,
          amount: paymentIntent.amount / 100,
          date: format(new Date(), "dd-MM-yyyy"),
        };
        const { data } = await axios.post("https://real-estate-flax-psi.vercel.app/payments", contactRequest, { withCredentials: true });

        if (data.acknowledged) {
          Swal.fire({
            title: "Payment Successful",
            text: "Your payment has been successfully processed.",
            icon: "success",
            showCancelButton: false,
            confirmButtonText: "Ok",
          });
          navigate("/dashboard/property-bought");
          return toast.success("Payment completed successfully.");
        } else {
          setErrorMessage("Payment not completed. Please try again.");
        }
      } else {
        setErrorMessage("Payment not completed. Please try again.");
      }
    } catch (error) {
      setErrorMessage("An error occurred while processing your payment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white shadow-lg rounded-xl p-6 max-w-lg mx-auto"
    >
      {/* Title */}
      <h2 className="text-2xl font-bold text-gray-800 text-center flex items-center gap-2 mb-4">
        <HiOutlineCreditCard className="text-blue-500" />
        Secure Payment
      </h2>

      {/* Payment Element */}
      <div className="border border-gray-300 rounded-lg p-4">
        <PaymentElement />
      </div>

      {/* Error Message */}
      {errorMessage && (
        <div className="text-red-500 text-sm mt-2 flex items-center gap-2">
          <HiOutlineExclamationCircle className="text-red-500" />
          {errorMessage}
        </div>
      )}

      {/* Transaction ID */}
      {transactionId && (
        <div className="text-green-500 text-sm mt-2 flex items-center gap-2">
          <HiOutlineCheckCircle className="text-green-500" />
          Transaction ID: {transactionId}
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        className={`w-full flex items-center justify-center gap-2 text-white py-3 rounded-lg transition-colors ${loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
          }`}
        disabled={!stripe || !elements || loading}
      >
        {loading ? (
          <>
            <HiOutlineRefresh className="animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <HiOutlineArrowCircleRight />
            Pay Now
          </>
        )}
      </button>

      {/* Security Note */}
      <p className="text-gray-500 text-sm text-center mt-4 flex items-center justify-center gap-1">
        <HiOutlineShieldCheck className="text-blue-500" />
        Secure and encrypted transaction
      </p>
    </form>

  );
};

export default CheckoutForm;