import styles from '../styles/Home.module.css'
import {documentToReactComponents} from "@contentful/rich-text-react-renderer";

export default function Shop () {
    return (
        <>
            <div className={styles.shopContainer}>
                <p className={styles.chatTitle}> New Shirt! </p>
                <hr className={styles.horizontalRule}/>
                <a href="https://sharedfrequencies.myshopify.com/" target="_blank" rel="noreferrer">
                    <img className={styles.merchPicture} src="shirt.png" alt="t-shirt"></img>
                </a>
            </div>
        </>
    )
}
