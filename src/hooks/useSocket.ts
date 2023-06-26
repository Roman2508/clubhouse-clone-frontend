import React from 'react'
import io, { Socket } from 'socket.io-client'

export const useSocket = () => {
  const socketRef = React.useRef<Socket>()
  socketRef.current = io('http://localhost:3001')

  return socketRef.current
}
