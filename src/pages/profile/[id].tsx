import Layout from '@/components/Layout/Layout'
import Profile from '@/components/Profile'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

const ProfilePage = () => {
  const router = useRouter()

  const { id } = router.query

  return (
    <Layout>
      <div className="container pl-20 pr-20">
        <Link href="/rooms" className="d-ib mb-40 cup">
          <img src="/static/back-arrow.svg" alt="back" />
          <h3 className="ml-10 d-ib">Back</h3>
        </Link>

        <Profile
          fullName="Archakov Dennis"
          userName="archakov"
          avatarUrl=""
          about="Kakaya-to ochen vazhnaya informaciya o moev profile I have my personal site archakov.im and Telegram blog -
        t.me/archakov_im"
        />
      </div>
    </Layout>
  )
}

export default ProfilePage
