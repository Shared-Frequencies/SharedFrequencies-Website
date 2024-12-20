import styles from '../styles/Home.module.css'
import Image from "next/image";

export default function Residents ({ artists, setCurrentPage, setCurrentResident }) {
    const scrollToResident = () => {
        // Give React time to render the new component
        setTimeout(() => {
            const residentElement = document.getElementById('resident-section');
            if (residentElement) {
                residentElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 30);
    };
    
    return (
        <>
            <div className={styles.mainColumn}>
                <div className={styles.artistsGrid}>
                    {
                        artists.sort(() => Math.random() - 0.5).map((artist) =>
                            <div onClick={() => {
                                    scrollToResident()
                                    setCurrentPage('resident')
                                    setCurrentResident(artist)
                                    }} 
                                key={artist.id}
                                className={styles.artistWrapper}>
                                <div className={styles.singleArtist}>
                                    <div className={styles.singleArtistImg}>
                                        <Image  
                                            src={artist.fullsize.url}
                                            alt="Shared Frequencies Logo"
                                            width={400} height={400} />
                                    </div>
                                    <p className={styles.artistsGridName}>{artist.name}</p>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    )
}
