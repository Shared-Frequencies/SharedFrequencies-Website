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
                        <div className={styles.artistsGrid}>
                            {
                                artists.map((artist) =>
                                    <Link href={`/resident/${artist.name}`} key={artist.id}>
                                        <div className={styles.singleArtist}>
                                            <Image
                                                className={styles.logo}
                                                src={artist.fullsize.url}
                                                alt="Shared Frequencies Logo"
                                                width={512} height={512} />
                                            <p className={styles.artistsGridName}>{artist.name}</p>
                                        </div>
                                    </Link>
                                )
                            }
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