"use client"

import Image from "next/image"
import { trancateText } from "@/utils/trancateText";
import { formatPrice } from "@/utils/formatPrice";
import { useRouter } from "next/navigation";
import ProductRating from "@/utils/productRating";


interface ProductCartProps{
  data:any
}

const ProductCart:React.FC<ProductCartProps> = ({data}) => {
  
  const router =useRouter();

  return (
    <div  onClick={()=>router.push(`/product/${data.id}`)} className="col-span-1 cursor-pointer border-[1.2px] border-slate-200 bg-slate-50 rounded-lg
    p-2 transition hover:scale-105 text-center text-sm  relative">
      <div className="flex flex-col  relative item-center w-full gap-2">
          <div className="aspect-square overflow-hidden relative w-full">
          <Image fill src={data.images[0].image} alt={data.name} />
          </div>
        <div>{trancateText(data.name)}</div>
        <div className=""><ProductRating ProductReviews={data.reviews}  /></div>
        <div>{data.reviews.length}reviews</div>
        <div className="font-semibold">{formatPrice(data.price)}</div>
      </div>
    </div>
  )
}

export default ProductCart
