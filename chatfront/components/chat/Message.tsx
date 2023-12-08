export interface IMessage {
    content: string;
    timeSent: string;
    userName: string;
}

const Message = ({message}: {message: IMessage}) => {
    return (
        <div>
            <h1>{message.content}</h1>
            <p>{message.timeSent}</p>
        </div>
    )
}

export default Message;