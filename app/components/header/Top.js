import styles from './styles.module.scss';
import { MdSecurity } from "react-icons/md"
import { BsSuitHeart } from "react-icons/bs"
import { RiAccountPinCircleLine, RiArrowDropDownFill } from "react-icons/ri"
import Link from 'next/link';
import { useState } from 'react';
import UserMenu from './UserMenu';

const Top = () => {
    const [loggedIn, setLoggedIn] = useState(true);
    return (
        <div className={styles.top}>
            <div className={styles.top__container}>
                <div></div>
                <ul className={styles.top__list}>
                    <li>
                        <img src='https://w7.pngwing.com/pngs/836/833/png-transparent-round-orange-white-and-green-flag-of-indian-art-flag-of-india-computer-icons-national-flag-indian-flag-blue-flag-orange.png'
                            alt='flag' />
                        <span>India / INR</span>
                    </li>
                    <li>
                        <MdSecurity />
                        <span>Buyer Protection</span>
                    </li>
                    <li>
                        <span>Customer Service</span>
                    </li>
                    <li>
                        <span>Help</span>
                    </li>
                    <li>
                        <BsSuitHeart />
                        <Link href="/profile/wishlist"><span>Wishlist</span></Link>
                    </li>
                    <li>
                        {loggedIn ?
                            (
                                <li>
                                    <div className={styles.flex}>
                                        <img src={userImg} />
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
                        <UserMenu />
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Top