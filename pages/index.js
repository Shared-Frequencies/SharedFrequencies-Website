import styles from '../styles/Home.module.css'
import Head from 'next/head'
import Image from 'next/image'
import TwitchVideo from "../components/TwitchVideo";
import PlayPauseToggle from "../components/PlayPauseToggle";
import Schedule from "../components/Schedule";
import Chat from "../components/Chat";
import useSWR from 'swr'
import {decode} from "html-entities";
import {HeightProvider} from "../components/HeightProvider";


const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function Home({ schedule }) {
    const { data } = useSWR('/api/nowPlaying', fetcher, { refreshInterval: 45000 })

    return (
        <>
            <HeightProvider>
                <div className={styles.container}>
                    <Head>
                        <title>Shared Frequencies</title>
                        <meta name="description" content="Shared Frequencies" />
                        <link rel="icon" href="/favicon.png" />
                    </Head>
                    <main className={styles.main}>
                        <header className={styles.header}>
                            <Image className={styles.logo} src="/logo.png" alt="Shared Frequencies Logo" width={236} height={111} />
                            <div className={styles.oval}>
                                <PlayPauseToggle/>
                                <div className={styles.nowPlaying}>
                                    <p>{data !== undefined ? decode(data.name) : 'Shared Frequencies Radio'}</p>
                                </div>
                            </div>
                        </header>
                        <TwitchVideo/>
                        <div className={styles.bottomContainer}>
                            <Schedule schedule={schedule} />
                            <Chat />
                        </div>
                    </main>
                    <footer className={styles.footer}>
                        <a href="https://www.facebook.com/SharedFrequenciesRadio">Facebook</a>
                        <a href="https://www.instagram.com/sharedfrequenciesradio/">Instagram</a>
                        <a href="https://soundcloud.com/sharedfrequenciesradio">Soundcloud</a>
                        <a href="https://twitter.com/shrdfrqncsradio">Twitter</a>
                    </footer>
                </div>
            </HeightProvider>
        </>
    )
}

export async function getServerSideProps(context) {
    const scheduleRes = await fetch(`https://sharedfrequencies.airtime.pro/api/week-info`)
    const scheduleData = await scheduleRes.json()
    return {
        props: {
            schedule: scheduleData
        }, // will be passed to the page component as props
    }
}