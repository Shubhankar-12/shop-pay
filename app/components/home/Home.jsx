"use client"
import { gamingSwiper, homeImprovSwiper, women_accessories, women_dresses, women_shoes, women_swiper } from "@/data/home"
import { useMediaQuery } from "react-responsive";

import styles from "../../styles/home.module.scss"
import Category from "./categories/Category"
import FlashDeals from "./flashDeals/FlashDeals"
import Main from "./main/Main"
import ProductSwiper from "../productSwiper/ProductSwiper";
import ProductCard from "../productCard/ProductCard";
const HomeComponent = ({ products }) => {

    const isMedium = useMediaQuery({ query: "(max-width:850px)" });
    const isMobile = useMediaQuery({ query: "(max-width:550px)" });
    return (
        <div className={styles.home}>
            <div className={styles.container}>
                <Main />
                <FlashDeals />
                <div className={styles.home__category}>
                    <Category
                        header="Dresses"
                        products={women_dresses}
                        background="#5a31f4"
                    />
                    {!isMedium && (
                        <Category
                            header="Shoes"
                            products={women_shoes}
                            background="#3c811f"
                        />
                    )}
                    {isMobile && (
                        <Category
                            header="Shoes"
                            products={women_shoes}
                            background="#3c811f"
                        />
                    )}
                    <Category
                        header="Accessories"
                        products={women_accessories}
                        background="#000"
                    />
                </div>
                <ProductSwiper products={gamingSwiper} header="For Gamers" bg="#2f82ff" />
                <ProductSwiper products={homeImprovSwiper} header="House Improvements" bg="#5a31f4" />
                <ProductSwiper products={women_swiper} header="For Women" bg="#000" />
                <div className={styles.products}>
                    {products.map((product) => (
                        <ProductCard product={product} key={product._id} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default HomeComponent