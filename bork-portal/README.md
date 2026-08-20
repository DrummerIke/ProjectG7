# BORK Internal Portal

Корпоративный PWA-портал для сотрудников интернет-бутика BORK.

## 📋 Описание

Современная замена Google Sites с возможностью:
- Авторизации и разграничения прав доступа (RBAC)
- Управления задачами (Kanban/List view)
- Просмотра графика работы
- Создания коммерческих предложений
- Быстрых заметок
- Интеграции с внешними сервисами (СДЭК, DPD, 1С)

## 🛠 Технологический стек

**Frontend:**
- React 18 + TypeScript
- Vite
- TailwindCSS
- Zustand (state management)
- React Router v6
- PWA (offline support)

**Backend:**
- Node.js + Express
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT authentication

**Infrastructure:**
- Docker & Docker Compose
- Nginx (production)

## 🚀 Быстрый старт

### Требования
- Node.js 20+
- Docker & Docker Compose (опционально)

### Вариант 1: Локальная разработка (без Docker)

```bash
# Установка зависимостей
cd bork-portal
npm install

# Запуск сервера базы данных (требуется PostgreSQL)
# Создайте БД bork_portal и пользователя

# Настройка переменных окружения
cp server/.env.example server/.env
# Отредактируйте server/.env с вашими параметрами

# Миграция БД
cd server
npx prisma migrate dev

# Запуск в режиме разработки (в двух терминалах)
# Терминал 1 - сервер
cd server
npm run dev

# Терминал 2 - клиент
cd client
npm run dev
```

### Вариант 2: Docker Compose (рекомендуется)

```bash
# Запуск всех сервисов
docker-compose up --build

# Сервисы будут доступны по адресам:
# - Frontend: http://localhost:5173
# - Backend API: http://localhost:5000/api
# - PostgreSQL: localhost:5432
```

## 📁 Структура проекта

```
bork-portal/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Переиспользуемые компоненты
│   │   ├── layouts/       # Layouts (DashboardLayout, ProtectedRoute)
│   │   ├── pages/         # Страницы приложения
│   │   ├── services/      # API клиенты
│   │   ├── store/         # Zustand stores
│   │   ├── types/         # TypeScript типы
│   │   └── utils/         # Утилиты
│   ├── package.json
│   └── vite.config.ts
├── server/                # Express backend
│   ├── src/
│   │   ├── controllers/   # Контроллеры
│   │   ├── middleware/    # Middleware (auth, validation)
│   │   ├── routes/        # API роуты
│   │   ├── services/      # Бизнес-логика
│   │   └── index.ts       # Точка входа
│   ├── prisma/
│   │   └── schema.prisma  # Схема БД
│   └── package.json
├── docker-compose.yml     # Docker конфигурация
└── package.json          # Root package.json (workspaces)
```

## 🔐 Роли и права доступа

| Роль | Права |
|------|-------|
| `consultant_g6` | Просмотр своего графика, создание заявок, просмотр своих задач |
| `leader_g6` | Управление графиком команды, одобрение заявок, просмотр задач команды |
| `admin` | Полный доступ, управление пользователями |

## 📱 PWA Возможности

- Установка на мобильные устройства и десктоп
- Работа офлайн (кэширование критических ресурсов)
- Автообновление при наличии новой версии
- Push-уведомления (планируется)

## 🔒 Безопасность

- JWT токены (Access + Refresh) в HttpOnly cookies
- Валидация данных через Zod
- Helmet.js для защиты HTTP заголовков
- CORS настройка
- Соответствие 152-ФЗ (хранение персональных данных в РФ)

## 📝 Следующие шаги

1. ✅ Базовая структура проекта создана
2. ⏳ Реализовать auth контроллеры (login, logout, refresh)
3. ⏳ Добавить CRUD для задач, заявок, заметок
4. ⏳ Интегрировать Yandex SmartCaptcha
5. ⏳ Создать UI для графика работы
6. ⏳ Добавить модуль коммерческих предложений
7. ⏳ Настроить production сборку с Nginx

## 📄 Лицензия

Внутренний проект для сотрудников BORK.
