import styles from './styles.module.scss';
import { MdSecurity } from "react-icons/md"
import { BsSuitHeart } from "react-icons/bs"
import { RiAccountPinCircleLine, RiArrowDropDownFill } from "react-icons/ri"
import Link from 'next/link';
import { useState } from 'react';
import UserMenu from './UserMenu';

const Top = ({ country }) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [visible, setVisible] = useState(false)
    return (
        <div className={styles.top}>
            <div className={styles.top__container}>
                <div></div>
                <ul className={styles.top__list}>
                    <li className={styles.li}>
                        <img src={country.flag} alt='flag' />
                        <span>{country.name} / {country.currency}</span>
                    </li>
                    <li className={styles.li}>
                        <MdSecurity />
                        <span>Buyer Protection</span>
                    </li>
                    <li className={styles.li}>
                        <span>Customer Service</span>
                    </li>
                    <li className={styles.li}>
                        <span>Help</span>
                    </li>
                    <li className={styles.li}>
                        <BsSuitHeart />
                        <Link href="/profile/wishlist"><span>Wishlist</span></Link>
                    </li>
                    <li
                        className={styles.li}
                        onMouseOver={() => setVisible(true)}
                        onMouseLeave={() => setVisible(false)}
                    >
                        {loggedIn ?
                            (
                                <li>
                                    <div className={styles.flex}>
                                        <img src="https://github.com/Shubhankar-12/shop-pay/blob/main/public/images/userphoto.png?raw=true" />
                                        <span>Shubh</span>
                                        <RiArrowDropDownFill />
                                    </div>
                                </li>
                            ) : (
                                <li>

                                    <div className={styles.flex}>
                                        <RiAccountPinCircleLine />
                                        <span>Account</span>
                                        <RiArrowDropDownFill />
                                    </div>
                                </li>
                            )}
                        {visible && <UserMenu loggedIn={loggedIn} />}
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Top