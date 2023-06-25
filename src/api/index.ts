import axios from 'axios'
import nookies, { parseCookies } from 'nookies'
import { GetServerSidePropsContext } from 'next'
import { UserApi } from './UserApi'
import { RoomApi } from './RoomApi'
import { NextPageContext } from 'next/types'

type ApiReturnType = {
  user: ReturnType<typeof UserApi>
  room: ReturnType<typeof RoomApi>
}

export const Api = (ctx?: NextPageContext | GetServerSidePropsContext): ApiReturnType => {
  const cookies = ctx ? nookies.get(ctx) : parseCookies()
  const token = cookies.clubhouse_token

  const instance = axios.create({
    baseURL: 'http://localhost:3001',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  })

  return {
    user: UserApi(instance),
    room: RoomApi(instance),
  }
}

// type ApiReturnType = ReturnType<typeof UserApi> & ReturnType<typeof RoomApi>

// export const Api = (ctx: GetServerSidePropsContext): ApiReturnType => {
//   const cookies = nookies.get(ctx)
//   const token = cookies.token

//   const instance = axios.create({
//     baseURL: 'http://localhost:3001',
//     headers: {
//       Authorization: 'Bearer ' + token,
//     },
//   })

//   return [UserApi, RoomApi].reduce((prev, f) => ({ ...prev, ...f(instance) }), {} as ApiReturnType)
// }
