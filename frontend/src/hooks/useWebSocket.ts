import { useEffect, useRef, useCallback } from 'react';

interface WebSocketMessage {
  id: number;
  chat_id: number;
  text: string;
  sender: string;
  created_at: string;
}

interface UseWebSocketProps {
  chatId: number;
  onMessage: (message: WebSocketMessage) => void;
  onConnect?: () => void;
  onDisconnect?: () => void;
}

export function useWebSocket({ chatId, onMessage, onConnect, onDisconnect }: UseWebSocketProps) {
  const ws = useRef<WebSocket | null>(null);

  const connect = useCallback(() => {
    // Получаем токен из cookies
    const getToken = () => {
      const cookies = document.cookie.split(';');
      for (const cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name === 'access_token') {
          return value;
        }
      }
      return null;
    };

    const token = getToken();
    console.log("useWebSocket - token found:", !!token);
    
    const wsUrl = token
      ? `ws://localhost:8000/ws/chat/${chatId}/?token=${token}`
      : `ws://localhost:8000/ws/chat/${chatId}/`;

    console.log("useWebSocket - connecting to:", wsUrl);
    
    ws.current = new WebSocket(wsUrl);

    ws.current.onopen = () => {
      console.log("useWebSocket - connected");
      onConnect?.();
    };

    ws.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log("useWebSocket - received message:", data);
        onMessage(data);
      } catch (error) {
        console.error("useWebSocket - error parsing message:", error);
      }
    };

    ws.current.onclose = () => {
      console.log("useWebSocket - disconnected");
      onDisconnect?.();
    };

    ws.current.onerror = (error) => {
      console.error("useWebSocket - error:", error);
    };
  }, [chatId, onMessage, onConnect, onDisconnect]);

  const disconnect = useCallback(() => {
    if (ws.current) {
      console.log("useWebSocket - disconnecting");
      ws.current.close();
      ws.current = null;
    }
  }, []);

  const sendMessage = useCallback((text: string) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      const message = {
        type: 'message',
        text: text,
      };
      console.log("useWebSocket - sending message:", message);
      ws.current.send(JSON.stringify(message));
    } else {
      console.error("useWebSocket - cannot send message, connection not open");
    }
  }, []);

  useEffect(() => {
    if (chatId > 0) { // Only connect if chatId is valid
      console.log("useWebSocket - effect triggered, chatId:", chatId);
      connect();
      return () => {
        disconnect();
      };
    }
  }, [connect, disconnect, chatId]);

  return { sendMessage, disconnect };
} 