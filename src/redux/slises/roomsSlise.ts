import { HYDRATE } from 'next-redux-wrapper'
import { Room, RoomApi, RoomTypes } from '@/api/RoomApi'
import { Axios } from '@/core/axios'
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '../types'

export interface RoomsInitialState {
  rooms: Room[] | null
}

const initialState: RoomsInitialState = {
  rooms: null,
}

export const fetchCreateRoom = createAsyncThunk<Room, { title: string; type: RoomTypes }>(
  'rooms/fetchCreateRoom',
  async (payload: { title: string; type: RoomTypes }) => {
    const data = await RoomApi(Axios).createRoom(payload)
    return data
  },
)

export const fetchAllRooms = createAsyncThunk<Room[]>('rooms/fetchAllRooms', async () => {
  const rooms = await RoomApi(Axios).getAllRooms()
  return rooms
})

export const roomsSlise = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    setRooms: (state, action: PayloadAction<Room[]>) => {
      state.rooms = action.payload
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchCreateRoom.fulfilled, (state, action: PayloadAction<Room>) => {
      if (state.rooms) {
        state.rooms.push(action.payload)
      } else {
        state.rooms = [action.payload]
      }
    })

    // fetchAllRooms
    builder.addCase(fetchAllRooms.fulfilled, (state, action: PayloadAction<Room[]>) => {
      state.rooms = action.payload
    })

    // HYDRATE
    builder.addCase(HYDRATE as any, (state, action: PayloadAction<RootState>) => {
      return {
        ...state,
        ...action.payload.rooms.rooms,
      }
      // state.rooms = action.payload.rooms.rooms
    })
  },
})

export const { setRooms } = roomsSlise.actions
