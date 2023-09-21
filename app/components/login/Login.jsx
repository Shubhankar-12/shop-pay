"use client"
import React, { useState } from 'react'
import * as Yup from "yup";
import styles from '../../styles/signin.module.scss';
import { BiLeftArrowAlt } from "react-icons/bi";
import Link from 'next/link';
import { Form, Formik } from 'formik';
import LoginInput from '../inputs/loginInputs';
import CircleIconBtn from '../buttons/cicleIconBtn';
import { signIn, useSession } from 'next-auth/react';
import axios from 'axios';
import DotLoader from '../loders/DotLoader';
import { useRouter } from 'next/navigation';

const intialValues = {
    login_email: "",
    login_password: "",
    name: "",
    email: "",
    password: "",
    conf_password: "",
    success: "",
    error: "",
    login_error: ""
}

const Login = ({ providers, callbackUrl, csrfToken }) => {
    // usestates
    const [user, setuser] = useState(intialValues);
    const [loading, setLoading] = useState(false);
    // userouter
    const router = useRouter();

    const session = useSession();

    const { login_email, login_password, name, email, password,
        conf_password, success, error, login_error } = user;

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

    const signupHandler = async () => {
        try {
            setLoading(true);
            const { data } = await axios.post('/api/auth/signup', {
                name,
                email,
                password
            });
            setuser({ ...user, error: "", success: data.message });
            setLoading(false);
            setTimeout(async () => {
                let option = {
                    redirect: false,
                    email: email,
                    password: password
                };
                const res = await signIn("credentials", option);
                if (callbackUrl === undefined)
                    router.push('/');
                else
                    router.push(callbackUrl);
            }, 1000)
        } catch (err) {
            setLoading(false);
            setuser({ ...user, success: "", error: err.response.data.message });
        }
    };

    const signInHandler = async () => {
        setLoading(true);
        let option = {
            redirect: false,
            email: login_email,
            password: login_password
        };
        const res = await signIn("credentials", option);
        setuser({ ...user, success: "", error: "" });
        setLoading(false);
        if (res?.error) {
            setuser({ ...user, login_error: res.error });
        }
        else {
            if (callbackUrl === undefined)
                router.push('/');
            else
                router.push(callbackUrl);
        }
    }

    const sessionRedirect = () => {
        setTimeout(() => {
            if (callbackUrl === undefined)
                router.push('/');
            else
                router.push(callbackUrl);
        }, 2000);
    }

    if (session.data) {
        return <div onLoad={sessionRedirect()} className={styles.sessionExist}>
            <h1>You are already logged in.</h1>
            <p>Redirecting to the last page...</p>
        </div>
    }
    return (
        <>
            {loading && <DotLoader loading={loading} />}
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
                            onSubmit={() => signInHandler()}
                        >
                            {
                                (form) => (
                                    <Form method='post' action="/api/auth/signin/email">
                                        <input
                                            type="hidden"
                                            name="csrfToken"
                                            defaultValue={csrfToken}
                                        />
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
                                        {
                                            login_error && <span className={styles.error}>{login_error}</span>
                                        }
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
                                {providers.map((provider) => {
                                    if (provider.name == "Credentials") return;
                                    return (<div key={provider.name}>
                                        <button
                                            className={styles.socials__btn}
                                            onClick={() => signIn(provider.id)}
                                        >
                                            <img src={`../../../icons/${provider.name}.png`} alt='visa' />

                                            Sign in with {provider.name}
                                        </button>
                                    </div>)
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                {/* Signup */}
                <div className={styles.login__container}>

                    <div className={styles.login__form}>
                        <h1>Sign Up</h1>
                        {/* Change required */}
                        <p>Get access to one of the best Eshopping services in the world.</p>
                        <Formik
                            enableReinitialize
                            initialValues={{
                                name, email, password,
                                conf_password
                            }}
                            validationSchema={registerValidation}
                            onSubmit={() => signupHandler()}
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

                                    </Form>
                                )
                            }
                        </Formik>
                        <div>
                            {success && <span className={styles.success}>{success}</span>}
                            {error && <span className={styles.error}>{error}</span>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login