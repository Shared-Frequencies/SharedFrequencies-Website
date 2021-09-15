import styles from '../styles/Home.module.css'
import Head from "next/head";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

export default function Residents () {
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
                    <Footer/>
                </main>
            </div>
        </>
    )
}