import React from 'react';
import styles from "../styles/Home.module.css";
import Link from 'next/link'

export default function Sidebar({ setCurrentPage }) {
    return (
        <div className={styles.sidebar}>
            <div className={styles.sidebarContent}>
                <a onClick={() => {setCurrentPage('home')}}>LISTEN</a>
                <a onClick={() => {setCurrentPage('residents')}}>RESIDENTS</a>
                {/* <a onClick={() => {setCurrentPage('about')}}>ABOUT</a> */}
                <Link href="https://sharedfrequencies.myshopify.com/">
                    <a target="_blank" rel="noopener noreferrer">SHOP</a>
                </Link>
            </div>
        </div>
    )
}

