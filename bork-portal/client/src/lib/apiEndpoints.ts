import apiClient from './api';
import type { LoginCredentials, User, AuthTokens, Task, ScheduleRequest, Shift, CommercialProposal, Note } from '../types';

export const authApi = {
  login: async (credentials: LoginCredentials) => {
    const response = await apiClient.post<{ tokens: AuthTokens; user: User }>('/auth/login', credentials);
    return response.data;
  },

  logout: async () => {
    await apiClient.post('/auth/logout');
  },

  refresh: async () => {
    const response = await apiClient.post<{ accessToken: string }>('/auth/refresh');
    return response.data;
  },

  me: async () => {
    const response = await apiClient.get<User>('/auth/me');
    return response.data;
  },
};

export const tasksApi = {
  getAll: async () => {
    const response = await apiClient.get<Task[]>('/tasks');
    return response.data;
  },

  create: async (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    const response = await apiClient.post<Task>('/tasks', task);
    return response.data;
  },

  update: async (id: string, updates: Partial<Task>) => {
    const response = await apiClient.patch<Task>(`/tasks/${id}`, updates);
    return response.data;
  },

  delete: async (id: string) => {
    await apiClient.delete(`/tasks/${id}`);
  },
};

export const scheduleApi = {
  getMyShifts: async () => {
    const response = await apiClient.get<Shift[]>('/schedule/my');
    return response.data;
  },

  getTeamShifts: async (userId?: string) => {
    const response = await apiClient.get<Shift[]>('/schedule/team', { params: { userId } });
    return response.data;
  },

  createRequest: async (request: Omit<ScheduleRequest, 'id' | 'status' | 'createdAt'>) => {
    const response = await apiClient.post<ScheduleRequest>('/schedule/requests', request);
    return response.data;
  },

  getMyRequests: async () => {
    const response = await apiClient.get<ScheduleRequest[]>('/schedule/requests/my');
    return response.data;
  },

  approveRequest: async (id: string) => {
    const response = await apiClient.patch<ScheduleRequest>(`/schedule/requests/${id}/approve`);
    return response.data;
  },

  rejectRequest: async (id: string, reason?: string) => {
    const response = await apiClient.patch<ScheduleRequest>(`/schedule/requests/${id}/reject`, { reason });
    return response.data;
  },
};

export const proposalsApi = {
  getAll: async () => {
    const response = await apiClient.get<CommercialProposal[]>('/proposals');
    return response.data;
  },

  create: async (proposal: Omit<CommercialProposal, 'id' | 'createdAt' | 'updatedAt'>) => {
    const response = await apiClient.post<CommercialProposal>('/proposals', proposal);
    return response.data;
  },

  update: async (id: string, updates: Partial<CommercialProposal>) => {
    const response = await apiClient.patch<CommercialProposal>(`/proposals/${id}`, updates);
    return response.data;
  },

  delete: async (id: string) => {
    await apiClient.delete(`/proposals/${id}`);
  },
};

export const notesApi = {
  getMyNotes: async () => {
    const response = await apiClient.get<Note[]>('/notes');
    return response.data;
  },

  create: async (content: string) => {
    const response = await apiClient.post<Note>('/notes', { content });
    return response.data;
  },

  update: async (id: string, content: string) => {
    const response = await apiClient.patch<Note>(`/notes/${id}`, { content });
    return response.data;
  },

  delete: async (id: string) => {
    await apiClient.delete(`/notes/${id}`);
  },
};
