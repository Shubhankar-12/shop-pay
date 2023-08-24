import Link from 'next/link';
import styles from './styles.module.scss';
import { IoLocationSharp } from "react-icons/io5"

const Copyright = () => {
    return (
        <div className={styles.footer__copyright}>
            <section>2023 © Shoppay All right reserved</section>
            <section>
                <ul>
                    {
                        data.map((link, i) => (
                            <li key={i}>
                                <Link href={link.link}>{link.name}</Link>
                            </li>
                        ))
                    }
                    <li>
                        <a>
                            <IoLocationSharp /> India
                        </a>
                    </li>
                </ul>
            </section>
        </div>
    )
}
const data = [
    {
        name: "Privacy Center",
        link: "",
    },
    {
        name: "Privacy & Cookie Policy",
        link: "",
    },
    {
        name: "Manage Cookies",
        link: "",
    },
    {
        name: "Terms & Conditions",
        link: "",
    },
    {
        name: "Copyright Notice",
        link: "",
    },
]
export default Copyright;