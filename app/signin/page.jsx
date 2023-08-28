"use client"
import React from 'react'
import Header from '../components/header';
import Footer from '../components/footer';

const Signin = () => {
    let country = {
        name: "India",
        flag: "../../../public/images/flag.png",
        currency: "INR"
    }
    return (
        <div>
            <Header country={country} />
            <Footer country={country} />
        </div>
    )
}

export default Signin;