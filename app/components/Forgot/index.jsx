"use client"
import styles from "../../styles/forgot.module.scss";
import { BiLeftArrowAlt } from "react-icons/bi";
import Link from "next/link";
import CircleIconBtn from "@/app/components/buttons/cicleIconBtn";
import LoginInput from "@/app/components/inputs/loginInputs";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useState } from "react";

const ForgotComponent = () => {
    const [email, setEmail] = useState("");
    const [error, seterror] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState("");
    const emailValidation = Yup.object({
        email: Yup.string()
            .required(
                "You'll need this when you log in and if you ever need to reset your password."
            )
            .email("Enter a valid email address."),
    });
    const forgotHandler = async () => { };

    return (
        <>
            <div className={styles.forgot}>
                <div>
                    <div className={styles.forgot__header}>
                        <div className={styles.back__svg}>
                            <BiLeftArrowAlt />
                        </div>
                        <span>Forgot your password ?{" "}
                            <Link href="/signin">Login instead</Link>
                        </span>
                    </div>
                    <Formik
                        enableReinitialize
                        initialValues={{
                            email,
                        }}
                        validationSchema={emailValidation}
                        onSubmit={() => {
                            forgotHandler();
                        }}
                    >
                        {(form) => (
                            <Form>
                                <LoginInput
                                    type="text"
                                    name="email"
                                    icon="email"
                                    placeholder="Email Address"
                                    onChange={(e) => setEmail(e.target.value)}
                                />

                                <CircleIconBtn type="submit" text="Send link" />
                                <div style={{ marginTop: "10px" }}>
                                    {error && <span className={styles.error}>{error}</span>}
                                    {success && <span className={styles.success}>{success}</span>}
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </>
    )
}

export default ForgotComponent;