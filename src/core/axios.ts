import axios from 'axios'
// import Cookies from 'js-cookie'
import { parseCookies } from 'nookies'

const cookie = parseCookies()

const Axios = axios.create({
  baseURL: 'http://localhost:3001',
  headers: {
    Authorization: 'Bearer ' + cookie.clubhouse_token,
    // Authorization: 'Bearer ' + Cookies.get('token'),
  },
  // withCredentials: true,
})

export { Axios }
