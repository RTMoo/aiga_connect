import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Separator } from "./ui/separator";
import {
  ArrowLeft,
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Shield,
  Users,
  Trophy,
  AlertCircle,
} from "lucide-react";
import { LoadingSpinner } from "./ui/loading-spinner";
import { UserRole } from "./AppNavigation";
import { useAuth } from "../hooks/useAuth";

interface LoginScreenProps {
  onLogin: (role: UserRole) => void;
  onShowAuth: () => void;
}

export function LoginScreen({ onLogin, onShowAuth }: LoginScreenProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const result = await login(email, password);
      if (result.success) {
        onLogin("athlete"); // Роль будет получена из API
      } else {
        setError(result.error || "Ошибка входа");
      }
    } catch (error) {
      setError("Ошибка сети");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = (role: UserRole) => {
    onLogin(role);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col px-6 py-8">
      {/* Header */}
      <div className="flex items-center mb-8">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Trophy className="w-5 h-5 text-primary-foreground" />
          </div>
          <h1 className="text-xl font-bold text-white">AIGA Connect</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center">
        <Card className="w-full max-w-md bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-2xl font-bold text-white">
              Добро пожаловать
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Войдите в свой аккаунт или создайте новый
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Error Display */}
            {error && (
              <div className="p-3 bg-destructive/20 border border-destructive/50 rounded-lg flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 text-destructive" />
                <p className="text-destructive text-sm">{error}</p>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Введите ваш email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-background/50 border-border/50 text-black !text-black placeholder:text-muted-foreground"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">
                  Пароль
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Введите пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 bg-background/50 border-border/50 text-black !text-black placeholder:text-muted-foreground"
                    required
                    disabled={isLoading}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4 text-muted-foreground" />
                    ) : (
                      <Eye className="w-4 h-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <LoadingSpinner size={16} className="mr-2" />
                    Вход...
                  </>
                ) : (
                  "Войти"
                )}
              </Button>
            </form>

            <Separator className="bg-border/50" />

            {/* Demo Login Buttons */}
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground text-center">
                Или войдите как демо пользователь:
              </p>

              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  onClick={() => handleDemoLogin("athlete")}
                  className="bg-background/50 border-border/50 text-white hover:bg-background/70"
                  disabled={isLoading}
                >
                  <Trophy className="w-4 h-4 mr-2" />
                  Спортсмен
                </Button>

                <Button
                  variant="outline"
                  onClick={() => handleDemoLogin("coach")}
                  className="bg-background/50 border-border/50 text-white hover:bg-background/70"
                  disabled={isLoading}
                >
                  <Shield className="w-4 h-4 mr-2" />
                  Тренер
                </Button>

                <Button
                  variant="outline"
                  onClick={() => handleDemoLogin("parent")}
                  className="bg-background/50 border-border/50 text-white hover:bg-background/70"
                  disabled={isLoading}
                >
                  <Users className="w-4 h-4 mr-2" />
                  Родитель
                </Button>

                <Button
                  variant="outline"
                  onClick={() => handleDemoLogin("athlete")}
                  className="bg-background/50 border-border/50 text-white hover:bg-background/70"
                  disabled={isLoading}
                >
                  <User className="w-4 h-4 mr-2" />
                  Ребенок
                </Button>
              </div>
            </div>

            <Separator className="bg-border/50" />

            {/* Register Link */}
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Нет аккаунта?{" "}
                <Button
                  variant="link"
                  onClick={onShowAuth}
                  className="p-0 h-auto text-primary hover:text-primary/80"
                  disabled={isLoading}
                >
                  Создать аккаунт
                </Button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <div className="text-center mt-8">
        <p className="text-xs text-muted-foreground">
          © 2024 AIGA Connect. Все права защищены.
        </p>
      </div>
    </div>
  );
}
