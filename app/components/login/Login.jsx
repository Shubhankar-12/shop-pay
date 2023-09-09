"use client"
import React, { useState } from 'react'
import * as Yup from "yup";
import styles from '../../styles/signin.module.scss';
import { BiLeftArrowAlt } from "react-icons/bi";
import Link from 'next/link';
import { Form, Formik } from 'formik';
import LoginInput from '../inputs/loginInputs';
import CircleIconBtn from '../buttons/cicleIconBtn';
import { signIn } from 'next-auth/react';

const intialValues = {
    login_email: "",
    login_password: "",
    name: "",
    email: "",
    password: "",
    conf_password: "",
}

const Login = ({ providers }) => {

    const [user, setuser] = useState(intialValues);
    const { login_email, login_password, name, email, password,
        conf_password, } = user;
    const handleChange = (e) => {
        const { name, value } = e.target;
        setuser({ ...user, [name]: value });
    }

    const loginValidation = Yup.object({
        login_email: Yup.string().required("Email Address is Required.")
            .email("Please enter a valid email address"),
        login_password: Yup.string().required("Please enter the Password."),
    });

    const registerValidation = Yup.object({
        name: Yup.string()
            .required("What's your name ?")
            .min(2, "First name must be between 2 and 16 characters.")
            .max(16, "First name must be between 2 and 16 characters.")
            .matches(/^[aA-zZ]/, "Numbers and special characters are not allowed."),
        email: Yup.string()
            .required(
                "You'll need this when you log in and if you ever need to reset your password."
            )
            .email("Enter a valid email address."),
        password: Yup.string()
            .required(
                "Enter a combination of at least six numbers,letters and special characters."
            )
            .min(6, "Password must be atleast 6 characters.")
            .max(36, "Password can't be more than 36 characters"),
        conf_password: Yup.string()
            .required("Confirm your password.")
            .oneOf([Yup.ref("password")], "Passwords doesn't match."),
    });

    return (
        <div className={styles.login}>
            <div className={styles.login__container}>
                <div className={styles.login__header}>
                    <div className={styles.back__svg}>
                        <BiLeftArrowAlt />
                    </div>
                    <span>We'd be happy to join us !{" "}
                        <Link href='/'>Go Store</Link>
                    </span>
                </div>
                <div className={styles.login__form}>
                    <h1>Sign In</h1>
                    <p>Get access to one of the best Eshopping services in the world.</p>
                    <Formik
                        enableReinitialize
                        initialValues={{
                            login_email,
                            login_password,
                        }}
                        validationSchema={loginValidation}
                    >
                        {
                            (form) => (
                                <Form>
                                    <LoginInput
                                        type="text"
                                        name="login_email"
                                        icon="email"
                                        placeholder="Email Address"
                                        onChange={handleChange}
                                    />
                                    <LoginInput
                                        type="password"
                                        name="login_password"
                                        icon="password"
                                        placeholder="Password"
                                        onChange={handleChange}
                                    />
                                    <CircleIconBtn type="submit" text="Sign In" />
                                    <div className={styles.forgot}>
                                        <Link href="/forgot">Forgot Password ?</Link>
                                    </div>
                                </Form>
                            )
                        }
                    </Formik>
                    <div className={styles.login__socials}>
                        <span className={styles.or}>
                            Or continue with
                        </span>
                        <div className={styles.login__socials__wrap}>
                            {providers.map((provider) => (
                                <div key={provider.name}>
                                    <button
                                        className={styles.socials__btn}
                                        onClick={() => signIn(provider.id)}
                                    >
                                        <img src={`../../../icons/${provider.name}.png`} alt='visa' />

                                        Sign in with {provider.name}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            {/* Signup */}
            <div className={styles.login__container}>

                <div className={styles.login__form}>
                    <h1>Sign Up</h1>
                    <p>Get access to one of the best Eshopping services in the world.</p>
                    <Formik
                        enableReinitialize
                        initialValues={{
                            name, email, password,
                            conf_password,
                        }}
                        validationSchema={registerValidation}
                    >
                        {
                            (form) => (
                                <Form>
                                    <LoginInput
                                        type="text"
                                        name="name"
                                        icon="user"
                                        placeholder="Full Name"
                                        onChange={handleChange}
                                    />
                                    <LoginInput
                                        type="text"
                                        name="email"
                                        icon="email"
                                        placeholder="Email Address"
                                        onChange={handleChange}
                                    />
                                    <LoginInput
                                        type="password"
                                        name="password"
                                        icon="password"
                                        placeholder="Password"
                                        onChange={handleChange}
                                    />
                                    <LoginInput
                                        type="password"
                                        name="conf_password"
                                        icon="password"
                                        placeholder="Re-type Password"
                                        onChange={handleChange}
                                    />
                                    <CircleIconBtn type="submit" text="Sign Up" />
                                    <div className={styles.forgot}>
                                        <Link href="/forgot">Forgot Password ?</Link>
                                    </div>
                                </Form>
                            )
                        }
                    </Formik>

                </div>
            </div>
        </div>
    )
}

export default Login