import { useState, useEffect } from 'react';
import { apiClient } from '../api/client';
import { useToast } from './useToast';

interface User {
  id: number;
  email: string;
  username: string;
  role: 'parent' | 'child' | 'trainer' | 'athlete' | 'coach';
  email_verified: boolean;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  const [error, setError] = useState<string | null>(null);
  const { success, error: showError } = useToast();

  // Проверяем аутентификацию при загрузке
  useEffect(() => {
    checkAuth();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const checkAuth = async () => {
    try {
      const response = await apiClient.getMyProfile();
      if (response.data) {
        setAuthState({
          user: response.data as User,
          isAuthenticated: true,
          isLoading: false,
        });
      } else {
        setAuthState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });
      }
    } catch (error) {
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  };

  const login = async (email: string, password: string) => {
    setError(null);
    try {
      const response = await apiClient.login(email, password);
      if (response.status === 200 && response.data) {
        await checkAuth(); // Обновляем состояние после успешного входа
        success('Успешный вход в систему');
        return { success: true };
      } else {
        const errorMsg = response.error || 'Ошибка входа';
        setError(errorMsg);
        showError(errorMsg);
        return { success: false, error: errorMsg };
      }
    } catch (error) {
      const errorMsg = 'Ошибка сети';
      setError(errorMsg);
      showError(errorMsg);
      return { success: false, error: errorMsg };
    }
  };

  const register = async (email: string, username: string, password: string, role: string) => {
    setError(null);
    try {
      const response = await apiClient.register(email, username, password, role);
      // Успешная регистрация возвращает статус 201 (Created) с пустым телом
      if (response.status === 201 || response.data) {
        success('Аккаунт создан! Проверьте email для подтверждения.');
        return { success: true, data: response.data };
      } else {
        const errorMsg = response.error || 'Ошибка регистрации';
        setError(errorMsg);
        showError(errorMsg);
        return { success: false, error: errorMsg };
      }
    } catch (error) {
      const errorMsg = 'Ошибка сети';
      setError(errorMsg);
      showError(errorMsg);
      return { success: false, error: errorMsg };
    }
  };

  const confirmCode = async (email: string, code: string) => {
    setError(null);
    try {
      const response = await apiClient.confirmCode(email, code);
      // Успешное подтверждение возвращает статус 200
      if (response.status === 200) {
        await checkAuth(); // Обновляем состояние после подтверждения
        success('Email подтвержден! Добро пожаловать в AIGA Connect!');
        return { success: true };
      } else {
        const errorMsg = response.error || 'Ошибка подтверждения кода';
        setError(errorMsg);
        showError(errorMsg);
        return { success: false, error: errorMsg };
      }
    } catch (error) {
      const errorMsg = 'Ошибка сети';
      setError(errorMsg);
      showError(errorMsg);
      return { success: false, error: errorMsg };
    }
  };

  const logout = async () => {
    try {
      const response = await apiClient.logout();
      // Успешный выход возвращает статус 200
      if (response.status === 200) {
        setAuthState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });
        success('Вы успешно вышли из системы');
      } else {
        console.error('Ошибка при выходе:', response.error);
      }
    } catch (error) {
      console.error('Ошибка при выходе:', error);
    }
  };

  return {
    user: authState.user,
    isAuthenticated: authState.isAuthenticated,
    isLoading: authState.isLoading,
    error,
    login,
    register,
    confirmCode,
    logout,
    checkAuth,
  };
} 