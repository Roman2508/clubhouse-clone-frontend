import { UserData } from '@/pages'
import { Axios } from '@/core/axios'
import { RootState } from '../types'
import { UserApi } from '@/api/UserApi'
import { HYDRATE } from 'next-redux-wrapper'
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'

export interface UserInitialState {
  data: UserData | null
}

const initialState: UserInitialState = {
  data: null,
}

export const fetchUserData = createAsyncThunk<UserData, number>('user/fetchUserData', async (id: number) => {
  const userData = await UserApi(Axios).getUserInfo(id)
  return userData
})

// export const fetchCreateRoom = createAsyncThunk<Room, { title: string; type: RoomTypes }>(
//   'rooms/fetchCreateRoom',
//   async (payload: { title: string; type: RoomTypes }) => {
//     const data = await RoomApi(Axios).createRoom(payload)
//     console.log(data)
//     return data
//   },
// )

export const userSlise = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData(state, action: PayloadAction<UserData>) {
      state.data = action.payload
    },
  },
  extraReducers(builder) {
    // builder.addCase(fetchUserData.fulfilled, (state, action: PayloadAction<UserData>) => {
    //   state.data = action.payload
    // })

    builder.addCase(HYDRATE as any, (state, action: PayloadAction<RootState>) => {
      return {
        ...state,
        ...action.payload.user.data,
      }
      // state.data = action.payload.user.data
    })
  },
})

export const { setUserData } = userSlise.actions
