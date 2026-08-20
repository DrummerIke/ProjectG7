import axios from 'axios';
import type { LoginCredentials, RegisterData, AuthResponse } from '@/types';

const api = axios.create({
  baseURL: '/api',
  withCredentials: true,
});

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', credentials);
    return response.data;
  },

  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/register', data);
    return response.data;
  },

  logout: async (): Promise<void> => {
    await api.post('/auth/logout');
  },

  refreshToken: async (): Promise<void> => {
    await api.post('/auth/refresh-token');
  },

  getMe: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },
};

export default api;
