import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { BottomNavigation } from "./BottomNavigation";
import {
  Clock,
  MapPin,
  ChevronRight,
  Calendar,
  TrendingUp,
  ShoppingBag,
  MessageCircle,
  Bell,
  Users,
  Trophy,
  Target,
} from "lucide-react";
import { UserRole, Screen } from "./AppNavigation";

interface HomeScreenProps {
  userRole: UserRole | "";
  user?: {
    id: number;
    email: string;
    username: string;
    role: string;
    email_verified: boolean;
  } | null;
  onNavigate: (screen: Screen) => void;
}

export function HomeScreen({ userRole, user, onNavigate }: HomeScreenProps) {
  const getPopularActions = () => {
    const baseActions = [
      {
        id: "schedule",
        title: "Моё расписание",
        icon: Calendar,
        color: "bg-blue-500/10 text-blue-400",
      },
      {
        id: "progress",
        title: "Мой прогресс",
        icon: TrendingUp,
        color: "bg-green-500/10 text-green-400",
      },
      {
        id: "messaging",
        title: "Сообщество",
        icon: MessageCircle,
        color: "bg-pink-500/10 text-pink-400",
      },
      {
        id: "shop",
        title: "Магазин AIGA",
        icon: ShoppingBag,
        color: "bg-purple-500/10 text-purple-400",
      },
    ];

    const roleSpecificActions = {
      coach: [
        {
          id: "requests",
          title: "Заявки учеников",
          icon: Users,
          color: "bg-orange-500/10 text-orange-400",
        },
      ],
      parent: [
        {
          id: "messaging",
          title: "Сообщения",
          icon: MessageCircle,
          color: "bg-pink-500/10 text-pink-400",
        },
      ],
      athlete: [
        {
          id: "messaging",
          title: "Сообщество",
          icon: MessageCircle,
          color: "bg-pink-500/10 text-pink-400",
        },
      ],
    };

    return [
      ...baseActions,
      ...(roleSpecificActions[userRole as keyof typeof roleSpecificActions] ||
        []),
    ];
  };

  const getRoleGreeting = () => {
    const username = user?.username || "Пользователь";

    // Отладочная информация
    console.log("HomeScreen - user:", user);
    console.log("HomeScreen - username:", username);
    console.log("HomeScreen - userRole:", userRole);

    switch (userRole) {
      case "parent":
        return `Добро пожаловать, ${username}`;
      case "coach":
        return `Добро пожаловать, тренер ${username}`;
      case "athlete":
        return `Добро пожаловать, ${username}`;
      default:
        return `Добро пожаловать, ${username}`;
    }
  };

  const getUpcomingSession = () => {
    switch (userRole) {
      case "coach":
        return {
          title: "Основы BJJ",
          time: "Четверг, 18 апр · 10:00",
          location: "Фитнес-центр Академия",
          participants: "8/10 учеников",
          status: "подтверждено",
        };
      case "parent":
        return {
          title: "Борьба на болевых",
          time: "Четверг, 18 апр · 17:00",
          location: "Фитнес-центр Академия",
          participants: "Тренировка Амира",
          status: "подтверждено",
        };
      default:
        return {
          title: "Борьба на болевых",
          time: "Четверг, 18 апр · 17:00",
          location: "Фитнес-центр Академия",
          participants: "12/15 участников",
          status: "подтверждено",
        };
    }
  };

  const session = getUpcomingSession();
  const popularActions = getPopularActions();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="px-6 pt-12 pb-6">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl text-white">{getRoleGreeting()}</h1>
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-white"
            onClick={() => onNavigate("notifications")}
          >
            <Bell className="w-6 h-6" />
          </Button>
        </div>
        <p className="text-muted-foreground">
          {userRole === "coach"
            ? "Управляйте вашей академией"
            : "Готовы к сегодняшней тренировке?"}
        </p>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-6 pb-24">
        {/* Quick Stats for Coach */}
        {userRole === "coach" && (
          <div className="grid grid-cols-3 gap-4 mb-8">
            <Card className="p-4 bg-card border-border text-center">
              <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <Users className="w-4 h-4 text-blue-400" />
              </div>
              <div className="text-xl text-white">24</div>
              <div className="text-xs text-muted-foreground">Учеников</div>
            </Card>
            <Card className="p-4 bg-card border-border text-center">
              <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <Calendar className="w-4 h-4 text-green-400" />
              </div>
              <div className="text-xl text-white">8</div>
              <div className="text-xs text-muted-foreground">Сегодня</div>
            </Card>
            <Card className="p-4 bg-card border-border text-center">
              <div className="w-8 h-8 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <Trophy className="w-4 h-4 text-yellow-400" />
              </div>
              <div className="text-xl text-white">4.9</div>
              <div className="text-xs text-muted-foreground">Рейтинг</div>
            </Card>
          </div>
        )}

        {/* Progress Overview for Athlete */}
        {userRole === "athlete" && (
          <Card className="p-6 bg-card border-border mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg text-white mb-1">Текущий прогресс</h3>
                <p className="text-muted-foreground">
                  Синий пояс • 65% до фиолетового
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                <Trophy className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="text-center">
                <div className="text-primary text-lg">87</div>
                <div className="text-muted-foreground">Тренировок</div>
              </div>
              <div className="text-center">
                <div className="text-primary text-lg">94%</div>
                <div className="text-muted-foreground">Посещаемость</div>
              </div>
            </div>
          </Card>
        )}

        {/* Child Progress for Parent */}
        {userRole === "parent" && (
          <Card className="p-6 bg-card border-border mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg text-white mb-1">Прогресс Амира</h3>
                <p className="text-muted-foreground">
                  Синий пояс • Отличные результаты
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="text-center">
                <div className="text-primary text-lg">87</div>
                <div className="text-muted-foreground">Тренировок</div>
              </div>
              <div className="text-center">
                <div className="text-primary text-lg">A-</div>
                <div className="text-muted-foreground">Оценка</div>
              </div>
            </div>
          </Card>
        )}

        {/* Upcoming Session */}
        <div className="mb-8">
          <h2 className="text-xl text-white mb-4">
            {userRole === "coach"
              ? "Следующая тренировка"
              : "Ближайшая тренировка"}
          </h2>
          <Card className="p-6 bg-card border-border">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="text-xl text-white">{session.title}</h3>
                  <Badge className="bg-green-500/20 text-green-400">
                    {session.status}
                  </Badge>
                </div>
                <div className="flex items-center text-muted-foreground mb-2">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>{session.time}</span>
                </div>
                <div className="flex items-center text-muted-foreground mb-2">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{session.location}</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Users className="w-4 h-4 mr-2" />
                  <span>{session.participants}</span>
                </div>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center">
                <Calendar className="w-8 h-8 text-primary-foreground" />
              </div>
            </div>
            <Button
              className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl"
              onClick={() => onNavigate("schedule")}
            >
              {userRole === "coach"
                ? "Управлять тренировкой"
                : "Посмотреть детали"}
            </Button>
          </Card>
        </div>

        {/* Popular Actions */}
        <div>
          <h2 className="text-xl text-white mb-4">Быстрые действия</h2>
          <div className="grid grid-cols-2 gap-3">
            {popularActions.map((action) => {
              const IconComponent = action.icon;
              return (
                <Card
                  key={action.id}
                  className="p-4 bg-card border-border hover:border-primary/50 transition-all duration-200 cursor-pointer group"
                  onClick={() => onNavigate(action.id as Screen)}
                >
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${action.color}`}
                    >
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-white text-sm group-hover:text-primary transition-colors">
                      {action.title}
                    </span>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      <BottomNavigation currentScreen="home" onNavigate={onNavigate} />
    </div>
  );
}
