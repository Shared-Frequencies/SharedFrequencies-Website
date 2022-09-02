import styles from '../../styles/Home.module.css'
import Head from "next/head";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";
import {resident, residents} from "../../utils/contentful-helper";
import Image from "next/image";
import {documentToReactComponents} from "@contentful/rich-text-react-renderer";
import ReactHtmlParser from 'react-html-parser';

export default function Resident ({ resident }) {
    return (
        <>
            <div className={styles.container}>
                <Head>
                    <title>Shared Frequencies: {resident[0].name}</title>
                    <meta name="description" content="Shared Frequencies" />
                    <link rel="icon" href="/favicon.png" />
                </Head>
                <main className={styles.main}>
                    <Header/>
                    <Sidebar/>
                    <div className={styles.artistColumn}>
                        {
                            resident.map((artist) =>
                                <div className={styles.bottomContainer}>
                                    <div key={artist.id} className={styles.artistPic}>
                                        <Image
                                            className={styles.artistsGridImages}
                                            src={artist.fullsize.url}
                                            alt="Artist Profile Photo"
                                            width={512} height={512} />
                                    </div>
                                    <div key={artist.id} className={styles.artistBio}>
                                        <div className={styles.artistName}>
                                            <h1 className={styles.artistHeader}>{artist.name}</h1>
                                        </div>
                                        <div className={styles.richText}>
                                            {artist.description ? documentToReactComponents(artist.description.json) : null}
                                        </div>
                                        <div className={styles.soundcloud}>
                                            {artist.soundcloudEmbed ? ReactHtmlParser(artist.soundcloudEmbed) : null}
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                    <Footer/>
                </main>
            </div>
        </>
    )
}

export async function getStaticPaths() {
    const artists = await residents()

    return {
        paths: artists.artistCollection.items.map((artist) => ({ params: { name: artist.name }})),
        fallback: false
    }
}

export async function getStaticProps(context) {
    let data = await resident(context.params.name)
    return {
        props: {
            resident: data.artistCollection.items
        }
    }
}