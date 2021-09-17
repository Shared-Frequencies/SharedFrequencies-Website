import styles from '../styles/Home.module.css'
import { io } from "socket.io-client";
import userGen from "username-generator"
import {useContext, useEffect, useRef, useState} from "react";
import HeightContext from "./HeightProvider";

const socket = io("https://shared-frequency-chat.herokuapp.com");

export default function Chat() {
    const {height} = useContext(HeightContext);

    const messagesEndRef = useRef(null)

    const messageInputRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    const [user, setUser] = useState({
        usersList: null
    });
    const [recMsg, setRecMsg] = useState({
        listMsg: []
    });

    const [inputValue, setInputValue] = useState("");

    const [loggedUser, setLoggedUser] = useState();

    useEffect(async () => {
        // subscribe a new user
        socket.emit("login", userGen.generateUsername());
        // list of connected users
        socket.on("users", data => {
            setUser({ usersList: JSON.parse(data) })
        });
        // get the logged user
        socket.on("connecteduser", async data => {
            await setLoggedUser(JSON.parse(data));
            console.log(loggedUser)
        });

        // we get the messages
        socket.on("getMsg", data => {
            let listMessages = recMsg.listMsg;
            listMessages.push(JSON.parse(data));
            setRecMsg({listMsg: listMessages});
            scrollToBottom();
        });

        socket.on("sendHistory", data => {
            let listMessages = recMsg.listMsg;
            listMessages.push(JSON.parse(data));
            setRecMsg({listMsg: listMessages});
            scrollToBottom();
        });

    }, [recMsg.listMsg, setLoggedUser]);

    useEffect(async () => {
        await socket.emit("getHistory", loggedUser ? loggedUser.id : null);

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

    return (
        <div className={styles.chatBoxContainer} style={{height: height}}>
            <h2 className={styles.chatTitle}> Chat </h2>
            <div className={styles.chatBox} >
                {recMsg.listMsg?.map((msgInfo, index) => {
                    return (
                        <div className={styles.chatStream} key={index}>
                            <b>{msgInfo.userName} </b> :  {msgInfo.msg}
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
        </div >
    );
}