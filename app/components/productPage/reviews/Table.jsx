import { useState } from 'react'
import styles from './styles.module.scss'
import usePagination from './pagination';
import TableReview from './TableReview';
import { Pagination } from '@mui/material';
import TableHeader from './TableHeader';

const Table = ({ reviews, allSizes, colors }) => {
    const [page, setPage] = useState(1);
    const PER_PAGE = 3;
    const count = Math.ceil(reviews.length / PER_PAGE);
    const _DATA = usePagination(reviews, PER_PAGE);
    const handleChange = (e, p) => {
        setPage(p);
        _DATA.jump(p);
    };
    return (
        <div className={styles.reviews__tab}>
            <TableHeader
                reviews={reviews}
                allSizes={[{ size: "All" }, ...allSizes]}
                colors={[{ color: "", image: "" }, ...colors]}
            />
            <div className={styles.table__data}>
                {_DATA.currentData().map((review, i) => (
                    <TableReview review={review} key={i} />
                ))}
            </div>
            <div className={styles.pagination}>
                <Pagination
                    count={count}
                    page={page}
                    variant="round"
                    shape="rounded"
                    onChange={handleChange}
                />
            </div>
        </div>
    )
}

export default Table