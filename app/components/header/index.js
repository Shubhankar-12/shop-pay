"use client"
import Main from './Main';
import Ad from './Ad';
import Top from './Top';
import styles from './styles.module.scss';
const Header = ({ country }) => {
    return (
        <header className={styles.header}>
            <Ad />
            <Top country={country} />
            <Main />
        </header>
    )
}

export default Header