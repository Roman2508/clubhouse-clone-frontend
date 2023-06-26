import clsx from 'clsx'
import React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next'

import { Button } from '@/components/Button'
import { Header } from '@/components/Header'
import { ConversationCard } from '@/components/ConversationCard'
import styles from '../components/ConversationCard/ConversationCard.module.scss'
import { StartRoomModal } from '@/components/StartRoomModal'
import { Api } from '@/api'
import { Room } from '@/api/RoomApi'
import { useAppDispatch, wrapper } from '@/redux/store'
import { useSocket } from '@/hooks/useSocket'
import Layout from '@/components/Layout/Layout'
import { setRooms, updateRoomsSpeakers } from '@/redux/slises/roomsSlise'
import { useSelector } from 'react-redux'
import { selectRooms } from '@/redux/selectors'

export interface ConversationCard {
  id: string
  title: string
  avatars: string[]
  guests: string[]
  guestsCount: number
  speakersCount: number
}

const Rooms: NextPage = () => {
  const socket = useSocket()

  const rooms = useSelector(selectRooms)

  const dispatch = useAppDispatch()

  const [visibleModal, setVisibleModal] = React.useState(false)

  const onOpen = () => setVisibleModal(true)
  const onClose = () => setVisibleModal(false)

  React.useEffect(() => {
    socket.on('SERVER@ROOMS:HOME', ({ users, roomId }) => {
      dispatch(updateRoomsSpeakers({ users, roomId }))
    })
  }, [])

  return (
    <Layout>
      {visibleModal && <StartRoomModal onClose={onClose} />}

      <div className="container">
        <div className="d-flex justify-content-between align-items-center">
          <h1>All conversations</h1>
          <Button color="green" onClick={onOpen}>
            <>
              <img src="/static/plus.svg" className="mr-5" />
              Start a room
            </>
          </Button>
        </div>

        <div className={clsx(styles.conversationWrapper, 'mt-20 d-flex')}>
          {(rooms || []).map((room) => (
            <Link href={`/rooms/${room.id}`} className="mb-30" key={room.id}>
              <ConversationCard
                title={room.title}
                avatars={[]}
                listenersCount={room.listenersCount}
                speakers={room.speakers}
                speakersCount={room.speakers.length}
              />
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {
  try {
    const rooms = await Api(ctx).room.getAllRooms()

    store.dispatch(setRooms(rooms))
  } catch (error) {
    // @ts-ignore
    console.log('Rooms page error', error.message)
  }

  return {
    props: {},
  }
})

export default Rooms

// try {
//   const user = await checkAuth(ctx)

//   if (!user || user.isActive === 0) {
//     return {
//       props: {},
//       redirect: {
//         premanent: false,
//         destination: '/',
//       },
//     }
//   }

//   if (user && user.isActive === 1) {
//     store.dispatch(setUserData(user))

//     return {
//       props: { rooms: [] },
//       // redirect: {
//       //   premanent: false,
//       //   destination: '/rooms',
//       // },
//     }
//   }
// } catch (error) {
//   console.log('error rooms')
//   return {
//     props: {
//       rooms: [],
//     },
//   }
// }
