'use client'

import { useEffect, useState } from "react";
import Input from "../components/inputs/Input";
import Heading from "../product/[productId]/Heading";
import {  FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Button from "../components/product/Button";
import Link from "next/link";
import { AiOutlineGoogle } from "react-icons/ai";
import axios from "axios";
import {toast} from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SafeUser } from "@/types";
interface RegisterFormProps{
    currentUser:SafeUser | null
}
const RegisterForm:React.FC<RegisterFormProps> = ({currentUser}) => {
    const router = useRouter()
console.log("RegisterUser",currentUser);

    useEffect (() => {
        if (currentUser) {
        router.push("/cart");
        router.refresh();
        }}, []);

    const[isLoading,setIsLoading]= useState(false)
    const {register ,handleSubmit, formState:{errors}} = useForm<FieldValues>(
        { defaultValues:{
            name:"",
            email:"",
            password:"",

    }})
    const onSubmit:SubmitHandler<FieldValues>= (data)=>{
        setIsLoading(true)
        axios.post("/api/register", data)
        .then(() => {
            toast.success("Account created");
            signIn('credentials', {
                email: data.email,
                password: data.password,
                redirect: false, // Redirection manuelle
            })
            .then((callback:any) => {
                console.log("xx",callback)
            if (callback?.ok) {
                router.push("/cart"); 
                router.refresh();
                toast.success("Logged in");
            } 
            if (callback?.error) {
                toast.error(callback.error);
            }
            })
        }).catch(() => toast.error("Something went wrong"))
        .finally(() => setIsLoading(false));
        }
        
    if (currentUser) {
        return <p className="text-center">Logged in. Redirecting...</p>;
        }

    return ( 
    <>
    <Heading title="Sign up for E-Shop" />
    <Button 
    outline
    label="Sign up with Google"
    Icon={AiOutlineGoogle}
    onClick={()=>{signIn('google', { callbackUrl: 'http://localhost:3000/cart' })}}
    />
    <hr className="bg-slate-300 w-full h-px" />
    <Input
    id="name"
    label="name"
    type="text"
    disabled={isLoading}
    register={register}
    errors={errors}
    required/>
    <Input
    id="email"
    label="Email"
    type="email"
    disabled={isLoading}
    register={register}
    errors={errors}
    required/>
    <Input
    id="password"
    label="Password"
    type="password"
    disabled={isLoading}
    register={register}
    errors={errors}
    required/>
    <Button 
    label={isLoading? "Loading":"Sign Up"}
    onClick={handleSubmit(onSubmit)}
    />
    <p className="text-sm">
        Already have account? 
        <Link href={'/login'} className="underline" >Log in</Link>
    </p>
    
    </> );
}

export default RegisterForm;