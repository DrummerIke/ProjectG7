export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'consultant_g6' | 'leader_g6' | 'admin';
  avatar?: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'new' | 'in_progress' | 'review' | 'done';
  assigneeId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ScheduleRequest {
  id: string;
  userId: string;
  type: 'vacation' | 'remote' | 'office' | 'day_off';
  startDate: string;
  endDate: string;
  status: 'pending' | 'approved' | 'rejected';
  comment?: string;
  createdAt: string;
}

export interface Shift {
  id: string;
  userId: string;
  date: string;
  type: 'office' | 'remote' | 'day_off';
  startTime?: string;
  endTime?: string;
}

export interface CommercialProposal {
  id: string;
  title: string;
  description: string;
  clientName: string;
  amount: number;
  status: 'draft' | 'sent' | 'accepted' | 'rejected';
  createdAt: string;
  updatedAt: string;
}

export interface Note {
  id: string;
  userId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
  captchaToken?: string;
}
