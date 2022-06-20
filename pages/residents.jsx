import styles from '../styles/Home.module.css'
import Head from "next/head";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import {residents} from "../utils/contentful-helper";
import Image from "next/image";
import Link from "next/link";

export default function Residents ({ artists }) {
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
                            <div className={styles.artistsGrid}>
                                {
                                    artists.sort((a,b) => { return a.id - b.id }).map((artist) =>
                                        <Link href={`/resident/${artist.name}`} key={artist.id}>
                                            <div className={styles.singleArtist}>
                                                <Image
                                                    src={artist.fullsize.url}
                                                    alt="Shared Frequencies Logo"
                                                    width={400} height={400} />
                                                <p className={styles.artistsGridName}>{artist.name}</p>
                                            </div>
                                        </Link>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                    <Footer/>
                </main>
            </div>
        </>
    )
}

export async function getStaticProps() {
    const data = await residents()

    return {
        props: {
            artists: data.artistCollection.items,
        }
    }
}