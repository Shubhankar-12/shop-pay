"use client"
import React, { useState } from 'react'
import * as Yup from "yup";
import styles from '../../styles/signin.module.scss';
import { BiLeftArrowAlt } from "react-icons/bi";
import Link from 'next/link';
import { Form, Formik } from 'formik';
import LoginInput from '../inputs/loginInputs';
import CircleIconBtn from '../buttons/cicleIconBtn';
import { getProviders, signIn } from 'next-auth/react';

const intialValues = {
    login_email: "",
    login_password: "",
}

const Login = ({ providers }) => {
    console.log(providers);
    const [user, setuser] = useState(intialValues);
    const { login_email, login_password } = user;
    const handleChange = (e) => {
        const { name, value } = e.target;
        setuser({ ...user, [name]: value });
    }

    const loginValidation = Yup.object({
        login_email: Yup.string().required("Email Address is Required.")
            .email("Please enter a valid email address"),
        login_password: Yup.string().required("Please enter the Password."),
    })

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

        </div>
    )
}

export default Login