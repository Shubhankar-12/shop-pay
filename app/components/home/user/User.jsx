import { useSession } from 'next-auth/react'
import styles from '../styles.module.scss'
import Link from 'next/link';

import { IoSettingsOutline } from "react-icons/io5";
import { HiOutlineClipboardList } from "react-icons/hi";
import { BsHeart } from "react-icons/bs";
import { AiOutlineMessage } from "react-icons/ai";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-cards";
import { EffectCards } from 'swiper/modules';
import { userSwiperArray } from '@/data/home';

const User = () => {
    const session = useSession();

    return (
        <div className={styles.user}>
            <img src="../../../images/userHeader.jpg" alt="" />

            <div className={styles.user__container}>
                {
                    session.data ?
                        <div className={styles.user__infos}>
                            <img src={session?.data?.user?.image} alt="user image" />
                            <h4>{session?.data?.user?.name}</h4>
                        </div>
                        : <div className={styles.user__infos}>
                            <img
                                src="https://res.cloudinary.com/dmhcnhtng/image/upload/v1664642478/992490_b0iqzq.png"
                                alt="user image"
                            />
                            <div className={styles.user__infos_btns}>
                                <Link href='/signin'>
                                    <button>Register</button>
                                </Link>
                                <Link href='/signin'>
                                    <button>Login</button>
                                </Link>
                            </div>
                        </div>
                }
                <ul className={styles.user__links}>
                    <li>
                        <Link href="/profile">
                            <IoSettingsOutline />
                        </Link>
                    </li>
                    <li>
                        <Link href="">
                            <HiOutlineClipboardList />
                        </Link>
                    </li>
                    <li>
                        <Link href="">
                            <AiOutlineMessage />
                        </Link>
                    </li>
                    <li>
                        <Link href="">
                            <BsHeart />
                        </Link>
                    </li>
                </ul>
                <div className={styles.user__swiper}>
                    <img
                        src="https://assets.stickpng.com/images/5a5a6d2414d8c4188e0b088d.png"
                        alt=""
                        className={styles.new}
                    />
                    <Swiper
                        effect={'cards'}
                        grabCursor={true}
                        modules={[EffectCards]}
                        className="user__swiper"
                    >


                        {userSwiperArray.map((item, i) => (
                            <SwiperSlide key={i}>
                                <Link href="">
                                    <img src={item.image} alt="" />
                                </Link>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>

            <img
                src="../../../images/userHeader.jpg"
                alt=""
                className={styles.user__footer}
            />
        </div>
    )
}

export default User