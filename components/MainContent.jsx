import React from 'react';
import HomeComponent from "./home";
import About from "./about";
import Residents from './residents';
import Resident from './resident/[name]';

export default function MainContent({ setCurrentPage, currentPage, setCurrentResident, currentResident, schedule, artists, about, resident}) {
    return (
        <>
            {currentPage === 'home' && (
                <HomeComponent
                    schedule={schedule}
                />
            )}
            {currentPage === 'residents' && (
                <Residents
                    artists={artists}
                    setCurrentPage={setCurrentPage}
                    setCurrentResident={setCurrentResident}
                />
            )}
            {currentPage === 'about' && (
                <About
                    about={about}
                />
            )}
            {currentPage === 'resident' && (
                <Resident
                    resident={currentResident}
                /> 
            )}
        </>
    )
}