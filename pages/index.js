import styles from '../styles/Home.module.css'
import Head from 'next/head'
import Image from 'next/image'
import TwitchVideo from "../components/TwitchVideo";
import PlayPauseToggle from "../components/PlayPauseToggle";
import Schedule from "../components/Schedule";
import Chat from "../components/Chat";
import useSWR from 'swr'
import {useState} from "react";

const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function Home({ nowPlaying, schedule }) {
    const [int, setInt] = useState(0)
    const { data } = useSWR('/api/nowPlaying', fetcher, { refreshInterval: 45000 })

    console.log(data)
  return (
    <div className={styles.container}>
      <Head>
        <title>Shared Frequencies</title>
        <meta name="description" content="Shared Frequencies" />
        <link rel="icon" href="/favicon.png" />
      </Head>
        <header className={styles.header}>
            <Image className={styles.logo} src="/logo.png" alt="Shared Frequencies Logo" width={236} height={111} />
            <div className={styles.oval}>
                <PlayPauseToggle/>
                <div className={styles.nowPlaying}>
                    <p>{data !== undefined ? data.name : 'Shared Frequencies Radio'}</p>
                </div>
            </div>
        </header>
      <main className={styles.main}>
          <TwitchVideo classname={styles.twitch}/>
          <div className={styles.bottomContainer}>
              <Schedule schedule={schedule}/>
              <Chat className={styles.chat}/>
          </div>
      </main>
      <footer className={styles.footer}>
      </footer>
    </div>
  )
}

export async function getServerSideProps(context) {
    const nowPlayingRes = await fetch(`https://sharedfrequencies.airtime.pro/api/live-info`)
    const nowPlayingData = await nowPlayingRes.json()
    const nowPlayingResult = await nowPlayingData.current

    const scheduleRes = await fetch(`https://sharedfrequencies.airtime.pro/api/week-info`)
    const scheduleData = await scheduleRes.json()
    return {
        props: {
            nowPlaying: nowPlayingResult,
            schedule: scheduleData
        }, // will be passed to the page component as props
    }
}