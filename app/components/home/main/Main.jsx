import Header from "../header/Header"
import Menu from "../menu/Menu"
import Offer from "../offer/Offer"
import styles from "../styles.module.scss"
import MainSwiper from "../swiper/MainSwiper"
import User from "../user/User"


const Main = () => {
    return (
        <div className={styles.main}>
            <Header />
            <Menu />
            <MainSwiper />
            <Offer />
            <User />
        </div>
    )
}

export default Main