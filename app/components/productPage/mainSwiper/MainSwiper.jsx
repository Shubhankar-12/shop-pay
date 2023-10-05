import { useState } from 'react';
import ReactImageMagnify from 'react-image-magnify'
import styles from './styles.module.scss'

const MainSwiper = ({ images, activeImage }) => {

    const [active, setActive] = useState(0);
    return (
        <div className={styles.swiper}>
            <div className={styles.swiper__active}>
                <ReactImageMagnify
                    {...{
                        smallImage: {
                            alt: "",
                            isFluidWidth: true,
                            src: activeImage || images[active].url,
                        },
                        largeImage: {
                            src: activeImage || images[active].url,
                            width: 1500,
                            height: 2000,
                        },
                        enlargedImageContainerDimensions: {
                            width: "200%",
                            height: "100%",
                        },
                    }}
                />
            </div>
            <div className={styles.swiper__list}>
                {images.map((img, i) => (
                    <div
                        key={i}
                        className={`${styles.swiper__list_item} ${i == active && styles.active}`}
                        onMouseOver={() => setActive(i)}
                    >
                        < img src={img.url} alt="image" />
                    </div>
                ))}
            </div>
        </div >
    )
}

export default MainSwiper