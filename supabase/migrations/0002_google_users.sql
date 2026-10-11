-- Пользователи, вошедшие через Google, идентифицируются по email.
alter table public.users alter column phone drop not null;
alter table public.users add column email text unique;
alter table public.users add constraint users_contact_check
  check (phone is not null or email is not null);
