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
                {/* <div style={{ width: '100%', height: '5vh', padding: '1px', filter: 'invert(75%)'}}>
                    <img 
                        src="/EDITORIALS.png"
                        alt="Editorials and Interviews"
                        style={{ width: '100%', height: '100%', objectFit: 'fill', filter: 'blur(0px)'}}
                    />
                </div> */}
                <Blog blogs={blogs} blogID={"1"} />
            </div>
        </>
    )
}