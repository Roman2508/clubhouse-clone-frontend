import { AxiosInstance } from 'axios'

export interface Room {
  id: number
  title: string
  type: RoomTypes
  speakers: any[]
  listenersCount: number
}

export type RoomTypes = 'open' | 'social' | 'closed'

export const RoomApi = (instance: AxiosInstance) => {
  return {
    getAllRooms: async (): Promise<Room[]> => {
      const { data } = await instance.get('/rooms')
      return data
    },

    getOneRoom: async (id: string): Promise<Room> => {
      const { data } = await instance.get(`/rooms/${id}`)
      return data
    },

    createRoom: async (payload: { title: string; type: RoomTypes }): Promise<Room> => {
      const { data } = await instance.post('/rooms', payload)
      return data
    },

    removeRoom: async (id: number): Promise<number> => {
      const { data } = await instance.delete(`/rooms/${id}`)
      return data
    },
  }
}
