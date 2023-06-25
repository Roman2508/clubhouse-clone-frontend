import { IinitialState } from './slises/authSlise'
import { RoomsInitialState } from './slises/roomsSlise'
import { UserInitialState } from './slises/userSlise'

export type RootState = {
  rooms: RoomsInitialState
  user: UserInitialState
  auth: IinitialState
}
