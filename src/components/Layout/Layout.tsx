import { useAppDispatch } from '@/redux/store'
import axios from 'axios'
import Cookies from 'js-cookie'
import { NextPage } from 'next'
import React, { ReactNode } from 'react'
import { setUserData } from '@/redux/slises/authSlise'
import { useDispatch } from 'react-redux'

interface ILayout {
  children: ReactNode
}

const Layout: NextPage<ILayout> = ({ children }) => {
  const dispatch = useDispatch()

  React.useEffect(() => {
    const fetchMe = async () => {
      const cookies = Cookies.get()
      const token = cookies.token
      if (token) {
        axios.defaults.headers.Authorization = `Bearer ${token}`
        axios.defaults.baseURL = 'http://localhost:3001'

        const { data } = await axios.get('/auth/me')

        dispatch(setUserData(data))
      }
    }

    fetchMe()
  }, [])

  return <>{children}</>
}

export default Layout
