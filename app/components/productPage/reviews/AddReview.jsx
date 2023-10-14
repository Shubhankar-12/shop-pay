import Select from './Select'
import styles from './styles.module.scss'

const AddReview = ({ product }) => {
    return (
        <div className={styles.reviews__add}>
            <div className={styles.reviews__add_wrap}>
                <div className={styles.flex} style={{ gap: "10px" }}>
                    <Select text='Size' />
                </div>
            </div>
        </div>
    )
}

export default AddReview