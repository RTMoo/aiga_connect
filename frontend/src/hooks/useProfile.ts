import { useState } from 'react';
import { apiClient } from '../api/client';
import { Profile } from '../types/api';

export function useProfile() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = async (role: string, username?: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Используем getMyProfile для получения профиля текущего пользователя
      const response = await apiClient.getMyProfile();
      
      if (response.data) {
        setProfile(response.data as Profile);
      } else {
        setError(response.error || 'Не удалось загрузить профиль');
      }
    } catch (error) {
      setError('Ошибка сети');
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (role: string, data: Record<string, unknown>) => {
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
          throw new Error('Неизвестная роль пользователя');
      }

      if (response.data) {
        setProfile(response.data as Profile);
        return { success: true };
      } else {
        const errorMsg = response.error || 'Не удалось обновить профиль';
        setError(errorMsg);
        return { success: false, error: errorMsg };
      }
    } catch (error) {
      const errorMsg = 'Ошибка сети';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    profile,
    isLoading,
    error,
    fetchProfile,
    updateProfile,
  };
} 