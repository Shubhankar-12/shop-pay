"use client"
import styles from "../../styles/home.module.scss"
import Main from "./main/Main"
const HomeComponent = () => {
    return (
        <div className={styles.home}>
            <div className={styles.container}>
                <Main />
            </div>
        </div>
    )
}

export default HomeComponent