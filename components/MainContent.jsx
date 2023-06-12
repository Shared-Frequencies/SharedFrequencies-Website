import React from 'react';
import HomeComponent from "../pages/home";
import About from "../pages/about";
import Residents from '../pages/residents';
import Resident from '../pages/resident/[name]';

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