import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { ArrowLeft, Bell, Calendar, Users, Trophy, MessageCircle } from "lucide-react";
import { UserRole, Screen } from "./AppNavigation";

interface NotificationsScreenProps {
  userRole: UserRole | "";
  onNavigate: (screen: Screen) => void;
}

export function NotificationsScreen({ userRole, onNavigate }: NotificationsScreenProps) {
  const [notifications] = useState([
    {
      id: 1,
      type: "training",
      title: "Напоминание о тренировке",
      message: "Борьба на болевых начинается через 30 минут",
      time: "10 минут назад",
      read: false,
      icon: Calendar
    },
    {
      id: 2,
      type: "request",
      title: "Новая заявка ученика",
      message: "Елена Назарбаева хочет записать своего ребёнка",
      time: "2 часа назад",
      read: false,
      icon: Users
    },
    {
      id: 3,
      type: "achievement",
      title: "Достижение разблокировано",
      message: "Вы завершили 50 тренировок!",
      time: "1 день назад",
      read: true,
      icon: Trophy
    },
    {
      id: 4,
      type: "message",
      title: "Новое сообщение",
      message: "Тренер Аслан прислал обновление прогресса",
      time: "2 дня назад",
      read: true,
      icon: MessageCircle
    }
  ]);

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "training":
        return "bg-blue-500/20 text-blue-400";
      case "request":
        return "bg-green-500/20 text-green-400";
      case "achievement":
        return "bg-yellow-500/20 text-yellow-400";
      case "message":
        return "bg-purple-500/20 text-purple-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="px-6 pt-12 pb-6">
        <div className="flex items-center mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigate("home")}
            className="mr-4 text-muted-foreground hover:text-white"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-3xl text-white">Уведомления</h1>
        </div>
      </div>

      {/* Notifications List */}
      <div className="flex-1 px-6 pb-6">
        <div className="space-y-3">
          {notifications.map((notification) => {
            const IconComponent = notification.icon;
            return (
              <Card
                key={notification.id}
                className={`p-4 bg-card border-border cursor-pointer transition-all duration-200 hover:border-primary/50 ${
                  !notification.read ? "border-primary/30" : ""
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getNotificationColor(notification.type)}`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-white text-sm">{notification.title}</h3>
                      {!notification.read && (
                        <Badge className="bg-primary/20 text-primary text-xs">
                          Новое
                        </Badge>
                      )}
                    </div>
                    <p className="text-muted-foreground text-sm mb-2">
                      {notification.message}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      {notification.time}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}