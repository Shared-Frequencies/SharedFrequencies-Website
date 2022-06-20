import styles from '../styles/Home.module.css'
import Head from "next/head";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import {about} from "../utils/contentful-helper";
import {documentToReactComponents} from "@contentful/rich-text-react-renderer";


export default function AboutUs ({ about }) {
    return (
        <>
            <div className={styles.backgroundColor}/>
            <div className={styles.container}>
                <Head>
                    <title>Shared Frequencies</title>
                    <meta name="description" content="Shared Frequencies" />
                    <link rel="icon" href="/favicon.png" />
                </Head>
                <main className={styles.main}>
                    <Header/>
                    <div className={styles.outerColumn}>
                        <Sidebar/>
                        <div className={styles.mainColumn}>
                            <div className={styles.bottomContainer}>
                                <div className={styles.about}>
                                    {documentToReactComponents(about.about.json)}
                                </div>
                            </div>
                        </div>
                        <Footer/>
                    </div>
                </main>
            </div>
        </>
    )
}

export async function getStaticProps() {
    const data = await about()

    return {
        props: {
            about: data.aboutCollection.items[0],
        }
    }
}