import styles from '../styles/Home.module.css'
import Head from 'next/head'
import React , { setState, useState } from 'react';
import {HeightProvider} from "../components/HeightProvider";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {fetchAbout, fetchResident, fetchResidents, fetchBlogs} from "../utils/contentful-helper";
import Resident from '../components/resident/[name]';
import Residents from '../components/residents';
import GeometricAnimation from '../components/GeometricAnimation';
import SeasonBanner from "../components/SeasonBanner";
import DonateBanner from '../components/DonateBanner';
import Chat from "../components/Chat";
import About from "../components/about";
import Shop from "../components/shop";
import Blog from "../components/Blog";
import Schedule from "../components/Schedule";
import LiveEvents from "../components/LiveEvents";
import NoiseOverlay from '../components/NoiseOverlay';

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
                            <div className={styles.mainColumn}>
                                <div className={styles.bottomContainer}>
                                    <Schedule schedule={schedule} />
                                    <Chat />
                                    <Shop />
                                </div>
                                <GeometricAnimation />

                                {/* <Blog blogs={blogs} blogID={"1"} /> */}
                                {/* <div className={styles.thirdsContainer}>
                                    <div className={styles.oneThird}>
                                        <LiveEvents />
                                    </div>
                                    <div className={styles.twoThirds}>
                                        
                                    </div>
                                </div> */}
                            </div>
                            <SeasonBanner />
                            {currentPage === 'resident' && (
                                <Resident resident={currentResident} /> 
                            )}
                            <Residents
                                artists={artists}
                                setCurrentPage={setCurrentPage}
                                setCurrentResident={setCurrentResident}
                            />
                        </div>
                        <DonateBanner />
                    </main>
                    <Footer/>
                </div>
            </HeightProvider>
            {/* <NoiseOverlay /> */}
        </>
    )
}
export async function getServerSideProps(context) {
    try {
        const scheduleRes = await fetch(`https://sharedfrequencies.airtime.pro/api/week-info`);
        const scheduleData = await scheduleRes.json();

        const aboutData = await fetchAbout();
        const residentsData = await fetchResidents();
        const shuffledResidents = [...residentsData.artistCollection.items].sort(() => Math.random() - 0.5);
        const blogsData = await fetchBlogs();

        return {
            props: {
                schedule: scheduleData,
                about: aboutData.aboutCollection.items[0],
                artists: shuffledResidents,
                blogs: blogsData.blogPostCollection.items,
            },
        };
    } catch (error) {
        console.error('Error in getServerSideProps:', error);
        return {
            props: {
                schedule: null,
                about: null,
                artists: [],
                blogs: [],
            },
        };
    }
}
Residents
