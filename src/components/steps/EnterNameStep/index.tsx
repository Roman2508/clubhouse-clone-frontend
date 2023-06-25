import React from 'react'
import clsx from 'clsx'

import { WhiteBlock } from '../../WhiteBlock'
import { Button } from '../../Button'
import { StepInfo } from '../../StepInfo'
import styles from './EnterNameStep.module.scss'
import { Avatar } from '../../Avatar'
import { MainContext } from '@/pages'

export const EnterNameStep = () => {
  const { onNextStep, userData, setFieldValue } = React.useContext(MainContext)

  const [inputValue, setInputValue] = React.useState(userData?.fullName)

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
    setFieldValue('fullName', event.target.value)
  }

  return (
    <div className={styles.block}>
      <StepInfo
        icon="/static/man.png"
        title="What’s your full name?"
        description="People use real names on Clubhouse :) Thnx!"
      />
      <WhiteBlock className={clsx('m-auto', styles.whiteBlock)}>
        <>
          {/* <Avatar src={''} width="120px" height="120px" /> */}
          <div className="mt-30 mb-30">
            <input className="field" placeholder="Enter fullname" value={inputValue} onChange={handleChangeInput} />
          </div>
          <Button onClick={() => onNextStep(3)} disabled={!inputValue}>
            <>
              Next
              <img className="d-ib ml-10" src="/static/arrow.svg" />
            </>
          </Button>
        </>
      </WhiteBlock>
    </div>
  )
}
