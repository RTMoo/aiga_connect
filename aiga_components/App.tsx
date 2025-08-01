import { useState } from "react";
import { AppNavigation, UserRole, Screen } from "./components/AppNavigation";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("login");
  const [userRole, setUserRole] = useState<UserRole | "">("");

  const handleLogin = (role: UserRole) => {
    setUserRole(role);
    setCurrentScreen("home");
  };

  const handleNavigate = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const handleLogout = () => {
    setUserRole("");
    setCurrentScreen("login");
  };

  return (
    <div className="min-h-screen dark">
      <AppNavigation
        currentScreen={currentScreen}
        userRole={userRole}
        onNavigate={handleNavigate}
        onLogin={handleLogin}
        onLogout={handleLogout}
      />
    </div>
  );
}