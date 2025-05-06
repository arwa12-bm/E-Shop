'use client'
import useCart from "@/app/hooks/useCart";
import { useRouter } from "next/navigation";
import { CiShoppingCart } from "react-icons/ci";

const CartCount = () => {
    const {cartTotalQty}=useCart()
    const router =useRouter()
    return ( 
    <div className="relative cursor-pointer mt-5" onClick={()=>router.push('/cart')}>
        <div className="text-3xl">
            <CiShoppingCart />
        </div>
        <span className="absolute top-[-10px] right-[-10px] bg-slate-700 h-6 w-6 rounded-full flex items-center justify-center text-sm text-white">
            {cartTotalQty}
        </span>
    </div> );
}

export default CartCount;