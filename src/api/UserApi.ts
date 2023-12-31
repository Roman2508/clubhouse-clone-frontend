import { UserData } from '@/pages'
import { AxiosInstance } from 'axios'

export const UserApi = (instance: AxiosInstance) => {
  return {
    getMe: async (): Promise<UserData> => {
      const { data } = await instance.get('/auth/me')
      return data
    },
    getUserInfo: async (id: number): Promise<UserData> => {
      const { data } = await instance.get('/user/' + id)
      return data
    },
  }
}
