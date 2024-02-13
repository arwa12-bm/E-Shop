import React from 'react'
import Container from '../Container'
import FooterList from './FooterList'
import Link from 'next/link'
import {MdFacebook} from "react-icons/md";
import { AiFillInstagram, AiFillTrademarkCircle, AiFillTwitterCircle, AiFillYoutube } from 'react-icons/ai';

const Footer = () => {
    return (
        <div className='bg-slate-700 text-slate-200 text-sm mt-16'>
        <Container>
            <div className='flex gap-1 md:flex-row justify-between pt-16 pb-8'>
                <FooterList>
                    <h3 className='text-base font-bold mb-2'>Shop Categories</h3>
                    <Link href="#">Phones</Link>
                    <Link href="#">Laptops</Link>
                    <Link href="#">Desktops</Link>
                    <Link href="#">watches</Link>
                    <Link href="#">Tvs</Link>
                    <Link href="#">Accesories</Link>
                </FooterList>
                <FooterList>
                    <h3 className='text-base font-bold mb-2'>Customer Service</h3>
                    <Link href="#">Contact Us</Link>
                    <Link href="#">Shipping Policy</Link>
                    <Link href="#">Returns & Exchanges</Link>
                    <Link href="#">FAQs</Link>
                </FooterList>
                <div className='w-full md:w1/2 mb-6 md:mb-0'>
                    <h3 className='text-base font-bold mb-2'>About us</h3>
                    <p className='mb-2'> 
                    Next.js étant qualifié de framework React 
                    pour la production,il est devenu évident 
                    que vous pouvez rapidement créer et déployer
                    des applications à grande échelle et prêtes 
                    pour l’entreprise en production avec Next.js
                    </p>
                    <p>&copy; {new Date().getFullYear()} E-Shop. All rights reserved</p>
                </div>
                <FooterList>
                    <h3 className='text-base font-bold mb-2'>Customer Service</h3>
                    <div className='flex gap-2'>
                        <Link href="#">
                            <MdFacebook size={24}/>
                        </Link>
                        <Link href="#">
                            <AiFillTwitterCircle size={24}/>
                        </Link>
                        <Link href="#">
                            <AiFillInstagram size={24}/>
                        </Link>
                        <Link href="#">
                            <AiFillYoutube size={24}/>
                        </Link>
                    </div>
                </FooterList>

            </div>
        </Container>
        </div>
    )
}

export default Footer
