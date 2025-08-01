import { useState } from "react";
import { AppNavigation, Screen, UserRole } from "./components/AppNavigation";
import { useAuth } from "./hooks/useAuth";
import { useToast } from "./hooks/useToast";
import { Toast } from "./components/ui/toast";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("login");
  const [userRole, setUserRole] = useState<UserRole | "">("");

  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const { toasts, removeToast } = useToast();

  // Отладочная информация
  console.log("App - user:", user);
  console.log("App - isAuthenticated:", isAuthenticated);
  console.log("App - isLoading:", isLoading);
  console.log("App - currentScreen:", currentScreen);

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
    console.log("App - rendering authenticated app with user:", user);

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

    const frontendRole = mapApiRoleToFrontendRole(user.role);
    console.log("App - mapped role:", user.role, "->", frontendRole);

    // Если userRole не установлен, устанавливаем роль из API
    if (!userRole) {
      setUserRole(frontendRole);
    }

    const finalUserRole = userRole || frontendRole;
    console.log("App - final userRole:", finalUserRole);

    return (
      <div className="min-h-screen dark">
        <AppNavigation
          currentScreen={currentScreen}
          userRole={finalUserRole}
          user={user}
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

  // Если не аутентифицирован, показываем экран входа
  console.log("App - rendering login screen");
  return (
    <div className="min-h-screen dark">
      <AppNavigation
        currentScreen={currentScreen}
        userRole=""
        user={null}
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
