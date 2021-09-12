import {useEffect, useRef, useState} from "react";
import styles from "../styles/Home.module.css";

export default function PlayPauseToggle() {

    const [playing, toggle] = useAudio("https://sharedfrequencies.out.airtime.pro/sharedfrequencies_a");

    return (
        !playing ? <img
        className={styles.playButton}
        src="/smallPlay.png"
        alt="play button"
        width={25}
        height={25}
        onClick={() => {
            toggle()
        } }
    /> : <img
        className={styles.playButton}
        src="/smallPause.png"
        alt="play button"
        width={25}
        height={25}
        onClick={() => {
            toggle()
        } }
    />
    )
}

const useAudio = url => {
    const [audio] = useState(typeof Audio !== "undefined" ?
        new Audio(url) :
        undefined);
    const [playing, setPlaying] = useState(false);

    const toggle = () => setPlaying(!playing);

    useEffect(() => {
            playing ? audio.play() : audio.pause();
        },
        [playing]
    );

    useEffect(() => {
        audio.addEventListener('ended', () => setPlaying(false));
        return () => {
            audio.removeEventListener('ended', () => setPlaying(false));
        };
    }, []);

    return [playing, toggle];
};