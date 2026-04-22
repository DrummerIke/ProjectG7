import { User } from '../types';

export const hasRole = (user: User | null, roles: string[]): boolean => {
  if (!user) return false;
  return roles.includes(user.role);
};

export const canViewTeamSchedule = (user: User | null): boolean => {
  return hasRole(user, ['leader_g6', 'admin']);
};

export const canApproveRequests = (user: User | null): boolean => {
  return hasRole(user, ['leader_g6', 'admin']);
};

export const canManageUsers = (user: User | null): boolean => {
  return hasRole(user, ['admin']);
};

export const canCreateProposals = (user: User | null): boolean => {
  return hasRole(user, ['consultant_g6', 'leader_g6', 'admin']);
};
