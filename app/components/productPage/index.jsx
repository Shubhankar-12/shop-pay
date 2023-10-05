"use client"
import styles from "@/app/styles/product.module.scss"

import MainSwiper from "./mainSwiper/MainSwiper"
import { useState } from "react"
import ProductInfo from "./infos/ProductInfo"

const ProductPageComp = ({ productDetails, size, style }) => {
    const [activeImage, setActiveImage] = useState("");
    return (
        <div>
            <div className={styles.product}>
                <div className={styles.product__container}>
                    <div className={styles.path}>
                        Home / {productDetails.category.name}
                        {productDetails.subCategories.map((sub, i) => (
                            <span key={i}>/{sub.name}</span>
                        ))}
                    </div>
                    <div className={styles.product__main}>
                        <MainSwiper images={productDetails.images} activeImage={activeImage} />
                        <div><ProductInfo product={productDetails} setActiveImage={setActiveImage} size={size} style={style} /></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductPageComp