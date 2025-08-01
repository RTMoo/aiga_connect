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
import { Badge } from "./ui/badge";
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
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { LoadingSpinner } from "./ui/loading-spinner";
import { UserRole } from "./AppNavigation";
import { useAuth } from "../hooks/useAuth";

interface AuthScreenProps {
  mode: "login" | "register";
  onBack: () => void;
  onLogin: (role: UserRole) => void;
  onSwitchMode?: (mode: "login" | "register") => void;
}

export function AuthScreen({
  mode,
  onBack,
  onLogin,
  onSwitchMode,
}: AuthScreenProps) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>("athlete");
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmCode, setShowConfirmCode] = useState(false);
  const [confirmCode, setConfirmCode] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { login, register, confirmCode: confirmCodeApi, error } = useAuth();

  const roles = [
    {
      id: "athlete" as UserRole,
      label: "Спортсмен",
      icon: Trophy,
      description: "Занимаюсь спортом",
      color: "bg-blue-500/20 border-blue-500/50 text-blue-400",
    },
    {
      id: "coach" as UserRole,
      label: "Тренер",
      icon: Shield,
      description: "Тренирую других",
      color: "bg-green-500/20 border-green-500/50 text-green-400",
    },
    {
      id: "parent" as UserRole,
      label: "Родитель",
      icon: Users,
      description: "Управляю детьми",
      color: "bg-purple-500/20 border-purple-500/50 text-purple-400",
    },
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!email) {
      newErrors.email = "Email обязателен";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Введите корректный email";
    }

    if (mode === "register") {
      if (!username) {
        newErrors.username = "Имя пользователя обязательно";
      } else if (username.length < 3) {
        newErrors.username =
          "Имя пользователя должно содержать минимум 3 символа";
      }

      if (!password) {
        newErrors.password = "Пароль обязателен";
      } else if (password.length < 6) {
        newErrors.password = "Пароль должен содержать минимум 6 символов";
      }

      if (password !== confirmPassword) {
        newErrors.confirmPassword = "Пароли не совпадают";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      if (mode === "login") {
        const result = await login(email, password);
        if (result.success) {
          onLogin("athlete"); // Роль будет получена из API
        } else {
          // Показываем ошибку от API
          setErrors({ general: result.error || "Ошибка входа" });
        }
      } else {
        if (showConfirmCode) {
          const result = await confirmCodeApi(email, confirmCode);
          if (result.success) {
            onLogin(selectedRole);
          } else {
            setErrors({
              confirmCode: result.error || "Ошибка подтверждения кода",
            });
          }
        } else {
          const result = await register(
            email,
            username,
            password,
            getApiRole(selectedRole)
          );
          if (result.success) {
            setShowConfirmCode(true);
          } else {
            setErrors({ general: result.error || "Ошибка регистрации" });
          }
        }
      }
    } catch (error) {
      console.error("Auth error:", error);
      setErrors({ general: "Ошибка сети" });
    } finally {
      setIsLoading(false);
    }
  };

  const getApiRole = (role: UserRole) => {
    switch (role) {
      case "parent":
        return "parent";
      case "athlete":
        return "athlete";
      case "coach":
        return "trainer";
      default:
        return "athlete";
    }
  };

  const getRoleLabel = (role: UserRole) => {
    switch (role) {
      case "parent":
        return "Родитель";
      case "athlete":
        return "Спортсмен";
      case "coach":
        return "Тренер";
      default:
        return "Спортсмен";
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col px-6 py-8">
      {/* Header */}
      <div className="flex items-center mb-8">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="mr-4 text-muted-foreground hover:text-white"
          disabled={isLoading}
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-2xl text-white font-bold">
          {mode === "login"
            ? "Вход в аккаунт"
            : showConfirmCode
            ? "Подтверждение email"
            : "Создание аккаунта"}
        </h1>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center">
        <Card className="w-full max-w-md bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-2xl font-bold text-white">
              {mode === "login"
                ? "Добро пожаловать"
                : showConfirmCode
                ? "Подтвердите email"
                : "Присоединяйтесь к AIGA Connect"}
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              {mode === "login"
                ? "Войдите в свой аккаунт"
                : showConfirmCode
                ? "Введите код, отправленный на ваш email"
                : "Создайте аккаунт и начните свой путь"}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Error Display */}
            {(error || errors.general) && (
              <div className="p-3 bg-destructive/20 border border-destructive/50 rounded-lg flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 text-destructive" />
                <p className="text-destructive text-sm">
                  {error || errors.general}
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Role Selection (only for register) */}
              {mode === "register" && !showConfirmCode && (
                <div className="space-y-3">
                  <Label className="text-white">Выберите вашу роль:</Label>
                  <div className="grid grid-cols-1 gap-3">
                    {roles.map((role) => {
                      const IconComponent = role.icon;
                      const isSelected = selectedRole === role.id;
                      return (
                        <Button
                          key={role.id}
                          type="button"
                          variant="outline"
                          onClick={() => setSelectedRole(role.id)}
                          className={`h-auto p-4 justify-start ${
                            isSelected
                              ? "bg-primary/20 border-primary text-primary"
                              : "bg-background/50 border-border/50 text-white hover:bg-background/70"
                          }`}
                          disabled={isLoading}
                        >
                          <div className="flex items-center space-x-3">
                            <IconComponent className="w-5 h-5" />
                            <div className="text-left">
                              <div className="font-medium">{role.label}</div>
                              <div className="text-xs text-muted-foreground">
                                {role.description}
                              </div>
                            </div>
                            {isSelected && (
                              <CheckCircle className="w-4 h-4 ml-auto" />
                            )}
                          </div>
                        </Button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Username Input (only for register) */}
              {mode === "register" && !showConfirmCode && (
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-white">
                    Имя пользователя
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="username"
                      type="text"
                      placeholder="Введите имя пользователя"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className={`pl-10 bg-background/50 border-border/50 text-black !text-black placeholder:text-muted-foreground ${
                        errors.username ? "border-destructive" : ""
                      }`}
                      disabled={isLoading}
                    />
                  </div>
                  {errors.username && (
                    <p className="text-destructive text-xs">
                      {errors.username}
                    </p>
                  )}
                </div>
              )}

              {/* Email Input */}
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
                    className={`pl-10 bg-background/50 border-border/50 text-black !text-black placeholder:text-muted-foreground ${
                      errors.email ? "border-destructive" : ""
                    }`}
                    disabled={isLoading}
                  />
                </div>
                {errors.email && (
                  <p className="text-destructive text-xs">{errors.email}</p>
                )}
              </div>

              {/* Password Input */}
              {!showConfirmCode && (
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
                      className={`pl-10 pr-10 bg-background/50 border-border/50 text-black !text-black placeholder:text-muted-foreground ${
                        errors.password ? "border-destructive" : ""
                      }`}
                      disabled={isLoading}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4 text-muted-foreground" />
                      ) : (
                        <Eye className="w-4 h-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                  {errors.password && (
                    <p className="text-destructive text-xs">
                      {errors.password}
                    </p>
                  )}
                </div>
              )}

              {/* Confirm Password Input (only for register) */}
              {mode === "register" && !showConfirmCode && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-white">
                    Подтвердите пароль
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Повторите пароль"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className={`pl-10 pr-10 bg-background/50 border-border/50 text-black !text-black placeholder:text-muted-foreground ${
                        errors.confirmPassword ? "border-destructive" : ""
                      }`}
                      disabled={isLoading}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-4 h-4 text-muted-foreground" />
                      ) : (
                        <Eye className="w-4 h-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-destructive text-xs">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
              )}

              {/* Confirm Code Input */}
              {showConfirmCode && (
                <div className="space-y-2">
                  <Label htmlFor="confirmCode" className="text-white">
                    Код подтверждения
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmCode"
                      type="text"
                      placeholder="Введите код из email"
                      value={confirmCode}
                      onChange={(e) => setConfirmCode(e.target.value)}
                      className="bg-background/50 border-border/50 text-black !text-black placeholder:text-muted-foreground text-center text-lg tracking-widest"
                      maxLength={6}
                      disabled={isLoading}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground text-center">
                    Код отправлен на {email}
                  </p>
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <LoadingSpinner size={16} className="mr-2" />
                    {mode === "login"
                      ? "Вход..."
                      : showConfirmCode
                      ? "Подтверждение..."
                      : "Создание..."}
                  </>
                ) : mode === "login" ? (
                  "Войти"
                ) : showConfirmCode ? (
                  "Подтвердить"
                ) : (
                  "Создать аккаунт"
                )}
              </Button>
            </form>

            {/* Mode Switch */}
            {!showConfirmCode && (
              <>
                <Separator className="bg-border/50" />
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    {mode === "login" ? "Нет аккаунта?" : "Уже есть аккаунт?"}{" "}
                    <Button
                      variant="link"
                      onClick={() => {
                        setShowConfirmCode(false);
                        setErrors({});
                        setEmail("");
                        setPassword("");
                        setConfirmPassword("");
                        setUsername("");
                        if (onSwitchMode) {
                          onSwitchMode(mode === "login" ? "register" : "login");
                        }
                      }}
                      className="p-0 h-auto text-primary hover:text-primary/80"
                    >
                      {mode === "login" ? "Создать аккаунт" : "Войти"}
                    </Button>
                  </p>
                </div>
              </>
            )}
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
