import styles from '../styles/Home.module.css'
import {documentToReactComponents} from "@contentful/rich-text-react-renderer";

export default function About ({about}) {
    return (
        <>
            <div className={styles.aboutContainer}>
                    <p className={styles.chatTitle}> About </p>
                    <hr className={styles.horizontalRule}/>
                    <div className={styles.about}>
                        {documentToReactComponents(about.about.json)}
                    </div>
            </div>
        </>
    )
}
