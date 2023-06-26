import React from 'react'
import Link from 'next/link'
import { GetServerSidePropsContext } from 'next'

import Room from '@/components/Room'
import { ConversationCard } from '../rooms'
import { Api } from '@/api'
import Layout from '@/components/Layout/Layout'

interface RoomPageProps {
  room: ConversationCard
}

const RoomPage: React.FC<RoomPageProps> = ({ room }) => {
  return (
    <Layout>
      <div className="container">
        <Link href="/rooms" className="d-ib cup">
          <img src="/static/back-arrow.svg" alt="back" />
          <h3 className="ml-10 d-ib">All rooms</h3>
        </Link>
      </div>

      <Room title={room.title} />
    </Layout>
  )
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const roomId = ctx.query.id

    if (!roomId || typeof roomId !== 'string') {
      return {
        props: {},
      }
    }
    const room = await Api(ctx).room.getOneRoom(roomId)

    return {
      props: { room },
    }
  } catch (error) {
    console.log('Room page error')
    return {
      props: {},
      redirect: {
        destination: '/rooms',
        permanent: false,
      },
    }
  }
}

export default RoomPage
