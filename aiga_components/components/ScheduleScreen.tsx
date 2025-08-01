import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { BottomNavigation } from "./BottomNavigation";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Plus, 
  Filter, 
  ChevronLeft, 
  ChevronRight,
  User
} from "lucide-react";
import { UserRole, Screen } from "./AppNavigation";

interface ScheduleScreenProps {
  userRole: UserRole | "";
  onNavigate: (screen: Screen) => void;
}

export function ScheduleScreen({ userRole, onNavigate }: ScheduleScreenProps) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<"week" | "month">("week");
  const [filterType, setFilterType] = useState<"all" | "group" | "individual">("all");

  const sessions = [
    {
      id: 1,
      title: "Борьба на болевых",
      type: "group",
      time: "09:00",
      duration: "1ч 30м",
      location: "Фитнес-центр Академия",
      coach: "Аслан Кудайбергенов",
      participants: 12,
      maxParticipants: 15,
      status: "confirmed",
      level: "Средний"
    },
    {
      id: 2,
      title: "Бразильское Джиу-Джитсу",
      type: "group",
      time: "11:00",
      duration: "1ч",
      location: "Фитнес-центр Академия",
      coach: "Нурсултан Оспанов",
      participants: 8,
      maxParticipants: 10,
      status: "confirmed",
      level: "Начинающий"
    },
    {
      id: 3,
      title: "Персональная тренировка",
      type: "individual",
      time: "14:00",
      duration: "1ч",
      location: "Зал А",
      coach: "Аслан Кудайбергенов",
      participants: 1,
      maxParticipants: 1,
      status: "pending",
      level: "Продвинутый"
    }
  ];

  const getWeekDays = () => {
    const days = [];
    const startOfWeek = new Date(selectedDate);
    startOfWeek.setDate(selectedDate.getDate() - selectedDate.getDay());
    
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const filteredSessions = sessions.filter(session => {
    if (filterType === "all") return true;
    return session.type === filterType;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-500/20 text-green-400";
      case "pending":
        return "bg-yellow-500/20 text-yellow-400";
      case "cancelled":
        return "bg-red-500/20 text-red-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "confirmed":
        return "подтверждено";
      case "pending":
        return "ожидание";
      case "cancelled":
        return "отменено";
      default:
        return "неизвестно";
    }
  };

  const weekdays = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="px-6 pt-12 pb-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl text-white">Расписание</h1>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="border-border text-muted-foreground hover:text-white"
              onClick={() => setViewMode(viewMode === "week" ? "month" : "week")}
            >
              {viewMode === "week" ? "Месяц" : "Неделя"}
            </Button>
            {userRole === "coach" && (
              <Button
                size="sm"
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <Plus className="w-4 h-4 mr-2" />
                Добавить
              </Button>
            )}
          </div>
        </div>

        {/* Date Navigation */}
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-white"
            onClick={() => {
              const newDate = new Date(selectedDate);
              newDate.setDate(selectedDate.getDate() - 7);
              setSelectedDate(newDate);
            }}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <h2 className="text-lg text-white">
            {selectedDate.toLocaleDateString("ru-RU", { 
              month: "long", 
              year: "numeric" 
            })}
          </h2>
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-white"
            onClick={() => {
              const newDate = new Date(selectedDate);
              newDate.setDate(selectedDate.getDate() + 7);
              setSelectedDate(newDate);
            }}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Week View */}
        <div className="grid grid-cols-7 gap-1 mb-6">
          {getWeekDays().map((day, index) => (
            <div
              key={index}
              className={`p-2 text-center rounded-lg cursor-pointer transition-colors ${
                day.toDateString() === selectedDate.toDateString()
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-card"
              }`}
              onClick={() => setSelectedDate(day)}
            >
              <div className="text-xs mb-1">
                {weekdays[day.getDay()]}
              </div>
              <div className="text-sm">
                {day.getDate()}
              </div>
            </div>
          ))}
        </div>

        {/* Filter */}
        {userRole === "coach" && (
          <div className="flex space-x-2 mb-6">
            {[
              { id: "all", label: "Все тренировки" },
              { id: "group", label: "Групповые" },
              { id: "individual", label: "Индивидуальные" }
            ].map((filter) => (
              <Button
                key={filter.id}
                variant={filterType === filter.id ? "default" : "outline"}
                size="sm"
                className={`${
                  filterType === filter.id
                    ? "bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground hover:text-white"
                }`}
                onClick={() => setFilterType(filter.id as any)}
              >
                {filter.label}
              </Button>
            ))}
          </div>
        )}
      </div>

      {/* Sessions List */}
      <div className="flex-1 px-6 pb-24">
        <div className="space-y-4">
          {filteredSessions.map((session) => (
            <Card key={session.id} className="p-4 bg-card border-border">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h3 className="text-lg text-white mb-1">{session.title}</h3>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {session.time}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {session.duration}
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground mb-2">
                    <MapPin className="w-4 h-4 mr-1" />
                    {session.location}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <User className="w-4 h-4 mr-1" />
                    {session.coach}
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <Badge className={getStatusColor(session.status)}>
                    {getStatusText(session.status)}
                  </Badge>
                  <Badge variant="outline" className="text-muted-foreground">
                    {session.level}
                  </Badge>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Users className="w-4 h-4 mr-1" />
                  {session.participants}/{session.maxParticipants} участников
                </div>
                <div className="flex space-x-2">
                  {userRole === "coach" && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-border text-muted-foreground hover:text-white"
                    >
                      Изменить
                    </Button>
                  )}
                  <Button
                    size="sm"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    {session.type === "individual" ? "Просмотр" : "Присоединиться"}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <BottomNavigation currentScreen="schedule" onNavigate={onNavigate} />
    </div>
  );
}