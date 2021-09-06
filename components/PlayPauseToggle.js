import {useRef, useState} from "react";
import styles from "../styles/Home.module.css";

export default function PlayPauseToggle() {
    const musicPlayers = useRef(
        typeof Audio !== "undefined" ?
            new Audio("https://sharedfrequencies.out.airtime.pro/sharedfrequencies_a") :
            undefined
    );

    const [playing, setPlaying] = useState(false);

    const toggle = () => setPlaying(!playing);

    return (
        !playing ? <img
        className={styles.playButton}
        src="/smallPlay.png"
        alt="play button"
        width={25}
        height={25}
        onClick={() => {
            musicPlayers.current?.play()
            toggle()
        } }
    /> : <img
        className={styles.playButton}
        src="/smallPause.png"
        alt="play button"
        width={25}
        height={25}
        onClick={() => {
            musicPlayers.current?.pause()
            toggle()
        } }
    />
    )
}