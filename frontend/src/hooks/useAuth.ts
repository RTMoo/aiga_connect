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
  // Восстанавливаем состояние из localStorage при инициализации
  const getInitialState = (): AuthState => {
    try {
      const savedState = localStorage.getItem('authState');
      console.log("useAuth - savedState from localStorage:", savedState);
      
      if (savedState) {
        const parsed = JSON.parse(savedState);
        console.log("useAuth - parsed state:", parsed);
        
        return {
          user: parsed.user,
          isAuthenticated: parsed.isAuthenticated,
          isLoading: true, // Начинаем с загрузки, чтобы проверить токен
        };
      }
    } catch (error) {
      console.error('Error parsing auth state from localStorage:', error);
    }
    
    return {
      user: null,
      isAuthenticated: false,
      isLoading: true,
    };
  };

  const [authState, setAuthState] = useState<AuthState>(getInitialState);
  const [error, setError] = useState<string | null>(null);
  const { success, error: showError } = useToast();

  // Проверяем аутентификацию при загрузке
  useEffect(() => {
    checkAuth();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const checkAuth = async () => {
    try {
      const response = await apiClient.getMyProfile();
      console.log("useAuth - checkAuth response:", response);
      
      if (response.data) {
        // Преобразуем данные профиля в данные пользователя
        const profileData = response.data as any;
        const userData: User = {
          id: profileData.user_id,
          email: profileData.user_email,
          username: profileData.username,
          role: profileData.user_role,
          email_verified: profileData.user_email_verified,
        };
        
        console.log("useAuth - userData:", userData);
        
        setAuthState({
          user: userData,
          isAuthenticated: true,
          isLoading: false,
        });
        
        // Сохраняем состояние в localStorage
        localStorage.setItem('authState', JSON.stringify({
          user: userData,
          isAuthenticated: true,
        }));
      } else {
        console.log("useAuth - no data in response, clearing auth state");
        setAuthState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });
        localStorage.removeItem('authState');
      }
    } catch (error) {
      console.error("useAuth - checkAuth error:", error);
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
      localStorage.removeItem('authState');
    }
  };

  const login = async (email: string, password: string) => {
    setError(null);
    try {
      const response = await apiClient.login(email, password);
      console.log("useAuth - login response:", response);
      
      if (response.status === 200) {
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
      console.error("useAuth - login error:", error);
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
      console.log("useAuth - register response:", response);
      
      // Успешная регистрация возвращает статус 201 (Created) с пустым телом
      if (response.status === 201) {
        // Создаем временного пользователя для отображения
        const tempUser: User = {
          id: 0,
          email: email,
          username: username,
          role: role as any,
          email_verified: false,
        };
        
        console.log("useAuth - setting temp user:", tempUser);
        
        setAuthState({
          user: tempUser,
          isAuthenticated: true,
          isLoading: false,
        });
        
        // Сохраняем состояние в localStorage
        localStorage.setItem('authState', JSON.stringify({
          user: tempUser,
          isAuthenticated: true,
        }));
        
        success('Аккаунт создан! Проверьте email для подтверждения.');
        return { success: true, data: response.data };
      } else {
        const errorMsg = response.error || 'Ошибка регистрации';
        setError(errorMsg);
        showError(errorMsg);
        return { success: false, error: errorMsg };
      }
    } catch (error) {
      console.error("useAuth - register error:", error);
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
      console.log("useAuth - confirmCode response:", response);
      
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
      console.error("useAuth - confirmCode error:", error);
      const errorMsg = 'Ошибка сети';
      setError(errorMsg);
      showError(errorMsg);
      return { success: false, error: errorMsg };
    }
  };

  const logout = async () => {
    try {
      const response = await apiClient.logout();
      console.log("useAuth - logout response:", response);
      
      // Успешный выход возвращает статус 200
      if (response.status === 200) {
        setAuthState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });
        localStorage.removeItem('authState');
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