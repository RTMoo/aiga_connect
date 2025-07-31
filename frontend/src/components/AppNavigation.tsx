import { useState } from "react";
import { LoginScreen } from "./LoginScreen";
import { HomeScreen } from "./HomeScreen";
import { ScheduleScreen } from "./ScheduleScreen";
import { ProfileScreen } from "./ProfileScreen";
import { ProgressScreen } from "./ProgressScreen";
import { NotificationsScreen } from "./NotificationsScreen";
import { RequestsScreen } from "./RequestsScreen";
import { MessagingScreen } from "./MessagingScreen";
import { ShopScreen } from "./ShopScreen";
import { AuthScreen } from "./AuthScreen";

export type UserRole = "parent" | "coach" | "athlete";
export type Screen = "login" | "auth" | "home" | "schedule" | "profile" | "progress" | "notifications" | "requests" | "messaging" | "shop";

interface AppNavigationProps {
  currentScreen: Screen;
  userRole: UserRole | "";
  onNavigate: (screen: Screen) => void;
  onLogin: (role: UserRole) => void;
  onLogout: () => void;
}

export function AppNavigation({ 
  currentScreen, 
  userRole, 
  onNavigate, 
  onLogin, 
  onLogout 
}: AppNavigationProps) {
  const [authMode, setAuthMode] = useState<"login" | "register">("login");

  const renderScreen = () => {
    switch (currentScreen) {
      case "login":
        return <LoginScreen onLogin={onLogin} onShowAuth={() => onNavigate("auth")} />;
      case "auth":
        return <AuthScreen mode={authMode} onBack={() => onNavigate("login")} onLogin={onLogin} />;
      case "home":
        return <HomeScreen userRole={userRole} onNavigate={onNavigate} />;
      case "schedule":
        return <ScheduleScreen userRole={userRole} onNavigate={onNavigate} />;
      case "profile":
        return <ProfileScreen userRole={userRole} onNavigate={onNavigate} onLogout={onLogout} />;
      case "progress":
        return <ProgressScreen userRole={userRole} onNavigate={onNavigate} />;
      case "notifications":
        return <NotificationsScreen userRole={userRole} onNavigate={onNavigate} />;
      case "requests":
        return <RequestsScreen userRole={userRole} onNavigate={onNavigate} />;
      case "messaging":
        return <MessagingScreen userRole={userRole} onNavigate={onNavigate} />;
      case "shop":
        return <ShopScreen userRole={userRole} onNavigate={onNavigate} />;
      default:
        return <HomeScreen userRole={userRole} onNavigate={onNavigate} />;
    }
  };

  return <>{renderScreen()}</>;
}