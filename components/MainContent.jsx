import React from 'react';
import HomeComponent from "./home";
import About from "./about";
import Residents from './residents';
import Resident from './resident/[name]';
import Image from 'next/image';

export default function MainContent({ setCurrentPage, currentPage, setCurrentResident, currentResident, schedule, artists, about, resident, blogs}) {
    return (
        <>
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
        </>
    )
}