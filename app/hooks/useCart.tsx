import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { CartProductType } from "../product/[productId]/ProductDetails";
import {toast} from 'react-hot-toast'

type CartContextType ={
    cartTotalQty :number;
    cartTotalAmount :number;
    cartProducts: CartProductType[] | null;
    handleAddProductToCart: (product:CartProductType)=>void ;
    HandleCartQtyIncrease: (product:CartProductType)=>void ;
    HandleCartQtyDecrease: (product:CartProductType)=>void ;
    handleRemoveProductFromCart: (product:CartProductType)=>void ;
    handleClearCart:()=>void ;


}

export const CartContext = createContext<CartContextType | null>(null);

interface Props{
    [propsName:string]:any;
}

export const CartContextProvider = (props:Props)=> {
    const [cartTotalQty,setCartTotalQty]=useState(0)
    const [cartProducts,setCartProducts]=useState<CartProductType[] | null>(null)
    const [cartTotalAmount,setCartTotalAmount]=useState(0)

    console.log("qty",cartTotalQty)
    console.log("total",cartTotalAmount)

    useEffect(()=>{
        const cartItems: any = localStorage.getItem('eShopCartItem')
        const cProducts: CartProductType[] | null = JSON.parse(cartItems)
    
        setCartProducts(cProducts)
    },[])

    useEffect(()=>{
        
        const getTotals =()=>{
            if(cartProducts){
                const {total,qty} = cartProducts?.reduce((acc, item)=>{
                const itemTotal = item.price * item.Quantity
                acc.total += itemTotal 
                acc.qty +=item.Quantity
                return acc
            },{
                total:0,
                qty:0
            })
            setCartTotalQty(qty)
            setCartTotalAmount(total)
        }
        }
        getTotals()
    },[cartProducts])

    const handleAddProductToCart = useCallback((product:CartProductType)=> {
        setCartProducts((prev)=>{
            let updatedCart;
            if (prev){
                updatedCart = [...prev,product]
            }else{
                updatedCart= [product]
            }
            toast.success("product added to cart")
            localStorage.setItem('eShopCartItem',JSON.stringify(updatedCart))
            return updatedCart ;
        })
    },[])
    const HandleCartQtyIncrease =useCallback((product:CartProductType)=>{
        let updatedCart;

        if(product.Quantity===99){
            return toast.error("Ooop! Maximum reached")
        }

        if(cartProducts){
            updatedCart  = [...cartProducts]
            const Existingindex =cartProducts.findIndex((item)=> item.id === product.id)
            if(Existingindex > -1 ){
                updatedCart[Existingindex].Quantity = ++updatedCart[Existingindex].Quantity
            }
            setCartProducts(updatedCart)
        }

        localStorage.setItem('eShopCartItem',JSON.stringify(updatedCart))
        return updatedCart ;

    },[cartProducts])

    const  HandleCartQtyDecrease = useCallback((product:CartProductType)=>{
        let updatedCart;

        if(product.Quantity=== 1){
            return toast.error("Ooop! Manimum reached")
        }

        if(cartProducts){
            updatedCart  = [...cartProducts]
            const Existingindex =cartProducts.findIndex((item)=> item.id === product.id)
            if(Existingindex > -1 ){
                updatedCart[Existingindex].Quantity = -- updatedCart[Existingindex].Quantity
            }
            setCartProducts(updatedCart)
        }

        localStorage.setItem('eShopCartItem',JSON.stringify(updatedCart))
        return updatedCart ;

    },[cartProducts])

    const handleRemoveProductFromCart =useCallback((product :CartProductType)=>{
        if(cartProducts){
            const filteredProducts = cartProducts.filter
            ((item)=>{
                return item.id !== product.id
            })
            setCartProducts(filteredProducts)
            toast.success("product removed")
            localStorage.setItem('eShopCartItem',JSON.stringify(filteredProducts))
        }
    },[cartProducts])

    const handleClearCart =useCallback(()=>{
        setCartProducts(null)
        setCartTotalQty(0)
        localStorage.setItem('eShopCartItem',JSON.stringify(null))

    },[cartProducts])



    const value = {
        cartTotalQty,
        cartProducts,
        cartTotalAmount,
        handleAddProductToCart,
        handleRemoveProductFromCart,
        HandleCartQtyIncrease,
        HandleCartQtyDecrease,
        handleClearCart};
    return <CartContext.Provider  value={value}  {...props} />


}



const useCart = () => {
    const context =useContext(CartContext);

    if(context === null ){
        throw new Error("useCart must used within a CartContextProvider")
    }
    return context
}

export default useCart;