import React from 'react'
import CartClient from './CartClient'
import Container from '../components/Container'


const Cart = () => {
    return (
        <div className='pt-8'> 
        <Container>
            <CartClient />
        </Container>
        </div>

    )
}

export default Cart
