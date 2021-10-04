import React, {useEffect, useState} from "react";

const ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')

export type chatMessageType = {
  message: string
  photo: string
  userId: number
  userName: string
}
type messagePropsType = {
  message: chatMessageType
}

const ChatPage: React.FC = () => {
  return <div>
    <Chat/>
  </div>
}

const Chat: React.FC = () => {
  return <div>
    <Messages/>
    <AddMessageForm/>
  </div>
}

const Messages: React.FC = () => {
  const [messages, setMessages] = useState<chatMessageType[]>([])

  useEffect(() => {
    ws.addEventListener('message', (e) => {
      setMessages((prevMessages) => [...prevMessages, ...JSON.parse(e.data)])
    })
  }, [])

  return <div style={{height: "350px", overflowY: "auto"}}>
    {messages.map((m, index) => <Message key={index} message={m}/>)}
  </div>
}

const Message: React.FC<messagePropsType> = ({message}) => {
  return <div>
    <img src={message.photo} alt="someAlt" style={{width: "30px"}}/> <b>{message.userName}</b>
    <br/>
    {message.message}
    <hr/>
  </div>
}

const AddMessageForm: React.FC = () => {
  const [message, setMessage] = useState("")

  const sendMessage = () => {
    if (!message) return
    ws.send(message)
    setMessage("")
  }

  return <div>
    <div>
      <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}/>
    </div>
    <div>
      <button onClick={sendMessage}>send</button>
    </div>
  </div>
}

export default ChatPage