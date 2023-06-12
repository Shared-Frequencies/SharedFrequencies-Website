import React from 'react';
import styles from "../styles/Home.module.css";
import Link from 'next/link'

export default function Sidebar({ setCurrentPage }) {
    return (
        <div className={styles.sidebar}>
            <div className={styles.sidebarContent}>
                {/* <Link href="/">
                    <a>LISTEN</a>
                </Link>
                <Link href="/residents">
                    <a>RESIDENTS</a>
                </Link>
                <Link href="/aboutUs">
                    <a>ABOUT US</a>
                </Link> */}
                <div onClick={() => {setCurrentPage('home')}} >
                    <a>LISTEN</a>
                </div>
                <div onClick={() => {setCurrentPage('residents')}} >
                    <a>RESIDENTS</a>
                </div>
                <div onClick={() => {setCurrentPage('about')}} >
                    <a>ABOUT</a>
                </div>
                <Link href="https://www.patreon.com/sharedfrequenciesradio">
                    <a target="_blank" rel="noopener noreferrer">BLOG</a>
                </Link>
            </div>
        </div>
    )
}

