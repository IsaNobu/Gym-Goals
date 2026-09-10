import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../Hooks/Axios/useAxiosSecure";
import { AuthContext } from "../Auth Provider/AuthProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const getInfo = JSON.parse(localStorage.getItem("user"));
    axiosSecure
      .post("/create-payment-intent", {
        items: getInfo.price,
      })
      .then((res) => {
        setClientSecret(res.data.clientSecret);
      });
  }, [axiosSecure]);

  const handleForm = async (e) => {
    e.preventDefault();

    const getInfo = JSON.parse(localStorage.getItem("user"));

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(true);
    } else {
      console.log(paymentMethod);
      setError(false);
    }
    const { paymentIntent, err } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      }
    );

    if (err) {
      console.log(err);
    } else {
      if (paymentIntent.status === "succeeded") {
        console.log("intent", paymentIntent);

        axiosSecure
          .post("/user-payments", {
            email: user?.email,
            name: user?.displayName,
            price: parseInt(getInfo.price),
            slot: getInfo.shift,
            trainerName: getInfo.trainerName,
            trainerId: getInfo.trainerId,
            trainerImage: getInfo.photoURL,
            classId: getInfo.class,
            transactionId: paymentIntent.id,
          })
          .then((res) => {
            if (res.data.acknowledged === true) {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "You're all set",
                showConfirmButton: false,
                timer: 1500,
              });
              navigate("/");
            }
          });
      }
    }
  };
  return (
    <div>
      <form className="lg:w-[800px] mx-auto space-y-4" onClick={handleForm}>
        <div className="input input-bordered">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#ffff",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
        </div>
        <button
          className="text-2xl bg-red-600 btn"
          type="submit"
          disabled={!stripe || clientSecret === ""}
        >
          Pay
        </button>
        {error ? (
          <div className="text-red-600 text-xl mt-3">
            <span className="cursor-pointer" onClick={() => setError(false)}>
              X
            </span>{" "}
            invalid Info
          </div>
        ) : (
          <></>
        )}
      </form>
    </div>
  );
};

export default CheckoutForm;
