import styles from "./styles.module.scss";
import { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from 'swiper/modules';
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import Link from "next/link";
import { simillar_products } from "@/data/product";
const SimilarSwiper = () => {
    return (
        <Swiper
            slidesPerView={4}
            spaceBetween={5}
            slidesPerGroup={3}
            navigation={true}
            modules={[Navigation]}
            className="swiper simillar_swiper products__swiper"
            breakpoints={{
                640: {
                    width: 640,
                    slidesPerView: 5,
                },
            }}
        >
            {simillar_products.map((p, i) => (
                <SwiperSlide key={i}>
                    <Link href="">
                        <img src={p} alt="" />
                    </Link>
                </SwiperSlide>
            ))}
        </Swiper>
    )
}

export default SimilarSwiper