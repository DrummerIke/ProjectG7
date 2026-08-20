import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { authApi } from '@/api/auth';
import type { LoginCredentials } from '@/types';

export function useAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setUser, logout } = useAuthStore();
  const navigate = useNavigate();

  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await authApi.login(credentials);
      setUser(response.user);
      navigate('/dashboard');
      return response;
    } catch (err: any) {
      const message = err.response?.data?.error || 'Ошибка входа';
      setError(message);
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: any) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await authApi.register(data);
      setUser(response.user);
      navigate('/dashboard');
      return response;
    } catch (err: any) {
      const message = err.response?.data?.error || 'Ошибка регистрации';
      setError(message);
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await authApi.logout();
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      logout();
      navigate('/login');
    }
  };

  return {
    isLoading,
    error,
    login,
    register,
    logout: handleLogout,
  };
}
