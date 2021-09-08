import styles from '../styles/Home.module.css'
import { io } from "socket.io-client";
import userGen from "username-generator"
import {useEffect, useRef, useState} from "react";
import { Button, Input } from 'reactstrap';

const socket = io("https://shared-frequency-chat.herokuapp.com");

export default function Chat() {
    const messagesEndRef = useRef(null)

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

    useEffect(() => {
        // subscribe a new user
        socket.emit("login", userGen.generateUsername());
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
            let listMessages = recMsg.listMsg;
            listMessages.push(JSON.parse(data));
            setRecMsg({ listMsg: listMessages });
            scrollToBottom();
        });
    }, []);

    // to send a message
    const sendMessage = () => {
        socket.emit("sendMsg", JSON.stringify({ id: loggedUser.id, msg: inputValue }));
        setInputValue("");
    }
    const handleUserInput = (e) => {
        setInputValue(e.target.value);
    };

    const resetInputField = () => {
        setInputValue("");
    };



    return (
        <div className={styles.chatBoxContainer}>
            <h2 className={styles.chatTitle}> Chat </h2>
            <div className={styles.chatBox} style={{ borderStyle: "inset" }}>
                {recMsg.listMsg?.map((msgInfo, index) => {
                    return (
                        <div className={styles.chatStream} key={index} on>
                            <b>{msgInfo.userName} </b> :  {msgInfo.msg}
                            <small style={
                                { marginLeft: "18px",
                                    color: "blue",
                                    marginTop: "5px" }
                            }> {msgInfo.time}
                            </small>
                            <div ref={messagesEndRef} />
                        </div>
                    ) })}
                {}
            </div>
            <div className="d-flex justify-content-center">
                <Input style={{ width: "300px", display: "inline" }} id="inputmsg" value={inputValue} onChange={handleUserInput} />
                <Button className="btn btn-info" id="btnmsg" onClick={() => { sendMessage() }}> Send </Button>
            </div>
        </div >
    );
}