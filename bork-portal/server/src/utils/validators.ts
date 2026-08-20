import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Некорректный email'),
  password: z.string().min(6, 'Пароль должен быть не менее 6 символов'),
});

export const registerSchema = z.object({
  email: z.string().email('Некорректный email'),
  password: z.string().min(6, 'Пароль должен быть не менее 6 символов'),
  firstName: z.string().min(2, 'Имя должно быть не менее 2 символов'),
  lastName: z.string().min(2, 'Фамилия должна быть не менее 2 символов'),
});

export const refreshTokenSchema = z.object({
  refreshToken: z.string().uuid('Некорректный refresh токен'),
});

export const createTaskSchema = z.object({
  title: z.string().min(1, 'Название обязательно'),
  description: z.string().optional(),
  status: z.enum(['NEW', 'IN_PROGRESS', 'REVIEW', 'DONE']).default('NEW'),
});

export const updateTaskSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  status: z.enum(['NEW', 'IN_PROGRESS', 'REVIEW', 'DONE']).optional(),
});

export const createRequestSchema = z.object({
  type: z.string().min(1, 'Тип запроса обязателен'),
  description: z.string().min(1, 'Описание обязательно'),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
});

export const updateRequestSchema = z.object({
  status: z.enum(['PENDING', 'APPROVED', 'REJECTED']),
  comment: z.string().optional(),
});

export const createNoteSchema = z.object({
  content: z.string().min(1, 'Содержимое заметки обязательно'),
  isPinned: z.boolean().default(false),
});

export const createScheduleSchema = z.object({
  date: z.string().datetime(),
  shiftType: z.enum(['OFFICE', 'REMOTE', 'DAY_OFF']),
  startTime: z.string().regex(/^\d{2}:\d{2}$/).optional(),
  endTime: z.string().regex(/^\d{2}:\d{2}$/).optional(),
  comment: z.string().optional(),
});

export const createCommercialProposalSchema = z.object({
  title: z.string().min(1, 'Название обязательно'),
  description: z.string().min(1, 'Описание обязательно'),
  data: z.record(z.any()).optional(),
});
