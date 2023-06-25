import { configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'
import { roomsSlise } from './slises/roomsSlise'
import { userSlise } from './slises/userSlise'
import { useDispatch } from 'react-redux'
import authSlice from './slises/authSlise'
import { TypedUseSelectorHook, useSelector as useReduxSelector } from 'react-redux'

const makeStore = () =>
  configureStore({
    reducer: {
      [roomsSlise.name]: roomsSlise.reducer,
      [userSlise.name]: userSlise.reducer,
      auth: authSlice,
    },
    devTools: true,
  })

export const store = makeStore()

export const wrapper = createWrapper<AppStore>(makeStore)

export type AppStore = ReturnType<typeof makeStore>

export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<AppStore> = useReduxSelector
