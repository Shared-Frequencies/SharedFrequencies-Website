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
                    <div className={styles.mainColumn}>
                        {
                            resident.map((artist) =>
                                    <div key={artist.id} className={styles.artist}>
                                        <Image
                                            className={styles.artistsGridImages}
                                            src={artist.fullsize.url}
                                            alt="Shared Frequencies Logo"
                                            width={512} height={512} />
                                        <p >{artist.name}</p>
                                        <div className={styles.richText}>
                                            {artist.description ? documentToReactComponents(artist.description.json) : null}
                                        </div>
                                        <div className={styles.soundcloud}>
                                            {artist.soundcloudEmbed ? ReactHtmlParser(artist.soundcloudEmbed) : null}
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