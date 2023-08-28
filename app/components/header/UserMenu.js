import Link from 'next/link';
import styles from './styles.module.scss';

const UserMenu = ({ loggedIn }) => {
    return (
        <div className={styles.menu}>
            <h4>Welcome to Shoppay !</h4>
            {loggedIn ? (
                <div className={styles.flex}>
                    <img
                        src="https://github.com/Shubhankar-12/shop-pay/blob/main/public/images/userphoto.png?raw=true"
                        alt=''
                        className={styles.menu__img}
                    />
                    <div className={styles.col}>
                        <span>Welcome Back,</span>
                        <h3>Shubh</h3>
                        <span>Sign Out</span>
                    </div>
                </div>
            ) : (
                <div className={styles.flex}>
                    <button className={styles.btn_primary}>Register</button>
                    <button className={styles.btn_outlined}>
                        <Link href="/signin">Login</Link>
                    </button>
                </div>
            )}
            <ul>
                <li><Link href="/profile">Account</Link></li>
                <li><Link href="/profile/orders">My Orders</Link></li>
                <li><Link href="/profile/messages">Messages</Link></li>
                <li><Link href="/profile/address">Address</Link></li>
                <li><Link href="/profile/wishlist">Wishlist</Link></li>
            </ul>
        </div>
    )
}

export default UserMenu