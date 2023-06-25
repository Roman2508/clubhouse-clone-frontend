import clsx from 'clsx'
import React from 'react'
import Link from 'next/link'
import { useSelector } from 'react-redux'

import { Avatar } from '../Avatar'
import styles from './Header.module.scss'
import { selectAuthUser } from '@/redux/selectors'
// import { checkAuth } from '@/helpers/checkAuth'
import { GetServerSideProps } from 'next'

export const Header: React.FC = () => {
  const userData = useSelector(selectAuthUser)

  if (!userData) {
    return <h2>Loading...</h2>
  }

  return (
    <div className={styles.header}>
      <div className="container ">
        <div className="d-flex align-items-center justify-content-between">
          <Link href="/rooms">
            <div className={clsx(styles.headerLogo, 'd-flex align-items-center cup')}>
              <img src="/static/hand-wave.png" alt="Logo" className="mr-5" />
              <h4>Clubhouse</h4>
            </div>
          </Link>
          <Link href={`/profile/${userData.id}`}>
            <div className="d-flex align-items-center cup">
              <b className="mr-15">{userData.fullName}</b>
              <Avatar src={userData.avatarUrl} width="40px" height="40px" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {},
  }

  // try {
  //   const user = await checkAuth(ctx)
  //   if (user) {
  //     return {
  //       props: {
  //         user,
  //       },
  //     }
  //   }

  //   if (!user) {
  //     return {
  //       props: {},
  //       redirect: {
  //         destination: '/',
  //         permanent: false,
  //       },
  //     }
  //   }
  // } catch (error) {
  //   return {
  //     props: {},
  //   }
  // }
}
