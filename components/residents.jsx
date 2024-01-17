import styles from '../styles/Home.module.css'
import Image from "next/image";

export default function Residents ({ artists, setCurrentPage, setCurrentResident }) {
    return (
        <>
            <div className={styles.mainColumn}>
                <div className={styles.artistsGrid}>
                    {
                        artists.sort((a,b) => { return a.id + b.id }).map((artist) =>
                            <div onClick={() => {
                                    window.scrollTo(0, 0);
                                    setCurrentPage('resident')
                                    setCurrentResident(artist)
                                    }} key={artist.id}>
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
