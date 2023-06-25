import React from 'react'
import { WelcomeStep } from '@/components/steps/WelcomeStep'
import { EnterNameStep } from '@/components/steps/EnterNameStep'
import { EnterPhoneStep } from '@/components/steps/EnterPhoneStep'
import { EnterCodeStep } from '@/components/steps/EnterCodeStep'
import { ChooseAvatarStep } from '@/components/steps/ChooseAvatarStep'
import { GitHubStep } from '@/components/steps/GitHubStep'
import { GetServerSidePropsContext } from 'next'
import { parseCookies } from 'nookies'
import { Axios } from '@/core/axios'
// import { checkAuth } from '@/helpers/checkAuth'
import Login from '@/components/Login/Login'
import { Api } from '@/api'

const stepsComponents = {
  0: WelcomeStep,
  1: GitHubStep,
  2: EnterNameStep,
  3: ChooseAvatarStep,
  4: EnterPhoneStep,
  5: EnterCodeStep,
  6: Login,
}

export type UserData = {
  id: number
  fullName: string
  avatarUrl: string
  isActive: number
  userName: string
  phone: string
  token?: string
}

type MainContextProps = {
  onNextStep: (step: number) => void
  setUserData: React.Dispatch<React.SetStateAction<UserData>>
  setFieldValue: (field: keyof UserData, value: string) => void
  userData: UserData
  step: number
}

const getUserData = (): UserData | '' => {
  try {
    const data = window.localStorage.getItem('userData')

    if (data) {
      return JSON.parse(data)
    }

    return ''
  } catch (error) {
    return ''
  }
}

const getFormStep = (): number => {
  if (typeof window !== 'undefined') {
    const json = getUserData()

    const token = parseCookies().clubhouse_token

    if (json && token) {
      if (json.phone) {
        return 5
      } else {
        return 4
      }
    }
  }
  return 0
}

export const MainContext = React.createContext({} as MainContextProps)

export default function RoomPage() {
  const [step, setStep] = React.useState<number>(0)
  const [userData, setUserData] = React.useState<UserData>({} as UserData)
  const Step = stepsComponents[step as keyof typeof stepsComponents]

  const onNextStep = (step: number) => {
    setStep(step)
  }

  const setFieldValue = (field: keyof UserData, value: string) => {
    setUserData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const json = getUserData()

      if (json) {
        setUserData(json)
        setStep(getFormStep())
      }
    }
  }, [])

  React.useEffect(() => {
    if (Object.keys(userData).length) {
      globalThis.localStorage.setItem('userData', Object.keys(userData).length ? JSON.stringify(userData) : '')
      Axios.defaults.headers.Authorization = `Bearer ${userData.token}`
    }
  }, [userData])

  return (
    <MainContext.Provider value={{ step, onNextStep, setFieldValue, setUserData, userData }}>
      <Step />
    </MainContext.Provider>
  )
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const user = await Api(ctx).user.getMe()
    // checkAuth(ctx)

    if (user && user.isActive === 1) {
      return {
        props: {},
        redirect: {
          destination: '/rooms',
          permanent: false,
        },
      }
    }
  } catch (error) {
    console.log('Some error')
  }
  return { props: {} }
}
