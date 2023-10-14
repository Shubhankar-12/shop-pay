import { useState } from 'react';
import styles from './styles.module.scss'
import { IoArrowDown } from 'react-icons/io5';

const Select = ({ property, text }) => {
    const [visible, setVisible] = useState(false);
    return (
        <div className={styles.select}>
            <div className={styles.select__header}>
                <span className={styles.flex}>
                    {property || `Select ${text}`}
                    <IoArrowDown />
                </span>
            </div>

        </div>
    )
}

export default Select