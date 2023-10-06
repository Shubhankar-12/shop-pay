import { Rating } from '@mui/material'
import styles from './styles.module.scss'
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { TbPlus, TbMinus } from "react-icons/tb";
import { BsHandbagFill, BsHeart } from 'react-icons/bs';
import Share from './share/Share';
import Accordian from '../accordian/Accordian';
import SimilarSwiper from './SimilarSwiper';

const ProductInfo = ({ product, setActiveImage, size, style }) => {
    const [sizee, setSizee] = useState(size);
    const [qty, setQty] = useState(1);
    useEffect(() => {
        setSizee("");
        setQty(1);
    }, [style]);
    useEffect(() => {
        if (qty > product.quantity) {
            setQty(product.quantity);
        }
    }, [size]);
    return (
        <div className={styles.infos}>
            <div className={styles.infos__container}>
                <div className={styles.infos__name}>
                    <h1>{product.name}</h1>
                </div>
                <div className={styles.infos__sku}>
                    <h2>{product.sku}</h2>
                </div>
                <div className={styles.infos__rating}>
                    <Rating
                        name="half-rating-read"
                        defaultValue={product.rating}
                        precision={0.5}
                        readOnly
                        style={{ color: "#FACF19" }}
                    />
                    ({product.numReviews}
                    {product.numReviews == 1 ? " review" : " reviews"})
                </div>
                <div className={styles.infos__price}>
                    {!size ? <h2>{product.priceRange}</h2> : <h1>{product.price}$</h1>}
                    {product.discount > 0 ? (
                        <h3>
                            {size && <span>{product.priceBefore}$</span>}
                            <span>(-{product.discount}%)</span>
                        </h3>
                    ) : (
                        ""
                    )}
                </div>
                <span className={styles.infos__shipping}>
                    {product.shipping
                        ? `+${product.shipping}$ Shipping fee`
                        : "Free Shipping"}
                </span>
                <span>
                    {size
                        ? product.quantity
                        : product.sizes.reduce((start, next) => start + next.qty, 0)}{" "}
                    pieces available.
                </span>

                <div className={styles.infos__sizes}>
                    <h4>Select a Size : </h4>
                    <div className={styles.infos__sizes_wrap}>
                        {product.sizes.map((sz, i) => (
                            <Link href={`/product/${product.slug}?style=${style}&size=${i}`} key={i}>

                                <div
                                    className={`${styles.infos__sizes_size} ${i == size && styles.active_size}`}
                                    onClick={() => setSizee(sz.size)}
                                >
                                    {sz.size}
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                <div className={styles.infos__colors}>
                    {product.colors &&
                        product.colors.map((color, i) => (
                            <span
                                className={i == style ? styles.active_color : ""}
                                onMouseOver={() =>
                                    setActiveImage(product.subProducts[i].images[0].url)
                                }
                                onMouseLeave={() => setActiveImage("")} key={i}
                            >
                                <Link href={`/product/${product.slug}?style=${i}`}>
                                    <img src={color.image} alt="" />
                                </Link>
                            </span>
                        ))}
                </div>

                <div className={styles.infos__qty}>
                    <button onClick={() => qty > 1 && setQty((prev) => prev - 1)}>
                        <TbMinus />
                    </button>
                    <span>{qty}</span>
                    <button
                        onClick={() => qty < product.quantity && setQty((prev) => prev + 1)}
                    >
                        <TbPlus />
                    </button>
                </div>

                <div className={styles.infos__actions}>
                    <button
                        disabled={product.quantity < 1}
                        style={{ cursor: `${product.quantity < 1 ? "not-allowed" : ""}` }}
                    >
                        <BsHandbagFill />
                        <b>Add to Cart</b>
                    </button>
                    <button>
                        <BsHeart />
                        <b>Wishlist Product</b>
                    </button>
                </div>

                <Share />

                <Accordian details={[product.description, ...product.details]} />
                <div>
                    <h4>
                        Similar Products
                    </h4>
                    <SimilarSwiper />
                </div>
            </div>
        </div>
    )
}

export default ProductInfo