import React, {useEffect, useState} from "react";
import {chatMessageType} from "../../api/chatAPI";
import {useDispatch, useSelector} from "react-redux";
import {getMessages, sendMessage, stopMessages} from "../../redux/chatReducer";
import {appStateType} from "../../redux/reduxStore";

type messagePropsType = {
  message: chatMessageType
}

const ChatPage: React.FC = () => {
  return <div>
    <Chat/>
  </div>
}

const Chat: React.FC = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getMessages())
    return () => {
      dispatch(stopMessages())
    }
  })

  return <div>
    <Messages/>
    <AddMessageForm/>
  </div>
}

const Messages: React.FC = () => {
  const messages = useSelector((state: appStateType) => state.chat.messages)

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
  /*const [isReady, setIsReady] = useState(false)*/

  const dispatch = useDispatch()

  const sendMessageHandler = () => {
    if (!message) return
    dispatch(sendMessage(message))
    setMessage("")
  }

  return <div>
    <div>
      <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}/>
    </div>
    <div>
      <button onClick={sendMessageHandler}>send</button>
    </div>
  </div>
}

export default ChatPage