import styles from './styles.module.scss'
import { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from 'swiper/modules';
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

const ProductSwiper = ({ products, header, bg }) => {

    return (
        <div className={styles.wrapper}>
            {header && (
                <div
                    className={styles.header}
                    style={{ background: `${bg ? bg : ""}` }}
                >
                    {header}
                </div>
            )}
            <Swiper
                slidesPerView={1}
                spaceBetween={10}
                navigation={true}
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
                    }
                }}
                modules={[Navigation]}
                className="products__swiper"


            >
                {products.map((product, i) => (
                    <SwiperSlide key={i}>
                        <div className={styles.product}>
                            <div className={styles.product__img}>
                                <img src={product.image} alt="" />
                            </div>
                            <div className={styles.product__infos}>
                                <h1>
                                    {product.name.length > 30
                                        ? `${product.name.slice(0, 30)}...`
                                        : product.name}
                                </h1>
                                {product.price && <span>INR ₹{(product.price * 10).toFixed(2)}</span>}
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default ProductSwiper