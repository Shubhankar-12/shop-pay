import { Rating } from '@mui/material'
import styles from './styles.module.scss'
import { signIn, useSession } from 'next-auth/react';
import AddReview from './AddReview';
import Table from './Table';


const Review = ({ product }) => {
    const session = useSession();

    return (
        <div className={styles.reviews}>
            <div className={styles.reviews__container}>
                <h1>Ratings </h1>
                <div className={styles.reviews__stats}>
                    <div className={styles.reviews__stats_overview}>
                        <span>Average Rating</span>
                        <div className={styles.reviews__stats_overview_rating}>
                            <Rating
                                name='half-reading-read'
                                defaultValue={product.rating}
                                precision={0.5}
                                readOnly
                                style={{ color: "#FACF19" }}
                            />
                            {product.rating == 0 ? 'No review yet.' : product.rating}
                        </div>
                    </div>
                    <div className={styles.reviews__stats_reviews}>
                        {product.ratings.map((rating, i) => (
                            <div className={styles.reviews__stats_reviews_review} key={i}>
                                <Rating
                                    name='half-reading-read'
                                    defaultValue={5 - i}
                                    readOnly
                                    style={{ color: "#FACF19" }}
                                />
                                <div className={styles.bar}>
                                    <div className={styles.bar__inner} style={{ width: `${rating.percentage}%` }}></div>
                                </div>
                                <span>{rating.percentage}</span>
                            </div>
                        ))}
                    </div>

                </div>
                {session.data ?
                    <>
                        <h1>Add Review</h1>
                        <AddReview product={product} />
                    </> :
                    <button
                        className={styles.login_btn}
                        onClick={() => signIn()}
                    >Login to add review
                    </button>
                }
                <h1>Customer Reviews ({product.reviews.length})+</h1>
                <Table reviews={product.reviews} allSizes={product.allSizes} colors={product.colors} />
            </div>
        </div>
    )
}

export default Review