import styles from "../styles/Home.module.css";
import Link from 'next/link'

export default function Sidebar() {
    return (
        <div className={styles.sidebar}>
            <ul>
                <li>
                    <Link href="/">
                        <a>Listen</a>
                    </Link>
                </li>
                <li>
                    <Link href="/residents">
                        <a>Residents</a>
                    </Link>
                </li>
                <li>
                    <Link href="/aboutUs">
                        <a>About Us</a>
                    </Link>
                </li>
                <li>
                    <Link href="https://www.patreon.com/sharedfrequenciesradio">
                        <a target="_blank" rel="noopener noreferrer">Blog</a>
                    </Link>
                </li>
            </ul>
        </div>
    )
}