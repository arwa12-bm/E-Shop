"use client"

import Button from "@/app/components/product/Button"
import ProductImage from "@/app/components/product/ProductImage"
import SetColor from "@/app/components/product/SetColor"
import SetQuantity from "@/app/components/product/SetQuantity"
import ProductRating from "@/utils/productRating"
import { useCallback, useEffect, useState } from "react"
import ListRating from "./ListRating"
import useCart from "@/app/hooks/useCart"
import { MdCheckCircle } from "react-icons/md"
import { useRouter } from "next/navigation"

interface ProductListProps{
    product:any
}

export type CartProductType ={
    id:string,
    name:string,
    description:string,
    category:string,
    brand:string,
    selectedImg:SelectedImgType,
    Quantity:number,
    price:number
}

export type SelectedImgType={
    color:string,
    colorCode:string,
    image:string,
}

export const Horizontal=()=>{
    return <hr className="w-[50%] my-2"/>
}

const ProductDetails:React.FC<ProductListProps> = ({product}) => {

    const {handleAddProductToCart,cartProducts,cartTotalQty} =useCart()
    console.log("cartTotalQty",cartTotalQty)

    const [isProductInCart , setIsProductInCart]= useState(false);
    console.log("cartProducts",cartProducts)

    const [cartProduct,setCartProduct] = useState<CartProductType>({
        id:product.id,
        name:product.name,
        description:product.description,
        category:product.category,
        brand:product.barnd,
        selectedImg:{...product.images[0]},
        Quantity:1,
        price:product.price,
    })
        const router = useRouter()
    useEffect(()=>{
        setIsProductInCart(false)

        if (cartProducts){
            const Existingindex =cartProducts.findIndex((item)=> item.id === product.id)
            if(Existingindex > -1 ){
                setIsProductInCart(true)
            }
        }
    },[cartProducts])

    const handleColorSelect = useCallback((value:SelectedImgType)=>{
        
        setCartProduct((prev)=>{
            return {...prev,selectedImg:value}
        })
    },[cartProduct.selectedImg])

    const handleQtyIncrease=useCallback(()=>{
        if  (cartProduct.Quantity === 99){
            return;
        }
        setCartProduct((prev)=>{
            return {...prev,Quantity: ++prev.Quantity}
        })
    },[cartProduct])

    const handleQtyDecrease=useCallback(()=>{
        if (cartProduct.Quantity === 1){
            return;
        }
        setCartProduct((prev)=>{
            return{...prev,Quantity: --prev.Quantity}
        })
    },[cartProduct])



    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="" > 
                <ProductImage cartProduct={cartProduct} product={product} handleColorSelected={handleColorSelect}/>       
                {/* <Image fill src={product.images[0].image} alt={product.name} sizes="25"/> */}
            </div>
            <div className="flex flex-col gap-1 text-slate-500 text-sm">
                <div>
                    <h2 className="text-3xl font-medium text-slate-700">{product.name}</h2>
                </div>
                <div className="flex item-center gap-2">
                    <ProductRating ProductReviews={product.reviews}/>
                </div>
                <Horizontal/>
                <div>
                    <span>CATEGORY:</span>
                    <span>{product.category}</span>
                </div>
                <div>
                    <span>BRAND:</span>
                    <span>{product.brand}</span>
                </div>
                <div className={product.inStock?"text-teal-400":"text-rose-400"}>{product.inStock ? 'In stock' : 'Out of stock'}</div>
                <div>{product.reviews.length}reviews</div>
                <div className="text-justify">{product.description}</div>
                <Horizontal/>
                {isProductInCart?
                <>
                    <p className="mb-2 text-slate-500 flex item-center gap1">
                    <MdCheckCircle  size={20} className="text-teal-400"/>
                    <span>Product added to cart</span>
                    </p>
                    <div className="max-w-[300px]">
                        <Button label="View Cart" outline  onClick={()=>{
                            router.push("/cart")
                        }}/>
                    </div>
                    
                </>:<>
                    <SetColor 
                    cartProduct={cartProduct}
                    images={product.images}
                    handColorSelected={handleColorSelect}
                    />
                <Horizontal/>
                <div className="font-semibold"> Quantity:</div>
                <SetQuantity 
                cartCounter={true}
                cartProduct={cartProduct}
                handleQtyDecrease={handleQtyDecrease}
                handleQtyIncrease={handleQtyIncrease} />
                <Horizontal/>
                <div className="max-w-[300px]">
                    <Button  
                    label="Add To Cart"
                    onClick={()=>handleAddProductToCart(cartProduct)} />
                </div>
                </>}
                
            </div>
        

        </div>
    )
}

export default ProductDetails
