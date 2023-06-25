import React from 'react'
import clsx from 'clsx'
import styles from './Room.module.scss'
import Link from 'next/link'
import { Button } from '../Button'

interface RoomProps {
  title: string
  users: any
}

const Room: React.FC<RoomProps> = ({ title }) => {
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

        <div className="users">
          {/* {users.map((obj) => (
            <Speaker key={obj.fullname} {...obj} />
        ))} */}
        </div>
      </div>
    </div>
  )
}

export default Room
