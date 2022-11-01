import styles from "../styles/Home.module.css";
import Link from 'next/link'
// import Image from "next/image";
import PlayPauseToggle from "./PlayPauseToggle";
import {decode} from "html-entities";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function Header () {
    const { data } = useSWR('/api/nowPlaying', fetcher, { refreshInterval: 10000 })

    return (
        <header className={styles.header}>
            <Link href={"/"}>
                <img className={styles.logo} src="/logo.png" alt="Shared Frequencies Logo"  />
            </Link>
            <div className={styles.ovalContainer}>
                <PlayPauseToggle/>
                <div className={styles.nowPlaying}>
                    <p>{((data !== undefined) && (data.current.name !== undefined)) ? decode(data.current.name) : 'Shared Frequencies Radio'}</p>
                </div>
                <div className={styles.liveIndicator}>
                    <p>LIVE</p>
                </div>
            </div>
        </header>
    )
}