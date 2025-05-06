import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import convertToSubcurrency from "../libs/convertToSubcurrency";
import CheckoutPage from "../components/CheckoutPage";
import useCart from "../hooks/useCart";

const CheckoutClient = () => {
  const { cartTotalAmount } = useCart();

  if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
    throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
  }
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

  const amount = cartTotalAmount;
  return (
    <div className="p-10">
      <main className="max-w-6xl mx-auto text-2xl text-center rounded-md bg-white">
        <div className="">
          <h1 className="text-2xl mb-5 font-bold text-center ">
            Enter your details to complete checkout
          </h1>
          {/* <h2 className="text-sm text-left">
  Address information
  </h2> */}
        </div>
        <Elements
          stripe={stripePromise}
          options={{
            mode: "payment",
            amount: convertToSubcurrency(amount),
            currency: "usd",
          }}
        >
          <CheckoutPage amount={amount} />
        </Elements>
      </main>
    </div>
  );
};

export default CheckoutClient;
