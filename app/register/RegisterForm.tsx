'use client'

import { useState } from "react";
import Input from "../components/inputs/Input";
import Heading from "../product/[productId]/Heading";
import {  FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Button from "../components/product/Button";
import Link from "next/link";
import { AiOutlineGoogle } from "react-icons/ai";

const RegisterForm = () => {
    const[isLoading,setIsLoading]= useState(false)
    const {register ,handleSubmit, formState:{errors}} = useForm<FieldValues>(
        { defaultValues:{
            name:"",
            email:"",
            password:""

    }})
    const onSubmit:SubmitHandler<FieldValues>= (data)=>{
        setIsLoading(true)
        console.log(data)
    }
    

    return ( 
    <>
    <Heading title="Sun up for E-Shop" />
    <Button 
    outline
    label="Sign up with Google"
    Icon={AiOutlineGoogle}
    onClick={()=>{}}
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