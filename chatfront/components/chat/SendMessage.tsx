"use client";
import {Socket} from "socket.io-client";
import React, {useState} from "react";

export interface Props {
    socket: Socket;
    user: {id: number, name: string};
}

const SendMessage = ({socket, user}: Props) => {
    const [text, setText] = useState("")

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        socket.emit("chat-message", {
            content: text,
            timeSent: new Date().toISOString(),
            username: user.name,
        });
        console.log(user.name);
        setText("");
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={text}
                onChange={e => setText(e.target.value)}/>
            <button type="submit">Submit</button>
        </form>
    )
}

export default SendMessage;