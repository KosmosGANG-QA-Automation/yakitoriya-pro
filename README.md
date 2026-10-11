# Yakitoriya Pro

Fullstack-сайт доставки: Next.js (App Router), Tailwind CSS, TypeScript, Supabase (PostgreSQL), ЮKassa. Деплой — Vercel.

## Структура

```
src/
  app/                    страницы и API routes
    api/auth/*            вход по телефону (код из СМС), сессия, выход
    api/orders            создание заказа (pending) и платежа ЮKassa
    api/webhooks/yookassa уведомления об оплате
  components/             layout, auth, menu
  lib/                    auth, supabase, yookassa, каталог
  types/
supabase/migrations/      SQL-схема
```

## Запуск

1. Выполните `supabase/migrations/0001_init.sql` в SQL Editor Supabase.
2. Скопируйте `.env.example` в `.env.local` и заполните значения.
3. `npm install && npm run dev`

В ЮKassa укажите URL уведомлений: `https://<домен>/api/webhooks/yookassa` (событие `payment.succeeded`, `payment.canceled`).
