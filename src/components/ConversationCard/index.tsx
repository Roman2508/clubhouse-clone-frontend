import React from 'react'
import clsx from 'clsx'

import { Avatar } from '../Avatar'
import styles from './ConversationCard.module.scss'
import whiteBlockStyles from '../WhiteBlock/WhiteBlock.module.scss'
import { UserData } from '../../pages'

// interface ConversationCard {
//   title: string
//   speakers: UserData[]
//   listenersCount: number
// }

interface ConversationCardProps {
  title: string
  avatars: string[]
  speakers: any
  speakersCount: number
  listenersCount: number
}

const ConversationCard: React.FC<ConversationCardProps> = ({
  title,
  avatars,
  speakersCount,
  speakers,
  listenersCount,
}) => {
  return (
    <div className={clsx(whiteBlockStyles.block, styles.card)}>
      <h4 className={styles.title}>{title}</h4>
      <div className={clsx('d-flex mt-10', styles.content)}>
        <div className={styles.avatars}>
          {avatars?.slice(0, 2).map((avatarUrl, i) => (
            <Avatar
              key={avatarUrl}
              width="45px"
              height="45px"
              src={avatarUrl}
              className={speakersCount > 1 && i === 1 ? 'lastAvatar' : ''}
              // className={speakersCount > 1 && i === speakersCount - 1 ? 'lastAvatar' : ''}
            />
          ))}
        </div>
        <div className={clsx(styles.info, 'ml-10')}>
          <ul className={styles.users}>
            {speakers?.slice(0, 5).map((user: any, i: number) => (
              <li key={i}>
                {user} <img src="/static/cloud.png" alt="Cloud" width={14} height={14} />
              </li>
            ))}
          </ul>
          <ul className={styles.details}>
            <li>
              <img src="/static/user.svg" alt="Users count" width={12} height={12} /> {speakersCount}
            </li>
            <li>
              <img className="ml-5" src="/static/message.svg" alt="Users count" width={12} height={12} />{' '}
              {listenersCount}
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export { ConversationCard }
