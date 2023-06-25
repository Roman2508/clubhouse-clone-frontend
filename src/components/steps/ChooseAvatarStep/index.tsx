import React from 'react'
import clsx from 'clsx'
import { WhiteBlock } from '../../WhiteBlock'
import { Button } from '../../Button'
import { StepInfo } from '../../StepInfo'
import { Avatar } from '../../Avatar'

import styles from './ChooseAvatarStep.module.scss'
import { MainContext } from '@/pages'
import { Axios } from '@/core/axios'

const uploadFile = async (file: File): Promise<{ url: string }> => {
  const formData = new FormData()
  formData.append('photo', file)

  const { data } = await Axios.post('/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return data
}

export const ChooseAvatarStep: React.FC = () => {
  const { onNextStep, userData, setFieldValue } = React.useContext(MainContext)

  const inputFileRef = React.useRef<HTMLInputElement | null>(null)

  const [avatarUrl, setAvatarUrl] = React.useState(userData.avatarUrl)

  const avatarLetters = userData.fullName
    .split(' ')
    .map((el) => el[0])
    .join('')

  const handleChangeImage = async (event: Event) => {
    const target = event.target as HTMLInputElement
    const file = target.files && target.files[0]

    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setAvatarUrl(imageUrl)
      setFieldValue('avatarUrl', imageUrl)
      const data = await uploadFile(file)
      // setAvatarUrl(data.url)
      target.value = ''
    }
  }

  React.useEffect(() => {
    if (inputFileRef.current) {
      inputFileRef.current.addEventListener('change', handleChangeImage)
    }

    return () => {
      if (inputFileRef.current) {
        inputFileRef.current.removeEventListener('change', handleChangeImage)
      }
    }
  }, [])

  return (
    <div className={styles.block}>
      <StepInfo icon="/static/celebration.png" title={`Okay, ${userData.fullName}!`} description="How’s this photo?" />
      <WhiteBlock className={clsx('m-auto mt-40', styles.whiteBlock)}>
        <>
          <div className={styles.avatar}>
            <Avatar width="120px" height="120px" src={avatarUrl} letters={avatarLetters} />
          </div>
          <div className="mb-30">
            <label htmlFor="image" className="link cup">
              Choose a different photo
            </label>
          </div>
          <input id="image" ref={inputFileRef} type="file" hidden />
          <Button onClick={() => onNextStep(4)}>
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

/* 
  const { onNextStep, setFieldValue, userData } = React.useContext(MainContext)
  const avatarLetters = userData.fullname
    .split(" ")
    .map((s) => s[0])
    .join("")
  const [avatarUrl, setAvatarUrl] = React.useState<string>(userData.avatarUrl)
  const inputFileRef = React.useRef<HTMLInputElement>(null)

  const handleChangeImage = async (event: Event) => {
    const target = event.target as HTMLInputElement
    const file = target.files[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setAvatarUrl(imageUrl)
      const data = await uploadFile(file)
      target.value = ""
      setAvatarUrl(data.url)
      setFieldValue("avatarUrl", data.url)
    }
  }

  React.useEffect(() => {
    if (inputFileRef.current) {
      inputFileRef.current.addEventListener("change", handleChangeImage)
    }
  }, [])
*/
