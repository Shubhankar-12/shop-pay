import styles from "../styles.module.scss"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Link from "next/link";
import { offersAarray } from "@/data/home";
const Offer = () => {
    return (
        <div className={styles.offers}>
            <div className={styles.offers__text}>
                <p>
                    use code <b>“SHUBH”</b> for 30% off all products.
                </p>
                <Link href="/browse">Shop now</Link>
            </div>
            <Swiper
                slidesPerView={3}
                spaceBetween={10}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Pagination, Navigation]}
                className="offers_swiper"
            >
                {offersAarray.map((offer) => (
                    <SwiperSlide key={offer}>
                        <Link href="">
                            <img src={offer.image} alt="" />
                        </Link>
                        <span>₹{offer.price}0</span>
                        <span>-{offer.discount}%</span>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default Offer