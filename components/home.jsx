import React from 'react';
import styles from '../styles/Home.module.css'
import Schedule from "../components/Schedule";
import Chat from "../components/Chat";
import About from "../components/about";
// import {HeightProvider} from "../components/HeightProvider";

export default function HomeComponent({schedule, about}) {
    return (
        <>
            <div className={styles.mainColumn}>
                {/* <TwitchVideo/> */}
                <div className={styles.bottomContainer}>
                    <Schedule schedule={schedule} />
                    <Chat />
                    <About about={about}/>
                </div>
            </div>
        </>
    )
}