import styles from '../../styles/Home.module.css'
import Head from "next/head";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";
import {resident, residents} from "../../utils/contentful-helper";
import Image from "next/image";
import {documentToReactComponents} from "@contentful/rich-text-react-renderer";

export default function Resident ({ resident }) {
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
                        {
                            resident.map((artist) =>
                                    <div key={artist.id}>
                                        <Image
                                            className={styles.logo}
                                            src={artist.fullsize.url}
                                            alt="Shared Frequencies Logo"
                                            width={512} height={512} />
                                        <p>{artist.name}</p>
                                        {documentToReactComponents(artist.description.json)}
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