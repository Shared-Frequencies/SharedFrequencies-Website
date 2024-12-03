import styles from '../../styles/Home.module.css'
import {fetchResident, fetchResidents} from "../../utils/contentful-helper";
import Image from "next/image";
import {documentToReactComponents} from "@contentful/rich-text-react-renderer";
import ReactHtmlParser from 'react-html-parser';

export default function Resident ({ resident }) {
    console.log(resident)
    return (
        <>
            <div className={styles.artistColumn}>
                        <div key={resident.id} className={styles.bottomContainer}>
                            <div className={styles.artistPic}>
                                <Image
                                    className={styles.artistsGridImages}
                                    fill={true}
                                    src={resident.fullsize.url}
                                    alt="Artist Profile Photo"
                                    width={500} height={500} />
                            </div>
                            <div className={styles.artistBio}>
                                <div className={styles.artistName}>
                                    <h1 className={styles.artistHeader}><span >{resident.name}</span></h1>
                                </div>
                                <div className={styles.richText}>
                                    {resident.description ? documentToReactComponents(resident.description.json) : null}
                                </div>
                                <div className={styles.artistName}>
                                    <h2 className={styles.showHeader}>{resident.showTitle}</h2>
                                    <p className={styles.showTime}>{resident.programTime}</p>
                                </div>
                                <div className={styles.richText}>
                                    {resident.showDescription ? documentToReactComponents(resident.showDescription.json) : null}
                                </div>
                                <div className={styles.socialLinks}>
                                    <ul>
                                        {resident.socialMedia && resident.socialMedia.map((link, index) => {
                                            const url = new URL(link);
                                            const hostname = url.hostname.split('.').slice(-2).join('.').replace('.com', '');
                                            return (
                                                <li key={index}>
                                                    <a href={link} target="_blank" rel="noopener noreferrer">
                                                        {hostname}
                                                    </a>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            </div>
                        </div>
            </div>
        </>
    )
}
