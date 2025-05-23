# 8sh.ru Landing

Высококонверсионный лендинг для платформы 8sh.ru

## 🚀 Быстрый старт (локально)

```bash
cd landing
npm install
npm run dev
```

Откройте http://localhost:3000

## 🟢 Деплой на Vercel

1. Зарегистрируйтесь на [vercel.com](https://vercel.com/)
2. Импортируйте репозиторий, выберите папку `landing` как root
3. Все настройки по умолчанию (Next.js + Tailwind)
4. Нажмите Deploy

## Стек
- Next.js 14+ (App Router, TypeScript)
- Tailwind CSS
- Адаптивная верстка, персонализация контента

## Структура
- `src/app/page.tsx` — главная страница лендинга
- `public/` — статика, favicon

## Контакты
- Telegram: @sector8_team

## Настройка Supabase

1. В .env.local добавьте:

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

2. Для работы заявок (orders) пользователь должен быть авторизован через Supabase Auth. После входа его user_id будет автоматически подставляться во все действия с заявками.

3. Для локального теста используйте реального пользователя из Supabase Auth.

## Миграции для orders

- `supabase_orders_create.sql` — создать таблицу orders
- `supabase_orders_alter.sql` — добавить недостающие поля

## CRUD заявок
- Создание, редактирование, отмена и просмотр заявок работают только для авторизованных пользователей.
