import styles from "../styles/Home.module.css";
import Image from "next/image";
import PlayPauseToggle from "./PlayPauseToggle";
import {decode} from "html-entities";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function Header () {
    const { data } = useSWR('/api/nowPlaying', fetcher, { refreshInterval: 45000 })

    return (
        <header className={styles.header}>
            <Image className={styles.logo} src="/logo.png" alt="Shared Frequencies Logo" width={236} height={111} />
            <div className={styles.oval}>
                <PlayPauseToggle/>
                <div className={styles.nowPlaying}>
                    <p>{data !== undefined ? decode(data.name) : 'Shared Frequencies Radio'}</p>
                </div>
            </div>
        </header>
    )
}