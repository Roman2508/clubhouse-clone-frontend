import clsx from 'clsx'
import React from 'react'
import Cookie from 'js-cookie'

import { Button } from '../../Button'
import styles from './GitHubStep.module.scss'
import { WhiteBlock } from '../../WhiteBlock'
import { StepInfo } from '@/components/StepInfo'
import { MainContext } from '@/pages'
import { useDispatch } from 'react-redux'

export const GitHubStep: React.FC = () => {
  const { onNextStep, setUserData } = React.useContext(MainContext)

  const userId = React.useRef(0)

  // const [userId, setUserId] = React.useState(0)

  const onClickAuth = () => {
    window.open(
      'http://localhost:3001/auth/github',
      'Auth',
      'width=500,heigth=500,status=yes,toolbar=no,menubar=no,location=no',
    )
  }

  React.useEffect(() => {
    window.addEventListener('message', ({ data }) => {
      const user: string = data

      if (typeof user === 'string' && user.includes('fullName')) {
        // Видаляю старий токен
        Cookie.remove('clubhouse_token')

        const json = JSON.parse(user)
        setUserData(json)
        onNextStep(2)

        userId.current = json.id

        if (userId.current) {
        }

        // Зберігаю новий токен
        Cookie.set('clubhouse_token', json.token)
      }
    })
  }, [])

  return (
    <div className={styles.block}>
      <StepInfo icon="/static/connect.png" title="Do you want import info from GitHub?" />
      <WhiteBlock className={clsx('m-auto mt-40', styles.whiteBlock)}>
        <>
          <Button
            className={clsx(styles.button, 'd-i-flex align-items-center')}
            onClick={onClickAuth}
            // disabled={isLoading}
          >
            <>
              <img className="d-ib mr-10" src="/static/github.svg" />
              Import from GitHub
              <img className="d-ib ml-10" src="/static/arrow.svg" />
            </>
          </Button>
          <div className="link mt-20 cup d-ib" onClick={() => onNextStep(2)}>
            Enter my info manually
          </div>
        </>
      </WhiteBlock>
    </div>
  )
}
