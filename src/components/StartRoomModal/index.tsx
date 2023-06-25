import clsx from 'clsx'
import React from 'react'
import { useRouter } from 'next/router'

import { Button } from '../Button'
import styles from './StartRoomModal.module.scss'
import { Room, RoomApi, RoomTypes } from '@/api/RoomApi'
import { fetchCreateRoom } from '@/redux/slises/roomsSlise'
import { useAsyncAction } from '@/hooks/useAction'

const roomTypes = [
  { id: 1, type: 'open' },
  { id: 2, type: 'social' },
  { id: 3, type: 'closed' },
]

interface StartRoomModalProps {
  onClose: () => void
}

export const StartRoomModal: React.FC<StartRoomModalProps> = ({ onClose }) => {
  const router = useRouter()
  const [title, setTitle] = React.useState<string>('')
  const [type, setType] = React.useState<RoomTypes>('open')
  const createRoom = useAsyncAction<any, Room>(fetchCreateRoom)

  const onSubmit = async () => {
    try {
      if (!title) {
        return alert('Вкажіть назву комнати')
      }
      const newRoom = await createRoom({ title, type })

      router.push(`/rooms/${newRoom.id}`)
      setTitle('')
    } catch (error) {
      alert('Помилка при створенні комнати')
    }
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <img
          width="24px"
          height="24px"
          src="/static/close.svg"
          alt="Close"
          className={styles.closeBtn}
          onClick={onClose}
        />
        <div className="mb-30">
          <h3>Topic</h3>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={styles.inputTitle}
            placeholder="Enter the topic to be discussed"
          />
        </div>
        <div className="mb-30">
          <h3>Room type</h3>
          <div className="d-flex justify-content-between">
            {roomTypes.map((el) => (
              <div
                key={el.id}
                onClick={() => setType(el.type as RoomTypes)}
                className={clsx(styles.roomType, { [styles.roomTypeActive]: type === el.type })}>
                <img width="70px" height="70px" src={`/static/room-type-${el.id}.png`} alt="Room type" />
                <h5>{el.type}</h5>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.delimiter}></div>
        <div className="text-center">
          <h3>Start a room open to everyone</h3>
          <Button onClick={onSubmit} color="green">
            <>
              <img width="18px" height="18px" src="/static/celebration.png" alt="Celebration" />
              Let's go
            </>
          </Button>
        </div>
      </div>
    </div>
  )
}
