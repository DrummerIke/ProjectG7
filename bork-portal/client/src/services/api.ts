import axios from 'axios';
import type { User, Task, Request, Note, Schedule, CommercialProposal, AuthTokens } from '../types';

const API_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor for token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Handle token refresh or redirect to login
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authApi = {
  login: async (email: string, password: string, captchaToken?: string) => {
    const response = await api.post<AuthTokens>('/auth/login', { email, password, captchaToken });
    return response.data;
  },
  logout: async () => {
    await api.post('/auth/logout');
  },
  refreshToken: async () => {
    const response = await api.post<AuthTokens>('/auth/refresh');
    return response.data;
  },
  me: async () => {
    const response = await api.get<User>('/auth/me');
    return response.data;
  },
};

export const tasksApi = {
  getAll: async () => {
    const response = await api.get<Task[]>('/tasks');
    return response.data;
  },
  create: async (task: Omit<Task, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => {
    const response = await api.post<Task>('/tasks', task);
    return response.data;
  },
  update: async (id: string, task: Partial<Task>) => {
    const response = await api.patch<Task>(`/tasks/${id}`, task);
    return response.data;
  },
  delete: async (id: string) => {
    await api.delete(`/tasks/${id}`);
  },
};

export const requestsApi = {
  getAll: async () => {
    const response = await api.get<Request[]>('/requests');
    return response.data;
  },
  create: async (request: Omit<Request, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => {
    const response = await api.post<Request>('/requests', request);
    return response.data;
  },
  updateStatus: async (id: string, status: Request['status']) => {
    const response = await api.patch<Request>(`/requests/${id}`, { status });
    return response.data;
  },
};

export const notesApi = {
  getAll: async () => {
    const response = await api.get<Note[]>('/notes');
    return response.data;
  },
  create: async (content: string) => {
    const response = await api.post<Note>('/notes', { content });
    return response.data;
  },
  update: async (id: string, content: string) => {
    const response = await api.patch<Note>(`/notes/${id}`, { content });
    return response.data;
  },
  delete: async (id: string) => {
    await api.delete(`/notes/${id}`);
  },
};

export const scheduleApi = {
  getMySchedule: async (month?: number, year?: number) => {
    const response = await api.get<Schedule[]>('/schedule/my', { params: { month, year } });
    return response.data;
  },
  getTeamSchedule: async (month?: number, year?: number) => {
    const response = await api.get<Schedule[]>('/schedule/team', { params: { month, year } });
    return response.data;
  },
};

export const commercialProposalsApi = {
  getAll: async () => {
    const response = await api.get<CommercialProposal[]>('/commercial-proposals');
    return response.data;
  },
  create: async (proposal: Omit<CommercialProposal, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => {
    const response = await api.post<CommercialProposal>('/commercial-proposals', proposal);
    return response.data;
  },
  update: async (id: string, proposal: Partial<CommercialProposal>) => {
    const response = await api.patch<CommercialProposal>(`/commercial-proposals/${id}`, proposal);
    return response.data;
  },
  delete: async (id: string) => {
    await api.delete(`/commercial-proposals/${id}`);
  },
};

export default api;
