import Link from 'next/link'
import styles from '../styles.module.scss'

const Header = () => {
    return (
        <div className={styles.header}>
            <ul>
                <li>
                    <Link href="">Store</Link>
                </li>
                <li>
                    <Link href="">Men</Link>
                </li>
                <li>
                    <Link href="">Women</Link>
                </li>
                <li>
                    <Link href="">Electronics</Link>
                </li>
                <li>
                    <Link href="">Grooming</Link>
                </li>
                <li>
                    <Link href="">Kids</Link>
                </li>
            </ul>
        </div>
    )
}

export default Header