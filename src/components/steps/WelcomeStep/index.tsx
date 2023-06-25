import React from 'react'
import { WhiteBlock } from '../../WhiteBlock'
import { Button } from '../../Button'
import styles from './WelcomeStep.module.scss'
import { MainContext } from '@/pages'

export const WelcomeStep: React.FC = () => {
  const { onNextStep } = React.useContext(MainContext)

  return (
    <WhiteBlock className={styles.block}>
      <>
        <h3 className={styles.title}>
          <img className={styles.handWaveImg} src="/static/hand-wave.png" alt="Celebration" />
          Welcome to Clubhouse!
        </h3>
        <p>
          We’re working hard to get Clubhouse ready for everyone! While we wrap up the finishing youches, we’re adding
          people gradually to make sure nothing breaks :)
        </p>
        <div>
          <Button onClick={() => onNextStep(1)}>
            <>
              Get your username
              <img className="d-ib ml-10" src="/static/arrow.svg" />
            </>
          </Button>
        </div>
        <div className="link mt-15 cup d-ib" onClick={() => onNextStep(6)}>
          I have an account. Sign in
        </div>
      </>
    </WhiteBlock>
  )
}
