import React, {useEffect, useState} from "react";

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
  const [ws, setWs] = useState<WebSocket | null>(null)

  useEffect(() => {
    let ws: WebSocket

    const closeHandler = () => {
      console.log('WS CLOSED')
      setTimeout(createChannel, 3000)
    }

    function createChannel() {
      if (ws !== null) {
        ws?.removeEventListener('close', closeHandler)
        ws?.close()
      }
      ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
      ws?.addEventListener('close', closeHandler)
      setWs(ws)
    }

    createChannel()
    return () => {
      ws.removeEventListener('close', closeHandler)
      ws.close()
    }
  }, [])

  return <div>
    <Messages ws={ws}/>
    <AddMessageForm ws={ws}/>
  </div>
}

const Messages: React.FC<{ws: WebSocket | null}> = ({ws}) => {
  const [messages, setMessages] = useState<chatMessageType[]>([])

  useEffect(() => {
    const messageHandler = (e: MessageEvent) => {
      setMessages((prevMessages) => [...prevMessages, ...JSON.parse(e.data)])
    }

    ws?.addEventListener('message', messageHandler)

    return () => {
      ws?.removeEventListener('message', messageHandler)
    }
  }, [ws])

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

const AddMessageForm: React.FC<{ws: WebSocket | null}> = ({ws}) => {
  const [message, setMessage] = useState("")
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const openHandler = () => {
      setIsReady(true)
    }

    ws?.addEventListener('open', openHandler)

    return () => {
      ws?.removeEventListener('open', openHandler)
    }
  }, [ws])

  const sendMessage = () => {
    if (!message) return
    ws?.send(message)
    setMessage("")
  }

  return <div>
    <div>
      <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}/>
    </div>
    <div>
      <button disabled={!isReady || ws === null} onClick={sendMessage}>send</button>
    </div>
  </div>
}

export default ChatPage