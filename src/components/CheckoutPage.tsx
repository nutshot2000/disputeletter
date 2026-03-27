import { useState, useEffect } from 'react';
import { CreditCard, ArrowLeft, Lock, Loader2, AlertCircle } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { FormData } from '../types';

// Initialize Stripe outside component to avoid recreating
// DEPLOYMENT NOTE: Replace 'pk_test_...' with your live publishable key ('pk_live_...') in your production environment variables.
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_placeholder');

interface CheckoutPageProps {
  formData: FormData;
  onBack: () => void;
  onSuccess: () => void;
}

function CheckoutForm({ onSuccess, currencySymbol }: { onSuccess: () => void, currencySymbol: string }) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setErrorMessage(null);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // We handle the redirect manually to keep state
        return_url: window.location.href,
      },
      redirect: 'if_required',
    });

    if (error) {
      setErrorMessage(error.message || 'An unexpected error occurred.');
      setIsProcessing(false);
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      onSuccess();
    } else {
      setErrorMessage('Payment failed. Please try again.');
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />
      {errorMessage && (
        <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md border border-red-200">
          {errorMessage}
        </div>
      )}
      <button
        disabled={isProcessing || !stripe || !elements}
        className="w-full flex justify-center items-center px-4 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isProcessing ? (
          <Loader2 className="animate-spin h-5 w-5" />
        ) : (
          <>
            <CreditCard className="mr-2 h-5 w-5" />
            Pay {currencySymbol}19.00
          </>
        )}
      </button>
    </form>
  );
}

export function CheckoutPage({ formData, onBack, onSuccess }: CheckoutPageProps) {
  const currencySymbol = formData.country === 'UK' ? '£' : '$';
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [isSimulated, setIsSimulated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchPaymentIntent() {
      try {
        const response = await fetch('/api/create-payment-intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ country: formData.country }),
        });
        const data = await response.json();
        
        if (data.simulated) {
          setIsSimulated(true);
        } else if (data.clientSecret) {
          setClientSecret(data.clientSecret);
        }
      } catch (error) {
        console.error('Failed to initialize payment:', error);
        setIsSimulated(true); // Fallback to simulated on error
      } finally {
        setIsLoading(false);
      }
    }

    fetchPaymentIntent();
  }, [formData.country]);

  const handleSimulatePayment = () => {
    setIsLoading(true);
    setTimeout(() => {
      onSuccess();
    }, 1500);
  };

  return (
    <div className="max-w-md mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center justify-between">
        <button onClick={onBack} className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700">
          <ArrowLeft className="mr-1 h-4 w-4" /> Back to Review
        </button>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg border border-gray-200">
        <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-200 text-center">
          <h2 className="text-xl leading-6 font-bold text-gray-900">
            Secure Checkout
          </h2>
          <p className="mt-2 text-sm text-gray-500 flex items-center justify-center">
            <Lock className="h-4 w-4 mr-1 text-green-500" />
            256-bit SSL Encryption
          </p>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <div className="flex justify-between items-center mb-6 pb-6 border-b border-gray-200">
            <span className="text-lg font-medium text-gray-900">Professional Demand Letter</span>
            <span className="text-2xl font-bold text-gray-900">{currencySymbol}19.00</span>
          </div>

          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-md p-4 text-sm text-blue-700">
              <p className="font-semibold mb-1">What you get:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Instantly generated PDF letter</li>
                <li>Customized to your specific situation</li>
                <li>References relevant {formData.country === 'UK' ? 'regional/national' : 'state'} laws</li>
                <li>Professional legal formatting</li>
              </ul>
            </div>

            {isLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="animate-spin h-8 w-8 text-indigo-600" />
              </div>
            ) : isSimulated ? (
              <div className="space-y-4">
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <AlertCircle className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-yellow-700">
                        Stripe keys are not configured in the Secrets menu. Using simulated payment mode.
                      </p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleSimulatePayment}
                  className="w-full flex justify-center items-center px-4 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <CreditCard className="mr-2 h-5 w-5" />
                  Pay {currencySymbol}19.00 (Simulated)
                </button>
              </div>
            ) : clientSecret ? (
              <Elements stripe={stripePromise} options={{ clientSecret }}>
                <CheckoutForm onSuccess={onSuccess} currencySymbol={currencySymbol} />
              </Elements>
            ) : null}

            <p className="text-xs text-center text-gray-500 mt-4">
              By clicking "Pay", you agree to our Terms of Service. This is a one-time payment. No subscription.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
