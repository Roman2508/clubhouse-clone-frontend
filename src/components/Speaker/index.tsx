import React from 'react'
import { Avatar } from '../Avatar'
import styles from './Speaker.module.scss'

export interface ISpeakerProps {
  id: number
  avatarUrl: string
  fullName: string
}

const Speaker: React.FC<ISpeakerProps> = ({ avatarUrl, fullName }) => {
  return (
    <div className="d-flex flex-column align-items-center">
      <Avatar src={avatarUrl} width="60px" height="60px" />
      <b className={styles.username}>{fullName}</b>
    </div>
  )
}

export default Speaker
