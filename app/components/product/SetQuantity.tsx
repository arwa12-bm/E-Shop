'use client'

import { CartProductType } from "@/app/product/[productId]/ProductDetails";

interface SetQtyProps{
    cartCounter?:boolean,
    cartProduct:CartProductType,
    handleQtyIncrease:()=> void,
    handleQtyDecrease:()=> void 

}

const SetQuantity:React.FC<SetQtyProps> = ({cartCounter,cartProduct,handleQtyDecrease,handleQtyIncrease}) => {
    return (
        <div className="flex gap-8 item-center">
            {!cartCounter? null: 
                        <div className="flex  item-center text-base">
                            <button onClick={handleQtyDecrease} className="border-[1.5px] rounded  m-2 h-8 w-5 font-bold  aspect-square relative ">-</button>
                            <div className="font-semibold  m-2  font-bold  aspect-square relative"> {cartProduct.Quantity} </div>
                            <button onClick={handleQtyIncrease} className="border-[1.5px] rounded  m-2 h-8 w-5 font-bold  aspect-square relative ">+</button>
                        </div>
            }
        </div> );
}

export default SetQuantity;