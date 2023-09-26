import Menu from "../menu/Menu"
import Offer from "../offer/Offer"
import styles from "../styles.module.scss"
import MainSwiper from "../swiper/MainSwiper"
import User from "../user/User"


const Main = () => {
    return (
        <div className={styles.main}>
            <div className={styles.header}>header</div>
            <Menu />
            <MainSwiper />
            <Offer />
            <User />
        </div>
    )
}

export default Main