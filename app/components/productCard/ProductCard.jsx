import { useState, useEffect } from 'react'
import styles from './styles.module.scss'
import Link from 'next/link';
import ProductCompSwiper from './ProductCompSwiper';

const ProductCard = ({ product }) => {

    const [active, setActive] = useState(0);
    const [activeImage, setActiveImage] = useState(product.subProducts[active]?.images);

    const [prices, setPrices] = useState(
        product.subProducts[active]?.sizes
            .map((s) => {
                return s.price;
            })
            .sort((a, b) => {
                return a - b;
            })
    );
    const [styless, setStyless] = useState(
        product.subProducts.map((p) => {
            return p.color;
        })
    );
    useEffect(() => {
        setActiveImage(product.subProducts[active].images);
        setPrices(
            product.subProducts[active]?.sizes
                .map((s) => {
                    return s.price;
                })
                .sort((a, b) => {
                    return a - b;
                })
        );
    }, [active, product]);

    return (
        <div className={styles.product}>
            <div className={styles.product__container}>
                <Link href={`/product/${product.slug}?style=${active}&size=0`}>
                    <ProductCompSwiper images={activeImage} />
                </Link>
                {product.subProducts[active].discount ? (
                    <div className={styles.product__discount}>
                        -{product.subProducts[active].discount}%
                    </div>
                ) : (
                    ""
                )}
                <div className={styles.product__infos}>
                    <h1>
                        {product.name.length > 45
                            ? `${product.name.substring(0, 45)}...`
                            : product.name}
                    </h1>
                    <span>
                        {prices.length === 1
                            ? `INR ₹${prices[0] * 10}`
                            : `INR ₹${prices[0] * 10}-${prices[prices.length - 1] * 10}`}
                    </span>
                    <div className={styles.product__colors}>
                        {styless &&
                            styless.map((style, i) =>
                                style.image ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img
                                        key={i}
                                        src={style.image}
                                        className={i == active && styles.active}
                                        onMouseOver={() => {
                                            setActiveImage(product.subProducts[i].images);
                                            setActive(i);
                                        }}
                                        alt=""
                                    />
                                ) : (
                                    <span
                                        key={i}
                                        style={{ backgroundColor: `${style.color}` }}
                                        onMouseOver={() => {
                                            setImages(product.subProducts[i].images);
                                            setActive(i);
                                        }}
                                    ></span>
                                )
                            )}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ProductCard