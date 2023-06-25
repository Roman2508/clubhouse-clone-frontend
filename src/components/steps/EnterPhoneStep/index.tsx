import React from 'react'
import clsx from 'clsx'
import { NumberFormatValues, PatternFormat } from 'react-number-format'
import { WhiteBlock } from '../../WhiteBlock'
import { Button } from '../../Button'
import styles from './EnterPhoneStep.module.scss'
import { StepInfo } from '@/components/StepInfo'
import { MainContext } from '@/pages'
import { Axios } from '@/core/axios'

type InputValueState = {
  value: string
  formattedValue: string
}

export const EnterPhoneStep = () => {
  const { onNextStep, setFieldValue } = React.useContext(MainContext)

  const [inputValue, setInputValue] = React.useState({} as InputValueState)
  const [isLoading, setIsLoading] = React.useState(false)

  const nextDisabled = !inputValue.formattedValue || !inputValue.formattedValue.includes('_')

  const onSubmit = async () => {
    try {
      setIsLoading(true)
      await Axios.get(`/auth/sms?phone=38${inputValue.value}`)
      setFieldValue('phone', `38${inputValue.value}`)
      onNextStep(5)
    } catch (error) {
      console.log('Помилка при відправці СМС', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={styles.block}>
      <StepInfo
        icon="/static/phone.png"
        title="Enter your phone #"
        description="We will send you a confirmation code"
      />
      <WhiteBlock className={clsx('m-auto mt-20', styles.whiteBlock)}>
        <>
          <div className={clsx('mb-30', styles.input)}>
            <img src="/static/ukr-flag.jpg" alt="flag" width={24} />
            <PatternFormat
              mask="_"
              className="field"
              allowEmptyFormatting
              format="+38 (###) ### ## ##"
              onValueChange={({ formattedValue, value }) => setInputValue({ formattedValue, value })}
              // placeholder="+38 (099) 333 22 11"
              // value={inputValue.value}
            />
          </div>
          <Button disabled={!nextDisabled || isLoading} onClick={onSubmit}>
            {isLoading ? (
              <>Sending...</>
            ) : (
              <>
                Next
                <img className="d-ib ml-10" src="/static/arrow.svg" />
              </>
            )}
          </Button>
          <p className={clsx(styles.policyText, 'mt-30')}>
            By entering your number, you’re agreeing to our Terms of Service and Privacy Policy. Thanks!
          </p>
        </>
      </WhiteBlock>
    </div>
  )
}
