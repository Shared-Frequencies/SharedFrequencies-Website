import styles from '../styles/Home.module.css'
import Head from 'next/head'
import TwitchVideo from "../components/TwitchVideo";
import Schedule from "../components/Schedule";
import Chat from "../components/Chat";
import {HeightProvider} from "../components/HeightProvider";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function Home({ schedule }) {
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
                        <Header/>
                        <Sidebar/>
                        <div className={styles.mainColumn}>
                            <TwitchVideo/>
                            <div className={styles.bottomContainer}>
                                <Schedule schedule={schedule} />
                                <Chat />
                            </div>
                        </div>
                        <footer className={styles.footer}>
                            <a href="https://www.facebook.com/SharedFrequenciesRadio">Facebook</a>
                            <a href="https://www.instagram.com/sharedfrequenciesradio/">Instagram</a>
                            <a href="https://soundcloud.com/sharedfrequenciesradio">Soundcloud</a>
                            <a href="https://twitter.com/shrdfrqncsradio">Twitter</a>
                        </footer>
                    </main>
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