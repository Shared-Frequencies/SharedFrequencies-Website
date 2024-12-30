import styles from '../styles/Home.module.css'
import Image from 'next/image'

export default function LiveEvents() {
    return (
        <div className={styles.liveEventsContainer}>
            <p className={styles.chatTitle}>Live Events</p>
            <hr className={styles.horizontalRuleLight}/>
            <a 
                href="https://www.instagram.com/sharedfrequenciesradio/" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.flyerLink}
            >
                <img className={styles.eventPicture} src="flyer.jpg" alt="t-shirt"></img>
            </a>
        </div>
    )
} 