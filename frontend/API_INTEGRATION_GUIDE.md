# Полное руководство по интеграции API

## 📋 Обзор API

AIGA Connect имеет следующие основные модули API:

### 🔐 **Аутентификация** (`/api/accounts/`)

- `POST /register/` - Регистрация пользователя
- `POST /login/` - Вход в систему
- `POST /confirm_code/` - Подтверждение email
- `POST /logout/` - Выход из системы
- `POST /refresh/` - Обновление токена

### 👤 **Профили** (`/api/profiles/`)

- `GET /me/` - Получить свой профиль
- `GET /trainer/{username}/` - Профиль тренера
- `PUT /trainer/edit-my-profile/` - Редактировать профиль тренера
- `GET /athlete/{username}/` - Профиль спортсмена
- `PUT /athlete/edit-my-profile/` - Редактировать профиль спортсмена
- `GET /parent/{username}/` - Профиль родителя
- `PUT /parent/edit-my-profile/` - Редактировать профиль родителя
- `GET /children/{username}/` - Профиль ребенка
- `PUT /children/{username}/edit/` - Редактировать профиль ребенка

### 📅 **Расписание** (`/api/schedules/`)

- `POST /create/` - Создать групповую тренировку
- `PUT /{id}/edit/` - Редактировать групповую тренировку
- `POST /{id}/cancel/` - Отменить групповую тренировку
- `POST /{id}/finish/` - Завершить групповую тренировку
- `POST /individual/create/` - Создать индивидуальную тренировку
- `PUT /individual/{id}/edit/` - Редактировать индивидуальную тренировку
- `POST /individual/{id}/cancel/` - Отменить индивидуальную тренировку
- `POST /individual/{id}/finish/` - Завершить индивидуальную тренировку

### 📝 **Заявки** (`/api/trainer_requests/`)

- `POST /{trainer_username}/send/` - Отправить заявку тренеру
- `POST /{request_id}/accept/` - Принять заявку
- `POST /{request_id}/reject/` - Отклонить заявку
- `POST /{request_id}/cancel/` - Отменить заявку
- `GET /trainer-requests/` - Список заявок тренера
- `GET /parent-requests/` - Список заявок родителя

### 📊 **Оценки** (`/api/grades/`)

- `GET /athlete/{username}/individual/all/` - Оценки спортсмена (индивидуальные)
- `GET /athlete/{username}/group/all/` - Оценки спортсмена (групповые)
- `POST /create/individual/{session_id}/` - Оценить индивидуальную тренировку
- `POST /create/group/{session_id}/` - Оценить групповую тренировку
- `GET /trainer/individual/{session_id}/` - Оценки тренера (индивидуальные)
- `GET /trainer/group/{session_id}/` - Оценки тренера (групповые)

### ⭐ **Отзывы** (`/api/reviews/`)

- `POST /trainer/create/` - Создать отзыв о тренере
- `PUT /trainer/{review_id}/edit/` - Редактировать отзыв
- `DELETE /trainer/{review_id}/delete/` - Удалить отзыв
- `GET /trainer/{username}/` - Отзывы о тренере

## 🎯 **Что нужно интегрировать дальше**

### 1. **Расписание (ScheduleScreen)**

- ✅ API готов
- ❌ Фронтенд не интегрирован
- **Нужно**: Создать хук `useSchedule`, обновить `ScheduleScreen`

### 2. **Заявки (RequestsScreen)**

- ✅ API готов
- ❌ Фронтенд не интегрирован
- **Нужно**: Создать хук `useTrainerRequests`, обновить `RequestsScreen`

### 3. **Прогресс (ProgressScreen)**

- ✅ API оценок готов
- ❌ Фронтенд не интегрирован
- **Нужно**: Создать хук `useGrades`, обновить `ProgressScreen`

### 4. **Отзывы**

- ✅ API готов
- ❌ Фронтенд не интегрирован
- **Нужно**: Создать хук `useReviews`, добавить отзывы в профили

### 5. **Магазин (ShopScreen)**

- ❌ API отсутствует
- ❌ Фронтенд не интегрирован
- **Нужно**: Создать API для магазина

### 6. **Сообщения (MessagingScreen)**

- ❌ API отсутствует
- ❌ Фронтенд не интегрирован
- **Нужно**: Создать API для сообщений

### 7. **Уведомления (NotificationsScreen)**

- ❌ API отсутствует
- ❌ Фронтенд не интегрирован
- **Нужно**: Создать API для уведомлений

## 🔧 **Модели данных**

### **TrainerProfile**

```typescript
{
  username: string;
  first_name: string;
  last_name: string;
  birth_date?: string;
  phone?: string;
  bio?: string;
  training_zone_address: string;
  monthly_price: number;
  disciplines: Array<{
    id: number;
    name: string;
    slug: string;
  }>;
  updated_at: string;
  created_at: string;
}
```

### **AthleteProfile**

```typescript
{
  username: string;
  first_name: string;
  last_name: string;
  birth_date?: string;
  phone?: string;
  height_cm?: number;
  weight_kg?: number;
  belt_grade?: string;
  disciplines: Array<{
    id: number;
    name: string;
    slug: string;
  }>;
  updated_at: string;
  created_at: string;
}
```

### **ParentProfile**

```typescript
{
  username: string;
  first_name: string;
  last_name: string;
  birth_date?: string;
  phone?: string;
  address?: string;
  updated_at: string;
  created_at: string;
}
```

## 🚀 **Приоритеты интеграции**

### **Высокий приоритет:**

1. **Расписание** - основной функционал
2. **Заявки** - для связи тренеров и учеников
3. **Прогресс** - для отслеживания результатов

### **Средний приоритет:**

4. **Отзывы** - для рейтинга тренеров
5. **Уведомления** - для уведомлений о событиях

### **Низкий приоритет:**

6. **Магазин** - дополнительный функционал
7. **Сообщения** - внутренний чат

## ❓ **Вопросы для уточнения**

1. **Расписание**: Нужно ли показывать расписание тренера или только ученика?
2. **Заявки**: Как должна работать система заявок? Кто может отправлять заявки?
3. **Прогресс**: Какие метрики прогресса важны? (посещаемость, оценки, достижения)
4. **Магазин**: Что должно продаваться в магазине? (экипировка, абонементы?)
5. **Сообщения**: Нужен ли чат между тренером и учеником/родителем?
6. **Уведомления**: Какие события должны генерировать уведомления?

## 📝 **Следующие шаги**

1. **Интегрировать расписание** - создать `useSchedule` и обновить `ScheduleScreen`
2. **Интегрировать заявки** - создать `useTrainerRequests` и обновить `RequestsScreen`
3. **Интегрировать прогресс** - создать `useGrades` и обновить `ProgressScreen`
4. **Добавить отзывы** - создать `useReviews` и добавить в профили
5. **Создать недостающие API** - для магазина, сообщений, уведомлений

Какой модуль хотите интегрировать следующим? 🤔
