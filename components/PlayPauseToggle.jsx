import styles from "../styles/Home.module.css";
import {AudioProvider, useAudio} from "./AudioProvider";
import {useState} from "react";

export default function PlayPauseToggle() {
    const audio = useAudio();

    const [isPlaying, setIsPlaying] = useState(audio !== undefined && audio.paused === false);

    return (
        <>
            <AudioProvider>
                {
                    !isPlaying ? <img
                        className={styles.playButton}
                        src="/smallPlay.png"
                        alt="play button"
                        width={25}
                        height={25}
                        onClick={() => {
                            setIsPlaying(true)
                            audio.play()
                        } }
                    /> : <img
                        className={styles.playButton}
                        src="/smallPause.png"
                        alt="play button"
                        width={25}
                        height={25}
                        onClick={() => {
                            setIsPlaying(false)
                            audio.pause()
                        } }
                    />
                }
            </AudioProvider>
            <div className={styles.onAir}>
                {!isPlaying ? <p>Tune In</p>
                : <p>On Air</p>
                }  
            </div>
        </>
    )
}
