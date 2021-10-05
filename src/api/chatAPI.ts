export type chatMessageType = {
  message: string
  photo: string
  userId: number
  userName: string
}
type messageSubscriberType = (messages: chatMessageType[]) => void
type statusSubscriberType = (status: statusType) => void
type eventType = "message" | "status"
export type statusType = 'pending' | 'ready' | 'error'

let subscribers = {
  "message": [] as messageSubscriberType[],
  "status": [] as statusSubscriberType[]
}
let ws: WebSocket | null

const notifyStatusSubscribers = (status: statusType) => {
  subscribers["status"].forEach(s => s(status))
}

const cleanUp = () => {
  ws?.removeEventListener('close', closeHandler)
  ws?.removeEventListener('message', messageHandler)
  ws?.removeEventListener('open', openHandler)
  ws?.removeEventListener('error', errorHandler)
}

function createChannel() {
  cleanUp()
  ws?.close()
  ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
  notifyStatusSubscribers("pending")
  ws?.addEventListener('close', closeHandler)
  ws?.addEventListener('message', messageHandler)
  ws?.addEventListener('open', openHandler)
  ws?.addEventListener('error', errorHandler)
}

const openHandler = () => {
  notifyStatusSubscribers("ready")
}

const closeHandler = () => {
  notifyStatusSubscribers("pending")
  setTimeout(createChannel, 3000)
}

const errorHandler = () => {
  notifyStatusSubscribers("error")
  console.log("Some error occurred. Try F5")
}

const messageHandler = (e: MessageEvent) => {
  const newMessages = JSON.parse(e.data)
  subscribers["message"].forEach(s => s(newMessages))
}

export const chatAPI = {
  start() {
    createChannel()
  },
  stop() {
    subscribers["message"] = []
    subscribers["status"] = []
    cleanUp()
    ws?.close()
  },
  subscribe(event: eventType, callback: messageSubscriberType | statusSubscriberType) {
    // @ts-ignore
    subscribers[event].push(callback)
    return () => {
      // @ts-ignore
      subscribers[event] = subscribers[event].filter(s => s !== callback)
    }
  },
  unsubscribe(event: eventType, callback: messageSubscriberType | statusSubscriberType) {
    // @ts-ignore
    subscribers[event] = subscribers[event].filter(s => s !== callback)
  },
  sendMessage(message: string) {
    ws?.send(message)
  }
}