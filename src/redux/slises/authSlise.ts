import { UserData } from '@/pages'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { RootState } from '../types'
// import { api } from './api'

export interface IinitialState {
  user: UserData | null
}

const initialState: IinitialState = {
  user: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserData: (state, { payload }: { payload: UserData }) => {
      state.user = payload
    },
  },
  extraReducers(builder) {
    // @ts-ignore
    builder.addCase(HYDRATE as any, (state, action: PayloadAction<RootState>) => {
      return {
        ...state,
        user: {
          ...action.payload.auth.user,
        },
      }
      // state.user = action.payload.auth.user
    })
  },
})

export const { setUserData } = authSlice.actions

export default authSlice.reducer
