import styles from './styles.module.scss';

const Payment = () => {
    return (
        <div className={styles.footer__payment}>
            <h3>WE ACCEPT</h3>
            <div className={styles.footer__flexwrap}>
                <img src='../../../images/payment/visa.webp' alt='visa' />
                <img src='../../../images/payment/mastercard.webp' alt='mastercard' />
                <img src='../../../images/payment/paypal.webp' alt='paypal' />
            </div>
        </div>
    )
}

export default Payment