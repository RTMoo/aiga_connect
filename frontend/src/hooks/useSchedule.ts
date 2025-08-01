import { useState } from 'react';
import { apiClient } from '../api/client';

interface TrainingSession {
  id: number;
  title: string;
  description?: string;
  date: string;
  time: string;
  duration: number;
  max_participants?: number;
  current_participants?: number;
  location?: string;
  trainer?: {
    id: number;
    username: string;
  };
  participants?: Array<{
    id: number;
    username: string;
  }>;
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  session_type: 'group' | 'individual';
}

export function useSchedule() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createGroupSession = async (data: {
    title: string;
    description?: string;
    date: string;
    time: string;
    duration: number;
    max_participants: number;
    location?: string;
  }) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiClient.createGroupTrainingSession(data);
      if (response.data) {
        return { success: true, data: response.data };
      } else {
        setError(response.error || 'Ошибка создания тренировки');
        return { success: false, error: response.error };
      }
    } catch (error) {
      setError('Ошибка сети');
      return { success: false, error: 'Ошибка сети' };
    } finally {
      setIsLoading(false);
    }
  };

  const createIndividualSession = async (data: {
    title: string;
    description?: string;
    date: string;
    time: string;
    duration: number;
    athlete_id: number;
    location?: string;
  }) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiClient.createIndividualTrainingSession(data);
      if (response.data) {
        return { success: true, data: response.data };
      } else {
        setError(response.error || 'Ошибка создания тренировки');
        return { success: false, error: response.error };
      }
    } catch (error) {
      setError('Ошибка сети');
      return { success: false, error: 'Ошибка сети' };
    } finally {
      setIsLoading(false);
    }
  };

  const editGroupSession = async (sessionId: number, data: Record<string, unknown>) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiClient.editGroupTrainingSession(sessionId, data);
      if (response.data) {
        return { success: true, data: response.data };
      } else {
        setError(response.error || 'Ошибка обновления тренировки');
        return { success: false, error: response.error };
      }
    } catch (error) {
      setError('Ошибка сети');
      return { success: false, error: 'Ошибка сети' };
    } finally {
      setIsLoading(false);
    }
  };

  const editIndividualSession = async (sessionId: number, data: Record<string, unknown>) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiClient.editIndividualTrainingSession(sessionId, data);
      if (response.data) {
        return { success: true, data: response.data };
      } else {
        setError(response.error || 'Ошибка обновления тренировки');
        return { success: false, error: response.error };
      }
    } catch (error) {
      setError('Ошибка сети');
      return { success: false, error: 'Ошибка сети' };
    } finally {
      setIsLoading(false);
    }
  };

  const cancelGroupSession = async (sessionId: number) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiClient.cancelGroupTrainingSession(sessionId);
      if (response.data) {
        return { success: true };
      } else {
        setError(response.error || 'Ошибка отмены тренировки');
        return { success: false, error: response.error };
      }
    } catch (error) {
      setError('Ошибка сети');
      return { success: false, error: 'Ошибка сети' };
    } finally {
      setIsLoading(false);
    }
  };

  const cancelIndividualSession = async (sessionId: number) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiClient.cancelIndividualTrainingSession(sessionId);
      if (response.data) {
        return { success: true };
      } else {
        setError(response.error || 'Ошибка отмены тренировки');
        return { success: false, error: response.error };
      }
    } catch (error) {
      setError('Ошибка сети');
      return { success: false, error: 'Ошибка сети' };
    } finally {
      setIsLoading(false);
    }
  };

  const finishGroupSession = async (sessionId: number) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiClient.finishGroupTrainingSession(sessionId);
      if (response.data) {
        return { success: true };
      } else {
        setError(response.error || 'Ошибка завершения тренировки');
        return { success: false, error: response.error };
      }
    } catch (error) {
      setError('Ошибка сети');
      return { success: false, error: 'Ошибка сети' };
    } finally {
      setIsLoading(false);
    }
  };

  const finishIndividualSession = async (sessionId: number) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiClient.finishIndividualTrainingSession(sessionId);
      if (response.data) {
        return { success: true };
      } else {
        setError(response.error || 'Ошибка завершения тренировки');
        return { success: false, error: response.error };
      }
    } catch (error) {
      setError('Ошибка сети');
      return { success: false, error: 'Ошибка сети' };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    createGroupSession,
    createIndividualSession,
    editGroupSession,
    editIndividualSession,
    cancelGroupSession,
    cancelIndividualSession,
    finishGroupSession,
    finishIndividualSession,
  };
} 