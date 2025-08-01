import { useState, useEffect } from 'react';
import { apiClient } from '../api/client';

interface Profile {
  username: string;
  first_name: string;
  last_name: string;
  birth_date?: string;
  phone?: string;
  updated_at: string;
  created_at: string;
  [key: string]: unknown;
}

interface TrainerProfile extends Profile {
  bio?: string;
  training_zone_address: string;
  monthly_price: number;
  disciplines: Array<{
    id: number;
    name: string;
    slug: string;
  }>;
}

interface AthleteProfile extends Profile {
  height_cm?: number;
  weight_kg?: number;
  belt_grade?: string;
  disciplines: Array<{
    id: number;
    name: string;
    slug: string;
  }>;
}

interface ParentProfile extends Profile {
  address?: string;
}

interface ChildProfile extends AthleteProfile {
  parent: string;
}

export function useProfile() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = async (role: string, username?: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      let response;
      
      switch (role) {
        case 'trainer':
          response = await apiClient.getTrainerProfile(username || '');
          break;
        case 'athlete':
          response = await apiClient.getAthleteProfile(username || '');
          break;
        case 'parent':
          response = await apiClient.getParentProfile(username || '');
          break;
        case 'child':
          response = await apiClient.getChildrenProfile(username || '');
          break;
        default:
          throw new Error('Неизвестная роль пользователя');
      }

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