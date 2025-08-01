import { useState, useCallback } from 'react';
import { apiClient } from '../api/client';
import { Chat, Message } from '../types/api';

export function useChats() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchChats = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      console.log("useChats - fetching chats");
      const response = await apiClient.getChatList();
      console.log("useChats - chats response:", response);
      
      if (response.data) {
        setChats(response.data as Chat[]);
      } else {
        setChats([]);
      }
    } catch (error) {
      console.error("useChats - fetchChats error:", error);
      setError('Ошибка загрузки чатов');
      setChats([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchMessages = useCallback(async (chatId: number) => {
    setIsLoading(true);
    setError(null);
    try {
      console.log("useChats - fetching messages for chat:", chatId);
      const response = await apiClient.getChatMessages(chatId);
      console.log("useChats - messages response:", response);
      
      if (response.data) {
        setMessages(response.data as Message[]);
      } else {
        setMessages([]);
      }
    } catch (error) {
      console.error("useChats - fetchMessages error:", error);
      setError('Ошибка загрузки сообщений');
      setMessages([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createChat = useCallback(async (toUser: string) => {
    setIsLoading(true);
    setError(null);
    try {
      console.log("useChats - creating chat with user:", toUser);
      const response = await apiClient.createChat(toUser);
      console.log("useChats - createChat response:", response);
      
      if (response.data) {
        // Обновляем список чатов после создания
        await fetchChats();
        return { success: true, data: response.data };
      } else {
        setError('Ошибка создания чата');
        return { success: false, error: 'Ошибка создания чата' };
      }
    } catch (error) {
      console.error("useChats - createChat error:", error);
      setError('Ошибка создания чата');
      return { success: false, error: 'Ошибка создания чата' };
    } finally {
      setIsLoading(false);
    }
  }, [fetchChats]);

  return { chats, messages, isLoading, error, fetchChats, fetchMessages, createChat };
} 