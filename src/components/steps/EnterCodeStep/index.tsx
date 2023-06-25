import clsx from 'clsx'
import React from 'react'
import { useRouter } from 'next/router'

import { Axios } from '../../../core/axios'
import { StepInfo } from '../../StepInfo'
import { Button } from '@/components/Button'
import { WhiteBlock } from '../../WhiteBlock'
import styles from './EnterPhoneStep.module.scss'

export const EnterCodeStep = () => {
  const router = useRouter()

  const [isLoading, setIsLoading] = React.useState(false)
  const [codes, setCodes] = React.useState(['', '', '', ''])

  const isDisabled = codes.some((el) => el === '')

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const id = Number(event.target.getAttribute('id'))
    const value = event.target.value

    setCodes((prev) => {
      const newArr = [...prev]
      newArr[id] = value
      return newArr
    })
    if (event.target.nextSibling) {
      ;(event.target.nextSibling as HTMLInputElement).focus()
    } else {
      onSubmit([...codes, value].join(''))
    }
  }

  const onSubmit = async (code = '') => {
    try {
      setIsLoading(true)
      await Axios.get(`/auth/sms/activate?code=${code ? code : codes.join('')}`)
      router.push('/rooms')
    } catch (error) {
      alert('Помилка при активації :(')
      setCodes(['', '', '', ''])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={styles.block}>
      {!isLoading ? (
        <>
          <StepInfo icon="/static/numbers.png" title="Enter your activate code" />
          <WhiteBlock className={clsx('m-auto mt-30', styles.whiteBlock)}>
            <>
              <div className={styles.codeInput}>
                {codes.map((code, index) => (
                  <input
                    key={index}
                    type="tel"
                    placeholder="X"
                    maxLength={1}
                    id={String(index)}
                    onChange={handleChangeInput}
                    value={code}
                  />
                ))}
              </div>
              <Button disabled={isDisabled} onClick={() => onSubmit()}>
                <>
                  Next
                  <img className="d-ib ml-10" src="/static/arrow.svg" />
                </>
              </Button>
            </>
          </WhiteBlock>
        </>
      ) : (
        <div className="text-center">
          <div className="loader"></div>
          <h3 className="mt-5">Activation in progress ...</h3>
        </div>
      )}
    </div>
  )
}
