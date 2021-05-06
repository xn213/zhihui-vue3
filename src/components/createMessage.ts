import Message from './Message.vue'
import { createApp } from 'vue'
export type MessageType = 'success' | 'error' | 'default'

const createMessage = (message: string, type: MessageType, timeout = 2000): void => {
  const messageInstance = createApp(Message, {
    message,
    type
  })
  const mountNode = document.createElement('div')
  document.body.appendChild(mountNode)
  messageInstance.mount(mountNode)
  setTimeout(() => {
    messageInstance.unmount()
    document.body.removeChild(mountNode)
  }, timeout)
}

export default createMessage
