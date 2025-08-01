import { useState } from "react";
import { AppNavigation, UserRole, Screen } from "./components/AppNavigation";
import { useAuth } from "./hooks/useAuth";
import { useToast } from "./hooks/useToast";
import { Toast } from "./components/ui/toast";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("login");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [userRole, setUserRole] = useState<UserRole | "">("");

  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const { toasts, removeToast } = useToast();

  const handleLogin = (role: UserRole) => {
    setUserRole(role);
    setCurrentScreen("home");
  };

  const handleNavigate = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const handleLogout = async () => {
    await logout();
    setUserRole("");
    setCurrentScreen("login");
  };

  // Если загружается аутентификация, показываем загрузку
  if (isLoading) {
    return (
      <div className="min-h-screen dark flex items-center justify-center">
        <div className="text-white">Загрузка...</div>
      </div>
    );
  }

  // Если пользователь аутентифицирован, показываем основное приложение
  if (isAuthenticated && user) {
    // Преобразуем роль из API в роль для фронтенда
    const mapApiRoleToFrontendRole = (apiRole: string): UserRole => {
      switch (apiRole) {
        case "trainer":
          return "coach";
        case "parent":
        case "athlete":
        case "coach":
          return apiRole as UserRole;
        default:
          return "athlete";
      }
    };

    return (
      <div className="min-h-screen dark">
        <AppNavigation
          currentScreen={currentScreen}
          userRole={mapApiRoleToFrontendRole(user.role)}
          onNavigate={handleNavigate}
          onLogin={handleLogin}
          onLogout={handleLogout}
        />
      </div>
    );
  }

  // Если не аутентифицирован, показываем экран входа
  return (
    <div className="min-h-screen dark">
      <AppNavigation
        currentScreen={currentScreen}
        userRole=""
        onNavigate={handleNavigate}
        onLogin={handleLogin}
        onLogout={handleLogout}
      />

      {/* Toast Notifications */}
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
}
