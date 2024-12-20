import styles from "../styles/Home.module.css";
import {AudioProvider, useAudio} from "./AudioProvider";
import {useState, useEffect} from "react";

export default function PlayPauseToggle() {
    const audio = useAudio();
    const [isPlaying, setIsPlaying] = useState(audio !== undefined && audio.paused === false);
    const [needsPermission, setNeedsPermission] = useState(false);

    useEffect(() => {
        // Check if we need permissions (iOS devices)
        if (typeof DeviceMotionEvent !== 'undefined' && 
            typeof DeviceMotionEvent.requestPermission === 'function') {
            setNeedsPermission(true);
        }
    }, []);

    const requestPermissionsAndPlay = async () => {
        if (needsPermission) {
            try {
                const motionPermission = await DeviceMotionEvent.requestPermission();
                const orientationPermission = await DeviceOrientationEvent.requestPermission();
                
                if (motionPermission === 'granted' && orientationPermission === 'granted') {
                    setNeedsPermission(false);
                }
            } catch (error) {
                console.log('Permission request error:', error);
            }
        }
        
        setIsPlaying(true);
        audio.play();
    };

    return (
        <>
            <AudioProvider>
                {
                    !isPlaying ? (
                        <img
                            className={styles.playButton}
                            src="/smallPlay.png"
                            alt="play button"
                            width={25}
                            height={25}
                            onClick={requestPermissionsAndPlay}
                        />
                    ) : (
                        <img
                            className={styles.playButton}
                            src="/smallPause.png"
                            alt="play button"
                            width={25}
                            height={25}
                            onClick={() => {
                                setIsPlaying(false);
                                audio.pause();
                            }}
                        />
                    )
                }
            </AudioProvider>
            <div className={styles.onAir}>
                {!isPlaying ? <p>Tune In</p> : <p>On Air</p>}
            </div>
        </>
    );
}
