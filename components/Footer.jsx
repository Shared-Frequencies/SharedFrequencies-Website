import styles from "../styles/Home.module.css";
import Image from "next/image";

export default function Footer () {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerLeft}>
                <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/sharedfrequenciesradio/">Instagram</a>
                <a target="_blank" rel="noopener noreferrer" href="https://soundcloud.com/sharedfrequenciesradio">Archive</a>
            </div>
            <div className={styles.footerImage}>
                <Image src="/favicon.png" width={35} height={35}/>
            </div>
            <div className={styles.footerRight}>
                <a target="_blank" rel="noopener noreferrer" href={'mailto:sharedfrequencies@gmail.com?subject=Website Contact'}>Contact</a>
                <a target="_blank" rel="noopener noreferrer" href="https://www.patreon.com/sharedfrequenciesradio">Support</a>
            </div>
        </footer>
    )
}