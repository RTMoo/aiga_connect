import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { BottomNavigation } from "./BottomNavigation";
import { 
  TrendingUp, 
  Trophy, 
  Calendar, 
  Target, 
  Award, 
  Star,
  BarChart3,
  Medal
} from "lucide-react";
import { UserRole, Screen } from "./AppNavigation";

interface ProgressScreenProps {
  userRole: UserRole | "";
  onNavigate: (screen: Screen) => void;
}

export function ProgressScreen({ userRole, onNavigate }: ProgressScreenProps) {
  const progressData = [
    { skill: "Броски", current: 85, target: 90, improvement: "+5%" },
    { skill: "Контроль в партере", current: 75, target: 85, improvement: "+10%" },
    { skill: "Болевые приёмы", current: 70, target: 80, improvement: "+8%" },
    { skill: "Уходы", current: 90, target: 95, improvement: "+3%" }
  ];

  const achievements = [
    { title: "Синий пояс", date: "Март 2024", type: "belt" },
    { title: "Золото турнира", date: "Февраль 2024", type: "medal" },
    { title: "Идеальная неделя", date: "Январь 2024", type: "attendance" },
    { title: "Мастер техники", date: "Декабрь 2023", type: "skill" }
  ];

  const getAchievementIcon = (type: string) => {
    switch (type) {
      case "belt":
        return Trophy;
      case "medal":
        return Medal;
      case "attendance":
        return Star;
      case "skill":
        return Target;
      default:
        return Award;
    }
  };

  const getAchievementColor = (type: string) => {
    switch (type) {
      case "belt":
        return "bg-blue-500/20 text-blue-400";
      case "medal":
        return "bg-yellow-500/20 text-yellow-400";
      case "attendance":
        return "bg-green-500/20 text-green-400";
      case "skill":
        return "bg-purple-500/20 text-purple-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="px-6 pt-12 pb-6">
        <h1 className="text-3xl text-white mb-2">Прогресс</h1>
        <p className="text-muted-foreground">Отслеживайте ваш путь в грэпплинге</p>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 pb-24 space-y-6">
        {/* Current Level */}
        <Card className="p-6 bg-card border-border">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl text-white mb-1">Текущий уровень</h2>
              <p className="text-muted-foreground">Синий пояс</p>
            </div>
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
              <Trophy className="w-8 h-8 text-white" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Прогресс до фиолетового пояса</span>
              <span className="text-white">65%</span>
            </div>
            <Progress value={65} className="h-2" />
          </div>
        </Card>

        {/* Skills Progress */}
        <Card className="p-6 bg-card border-border">
          <h3 className="text-lg text-white mb-4">Развитие навыков</h3>
          <div className="space-y-4">
            {progressData.map((skill, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-white text-sm">{skill.skill}</span>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-green-400 border-green-400">
                      {skill.improvement}
                    </Badge>
                    <span className="text-muted-foreground text-sm">
                      {skill.current}%
                    </span>
                  </div>
                </div>
                <Progress value={skill.current} className="h-2" />
              </div>
            ))}
          </div>
        </Card>

        {/* Statistics */}
        <Card className="p-6 bg-card border-border">
          <h3 className="text-lg text-white mb-4">Статистика тренировок</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <Calendar className="w-6 h-6 text-primary" />
              </div>
              <div className="text-2xl text-white mb-1">87</div>
              <div className="text-sm text-muted-foreground">Тренировок</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <TrendingUp className="w-6 h-6 text-green-400" />
              </div>
              <div className="text-2xl text-white mb-1">94%</div>
              <div className="text-sm text-muted-foreground">Посещаемость</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <Medal className="w-6 h-6 text-yellow-400" />
              </div>
              <div className="text-2xl text-white mb-1">2</div>
              <div className="text-sm text-muted-foreground">Турниры</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <Target className="w-6 h-6 text-purple-400" />
              </div>
              <div className="text-2xl text-white mb-1">156</div>
              <div className="text-sm text-muted-foreground">Техник</div>
            </div>
          </div>
        </Card>

        {/* Achievements */}
        <Card className="p-6 bg-card border-border">
          <h3 className="text-lg text-white mb-4">Последние достижения</h3>
          <div className="space-y-3">
            {achievements.map((achievement, index) => {
              const IconComponent = getAchievementIcon(achievement.type);
              return (
                <div key={index} className="flex items-center space-x-3 p-3 bg-secondary rounded-lg">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getAchievementColor(achievement.type)}`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white text-sm">{achievement.title}</p>
                    <p className="text-muted-foreground text-xs">{achievement.date}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Coach Comments */}
        {userRole !== "coach" && (
          <Card className="p-6 bg-card border-border">
            <h3 className="text-lg text-white mb-4">Комментарии тренера</h3>
            <div className="space-y-4">
              <div className="border-l-4 border-primary pl-4">
                <p className="text-white text-sm mb-2">
                  "Отличное улучшение техники бросков. Сосредоточьтесь на поддержании лучшей осанки во время контроля в партере."
                </p>
                <p className="text-muted-foreground text-xs">Тренер Аслан • 2 дня назад</p>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <p className="text-white text-sm mb-2">
                  "Отличная работа на спаррингах. Готов к изучению продвинутых техник."
                </p>
                <p className="text-muted-foreground text-xs">Тренер Аслан • 1 неделя назад</p>
              </div>
            </div>
          </Card>
        )}
      </div>

      <BottomNavigation currentScreen="progress" onNavigate={onNavigate} />
    </div>
  );
}