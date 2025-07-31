import { Home, Calendar, TrendingUp, User } from "lucide-react";
import { Screen } from "./AppNavigation";

interface BottomNavigationProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

export function BottomNavigation({ currentScreen, onNavigate }: BottomNavigationProps) {
  const navItems = [
    { id: "home", label: "Главная", icon: Home },
    { id: "schedule", label: "Расписание", icon: Calendar },
    { id: "progress", label: "Прогресс", icon: TrendingUp },
    { id: "profile", label: "Профиль", icon: User }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = currentScreen === item.id;
          
          return (
            <button
              key={item.id}
              className={`flex flex-col items-center py-2 px-4 rounded-lg transition-colors ${
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-primary"
              }`}
              onClick={() => onNavigate(item.id as Screen)}
            >
              <IconComponent className="w-6 h-6 mb-1" />
              <span className="text-xs">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}