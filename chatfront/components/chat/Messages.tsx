import Message, {IMessage} from "./Message";
import {Socket} from "socket.io-client";

export interface Props {
    messages: IMessage[];
    socket: Socket;
    target_language: string;
}

const Messages = ({messages}: Props) => {
    return (
        <div>
            {messages.map((msg, i) => (
                <div key={msg.timeSent}>
                    <Message message={msg}/>
                </div>
            ))}
        </div>
    )
}

export default Messages;