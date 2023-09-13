import styles from '../styles/Home.module.css'
import { io } from "socket.io-client";
// import userGen from "username-generator"
import {useContext, useEffect, useRef, useState} from "react";
import useStore from "../store/HeightStore";

// const socket = io(process.env.CHAT_SERVER_URL);
// const socket = io('http://localhost:4001');
const socket = io("https://shared-frequency-chat.herokuapp.com");



export default function Chat() {
    const height = useStore(state => state.height);

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

    var emojis = ["⏳","⚪","⚽","⛄","⛎","⛔","⛪","⛲","⛵","⛺","⛽","✅","✨","❌","❎","⬛","⭐","⭕","🀄","🃏","🆎","🆑","🆒","🆓","🆔","🆕","🆖","🆗","🆘","🆙","🈁","🈚","🈯","🈲","🈳","🈴","🈵","🈸","🈹","🉐","🌀","🌁","🌂","🌃","🌄","🌅","🌆","🌇","🌈","🌉","🌊","🌋","🌍","🌏","🌐","🌑","🌒","🌓","🌔","🌖","🌗","🌙","🌚","🌛","🌜","🌝","🌟","🌭","🌮","🌰","🌲","🌴","🌷","🌸","🌹","🌺","🌻","🌼","🌽","🌾","🌿","🍀","🍁","🍂","🍃","🍄","🍅","🍆","🍇","🍈","🍉","🍋","🍌","🍍","🍎","🍐","🍑","🍒","🍓","🍔","🍕","🍖","🍗","🍘","🍙","🍚","🍛","🍜","🍝","🍞","🍟","🍠","🍡","🍢","🍣","🍤","🍥","🍦","🍧","🍨","🍩","🍪","🍫","🍬","🍭","🍮","🍯","🍰","🍱","🍲","🍳","🍴","🍵","🍶","🍷","🍸","🍹","🍺","🍼","🍾","🎀","🎁","🎂","🎃","🎄","🎆","🎇","🎈","🎉","🎊","🎋","🎌","🎍","🎎","🎏","🎐","🎑","🎒","🎠","🎡","🎢","🎣","🎤","🎥","🎦","🎧","🎨","🎩","🎪","🎫","🎬","🎭","🎮","🎯","🎰","🎱","🎲","🎳","🎴","🎵","🎶","🎷","🎸","🎹","🎺","🎻","🎼","🎽","🎾","🎿","🏀","🏁","🏅","🏆","🏇","🏈","🏉","🏊","🏏","🏐","🏠","🏮","🏯","🏴","🏸","🏹","🏺","🐀","🐁","🐂","🐃","🐄","🐅","🐆","🐈","🐉","🐊","🐌","🐍","🐏","🐑","🐓","🐔","🐕","🐖","🐗","🐘","🐙","🐚","🐛","🐜","🐝","🐞","🐟","🐠","🐡","🐢","🐣","🐤","🐥","🐦","🐧","🐨","🐪","🐫","🐬","🐭","🐮","🐯","🐰","🐱","🐲","🐳","🐴","🐵","🐶","🐷","🐸","🐹","🐺","🐻","🐼","🐽","👑","👒","👓","👔","👕","👖","👗","👘","👙","👚","👛","👜","👝","👞","👟","👠","👡","👢","👣","👥","👹","👺","👻","👽","👾","👿","💀","💂","💃","💄","💈","💉","💊","💋","💌","💍","💎","💐","💓","💔","💕","💖","💗","💘","💙","💚","💛","💜","💝","💞","💟","💠","💡","💢","💣","💤","💥","💦","💧","💨","💩","💫","💭","💮","💯","💰","💱","💲","💳","💴","💶","💸","💹","💺","💻","💼","💽","💾","💿","📀","📁","📂","📃","📄","📅","📆","📇","📈","📉","📊","📋","📌","📍","📎","📏","📐","📑","📒","📓","📔","📕","📖","📗","📘","📙","📚","📛","📜","📝","📞","📟","📠","📡","📢","📣","📤","📥","📦","📧","📨","📩","📪","📬","📮","📯","📰","📱","📲","📳","📵","📶","📸","📹","📺","📻","📿","🔀","🔁","🔃","🔄","🔅","🔆","🔈","🔉","🔊","🔋","🔌","🔍","🔎","🔏","🔐","🔑","🔒","🔓","🔕","🔖","🔗","🔘","🔙","🔚","🔛","🔜","🔝","🔞","🔟","🔥","🔦","🔧","🔨","🔩","🔪","🔬","🔮","🔯","🔰","🔱","🔲","🔳","🔴","🔵","🔶","🔷","🔸","🔹","🔺","🔻","🔼","🕋","🕌","🕍","🕐","🕘","🖤","🗻"];

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

    useEffect( () => {
        socket.emit("getHistory", loggedUser ? loggedUser.id : null);

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

    console.log(height)

    return (
      <div
        className={styles.chatBoxContainer}
        style={{ maxHeight: height}}
      >
        <p className={styles.chatTitle}> Chat </p>
        <hr className={styles.horizontalRule} />
        <div className={styles.chatBox}>
          {recMsg.listMsg?.map((msgInfo, index) => {
            return (
              <div className={styles.chatStream} key={index}>
                <b className={styles.chatBoxUser}>{msgInfo.userName}</b>:{" "}
                {msgInfo.msg}
                <div ref={messagesEndRef} />
              </div>
            );
          })}
        </div>
        <div className={styles.chatInputContainer}>
          <input
            className={styles.chatInput}
            id="inputmsg"
            ref={messageInputRef}
            onKeyDown={(e) => enter(e)}
            value={inputValue}
            onChange={handleUserInput}
          />
          <button
            className={styles.inputButton}
            id="btnmsg"
            onClick={() => {
              sendMessage();
            }}
          >
            {" "}
            Send{" "}
          </button>
        </div>
      </div>
    );
}