import { NextPage } from 'next'
import clsx from 'clsx'
import React, { useContext } from 'react'
import { StepInfo } from '../StepInfo'
import styles from './Login.module.scss'
import { WhiteBlock } from '../WhiteBlock'
import { Button } from '../Button'
import { PatternFormat } from 'react-number-format'
import { MainContext } from '@/pages'
import { Axios } from '@/core/axios'
import { useRouter } from 'next/router'
import Cookie from 'js-cookie'

const Login: NextPage = () => {
  const { onNextStep } = useContext(MainContext)

  const userId = React.useRef(0)

  const router = useRouter()

  const [phoneData, setPhoneData] = React.useState({ value: '', formattedValue: '' })
  const [userName, setUserName] = React.useState('')

  const isDisabled = !phoneData.formattedValue || !phoneData.formattedValue.includes('_')

  const handleSubmit = async () => {
    try {
      const userData = {
        userName,
        phone: `38${phoneData.value}`,
      }

      const { data } = await Axios.post('/user/login', userData)

      if (data.dataValues.id) {
        userId.current = data.dataValues.id

        Cookie.set('token', data.token)
        router.push('/rooms')
      } else {
        alert('Помилка авторизації')
      }
      //
    } catch (error) {
      alert('Помилка авторизації')
    }
  }

  return (
    <div className={styles.block}>
      <StepInfo title="Do you want login to clubhouse?" icon="/static/connect.png" />
      <WhiteBlock className={clsx('m-auto mt-40', styles.whiteBlock)}>
        <>
          {/* <Avatar src={''} width="120px" height="120px" /> */}
          <div className="mt-30 mb-30">
            <input
              className="field"
              placeholder="Enter user name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <PatternFormat
            mask="_"
            className={clsx('field mb-30')}
            allowEmptyFormatting
            format="+38 (###) ### ## ##"
            onValueChange={({ formattedValue, value }) => setPhoneData({ value, formattedValue })}
          />

          <Button onClick={handleSubmit} disabled={!isDisabled || !userName}>
            <>
              Login
              <img className="d-ib ml-10" src="/static/arrow.svg" />
            </>
          </Button>

          <div>
            <div className="link mt-20 cup d-ib" onClick={() => onNextStep(0)}>
              I don't have an account. Sign up
            </div>
          </div>
        </>
      </WhiteBlock>
    </div>
  )
}

export default Login
