import '@/styles/globals.scss'

import React from 'react'
import { wrapper } from '@/redux/store'
import Layout from '@/components/Layout/Layout'
import type { AppProps } from 'next/app'
import App from 'next/app'
import { Api } from '@/api'
import { setUserData } from '@/redux/slises/authSlise'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

MyApp.getInitialProps = wrapper.getInitialAppProps((store) => async (appContext) => {
  try {
    const user = await Api(appContext.ctx).user.getMe()

    console.log(user, 'user')

    if (!user || user.isActive === 0) {
      // if user unauthorized - redirect to auth page
      appContext.ctx.res?.writeHead(302, {
        Location: '/',
      })
      appContext.ctx.res?.end()
    } else {
      store.dispatch(setUserData(user))

      if (appContext.ctx.asPath === '/') {
        appContext.ctx.res?.writeHead(302, {
          Location: '/rooms',
        })
        appContext.ctx.res?.end()
      }
    }
  } catch (error) {
    // @ts-ignore
    console.log('_app error', error)
  }

  const childrenGip = await App.getInitialProps(appContext)

  return {
    pageProps: {
      ...childrenGip,
    },
  }
})

export default wrapper.withRedux(MyApp)
