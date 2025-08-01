import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { BottomNavigation } from "./BottomNavigation";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Trophy,
  Users,
  Settings,
  LogOut,
  Edit,
  Star,
  Award,
} from "lucide-react";
import { UserRole, Screen } from "./AppNavigation";
import { useProfile } from "../hooks/useProfile";
import { useEffect } from "react";

interface ProfileScreenProps {
  userRole: UserRole | "";
  user?: {
    id: number;
    email: string;
    username: string;
    role: string;
    email_verified: boolean;
  } | null;
  onNavigate: (screen: Screen) => void;
  onLogout: () => void;
}

export function ProfileScreen({
  userRole,
  user,
  onNavigate,
  onLogout,
}: ProfileScreenProps) {
  const { profile, isLoading, error, fetchProfile } = useProfile();

  // Загружаем профиль при монтировании компонента
  useEffect(() => {
    if (user?.username && user?.role) {
      fetchProfile(user.role, user.username);
    }
  }, [user?.username, user?.role, fetchProfile]);

  const renderCoachProfile = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center py-12">
          <div className="text-white">Загрузка профиля...</div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex items-center justify-center py-12">
          <div className="text-red-400">Ошибка загрузки профиля: {error}</div>
        </div>
      );
    }

    const trainerProfile = profile as any;
    const fullName = profile
      ? `${profile.first_name} ${profile.last_name}`
      : user?.username || "Аслан Кудайбергенов";
    const initials = profile
      ? `${profile.first_name?.[0] || ""}${profile.last_name?.[0] || ""}`
      : "АК";

    return (
      <div className="space-y-6">
        {/* Profile Header */}
        <Card className="p-6 bg-card border-border">
          <div className="flex items-center space-x-4 mb-4">
            <Avatar className="w-20 h-20">
              <AvatarImage src="/placeholder-coach.jpg" />
              <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-2xl text-white mb-1">{fullName}</h2>
              <p className="text-muted-foreground mb-2">Главный тренер</p>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Trophy className="w-4 h-4 mr-1" />8 лет опыта
                </div>
                <div className="flex items-center">
                  <Award className="w-4 h-4 mr-1" />
                  Чёрный пояс
                </div>
              </div>
            </div>
          </div>
          <Button
            variant="outline"
            className="w-full border-border text-muted-foreground hover:text-white"
          >
            <Edit className="w-4 h-4 mr-2" />
            Редактировать профиль
          </Button>
        </Card>

        {/* Students */}
        <Card className="p-6 bg-card border-border">
          <h3 className="text-lg text-white mb-4">Мои ученики</h3>
          <div className="space-y-3">
            {[
              {
                name: "Амир Назарбаев",
                age: 16,
                belt: "Синий пояс",
                grade: "A",
              },
              {
                name: "Данияр Султанов",
                age: 14,
                belt: "Белый пояс",
                grade: "B+",
              },
              {
                name: "Айдар Каимов",
                age: 15,
                belt: "Синий пояс",
                grade: "A-",
              },
            ].map((student, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-secondary rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-primary/20 text-primary text-sm">
                      {student.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-white text-sm">{student.name}</p>
                    <p className="text-muted-foreground text-xs">
                      {student.age} лет • {student.belt}
                    </p>
                  </div>
                </div>
                <Badge variant="outline" className="text-muted-foreground">
                  {student.grade}
                </Badge>
              </div>
            ))}
          </div>
        </Card>

        {/* Stats */}
        <Card className="p-6 bg-card border-border">
          <h3 className="text-lg text-white mb-4">Статистика</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl text-primary mb-1">24</div>
              <div className="text-sm text-muted-foreground">
                Активных учеников
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl text-primary mb-1">156</div>
              <div className="text-sm text-muted-foreground">
                Тренировок в месяц
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl text-primary mb-1">4.9</div>
              <div className="text-sm text-muted-foreground">Рейтинг</div>
            </div>
            <div className="text-center">
              <div className="text-2xl text-primary mb-1">3</div>
              <div className="text-sm text-muted-foreground">
                Чемпионств выиграно
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  };

  const renderParentProfile = () => (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card className="p-6 bg-card border-border">
        <div className="flex items-center space-x-4 mb-4">
          <Avatar className="w-20 h-20">
            <AvatarImage src="/placeholder-parent.jpg" />
            <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
              ЕН
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h2 className="text-2xl text-white mb-1">Елена Назарбаева</h2>
            <p className="text-muted-foreground mb-2">Родитель</p>
            <div className="flex items-center text-sm text-muted-foreground">
              <Mail className="w-4 h-4 mr-1" />
              elena.nazarbayeva@example.com
            </div>
          </div>
        </div>
        <Button
          variant="outline"
          className="w-full border-border text-muted-foreground hover:text-white"
        >
          <Edit className="w-4 h-4 mr-2" />
          Редактировать профиль
        </Button>
      </Card>

      {/* Child Profile */}
      <Card className="p-6 bg-card border-border">
        <h3 className="text-lg text-white mb-4">Информация о ребёнке</h3>
        <div className="flex items-center space-x-4 mb-4">
          <Avatar className="w-16 h-16">
            <AvatarImage src="/placeholder-child.jpg" />
            <AvatarFallback className="bg-primary/20 text-primary text-lg">
              АН
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h4 className="text-lg text-white mb-1">Амир Назарбаев</h4>
            <p className="text-muted-foreground mb-2">16 лет • 68 кг</p>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Trophy className="w-4 h-4 mr-1" />
                Синий пояс
              </div>
              <div className="flex items-center">
                <User className="w-4 h-4 mr-1" />
                Тренер: Аслан К.
              </div>
            </div>
          </div>
        </div>
        <Button
          variant="outline"
          className="w-full border-border text-muted-foreground hover:text-white"
        >
          Сменить тренера
        </Button>
      </Card>

      {/* Recent Activity */}
      <Card className="p-6 bg-card border-border">
        <h3 className="text-lg text-white mb-4">Последняя активность</h3>
        <div className="space-y-3">
          {[
            {
              action: "Завершил тренировку",
              time: "2 часа назад",
              type: "success",
            },
            {
              action: "Пропустил тренировку",
              time: "1 день назад",
              type: "warning",
            },
            {
              action: "Обновление прогресса от тренера",
              time: "3 дня назад",
              type: "info",
            },
          ].map((activity, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div
                className={`w-2 h-2 rounded-full ${
                  activity.type === "success"
                    ? "bg-green-500"
                    : activity.type === "warning"
                    ? "bg-yellow-500"
                    : "bg-blue-500"
                }`}
              />
              <div className="flex-1">
                <p className="text-white text-sm">{activity.action}</p>
                <p className="text-muted-foreground text-xs">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );

  const renderAthleteProfile = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center py-12">
          <div className="text-white">Загрузка профиля...</div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex items-center justify-center py-12">
          <div className="text-red-400">Ошибка загрузки профиля: {error}</div>
        </div>
      );
    }

    const athleteProfile = profile as any;
    const fullName = profile
      ? `${profile.first_name} ${profile.last_name}`
      : user?.username || "Амир Назарбаев";
    const initials = profile
      ? `${profile.first_name?.[0] || ""}${profile.last_name?.[0] || ""}`
      : "АН";

    return (
      <div className="space-y-6">
        {/* Profile Header */}
        <Card className="p-6 bg-card border-border">
          <div className="flex items-center space-x-4 mb-4">
            <Avatar className="w-20 h-20">
              <AvatarImage src="/placeholder-athlete.jpg" />
              <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-2xl text-white mb-1">{fullName}</h2>
              <p className="text-muted-foreground mb-2">Спортсмен</p>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Trophy className="w-4 h-4 mr-1" />
                  {athleteProfile?.belt_grade || "Синий пояс"}
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  Участник с{" "}
                  {profile?.created_at
                    ? new Date(profile.created_at).getFullYear()
                    : "2022"}
                </div>
              </div>
            </div>
          </div>
          <Button
            onClick={() => onNavigate("progress")}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Посмотреть мой прогресс
          </Button>
        </Card>

        {/* Stats */}
        <Card className="p-6 bg-card border-border">
          <h3 className="text-lg text-white mb-4">Моя статистика</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl text-primary mb-1">87</div>
              <div className="text-sm text-muted-foreground">
                Всего тренировок
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl text-primary mb-1">94%</div>
              <div className="text-sm text-muted-foreground">Посещаемость</div>
            </div>
            <div className="text-center">
              <div className="text-2xl text-primary mb-1">2</div>
              <div className="text-sm text-muted-foreground">Турниры</div>
            </div>
            <div className="text-center">
              <div className="text-2xl text-primary mb-1">1</div>
              <div className="text-sm text-muted-foreground">
                Золотая медаль
              </div>
            </div>
          </div>
        </Card>

        {/* Achievements */}
        <Card className="p-6 bg-card border-border">
          <h3 className="text-lg text-white mb-4">Последние достижения</h3>
          <div className="space-y-3">
            {[
              {
                title: "Получение синего пояса",
                date: "Март 2024",
                icon: Trophy,
              },
              {
                title: "Победитель турнира",
                date: "Февраль 2024",
                icon: Award,
              },
              {
                title: "Идеальная посещаемость",
                date: "Январь 2024",
                icon: Star,
              },
            ].map((achievement, index) => {
              const IconComponent = achievement.icon;
              return (
                <div
                  key={index}
                  className="flex items-center space-x-3 p-3 bg-secondary rounded-lg"
                >
                  <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                    <IconComponent className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-white text-sm">{achievement.title}</p>
                    <p className="text-muted-foreground text-xs">
                      {achievement.date}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="px-6 pt-12 pb-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl text-white">Профиль</h1>
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-white"
            >
              <Settings className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-red-400"
              onClick={onLogout}
            >
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 pb-24">
        {userRole === "coach" && renderCoachProfile()}
        {userRole === "parent" && renderParentProfile()}
        {userRole === "athlete" && renderAthleteProfile()}
      </div>

      <BottomNavigation currentScreen="profile" onNavigate={onNavigate} />
    </div>
  );
}
