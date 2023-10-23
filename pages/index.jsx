import styles from '../styles/Home.module.css'
import Head from 'next/head'
import React , { setState, useState } from 'react';
import {HeightProvider} from "../components/HeightProvider";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {fetchAbout, fetchResident, fetchResidents} from "../utils/contentful-helper";
import MainContent from "../components/MainContent";
import Residents from '../components/residents';
//import {documentToReactComponents} from "@contentful/rich-text-react-renderer";

export default function Home({ schedule, about, artists }) {
    const [currentPage, setCurrentPage] = useState('home');
    const [currentResident, setCurrentResident] = useState('none');
    return (
        <>
            <div className={styles.backgroundColor}/>
            <HeightProvider>
                <div className={styles.container}>
                    <Head>
                        <title>Shared Frequencies Radio</title>
                        <meta name="description" content="Shared Frequencies Radio is a collaborative radio station for all, operating from Austin, Texas, and Madrid, Spain. Shared Frequencies Radio is an independent, community-driven platform accessible to local and international partners to music industry professionals of all experience levels and backgrounds." />
                        <link rel="icon" href="/favicon.png" />
                    </Head>
                    <main className={styles.main}>
                        <Header>
                            {/* <Sidebar setCurrentPage={setCurrentPage} /> */}
                        </Header>
                        <div className={styles.outerColumn}>
                            <Sidebar setCurrentPage={setCurrentPage} />
                            <MainContent
                                setCurrentPage={setCurrentPage}
                                currentPage={currentPage}
                                setCurrentResident={setCurrentResident}
                                currentResident={currentResident}
                                schedule={schedule}
                                about={about}
                                artists={artists}
                            />
                             <Residents
                            artists={artists}
                            setCurrentPage={setCurrentPage}
                            setCurrentResident={setCurrentResident}
                            />
                        </div>
                    </main>
                    <Footer/>
                </div>
            </HeightProvider>
        </>
    )
}

export async function getServerSideProps(context) {
    // schedule
    const scheduleRes = await fetch(`https://sharedfrequencies.airtime.pro/api/week-info`)
    const scheduleData = await scheduleRes.json()
    
    // about
    const aboutData = await fetchAbout()

    // residents
    const residentsData = await fetchResidents()

    return {
        props: {
            schedule: scheduleData,
            about: aboutData.aboutCollection.items[0],
            artists: residentsData.artistCollection.items,
        }, // will be passed to the page component as props
    }
}
Residents