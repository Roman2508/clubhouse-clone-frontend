import clsx from 'clsx'
import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

import { Button } from '../Button'
import styles from './Room.module.scss'
import { useSocket } from '@/hooks/useSocket'
import { selectAuthUser } from '@/redux/selectors'
import Speaker, { ISpeakerProps } from '../Speaker'
import io, { Socket } from 'socket.io-client'

interface RoomProps {
  title: string
}

const Room: React.FC<RoomProps> = ({ title }) => {
  const router = useRouter()
  const user = useSelector(selectAuthUser)

  // const socket = useSocket()

  const socket = React.useRef<Socket>()

  const [users, setUsers] = React.useState<ISpeakerProps[]>([])

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      socket.current = io('http://localhost:3001' /* , { reconnection: false } */)

      // Підключення до комнати
      socket.current.emit('CLIENT@ROOMS:JOIN', { roomId: router.query.id, user })

      // Вихід до комнати
      socket.current.on('SERVER@ROOMS:LEAVE', (user) => {
        setUsers((prev) => prev.filter((el) => el.id !== user.id))
      })

      //
      socket.current.on('SERVER@ROOMS:JOINED', (allUsers) => {
        setUsers(allUsers)
      })
    }

    return () => {
      socket.current?.disconnect()
    }
  }, [])

  return (
    <div className={clsx(styles.wrapper)}>
      <div className="container">
        <audio controls />
        <div className="d-flex align-items-center justify-content-between">
          <h2 className={styles.title}>{title}</h2>
          <div className={clsx('d-flex align-items-center', 'styles.actionButtons')}>
            <Link href="/rooms">
              <Button color="gray" className={styles.leaveButton}>
                <>
                  <img width={18} height={18} src="/static/peace.png" alt="Hand black" />
                  Leave quietly
                </>
              </Button>
            </Link>
          </div>
        </div>

        <div className={styles.users}>
          {users.map((obj) => (
            <Speaker key={obj.fullName} {...obj} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Room
