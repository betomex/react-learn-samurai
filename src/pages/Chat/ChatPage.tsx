import React, {useEffect, useRef, useState} from "react";
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
  const status = useSelector((state: appStateType) => state.chat.status)

  useEffect(() => {
    dispatch(getMessages())
    return () => {
      dispatch(stopMessages())
    }
  })

  return <div>
    {status === "error" && <div>Some error occurred. F5 or try later</div>}
    <Messages/>
    <AddMessageForm/>
  </div>
}

const Messages: React.FC = () => {
  const [isAutoScroll, setIsAutoScroll] = useState(false)
  const messages = useSelector((state: appStateType) => state.chat.messages)
  const messagesAnchorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isAutoScroll) {
      messagesAnchorRef.current?.scrollIntoView({behavior: 'smooth'})
    }
  }, [messages])

  const scrollHandler = (e: React.UIEvent) => {
    const el = e.currentTarget
    if (Math.abs(el.scrollHeight - el.scrollTop - el.clientHeight) < 300) {
      !isAutoScroll && setIsAutoScroll(true)
    } else {
      isAutoScroll && setIsAutoScroll(false)
    }
  }

  return <div style={{height: "350px", overflowY: "auto"}} onScroll={scrollHandler}>
    {messages.map((m, index) => <Message key={m.id} message={m}/>)}
    <div ref={messagesAnchorRef}></div>
  </div>
}

const Message: React.FC<messagePropsType> = React.memo(({message}) => {
  console.log("h")
  return <div>
    <img src={message.photo} alt="someAlt" style={{width: "30px"}}/> <b>{message.userName}</b>
    <br/>
    {message.message}
    <hr/>
  </div>
})

const AddMessageForm: React.FC = () => {
  const [message, setMessage] = useState("")
  const status = useSelector((state: appStateType) => state.chat.status)

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
      <button disabled={status !== 'ready'} onClick={sendMessageHandler}>send</button>
    </div>
  </div>
}

export default ChatPage