import React from 'react'
import clsx from 'clsx'

import { Avatar } from '../Avatar'
import styles from './ConversationCard.module.scss'
import whiteBlockStyles from '../WhiteBlock/WhiteBlock.module.scss'
import { UserType } from '@/types'

// interface ConversationCard {
//   title: string
//   speakers: UserData[]
//   listenersCount: number
// }

interface ConversationCardProps {
  title: string
  avatars: string[]
  speakers: UserType[]
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
        <div className={styles.leftCol}>
          <div className={styles.avatars}>
            {speakers?.slice(0, 2).map((speakers, i) => (
              <Avatar
                key={speakers.id}
                width="45px"
                height="45px"
                src={speakers.avatarUrl}
                className={speakersCount > 1 && i === 1 ? 'lastAvatar' : ''}
                // className={speakersCount > 1 && i === speakersCount - 1 ? 'lastAvatar' : ''}
              />
            ))}
          </div>

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

        <div className={clsx(styles.info)}>
          <ul className={styles.users}>
            {speakers?.slice(0, 5).map((user: UserType, i: number) => (
              <li key={user.id}>
                {user.fullName} <img src="/static/cloud.png" alt="Cloud" width={14} height={14} />
                {/* {user.fullName} <img src="/static/cloud.png" alt="Cloud" width={14} height={14} /> */}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export { ConversationCard }
