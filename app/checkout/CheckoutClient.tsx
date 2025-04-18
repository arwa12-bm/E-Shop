import React from 'react'
import {Elements} from "@stripe/react-stripe-js"
import {loadStripe} from "@stripe/stripe-js"
import convertToSubcurrency from '../libs/convertToSubcurrency';
import CheckoutPage from '../components/CheckoutPage';
import useCart from '../hooks/useCart';

const CheckoutClient = () => {
  const {cartTotalAmount} = useCart()

  if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
    throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
    }
    const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
    
    // const calculateOrderAmount = (cartProducts: CartProductType[]) => {
    //     return Math.floor(
    //       cartProducts.reduce((acc, item) => acc + item.price * item.Quantity, 0)
    //     );
    // };
    const amount = cartTotalAmount ;
  return (
    <div className="p-10">
      <main className="max-w-6xl mx-auto text-2xl text-center rounded-md bg-white">
  <div className="">
  <h1 className="text-2xl mb-5 font-bold text-center ">
  Enter your details to complete checkout
  </h1>
  <h2 className="text-sm text-left">
  Address information
  </h2>
  <h2 className="text-sm text-left">
  payment information
  </h2>
  <h2 className="text-2x1 m-8 text-center">
  <span className="font-bold "> ${amount}</span>
  </h2>
  </div>
  <Elements
stripe={stripePromise}
options={{
mode: "payment",
amount: convertToSubcurrency(amount),
currency: "usd",
}}>
<CheckoutPage amount={amount} />
</Elements>
  </main>
    </div>
  )
}


export default CheckoutClient
