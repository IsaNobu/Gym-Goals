import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../../Components/CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import NavbarBanner from "../../Components/NavbarBanner";

const BookTrainer = () => {
  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);
  return (
    <div>
      <NavbarBanner text="Pay Here" />
      <div>
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </div>
    </div>
  );
};

export default BookTrainer;
