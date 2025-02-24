import { api } from '@/lib/api'
import { LoginInput, RegisterInput } from '@/lib/validations/auth'
import { IUser, LoginResponse, RegisterResponse } from '@/types'

export const authService = {
  async login(data: LoginInput): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>('/login', data)
    return response.data
  },

  async register(data: RegisterInput): Promise<RegisterResponse> {
    const response = await api.post<RegisterResponse>('/register', data)
    return response.data
  },

  async update(userId: string, data: Partial<RegisterInput>): Promise<IUser> {
    const response = await api.patch<{ data: IUser }>(`/users/${userId}`, data)
    return response.data.data
  },

  async delete(userId: string): Promise<void> {
    await api.delete(`/users/${userId}`)
  }
}
