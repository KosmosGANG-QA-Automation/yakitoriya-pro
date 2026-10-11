-- Схема БД: пользователи, СМС-коды, сессии, заказы.
-- Доступ к таблицам только через сервер (service role), RLS включён без политик.

create extension if not exists "pgcrypto";

create table public.users (
  id          uuid primary key default gen_random_uuid(),
  phone       text not null unique check (phone ~ '^\+7\d{10}$'),
  name        text,
  created_at  timestamptz not null default now(),
  last_login  timestamptz
);

create table public.sms_codes (
  id          uuid primary key default gen_random_uuid(),
  phone       text not null,
  code_hash   text not null,
  attempts    smallint not null default 0,
  consumed    boolean not null default false,
  expires_at  timestamptz not null,
  created_at  timestamptz not null default now()
);
create index sms_codes_phone_created_idx on public.sms_codes (phone, created_at desc);

create table public.sessions (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references public.users(id) on delete cascade,
  token_hash  text not null unique,
  user_agent  text,
  expires_at  timestamptz not null,
  created_at  timestamptz not null default now()
);
create index sessions_user_idx on public.sessions (user_id);

create type public.order_status as enum ('pending', 'paid', 'canceled', 'failed');

create table public.orders (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references public.users(id),
  status        public.order_status not null default 'pending',
  total_kopecks integer not null check (total_kopecks > 0),
  items         jsonb not null,
  address       text not null,
  comment       text,
  payment_id    text unique,
  payment_url   text,
  created_at    timestamptz not null default now(),
  paid_at       timestamptz
);
create index orders_user_idx on public.orders (user_id, created_at desc);

alter table public.users     enable row level security;
alter table public.sms_codes enable row level security;
alter table public.sessions  enable row level security;
alter table public.orders    enable row level security;
