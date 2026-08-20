export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: 'CONSULTANT_G6' | 'LEADER_G6' | 'ADMIN';
}

export interface Task {
  id: number;
  title: string;
  description?: string;
  status: 'NEW' | 'IN_PROGRESS' | 'REVIEW' | 'DONE';
  userId: number;
  createdAt: string;
  updatedAt: string;
}

export interface Request {
  id: number;
  type: string;
  description: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  userId: number;
  createdAt: string;
  updatedAt: string;
}

export interface Note {
  id: number;
  content: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
}

export interface CommercialProposal {
  id: number;
  title: string;
  description: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
}

export interface Schedule {
  id: number;
  date: string;
  shiftType: 'OFFICE' | 'REMOTE' | 'DAY_OFF';
  userId: number;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  message: string;
  user: User;
}

export interface LoginCredentials {
  email: string;
  password: string;
  captchaToken?: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}
