import styles from '../styles.module.scss'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const MainSwiper = () => {
    return (
        <Swiper
            slidesPerView={1}
            spaceBetween={30}
            loop={true}
            pagination={{
                clickable: true,
            }}
            autoplay={{
                delay: 2000,
                disableOnInteraction: false,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="mainSwiper"
        >
            {[...Array(10).keys()].map((i) => (
                <SwiperSlide key={i}>
                    <img src={`../../../images/swiper/${i + 1}.jpg`} alt="" />
                </SwiperSlide>
            ))}
        </Swiper>
    )
}

export default MainSwiper