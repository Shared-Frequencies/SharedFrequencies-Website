import React, { useEffect } from 'react';
import styles from '../styles/Home.module.css'
import Schedule from "../components/Schedule";
import Chat from "../components/Chat";
import About from "../components/about";
import Shop from "../components/shop";
import Blog from "../components/Blog";
export default function HomeComponent({ schedule, about, blogs }) {

    return (
        <>
            <div className={styles.mainColumn}>
                <div className={styles.bottomContainer}>
                    <Schedule schedule={schedule} />
                    <Chat />
                    <Shop />
                </div>
                <Blog blogs={blogs} blogID={"1"} />
            </div>
        </>
    )
}