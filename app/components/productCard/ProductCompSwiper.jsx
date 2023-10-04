import { Swiper, SwiperSlide } from 'swiper/react';
import styles from './styles.module.scss'
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { useEffect, useRef } from 'react';

const ProductCompSwiper = ({ images }) => {
    const swiperRef = useRef(null);

    useEffect(() => {
        swiperRef.current?.swiper.autoplay.stop();
    }, [swiperRef])
    return (
        <div
            className={styles.swiper}
            onMouseEnter={() => {
                swiperRef.current.swiper.autoplay.start();
            }}
            onMouseLeave={() => {
                swiperRef.current.swiper.autoplay.stop();
                swiperRef.current.swiper.slideTo(0);
            }}
        >
            <Swiper
                ref={swiperRef}
                centeredSlides={true}
                autoplay={{ delay: 500, stopOnLastSlide: false }}
                speed={500}
                modules={[Autoplay]}
            >
                {images.map((img, i) => (
                    <SwiperSlide key={i}>
                        <img src={img.url} alt="" />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default ProductCompSwiper