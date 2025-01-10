import styles from '../styles/Home.module.css'
import { io } from "socket.io-client";
// import userGen from "username-generator"
import {useContext, useEffect, useRef, useState} from "react";
import HeightContext from "./HeightProvider";

const socket = io("https://shared-frequency-chat-2.herokuapp.com");

export default function Chat() {
    const {height} = useContext(HeightContext) + 1;

    const messagesEndRef = useRef(null)

    const messageInputRef = useRef(null)

    // const scrollToBottom = () => {
    //     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    // }

    const [user, setUser] = useState({
        usersList: null
    });
    const [recMsg, setRecMsg] = useState({
        listMsg: []
    });

    const [inputValue, setInputValue] = useState("");

    const [loggedUser, setLoggedUser] = useState();

    var emojis = ["⏳","⚪","⚽","⛄","⛎","⛔","⛪","⛲","⛵","⛺","⛽","✅","✨","❌","❎","⬛","⭐","⭕","🀄","🃏","🆎","🆑","🆒","🆓","🆔","🆕","🆖","🆗","🆘","🆙","🈁","🈚","🈯","🈲","🈳","🈴","🈵","🈸","🈹","🉐","🌀","🌁","🌂","🌃","🌄","🌅","🌆","🌇","🌈","🌉","🌊","🌋","🌍","🌏","🌐","🌑","🌒","🌓","🌔","🌖","🌗","🌙","🌚","🌛","🌜","🌝","🌟","🌭","🌮","🌰","🌲","🌴","🌷","🌸","🌹","🌺","🌻","🌼","🌽","🌾","🌿","🍀","🍁","🍂","🍃","🍄","🍅","🍆","🍇","🍈","🍉","🍋","🍌","🍍","🍎","🍐","🍑","🍒","🍓","🍔","🍕","🍖","🍗","🍘","🍙","🍚","🍛","🍜","🍝","🍞","🍟","🍠","🍡","🍢","🍣","🍤","🍥","🍦","🍧","🍨","🍩","🍪","🍫","🍬","🍭","🍮","🍯","🍰","🍱","🍲","🍳","🍴","🍵","🍶","🍷","🍸","🍹","🍺","🍼","🍾","🎀","🎁","🎂","🎃","🎄","🎆","🎇","🎈","🎉","🎊","🎋","🎌","🎍","🎎","🎏","🎐","🎑","🎒","🎠","🎡","🎢","🎣","🎤","🎥","🎦","🎧","🎨","🎩","🎪","🎫","🎬","🎭","🎮","🎯","🎰","🎱","🎲","🎳","🎴","🎵","🎶","🎷","🎸","🎹","🎺","🎻","🎼","🎽","🎾","🎿","🏀","🏁","🏅","🏆","🏇","🏈","🏉","🏊","🏏","🏐","🏠","🏮","🏯","🏴","🏸","🏹","🏺","🐀","🐁","🐂","🐃","🐄","🐅","🐆","🐈","🐉","🐊","🐌","🐍","🐏","🐑","🐓","🐔","🐕","🐖","🐗","🐘","🐙","🐚","🐛","🐜","🐝","🐞","🐟","🐠","🐡","🐢","🐣","🐤","🐥","🐦","🐧","🐨","🐪","🐫","🐬","🐭","🐮","🐯","🐰","🐱","🐲","🐳","🐴","🐵","🐶","🐷","🐸","🐹","🐺","🐻","🐼","🐽","👑","👒","👓","👔","👕","👖","👗","👘","👙","👚","👛","👜","👝","👞","👟","👠","👡","👢","👣","👥","👹","👺","👻","👽","👾","👿","💀","💂","💃","💄","💈","💉","💊","💋","💌","💍","💎","💐","💓","💔","💕","💖","💗","💘","💙","💚","💛","💜","💝","💞","💟","💠","💡","💢","💣","💤","💥","💦","💧","💨","💩","💫","💭","💮","💯","💰","💱","💲","💳","💴","💶","💸","💹","💺","💻","💼","💽","💾","💿","📀","📁","📂","📃","📄","📅","📆","📇","📈","📉","📊","📋","📌","📍","📎","📏","📐","📑","📒","📓","📔","📕","📖","📗","📘","📙","📚","📛","📜","📝","📞","📟","📠","📡","📢","📣","📤","📥","📦","📧","📨","📩","📪","📬","📮","📯","📰","📱","📲","📳","📵","📶","📸","📹","📺","📻","📿","🔀","🔁","🔃","🔄","🔅","🔆","🔈","🔉","🔊","🔋","🔌","🔍","🔎","🔏","🔐","🔑","🔒","🔓","🔕","🔖","🔗","🔘","🔙","🔚","🔛","🔜","🔝","🔞","🔟","🔥","🔦","🔧","🔨","🔩","🔪","🔬","🔮","🔰","🔱","🔲","🔳","🔴","🔵","🔶","🔷","🔸","🔹","🔺","🔻","🔼","🕌","🕍","🕐","🕘","🖤","🗻"];

    const [isChatOpen, setIsChatOpen] = useState(false);
    const [isClient, setIsClient] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Add state for max messages
    const [maxMessages, setMaxMessages] = useState(10);
    const chatBoxRef = useRef(null);

    // Add mobile detection
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Modified useEffect to handle different device types
    useEffect(() => {
        if (chatBoxRef.current && isChatOpen) {
            const messageHeight = isMobile ? 26 : 32; // Reduced from 28 to 26 for mobile
            const containerHeight = chatBoxRef.current.clientHeight;
            const calculatedMax = Math.floor(containerHeight / messageHeight);
            
            // Increased mobile limit
            const maxLimit = isMobile ? 21 : 15; // Increased mobile limit to 21
            setMaxMessages(Math.min(calculatedMax > 0 ? calculatedMax : 1, maxLimit));
        }
    }, [height, isChatOpen, isMobile]);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        // subscribe a new user
        var result = [];
        for (var i = 0; i < 2; i++) {
            var randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
            result.push(randomEmoji);
        }
        var emojiName = result.join('');
        socket.emit("login", emojiName);

        // list of connected users
        socket.on("users", data => {
            setUser({ usersList: JSON.parse(data) })
        });
        
        // get the logged user
        socket.on("connecteduser", data => {
            setLoggedUser(JSON.parse(data));
        });

        // we get the messages
        socket.on("getMsg", data => {
            setRecMsg(prev => {
                const newMessages = [...prev.listMsg, JSON.parse(data)];
                return {
                    listMsg: newMessages.slice(-maxMessages)
                };
            });
        });

        socket.on("sendHistory", data => {
            setRecMsg(prev => {
                const newMessages = [...prev.listMsg, JSON.parse(data)];
                return {
                    listMsg: newMessages.slice(-maxMessages)
                };
            });
        });

        // Cleanup function to remove listeners
        return () => {
            socket.off("users");
            socket.off("connecteduser");
            socket.off("getMsg");
            socket.off("sendHistory");
        };
    }, [maxMessages]);

    useEffect( () => {
        try {
            socket.emit("getHistory", loggedUser ? loggedUser.id : null);
        } catch (error) {
            console.error('Error getting history:', error);
        }
    }, [loggedUser])


    // to send a message
    const sendMessage = () => {
        if(inputValue.length < 1000) {
            socket.emit("sendMsg", JSON.stringify({ id: loggedUser.id, msg: inputValue }))
            setInputValue("")
            messageInputRef.current.focus()
        } else {
            setInputValue("")
            messageInputRef.current.focus()
        }
    }

    const handleUserInput = (e) => {
        setInputValue(e.target.value);
    };

    const enter = (event) => {
        if (event.keyCode === 13) {
            event.preventDefault()
            sendMessage()
        }
    }

    // Add toggle function
    const toggleChat = () => {
        setIsChatOpen(!isChatOpen);
    };

    return (
        <div className={`${styles.chatBoxContainer} ${!isChatOpen ? styles.chatBoxClosed : ''}`}> 
            <div className={`${styles.chatTitle} ${!isChatOpen ? styles.chatTitleClosed : ''}`} onClick={toggleChat}> 
                Chat {isClient && <span className={styles.toggleIndicator}>{!isChatOpen ? '+' : '-'}</span>}
            </div>
            <hr className={`${styles.horizontalRule} ${!isChatOpen ? styles.hidden : ''}`} />
            <div className={`${styles.chatContent} ${!isChatOpen ? styles.hidden : ''}`}>
                <div className={styles.chatBox} ref={chatBoxRef}>
                    {recMsg.listMsg?.map((msgInfo, index) => {
                        return (
                            <div className={styles.chatStream} key={index}>
                                <b className={styles.chatBoxUser}>{msgInfo.userName}</b>: {msgInfo.msg}
                                <div ref={messagesEndRef} />
                            </div>
                        ) })}
                </div>
                <div className={styles.chatInputContainer}>
                    <input className={styles.chatInput}
                           id="inputmsg"
                           ref={messageInputRef}
                           onKeyDown={(e) => enter(e) }
                           value={inputValue}
                           onChange={handleUserInput} />
                    <button className={styles.inputButton}
                            id="btnmsg"
                            onClick={() => { sendMessage() }}> Send </button>
                </div>
            </div>
        </div >
    );
}