import styles from "../styles/Home.module.css";
import Image from "next/image";

export default function Footer () {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerLeft}>
                <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/SharedFrequenciesRadio">Facebook</a>
                <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/sharedfrequenciesradio/">Instagram</a>
                <a target="_blank" rel="noopener noreferrer" href="https://soundcloud.com/sharedfrequenciesradio">Soundcloud</a>
                <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/shrdfrqncsradio">Twitter</a>
            </div>
            <div className={styles.footerImage}>
                <Image src="/favicon.png" width={35} height={35}/>
            </div>
            <div className={styles.footerRight}>
                <a href={'mailto:sharedfrequencies@gmail.com?subject=Website Contact'}>Contact Us</a>
                <a target="_blank" rel="noopener noreferrer" href="https://www.paypal.com/paypalme/sharedfrequencies">Support</a>
            </div>
        </footer>
    )
}