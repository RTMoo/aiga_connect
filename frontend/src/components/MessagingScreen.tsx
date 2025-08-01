import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { ArrowLeft, Send, Plus, User } from "lucide-react";
import { UserRole, Screen } from "./AppNavigation";
import { useChats } from "../hooks/useChats";
import { useWebSocket } from "../hooks/useWebSocket";
import { Message } from "../types/api";
import { useAuth } from "../hooks/useAuth";

interface MessagingScreenProps {
  userRole: UserRole | "";
  onNavigate: (screen: Screen) => void;
}

export function MessagingScreen({
  userRole,
  onNavigate,
}: MessagingScreenProps) {
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const [showCreateChat, setShowCreateChat] = useState(false);
  const [newChatUser, setNewChatUser] = useState("");

  const { user } = useAuth();
  const {
    chats,
    messages,
    isLoading,
    error,
    fetchChats,
    fetchMessages,
    createChat,
  } = useChats();

  // Загружаем чаты при монтировании компонента
  useEffect(() => {
    fetchChats();
  }, [fetchChats]);

  // Загружаем сообщения при выборе чата
  useEffect(() => {
    if (selectedChat) {
      fetchMessages(selectedChat);
    }
  }, [selectedChat, fetchMessages]);

  // WebSocket для выбранного чата
  const { sendMessage } = useWebSocket({
    chatId: selectedChat || 0,
    onMessage: (wsMessage) => {
      // Добавляем новое сообщение в список
      const newMessage: Message = {
        id: wsMessage.id,
        chat_id: selectedChat || 0,
        text: wsMessage.text,
        author: wsMessage.sender,
        created_at: wsMessage.created_at,
        updated_at: wsMessage.created_at,
      };
      // Обновляем сообщения (в реальном приложении нужно обновить состояние)
      console.log("New message received:", newMessage);
    },
  });

  const handleSendMessage = () => {
    if (message.trim() && selectedChat) {
      sendMessage(message);
      setMessage("");
    }
  };

  const handleCreateChat = async () => {
    if (newChatUser.trim()) {
      const result = await createChat(newChatUser);
      if (result.success) {
        setShowCreateChat(false);
        setNewChatUser("");
        // Можно автоматически открыть новый чат
      }
    }
  };

  const getChatDisplayName = (chat: any) => {
    return chat.second_user;
  };

  const getChatLastMessage = (chat: any) => {
    if (chat.last_message) {
      return chat.last_message.text;
    }
    return "Нет сообщений";
  };

  const getChatTime = (chat: any) => {
    if (chat.last_message) {
      const date = new Date(chat.last_message.created_at);
      const now = new Date();
      const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

      if (diffInHours < 1) {
        return "Только что";
      } else if (diffInHours < 24) {
        return `${Math.floor(diffInHours)}ч назад`;
      } else {
        return date.toLocaleDateString();
      }
    }
    return "";
  };

  if (selectedChat) {
    const chat = chats.find((c) => c.chat_id === selectedChat);
    return (
      <div className="min-h-screen bg-background flex flex-col">
        {/* Chat Header */}
        <div className="px-6 pt-12 pb-4 border-b border-border">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedChat(null)}
              className="mr-4 text-muted-foreground hover:text-white"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <Avatar className="w-10 h-10 mr-3">
              <AvatarFallback className="bg-primary/20 text-primary">
                {chat
                  ? getChatDisplayName(chat)
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")
                  : "U"}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-lg text-white">
                {chat ? getChatDisplayName(chat) : "Пользователь"}
              </h2>
              <p className="text-sm text-muted-foreground">
                {isLoading ? "Загрузка..." : "Онлайн"}
              </p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 px-6 py-4 space-y-4 overflow-y-auto">
          {isLoading ? (
            <div className="text-center text-muted-foreground">
              Загрузка сообщений...
            </div>
          ) : error ? (
            <div className="text-center text-red-400">{error}</div>
          ) : messages.length === 0 ? (
            <div className="text-center text-muted-foreground">
              Нет сообщений
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.author === user?.username
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    msg.author === user?.username
                      ? "bg-primary text-primary-foreground"
                      : "bg-card text-white"
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                  <p
                    className={`text-xs mt-1 ${
                      msg.author === user?.username
                        ? "text-primary-foreground/70"
                        : "text-muted-foreground"
                    }`}
                  >
                    {new Date(msg.created_at).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Message Input */}
        <div className="px-6 py-4 border-t border-border">
          <div className="flex space-x-2">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Введите сообщение..."
              className="flex-1 bg-card border-border text-white placeholder:text-muted-foreground"
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <Button
              onClick={handleSendMessage}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
              disabled={!message.trim()}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="px-6 pt-12 pb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigate("home")}
              className="mr-4 text-muted-foreground hover:text-white"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-3xl text-white">Сообщество</h1>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="border-border text-muted-foreground hover:text-white"
            onClick={() => setShowCreateChat(true)}
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Create Chat Modal */}
      {showCreateChat && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card p-6 rounded-lg w-80">
            <h3 className="text-lg text-white mb-4">Создать чат</h3>
            <Input
              value={newChatUser}
              onChange={(e) => setNewChatUser(e.target.value)}
              placeholder="Имя пользователя"
              className="mb-4 bg-background border-border text-white placeholder:text-muted-foreground"
            />
            <div className="flex space-x-2">
              <Button
                onClick={handleCreateChat}
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                disabled={!newChatUser.trim()}
              >
                Создать
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowCreateChat(false)}
                className="flex-1 border-border text-muted-foreground hover:text-white"
              >
                Отмена
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Chat List */}
      <div className="flex-1 px-6 pb-6">
        {isLoading ? (
          <div className="text-center text-muted-foreground py-8">
            Загрузка чатов...
          </div>
        ) : error ? (
          <div className="text-center text-red-400 py-8">{error}</div>
        ) : chats.length === 0 ? (
          <div className="text-center text-muted-foreground py-8">
            <User className="w-16 h-16 mx-auto mb-4 text-muted-foreground/50" />
            <p>У вас пока нет чатов</p>
            <p className="text-sm">Нажмите + чтобы создать новый чат</p>
          </div>
        ) : (
          <div className="space-y-3">
            {chats.map((chat) => (
              <Card
                key={chat.chat_id}
                className="p-4 bg-card border-border cursor-pointer hover:border-primary/50 transition-all duration-200"
                onClick={() => setSelectedChat(chat.chat_id)}
              >
                <div className="flex items-center space-x-4">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-primary/20 text-primary">
                      {getChatDisplayName(chat)
                        .split(" ")
                        .map((n: string) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-white">{getChatDisplayName(chat)}</h3>
                      <span className="text-xs text-muted-foreground">
                        {getChatTime(chat)}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      {getChatLastMessage(chat)}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
