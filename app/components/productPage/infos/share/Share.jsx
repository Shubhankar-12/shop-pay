import styles from './styles.module.scss';
import {
    FacebookShareButton,
    TelegramShareButton,
    TwitterShareButton,
    WhatsappShareButton,
} from "react-share";

import {
    FacebookIcon,
    TelegramIcon,
    TwitterIcon,
    WhatsappIcon,
} from "react-share";

const Share = () => {
    return (
        <div className={styles.share}>
            <FacebookShareButton url={window?.location.href}>
                <FacebookIcon size={38} />
            </FacebookShareButton>
            <TwitterShareButton url={window?.location.href}>
                <TwitterIcon size={38} />
            </TwitterShareButton>
            <TelegramShareButton url={window?.location.href}>
                <TelegramIcon size={38} />
            </TelegramShareButton>
            <WhatsappShareButton url={window?.location.href}>
                <WhatsappIcon size={38} />
            </WhatsappShareButton>

        </div>
    )
}

export default Share