import React from 'react'
import Header from '../components/header';
import Footer from '../components/footer';
let country = {
    name: "India",
    currency: "INR"
}
const Cart = () => {
    return (
        <>
            <Header country={country} />
            <div>Cart</div>
            <Footer country={country} />
        </>

    )
}

export default Cart;