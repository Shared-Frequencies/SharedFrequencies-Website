import styles from '../styles/Home.module.css'
import {documentToReactComponents} from "@contentful/rich-text-react-renderer";

export default function Shop () {
    return (
        <>
            <div className={styles.shopContainer}>
                <p className={styles.chatTitle}>Shop</p>
                <hr className={styles.horizontalRule}/>
                <a href="https://sharedfrequencies.myshopify.com/" target="_blank" rel="noreferrer">
                    <img className={styles.merchPicture} src="shirt.png" alt="t-shirt"></img>
                </a>
                {/* <p className={styles.chatTitle}>Live Events</p>
                <hr className={styles.horizontalRule}/>
                <a href="https://www.instagram.com/p/DEIE_B3paCg/" target="_blank" rel="noreferrer">
                    <img className={styles.merchPicture} src="flyerA.jpeg" alt="Flyer for Live Event 1/4 at Community Garden"></img>
                </a> */}
            </div>
        </>
    )
}
