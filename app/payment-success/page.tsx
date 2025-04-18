import React from 'react'

const paymentSuccess = ({searchParams: {amount}}: {searchParams: {amount: string} }
) => {
  return (
    <main className="max-w-4x1 mx-20 p-10 text-center border-[2px] shadow-xl m-10 rounded-md">
<div className="mb-10">
<h1 className="text-4xl font-extrabold mb-2">Thank you!</h1>
<h2 className="text-2x1">You successfully sent</h2>
<div className="bg-slate-300  p-2 rounded-md mt-5 text-4xl font-bold">
${amount}
</div>
</div>
</main>
  )
}

export default paymentSuccess

