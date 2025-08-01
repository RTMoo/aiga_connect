import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { ArrowLeft, Check, X, User } from "lucide-react";
import { UserRole, Screen } from "./AppNavigation";

interface RequestsScreenProps {
  userRole: UserRole | "";
  onNavigate: (screen: Screen) => void;
}

export function RequestsScreen({ userRole, onNavigate }: RequestsScreenProps) {
  const [requests, setRequests] = useState([
    {
      id: 1,
      parentName: "Елена Назарбаева",
      childName: "Амир Назарбаев",
      childAge: 16,
      childWeight: 68,
      experience: "Новичок",
      message: "Мой сын заинтересован в изучении грэпплинга. У него нет предыдущего опыта, но он очень мотивирован.",
      status: "pending",
      date: "2 дня назад"
    },
    {
      id: 2,
      parentName: "Айдар Каимов",
      childName: "Данияр Каимов",
      childAge: 14,
      childWeight: 55,
      experience: "Есть опыт борьбы",
      message: "Ищу хорошего тренера для улучшения навыков грэпплинга моего сына.",
      status: "pending",
      date: "1 день назад"
    },
    {
      id: 3,
      parentName: "Сауле Султанова",
      childName: "Арман Султанов",
      childAge: 17,
      childWeight: 72,
      experience: "Синий пояс по BJJ",
      message: "Переезжаем в Алматы, ищем новую академию для моего сына.",
      status: "accepted",
      date: "5 дней назад"
    }
  ]);

  const handleRequest = (requestId: number, action: "accept" | "reject") => {
    setRequests(requests.map(request => 
      request.id === requestId 
        ? { ...request, status: action === "accept" ? "accepted" : "rejected" }
        : request
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "accepted":
        return "bg-green-500/20 text-green-400";
      case "rejected":
        return "bg-red-500/20 text-red-400";
      default:
        return "bg-yellow-500/20 text-yellow-400";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "accepted":
        return "принято";
      case "rejected":
        return "отклонено";
      default:
        return "ожидание";
    }
  };

  if (userRole !== "coach") {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
        <div className="text-center">
          <User className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-xl text-white mb-2">Доступ ограничен</h2>
          <p className="text-muted-foreground mb-6">
            Только тренеры могут просматривать и управлять заявками.
          </p>
          <Button onClick={() => onNavigate("home")} className="bg-primary hover:bg-primary/90">
            Вернуться на главную
          </Button>
        </div>
      </div>
    );
  }

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
          <h1 className="text-3xl text-white">Заявки учеников</h1>
        </div>
      </div>

      {/* Requests List */}
      <div className="flex-1 px-6 pb-6">
        <div className="space-y-4">
          {requests.map((request) => (
            <Card key={request.id} className="p-6 bg-card border-border">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-primary/20 text-primary">
                      {request.parentName.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg text-white">{request.parentName}</h3>
                    <p className="text-muted-foreground text-sm">{request.date}</p>
                  </div>
                </div>
                <Badge className={getStatusColor(request.status)}>
                  {getStatusText(request.status)}
                </Badge>
              </div>

              <div className="mb-4">
                <h4 className="text-white mb-2">Информация о ребёнке</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Имя: </span>
                    <span className="text-white">{request.childName}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Возраст: </span>
                    <span className="text-white">{request.childAge} лет</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Вес: </span>
                    <span className="text-white">{request.childWeight} кг</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Опыт: </span>
                    <span className="text-white">{request.experience}</span>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="text-white mb-2">Сообщение</h4>
                <p className="text-muted-foreground text-sm">{request.message}</p>
              </div>

              {request.status === "pending" && (
                <div className="flex space-x-3">
                  <Button
                    onClick={() => handleRequest(request.id, "accept")}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                  >
                    <Check className="w-4 h-4 mr-2" />
                    Принять
                  </Button>
                  <Button
                    onClick={() => handleRequest(request.id, "reject")}
                    variant="outline"
                    className="flex-1 border-red-600 text-red-400 hover:bg-red-600/10"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Отклонить
                  </Button>
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}