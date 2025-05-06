import React  from 'react'
import Link from 'next/link';
import Container from '../Container'
import {Redressed} from 'next/font/google'
import CartCount from './CartCount';
import UserMenu from './UserMenu';
import { getCurrentUser } from '@/actions/getCurrentUser';

const redressed =Redressed({subsets:["latin"],weight:["400"]});

const NavBar = async() => {
    
  const currentUser = await getCurrentUser();
  console.log({ currentUser });
    return (
        <div className='sticky top-0 w-full bg-slate-200 z-30
        shadow-sm'>
            <div className='py-4 border-b-[1px'>
                <Container>
                    <div className='flex item-center justify-between gap-3 md:gap-0'>
                        <Link href="/" className={`${redressed.className} font-blod text-4xl mt-4`}>E-Shop</Link>
                        <div className='hidden md:block'>Search</div>
                        <div className='flex item-center justify-between gap-8 md:gap-12'>
                            <CartCount />
                            <UserMenu currentUser={currentUser}/>
                        </div>
                    </div>
                </Container>
            </div>
            
        </div>
    )
}

export default NavBar
