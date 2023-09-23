"use client"
import styles from "../../styles/forgot.module.scss";
import { BiLeftArrowAlt } from "react-icons/bi";
import Link from "next/link";
import CircleIconBtn from "@/app/components/buttons/cicleIconBtn";
import LoginInput from "@/app/components/inputs/loginInputs";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import axios from "axios";
import DotLoader from "../loders/DotLoader";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const ResetComponent = ({ id }) => {
    const router = useRouter();
    const session = useSession();
    const [password, setPassword] = useState("");
    const [confPassword, setConfPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);
    const passwordValidation = Yup.object({
        password: Yup.string()
            .required(
                "Please enter a new password."
            )
            .min(6, "Password must be atleast 6 characters.")
            .max(36, "Password can't be more than 36 characters"),
        confPassword: Yup.string()
            .required("Confirm your password.")
            .oneOf([Yup.ref("password")], "Passwords doesn't match."),
    });
    const resetHandler = async () => {
        try {
            setLoading(true);
            const { data } = await axios.put("/api/auth/reset", {
                id, password
            })
            let options = {
                redirect: false,
                email: data.email,
                password: password
            };

            const msg = await signIn("credentials", options);

            setError("");
            router.push("/");
            setLoading(false);

        } catch (error) {
            setLoading(false);
            setError(error.response.data.message);
            setSuccess("");
        }
    };
    const sessionRedirect = () => {
        setTimeout(() => {
            router.push("/");
        }, 2000);
    }

    if (session.data) {
        return <div onLoad={sessionRedirect()} className={styles.sessionExist}>
            <h1>You are already logged in.</h1>
            <p>Sign out to reset the password</p>
        </div>
    }
    return (
        <>
            {loading && <DotLoader loading={loading} />}
            <div className={styles.forgot}>
                <div>
                    <div className={styles.forgot__header}>
                        <div className={styles.back__svg}>
                            <BiLeftArrowAlt />
                        </div>
                        <span>Reset your Password !{" "}
                            <Link href="/signin">Login instead</Link>
                        </span>
                    </div>
                    <Formik
                        enableReinitialize
                        initialValues={{
                            password, confPassword
                        }}
                        validationSchema={passwordValidation}
                        onSubmit={() => {
                            resetHandler();
                        }}
                    >
                        {(form) => (
                            <Form>
                                <LoginInput
                                    type="password"
                                    name="password"
                                    icon="password"
                                    placeholder="Password"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <LoginInput
                                    type="password"
                                    name="conf_password"
                                    icon="password"
                                    placeholder="Re-type Password"
                                    onChange={(e) => setConfPassword(e.target.value)}
                                />

                                <CircleIconBtn type="submit" text="Reset" />
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

export default ResetComponent;