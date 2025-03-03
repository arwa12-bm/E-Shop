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
    <div>
      <main className="max-w-6xl mx-auto p-10 text-white text-center border m-10 rounded-md bg-gradient-to-tr
  from-blue-500 to-purple-500">
  <div className="mb-10">
  <h1 className="text-4xl font-extrabold mb-2">Sonny</h1> You, 1 minute ago Uncommitted changes
  <h2 className="text-2x1">
  has requested
  <span className="font-bold"> ${amount}</span>
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
