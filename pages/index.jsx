import styles from '../styles/Home.module.css'
import Head from 'next/head'
import React , { setState, useState } from 'react';
import {HeightProvider} from "../components/HeightProvider";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {fetchAbout, fetchResident, fetchResidents, fetchBlogs} from "../utils/contentful-helper";
import HomeComponent from "../components/home";
import Resident from '../components/resident/[name]';
import Residents from '../components/residents';
import GeometricAnimation from '../components/GeometricAnimation';
//import {documentToReactComponents} from "@contentful/rich-text-react-renderer";

export default function Home({ schedule, about, artists, blogs }) {
    const [currentPage, setCurrentPage] = useState('home');
    const [currentResident, setCurrentResident] = useState('none');
    return (
        <>
            <div className={styles.backgroundColor}/>
            <HeightProvider>
                <div className={styles.container}>
                    <Head>
                        <title>Shared Frequencies Radio</title>
                        <meta name="description" content="Collaborative independent radio platform accessible to all 📡 🎶 🌎" />
                        <meta name="viewport" content="width=device-width, initial-scale=1" />
                        <link rel="icon" href="/favicon.png" />
                    </Head>
                    <main className={styles.main}>
                        <Header/>
                        <div className={styles.outerColumn}>
                            <HomeComponent
                                schedule={schedule}
                                about={about}
                                blogs={blogs}
                                />
                            <div style={{ width: '100%', height: '5vh'}}>
                                <img 
                                    src="/SEASON 11 RESIDENTS.png"
                                    alt="Season 11 Residents"
                                    style={{ width: '100%', height: '100%', objectFit: 'fill', filter: 'blur(0px)'}}
                                />
                            </div>
                            {currentPage === 'resident' && (
                                <Resident
                                    resident={currentResident}
                                /> 
                            )}
                            <Residents
                                artists={artists}
                                setCurrentPage={setCurrentPage}
                                setCurrentResident={setCurrentResident}
                            />
                            <GeometricAnimation />
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
    const shuffledResidents = [...residentsData.artistCollection.items].sort(() => Math.random() - 0.5)

    // blog
    const blogsData = await fetchBlogs()

    return {
        props: {
            schedule: scheduleData,
            about: aboutData.aboutCollection.items[0],
            artists: shuffledResidents,
            blogs: blogsData.blogPostCollection.items,
        }, // will be passed to the page component as props
    }
}
Residents
