# Настройка проекта

## Переменные окружения

Создайте файл `.env` в папке `frontend` со следующим содержимым:

```env
REACT_APP_API_URL=http://localhost:8000/api
```

## Запуск проекта

1. Установите зависимости:

```bash
npm install
```

2. Запустите проект в режиме разработки:

```bash
npm start
```

3. Для сборки проекта:

```bash
npm run build
```

## Настройка бэкенда

Убедитесь, что Django бэкенд запущен на порту 8000 и настроен CORS:

```python
# settings.py
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

CORS_ALLOW_CREDENTIALS = True
```

## Структура проекта

- `src/api/client.ts` - API клиент для взаимодействия с бэкендом
- `src/hooks/` - React хуки для работы с API
- `src/types/api.ts` - TypeScript типы для API
- `src/components/` - React компоненты
- `src/styles/globals.css` - Глобальные стили

## Исправленные ошибки

1. ✅ Исправлены TypeScript ошибки типизации
2. ✅ Убраны неиспользуемые импорты и переменные
3. ✅ Исправлены ESLint предупреждения
4. ✅ Добавлена правильная типизация для API ответов
5. ✅ Исправлено преобразование ролей между API и фронтендом
