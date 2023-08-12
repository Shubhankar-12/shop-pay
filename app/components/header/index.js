import Ad from './Ad';
import Top from './Top';
import styles from './styles.module.scss';
const Header = () => {
    return (
        <header className={styles.header}>
            <Ad />
            <Top />
        </header>
    )
}

export default Header