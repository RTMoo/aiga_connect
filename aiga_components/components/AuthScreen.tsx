import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { ArrowLeft, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { UserRole } from "./AppNavigation";

interface AuthScreenProps {
  mode: "login" | "register";
  onBack: () => void;
  onLogin: (role: UserRole) => void;
}

export function AuthScreen({ mode, onBack, onLogin }: AuthScreenProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>("athlete");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would authenticate with the backend
    onLogin(selectedRole);
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
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-2xl text-white">
          {mode === "login" ? "Вход" : "Создать аккаунт"}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 space-y-6">
        {/* Role Selection */}
        <div>
          <Label className="text-white mb-3 block">Я...</Label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: "parent", label: "Родитель" },
              { id: "athlete", label: "Спортсмен" },
              { id: "coach", label: "Тренер" }
            ].map((role) => (
              <Button
                key={role.id}
                type="button"
                variant={selectedRole === role.id ? "default" : "outline"}
                className={`h-12 ${
                  selectedRole === role.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-transparent border-border text-muted-foreground hover:text-white"
                }`}
                onClick={() => setSelectedRole(role.id as UserRole)}
              >
                {role.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Email Input */}
        <div>
          <Label htmlFor="email" className="text-white mb-2 block">
            Email адрес
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10 h-12 bg-card border-border text-white placeholder:text-muted-foreground"
              required
            />
          </div>
        </div>

        {/* Password Input */}
        <div>
          <Label htmlFor="password" className="text-white mb-2 block">
            Пароль
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Введите ваш пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-10 pr-10 h-12 bg-card border-border text-white placeholder:text-muted-foreground"
              required
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-white"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full h-14 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl mt-8"
        >
          {mode === "login" ? "Войти" : "Создать аккаунт"}
        </Button>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-background px-2 text-muted-foreground">или продолжить с</span>
          </div>
        </div>

        {/* Google Login */}
        <Button
          type="button"
          variant="outline"
          className="w-full h-14 border-border hover:bg-card text-white"
        >
          <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Google
        </Button>
      </form>

      {/* Guest Access for Athletes */}
      {mode === "login" && (
        <div className="mt-6 text-center">
          <Button
            variant="ghost"
            className="text-muted-foreground hover:text-primary"
            onClick={() => onLogin("athlete")}
          >
            Продолжить как гость (только просмотр)
          </Button>
        </div>
      )}
    </div>
  );
}