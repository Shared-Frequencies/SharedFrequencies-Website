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
                                    width={512} height={512} />
                            </div>
                            <div className={styles.artistBio}>
                                <div className={styles.artistName}>
                                    <h1 className={styles.artistHeader}>{resident.name}</h1>
                                </div>
                                <div className={styles.richText}>
                                    {resident.description ? documentToReactComponents(resident.description.json) : null}
                                </div>
                                <div className={styles.soundcloud}>
                                    {resident.soundcloudEmbed ? ReactHtmlParser(resident.soundcloudEmbed) : null}
                                </div>
                            </div>
                        </div>
            </div>
        </>
    )
}
