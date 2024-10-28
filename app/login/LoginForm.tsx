'use client'

import { useState } from "react";
import Input from "../components/inputs/Input";
import Heading from "../product/[productId]/Heading";
import {  FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Button from "../components/product/Button";
import Link from "next/link";
import { AiOutlineGoogle } from "react-icons/ai";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const LoginForm = () => {
    const[isLoading,setIsLoading]= useState(false)
    const {register ,handleSubmit, formState:{errors}} = useForm<FieldValues>(
        { defaultValues:{
            email:"",
            password:""

    }})
    const router =useRouter()
    const onSubmit:SubmitHandler<FieldValues>= (data)=>{
        setIsLoading(true)
        signIn('credentials',{
            ...data,
            redirect:false
        }).then((callback)=>{
            setIsLoading(false)
            if (callback?.ok) {
                router.push("/cart"); 
                router.refresh();
                toast.success("Logged in");
            } 
            if (callback?.error) {
                toast.error(callback.error);
            }

        })
        console.log(data)
    }
    

    return ( 
    <>
    <Heading title="Sign in to E-Shop" />
    <Button 
    outline
    label="Continue with Google"
    Icon={AiOutlineGoogle}
    onClick={()=>{}}
    />
    <hr className="bg-slate-300 w-full h-px" />

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
    label={isLoading? "Loading":"Login"}
    onClick={handleSubmit(onSubmit)}
    />
    <p className="text-sm">
        Do not have an account? 
        <Link href={'/register'} className="underline" >Sign up</Link>
    </p>
    
    </> );
}

export default LoginForm;