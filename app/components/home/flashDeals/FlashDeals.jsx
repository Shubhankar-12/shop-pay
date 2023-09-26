import { MdFlashOn } from "react-icons/md"
import styles from "./styles.module.scss"
import CountDown from "../../countDown/CountDown"
import { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from 'swiper/modules';
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { flashDealsArray } from "@/data/home";
import FlashCard from "./card/FlashCard";


const FlashDeals = () => {

    return (
        <div className={styles.flashDeals}>
            <div className={styles.flashDeals__header}>
                <h1>
                    FLASH DEALS
                    <MdFlashOn />
                </h1>
                <CountDown date={new Date(2023, 9, 7)} />
            </div>

            <Swiper
                slidesPerView={1}
                spaceBetween={50}
                pagination={{
                    clickable: true,
                }}
                breakpoints={{
                    450: {
                        slidesPerView: 2,
                    },
                    630: {
                        slidesPerView: 3,
                    },
                    920: {
                        slidesPerView: 4,
                    },
                    1232: {
                        slidesPerView: 5,
                    },
                    1520: {
                        slidesPerView: 6,
                    },
                }}
                modules={[Pagination]}
                className="flashDeals__swiper"


            >
                <div className={styles.flashDeals__list}>
                    {flashDealsArray.map((product, i) => (
                        <SwiperSlide key={i}>
                            <FlashCard product={product} />
                        </SwiperSlide>
                    ))}
                </div>
            </Swiper>
        </div>
    )
}

export default FlashDeals