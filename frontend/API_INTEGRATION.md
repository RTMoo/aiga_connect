# Интеграция с API бэкенда

## Обзор

Фронтенд интегрирован с Django REST API бэкенда. Все API вызовы централизованы через API клиент и хуки.

## Структура API

### Аутентификация (`/api/accounts/`)

- `POST /api/accounts/register/` - Регистрация пользователя
- `POST /api/accounts/login/` - Вход в систему
- `POST /api/accounts/confirm_code/` - Подтверждение email
- `POST /api/accounts/logout/` - Выход из системы
- `POST /api/accounts/refresh/` - Обновление токена

### Профили (`/api/profiles/`)

- `GET /api/profiles/me/` - Получить свой профиль
- `GET /api/profiles/trainer/{username}/` - Профиль тренера
- `GET /api/profiles/athlete/{username}/` - Профиль спортсмена
- `GET /api/profiles/parent/{username}/` - Профиль родителя
- `GET /api/profiles/children/{username}/` - Профиль ребенка
- `PUT /api/profiles/trainer/edit-my-profile/` - Редактировать профиль тренера
- `PUT /api/profiles/athlete/edit-my-profile/` - Редактировать профиль спортсмена
- `PUT /api/profiles/parent/edit-my-profile/` - Редактировать профиль родителя
- `PUT /api/profiles/children/{username}/edit/` - Редактировать профиль ребенка

### Расписание (`/api/schedules/`)

- `POST /api/schedules/create/` - Создать групповую тренировку
- `PUT /api/schedules/{id}/edit/` - Редактировать групповую тренировку
- `POST /api/schedules/{id}/cancel/` - Отменить групповую тренировку
- `POST /api/schedules/{id}/finish/` - Завершить групповую тренировку
- `POST /api/schedules/individual/create/` - Создать индивидуальную тренировку
- `PUT /api/schedules/individual/{id}/edit/` - Редактировать индивидуальную тренировку
- `POST /api/schedules/individual/{id}/cancel/` - Отменить индивидуальную тренировку
- `POST /api/schedules/individual/{id}/finish/` - Завершить индивидуальную тренировку

## Использование

### API Клиент

```typescript
import { apiClient } from "./api/client";

// Аутентификация
const loginResult = await apiClient.login(email, password);
const registerResult = await apiClient.register(
  email,
  username,
  password,
  role
);

// Профили
const myProfile = await apiClient.getMyProfile();
const trainerProfile = await apiClient.getTrainerProfile(username);

// Расписание
const session = await apiClient.createGroupTrainingSession(sessionData);
```

### Хуки

#### useAuth

```typescript
import { useAuth } from "./hooks/useAuth";

function MyComponent() {
  const { user, isAuthenticated, login, logout, error } = useAuth();

  const handleLogin = async () => {
    const result = await login(email, password);
    if (result.success) {
      // Успешный вход
    }
  };
}
```

#### useProfile

```typescript
import { useProfile } from "./hooks/useProfile";

function ProfileComponent() {
  const { profile, isLoading, updateProfile } = useProfile(username);

  const handleUpdate = async () => {
    const result = await updateProfile(data, role);
    if (result.success) {
      // Профиль обновлен
    }
  };
}
```

#### useSchedule

```typescript
import { useSchedule } from "./hooks/useSchedule";

function ScheduleComponent() {
  const { createGroupSession, isLoading, error } = useSchedule();

  const handleCreateSession = async () => {
    const result = await createGroupSession(sessionData);
    if (result.success) {
      // Тренировка создана
    }
  };
}
```

## Настройка

### Переменные окружения

Создайте файл `.env` в папке `frontend`:

```env
REACT_APP_API_URL=http://localhost:8000/api
```

### CORS настройки

Убедитесь, что бэкенд настроен для работы с фронтендом:

```python
# settings.py
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

CORS_ALLOW_CREDENTIALS = True
```

## Типы данных

Все типы данных определены в `src/types/api.ts`:

```typescript
interface User {
  id: number;
  email: string;
  username: string;
  role: "parent" | "child" | "trainer" | "athlete";
  email_verified: boolean;
}

interface TrainingSession {
  id: number;
  title: string;
  date: string;
  time: string;
  duration: number;
  status: "scheduled" | "in_progress" | "completed" | "cancelled";
  // ... другие поля
}
```

## Обработка ошибок

API клиент автоматически обрабатывает ошибки и возвращает структурированные ответы:

```typescript
const response = await apiClient.login(email, password);

if (response.data) {
  // Успешный ответ
  console.log(response.data);
} else {
  // Ошибка
  console.error(response.error);
}
```

## Аутентификация

Система использует JWT токены, хранящиеся в HttpOnly cookies:

1. При входе токены сохраняются в cookies
2. Все последующие запросы автоматически включают токены
3. При выходе токены удаляются из cookies

## Примеры использования в компонентах

### Компонент входа

```typescript
function LoginScreen() {
  const { login, error } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(email, password);
    if (result.success) {
      // Перенаправление на главную страницу
    }
  };
}
```

### Компонент профиля

```typescript
function ProfileScreen() {
  const { user } = useAuth();
  const { profile, updateProfile } = useProfile(user?.username);

  const handleSave = async (data) => {
    const result = await updateProfile(data, user.role);
    if (result.success) {
      // Показать уведомление об успехе
    }
  };
}
```

### Компонент расписания

```typescript
function ScheduleScreen() {
  const { createGroupSession } = useSchedule();

  const handleCreateSession = async (sessionData) => {
    const result = await createGroupSession(sessionData);
    if (result.success) {
      // Обновить список тренировок
    }
  };
}
```
