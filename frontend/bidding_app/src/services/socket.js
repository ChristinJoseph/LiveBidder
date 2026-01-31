import { io } from 'socket.io-client'

const socket = io(import.meta.env.VITE_BACKEND_URL, {
  transports: ['websocket'],
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 500,
  reconnectionDelayMax: 5000
})

export default socket
