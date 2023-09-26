import Menu from "../menu/Menu"
import Offer from "../offer/Offer"
import styles from "../styles.module.scss"
import MainSwiper from "../swiper/MainSwiper"


const Main = () => {
    return (
        <div className={styles.main}>
            <div className={styles.header}>header</div>
            <Menu />
            <MainSwiper />
            <Offer />
            <div className={styles.user}>user</div>
        </div>
    )
}

export default Main