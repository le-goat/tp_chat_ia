"use client"
import {useEffect, useState} from "react";
import {io} from "socket.io-client";
import SendMessage from "@/components/chat/SendMessage";
import Messages from "@/components/chat/Messages";
import AddUser from "@/components/chat/AddUser";

const socket = io("http://localhost:3000")

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [user, setUser] = useState({});
    const [username, setUsername] = useState('')

    useEffect(() => {
        socket.on("connect", () => {
            console.log("connected")
        });

        socket.on("chat-message", (data) => {
            setMessages(msg => [...msg, data] as any)
            console.log(messages)
        });

        socket.on("get-user", (data) => {
            setUser(data)
            console.log(data)
            console.log(user)
        });
        /*
        return () => {
            socket.disconnect()
        }
        */
    }, [])

    return (
        <div>
            <h1>Chat</h1>
            {/* Ici on veut sélectionner la langue dans laquelle on veut traduire, on va ensuite la passer en props à Messages*/}
            <Messages messages={messages}/>
            <SendMessage socket={socket} user={user}/>
            <AddUser socket={socket}/>
        </div>
    )
};

export default Chat;