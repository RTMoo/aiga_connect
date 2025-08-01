import { useState, useEffect } from 'react';
import { apiClient } from '../api/client';

interface Profile {
  id: number;
  user: {
    id: number;
    email: string;
    username: string;
    role: string;
  };
  // Добавьте другие поля профиля в зависимости от роли
  [key: string]: unknown;
}

export function useProfile(username?: string) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = async (username: string, role: string) => {
    setIsLoading(true);
    setError(null);

    try {
      let response;
      switch (role) {
        case 'trainer':
          response = await apiClient.getTrainerProfile(username);
          break;
        case 'athlete':
          response = await apiClient.getAthleteProfile(username);
          break;
        case 'parent':
          response = await apiClient.getParentProfile(username);
          break;
        default:
          response = await apiClient.getAthleteProfile(username);
      }

      if (response.data) {
        setProfile(response.data as Profile);
      } else {
        setError(response.error || 'Профиль не найден');
      }
    } catch (error) {
      setError('Ошибка загрузки профиля');
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (data: Record<string, unknown>, role: string) => {
    setIsLoading(true);
    setError(null);

    try {
      let response;
      switch (role) {
        case 'trainer':
          response = await apiClient.editTrainerProfile(data);
          break;
        case 'athlete':
          response = await apiClient.editAthleteProfile(data);
          break;
        case 'parent':
          response = await apiClient.editParentProfile(data);
          break;
        default:
          response = await apiClient.editAthleteProfile(data);
      }

      if (response.data) {
        setProfile(response.data as Profile);
        return { success: true };
      } else {
        setError(response.error || 'Ошибка обновления профиля');
        return { success: false, error: response.error };
      }
    } catch (error) {
      setError('Ошибка сети');
      return { success: false, error: 'Ошибка сети' };
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (username) {
      // Здесь нужно получить роль пользователя из контекста или параметров
      // Пока используем athlete как дефолт
      fetchProfile(username, 'athlete');
    }
  }, [username]);

  return {
    profile,
    isLoading,
    error,
    fetchProfile,
    updateProfile,
  };
} 