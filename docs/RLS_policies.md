### 1. Создать таблицу профилей с ролью

```sql
-- 1.1. Создаём таблицу профилей, если её ещё нет
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  company text,
  phone text,
  telegram text,
  role text default 'user', -- user | agent | admin
  created_at timestamp with time zone default now()
);

-- 1.2. Индекс для быстрого поиска по роли
create index if not exists profiles_role_idx on public.profiles(role);
```

---

### 2. Включить RLS для таблицы профилей

```sql
-- 2.1. Включаем RLS
alter table public.profiles enable row level security;

-- 2.2. Разрешаем пользователю видеть только свой профиль
create policy "User can view own profile"
  on public.profiles
  for select
  using (id = auth.uid());
```

---

### 3. Пример: присвоить роль агенту

```sql
-- 3.1. Присваиваем роль агенту (замените USER_UUID_АГЕНТА на нужный id)
update public.profiles set role = 'agent' where id = 'USER_UUID_АГЕНТА';
```

---

### 4. Пример создания таблицы заявок агентов

```sql
-- 4.1. Таблица заявок агентов
create table if not exists public.agent_requests (
  id uuid primary key default uuid_generate_v4(),
  agent_id uuid references public.profiles(id),
  request_text text,
  created_at timestamp with time zone default now()
);
```

---

### 5. Включить RLS для agent_requests

```sql
-- 5.1. Включаем RLS
alter table public.agent_requests enable row level security;
```

---

### 6. RLS-политики для заявок агентов

```sql
-- 6.1. Только агент может видеть свои заявки
create policy "Agent can view own requests"
  on public.agent_requests
  for select
  using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid() and profiles.role = 'agent'
    )
    and agent_requests.agent_id = auth.uid()
  );

-- 6.2. Только агент может создавать заявки
create policy "Agent can insert requests"
  on public.agent_requests
  for insert
  with check (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid() and profiles.role = 'agent'
    )
  );
```

---

### 7. (Опционально) Политика для админов

```sql
-- 7.1. Админ может делать всё
create policy "Admin can do anything"
  on public.agent_requests
  for all
  using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid() and profiles.role = 'admin'
    )
  );
```