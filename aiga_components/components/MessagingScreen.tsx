import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { ArrowLeft, Send, Plus } from "lucide-react";
import { UserRole, Screen } from "./AppNavigation";

interface MessagingScreenProps {
  userRole: UserRole | "";
  onNavigate: (screen: Screen) => void;
}

export function MessagingScreen({ userRole, onNavigate }: MessagingScreenProps) {
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [message, setMessage] = useState("");

  const chats = [
    {
      id: 1,
      name: "Тренер Аслан",
      role: "coach",
      lastMessage: "Отличная работа на сегодняшней тренировке!",
      time: "2 часа назад",
      unread: 2
    },
    {
      id: 2,
      name: "Елена Назарбаева",
      role: "parent",
      lastMessage: "Когда следующий турнир?",
      time: "1 день назад",
      unread: 0
    },
    {
      id: 3,
      name: "Сообщество AIGA",
      role: "group",
      lastMessage: "Новое тренировочное оборудование в наличии!",
      time: "2 дня назад",
      unread: 5
    }
  ];

  const messages = [
    {
      id: 1,
      sender: "coach",
      text: "Отличная работа на сегодняшней тренировке! Ваша техника бросков улучшается.",
      time: "14:30"
    },
    {
      id: 2,
      sender: "user",
      text: "Спасибо, тренер! Я практиковал упражнения, которые вы мне показали.",
      time: "14:35"
    },
    {
      id: 3,
      sender: "coach",
      text: "Продолжайте в том же духе! На следующей неделе будем работать над контролем в партере.",
      time: "14:40"
    }
  ];

  const sendMessage = () => {
    if (message.trim()) {
      // In a real app, this would send the message
      console.log("Sending message:", message);
      setMessage("");
    }
  };

  if (selectedChat) {
    const chat = chats.find(c => c.id === selectedChat);
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
                {chat?.name.split(" ").map(n => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-lg text-white">{chat?.name}</h2>
              <p className="text-sm text-muted-foreground">
                {chat?.role === "coach" ? "Тренер" : 
                 chat?.role === "parent" ? "Родитель" : "Группа"}
              </p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 px-6 py-4 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-lg ${
                  msg.sender === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-card text-white"
                }`}
              >
                <p className="text-sm">{msg.text}</p>
                <p className={`text-xs mt-1 ${
                  msg.sender === "user" ? "text-primary-foreground/70" : "text-muted-foreground"
                }`}>
                  {msg.time}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="px-6 py-4 border-t border-border">
          <div className="flex space-x-2">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Введите сообщение..."
              className="flex-1 bg-card border-border text-white placeholder:text-muted-foreground"
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            />
            <Button
              onClick={sendMessage}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
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
            <h1 className="text-3xl text-white">Сообщения</h1>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="border-border text-muted-foreground hover:text-white"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 px-6 pb-6">
        <div className="space-y-3">
          {chats.map((chat) => (
            <Card
              key={chat.id}
              className="p-4 bg-card border-border cursor-pointer hover:border-primary/50 transition-all duration-200"
              onClick={() => setSelectedChat(chat.id)}
            >
              <div className="flex items-center space-x-4">
                <Avatar className="w-12 h-12">
                  <AvatarFallback className="bg-primary/20 text-primary">
                    {chat.name.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-white">{chat.name}</h3>
                    <span className="text-xs text-muted-foreground">{chat.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">
                    {chat.lastMessage}
                  </p>
                </div>
                {chat.unread > 0 && (
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-xs text-primary-foreground">{chat.unread}</span>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}