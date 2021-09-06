import {useEffect, useState} from "react";
import ReactPlayer from "react-player";
import styles from "../styles/Home.module.css";

export default function TwitchVideo() {
    const size = useWindowSize();

    return (
        <div>
            <ReactPlayer
                url='https://www.twitch.tv/sharedfrequenciesradio'
                height = {size.height * 0.33}
                width = {size.width * 0.80}
            />
            <iframe
                // className={styles.twitchChat}
                frameBorder="0"
                scrolling="no"
                src="https://www.twitch.tv/embed/sharedfrequenciesradio/chat?darkpopout&parent=localhost"
                height={`${size.height * 0.45}`}
                width={`${size.width * 0.80}`}
            >
            </iframe>
        </div>
    )
}


// Hook
function useWindowSize() {
    // Initialize state with undefined width/height so server and client renders match
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined,
    });
    useEffect(() => {
        // Handler to call on window resize
        function handleResize() {
            // Set window width/height to state
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }
        // Add event listener
        window.addEventListener("resize", handleResize);
        // Call handler right away so state gets updated with initial window size
        handleResize();
        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", handleResize);
    }, []); // Empty array ensures that effect is only run on mount
    return windowSize;
}