export enum Role {
  CONSULTANT_G6 = 'CONSULTANT_G6',
  LEADER_G6 = 'LEADER_G6',
  ADMIN = 'ADMIN',
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'NEW' | 'IN_PROGRESS' | 'REVIEW' | 'DONE';
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Request {
  id: string;
  type: string;
  description: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Note {
  id: string;
  content: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Schedule {
  id: string;
  date: string;
  shiftType: 'OFFICE' | 'REMOTE' | 'DAY_OFF';
  userId: string;
}

export interface CommercialProposal {
  id: string;
  title: string;
  description: string;
  data?: Record<string, any>;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}
