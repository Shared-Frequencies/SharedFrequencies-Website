import styles from "../styles/Home.module.css";
import Link from 'next/link'

export default function Sidebar() {
    return (
      <div className={styles.sidebar}>
        <div className={styles.sidebarContent}>
          <Link passHref href="/">
            <a>LISTEN</a>
          </Link>
          <Link passHref href="/residents">
            <a>RESIDENTS</a>
          </Link>
          <Link passHref href="/aboutUs">
            <a>ABOUT US</a>
          </Link>
          <Link passHref href="https://www.patreon.com/sharedfrequenciesradio">
            <a target="_blank" rel="noopener noreferrer">
              BLOG
            </a>
          </Link>
        </div>
      </div>
    );
}