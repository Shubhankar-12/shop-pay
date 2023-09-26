"use client"
import styles from "../../styles/home.module.scss"
import FlashDeals from "./flashDeals/FlashDeals"
import Main from "./main/Main"
const HomeComponent = () => {
    return (
        <div className={styles.home}>
            <div className={styles.container}>
                <Main />
                <FlashDeals />
            </div>
        </div>
    )
}

export default HomeComponent