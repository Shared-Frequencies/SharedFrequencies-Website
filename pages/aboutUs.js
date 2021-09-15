import styles from '../styles/Home.module.css'
import Head from "next/head";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";


export default function AboutUs () {
    return (
        <>
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

                    </div>
                    <footer className={styles.footer}>
                        <a href="https://www.facebook.com/SharedFrequenciesRadio">Facebook</a>
                        <a href="https://www.instagram.com/sharedfrequenciesradio/">Instagram</a>
                        <a href="https://soundcloud.com/sharedfrequenciesradio">Soundcloud</a>
                        <a href="https://twitter.com/shrdfrqncsradio">Twitter</a>
                    </footer>
                </main>
            </div>
        </>
    )
}