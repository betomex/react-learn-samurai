export type chatMessageType = {
  message: string
  photo: string
  userId: number
  userName: string
}
type subscriberType = (messages: chatMessageType[]) => void

let subscribers = [] as subscriberType[]
let ws: WebSocket | null

function createChannel() {
  ws?.removeEventListener('close', closeHandler)
  ws?.close()
  ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
  ws?.addEventListener('close', closeHandler)
  ws?.addEventListener('message', messageHandler)
}

const closeHandler = () => {
  console.log('WS CLOSED')
  setTimeout(createChannel, 3000)
}

const messageHandler = (e: MessageEvent) => {
  const newMessages = JSON.parse(e.data)
  subscribers.forEach(s => s(newMessages))
}

export const chatAPI = {
  start() {
    createChannel()
  },
  stop() {
    subscribers = []
    ws?.removeEventListener('close', closeHandler)
    ws?.removeEventListener('message', messageHandler)
    ws?.close()
  },
  subscribe(callback: subscriberType) {
    subscribers.push(callback)
    return () => {
      subscribers = subscribers.filter(s => s !== callback)
    }
  },
  unsubscribe(callback: subscriberType) {
    subscribers = subscribers.filter(s => s !== callback)
  },
  sendMessage(message: string) {
    ws?.send(message)
  }
}