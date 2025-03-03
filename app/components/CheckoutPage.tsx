"use client"
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react'
import convertToSubcurrency from '../libs/convertToSubcurrency';

const CheckoutPage = ({amount}:{amount:number}) => {
    
    const stripe = useStripe();
    const elements = useElements();
    const [errorMessage, setErrorMessage] = useState<string>();
    const [clientSecret, setClientSecret] = useState("");
    const [loading, setLoading] = useState(false);

useEffect (() => {
fetch("/api/create-payment-intent", {
method: "POST",
headers: {
"Content-Type": "application/json",
},
body:JSON.stringify({amount: convertToSubcurrency(amount)}),
})
.then((res)=>res.json())
.then((data)=>setClientSecret(data.clientSecret));
}, [amount]); 




const handleSubmit = async (event:React.FormEvent<HTMLFormElement> )=> {
    event.preventDefault();
    setLoading(true)
    if (!stripe || !elements){
        return;
    }
    const {error:submitError}=await elements.submit();

    if(submitError){
        setErrorMessage(submitError.message);
        setLoading(false)
        return;
    }
    
    const { error } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
        return_url: `http://www.localhost:3000/payment-success?amount=${amount}`,
        },
        });
    
        if (error){
            setErrorMessage(error.message)
        }else{
    
        }
        setLoading(false)
    };


  return (
    <form onSubmit={handleSubmit} className='bg-white p-2 rounded-md'>
        {clientSecret && <PaymentElement />}
        {errorMessage && <div>{errorMessage}</div> }
    <button
    disabled={!stripe || loading}
    className="text-white w-full p-5 bg-black mt-2 rounded-md font-blod disabled:opacity-50 disabled:animation-pulse"
    >
        { !loading  ? `Pay $${amount}` : "processing..." }
    </button>
    </form>
  )
}

export default CheckoutPage