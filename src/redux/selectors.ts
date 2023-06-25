import { RootState } from './types'

export const selectRooms = (store: RootState) => store.rooms.rooms

export const selectUserData = (store: RootState) => store.user.data

export const selectAuthUser = (store: RootState) => store.auth.user
