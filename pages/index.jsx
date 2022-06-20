import styles from '../styles/Home.module.css'
import Head from 'next/head'
// import TwitchVideo from "../components/TwitchVideo";
import Schedule from "../components/Schedule";
import Chat from "../components/Chat";
import {HeightProvider} from "../components/HeightProvider";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Home({ schedule }) {
    return (
        <>
            <HeightProvider>
                <div className={styles.container}>
                    <Head>
                        <title>Shared Frequencies Radio</title>
                        <meta name="description" content="Shared Frequencies Radio is a collaborative radio station for all, operating from Austin, Texas, and Madrid, Spain. Shared Frequencies Radio is an independent, community-driven platform accessible to local and international partners to music industry professionals of all experience levels and backgrounds." />
                        <link rel="icon" href="/favicon.png" />
                    </Head>
                    <main className={styles.main}>
                        <Header/>
                        <div className={styles.outerColumn}>
                            <Sidebar/>
                            <div className={styles.mainColumn}>
                                {/* <TwitchVideo/> */}
                                <div className={styles.bottomContainer}>
                                    <Schedule schedule={schedule} />
                                    <Chat />
                                </div>
                            </div>
                        </div>
                    </main>
                    <Footer/>
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