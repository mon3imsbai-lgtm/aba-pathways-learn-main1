-- ============================================
-- Fix existing schema conflicts and recreate
-- ============================================

-- Drop existing types if they exist (CASCADE will drop dependent tables)
DROP TYPE IF EXISTS public.user_role CASCADE;
DROP TYPE IF EXISTS public.course_status CASCADE;
DROP TYPE IF EXISTS public.blog_status CASCADE;
DROP TYPE IF EXISTS public.order_status CASCADE;
DROP TYPE IF EXISTS public.enrollment_status CASCADE;
DROP TYPE IF EXISTS public.refund_status CASCADE;
DROP TYPE IF EXISTS public.message_status CASCADE;

-- Drop existing tables if they exist
DROP TABLE IF EXISTS public.enrollments CASCADE;
DROP TABLE IF EXISTS public.order_items CASCADE;
DROP TABLE IF EXISTS public.orders CASCADE;
DROP TABLE IF EXISTS public.refund_requests CASCADE;
DROP TABLE IF EXISTS public.contact_messages CASCADE;
DROP TABLE IF EXISTS public.features CASCADE;
DROP TABLE IF EXISTS public.faq_items CASCADE;
DROP TABLE IF EXISTS public.testimonials CASCADE;
DROP TABLE IF EXISTS public.blog_posts CASCADE;
DROP TABLE IF EXISTS public.services CASCADE;
DROP TABLE IF EXISTS public.course_modules CASCADE;
DROP TABLE IF EXISTS public.courses CASCADE;
DROP TABLE IF EXISTS public.product_categories CASCADE;
DROP TABLE IF EXISTS public.products CASCADE;
DROP TABLE IF EXISTS public.categories CASCADE;
DROP TABLE IF EXISTS public.site_settings CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;

-- Drop existing functions
DROP FUNCTION IF EXISTS public.handle_updated_at() CASCADE;

-- ============================================
-- Now recreate everything cleanly
-- ============================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ============================================
-- ENUMS
-- ============================================
create type public.user_role as enum ('admin', 'editor', 'user');
create type public.course_status as enum ('upcoming', 'open', 'closed');
create type public.blog_status as enum ('draft', 'published');
create type public.order_status as enum ('pending', 'paid', 'completed', 'cancelled');
create type public.enrollment_status as enum ('pending', 'active', 'completed');
create type public.refund_status as enum ('pending', 'approved', 'rejected');
create type public.message_status as enum ('new', 'read', 'responded');

-- ============================================
-- PROFILES (extends auth.users)
-- ============================================
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  phone text,
  avatar_url text,
  role public.user_role default 'user' not null,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Trigger to create profile on new user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, role)
  values (new.id, new.raw_user_meta_data->>'full_name', 'user')
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ============================================
-- SITE SETTINGS
-- ============================================
create table public.site_settings (
  key text primary key,
  value text not null,
  updated_at timestamptz default now() not null
);

-- ============================================
-- CATEGORIES
-- ============================================
create table public.categories (
  id serial primary key,
  name text not null,
  slug text not null unique,
  description text,
  is_active boolean default true not null,
  created_at timestamptz default now() not null
);

-- ============================================
-- PRODUCTS
-- ============================================
create table public.products (
  id serial primary key,
  title text not null,
  description text not null,
  price numeric(10,2) not null,
  image_url text,
  file_url text,
  is_active boolean default true not null,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- ============================================
-- PRODUCT_CATEGORIES (many-to-many)
-- ============================================
create table public.product_categories (
  product_id int references public.products(id) on delete cascade,
  category_id int references public.categories(id) on delete cascade,
  primary key (product_id, category_id)
);

-- ============================================
-- COURSES
-- ============================================
create table public.courses (
  id serial primary key,
  title text not null,
  slug text not null unique,
  description text not null,
  full_description text,
  hours text,
  price numeric(10,2),
  status public.course_status default 'upcoming' not null,
  featured boolean default false not null,
  image_url text,
  is_active boolean default true not null,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- ============================================
-- COURSE_MODULES
-- ============================================
create table public.course_modules (
  id serial primary key,
  course_id int references public.courses(id) on delete cascade not null,
  title text not null,
  order_index int not null,
  content jsonb,
  created_at timestamptz default now() not null
);

-- ============================================
-- SERVICES
-- ============================================
create table public.services (
  id serial primary key,
  title text not null,
  description text not null,
  icon text,
  is_active boolean default true not null,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- ============================================
-- BLOG_POSTS
-- ============================================
create table public.blog_posts (
  id serial primary key,
  title text not null,
  excerpt text not null,
  content text not null,
  cover_image_url text,
  author_id uuid references public.profiles(id) on delete set null,
  published_at timestamptz,
  status public.blog_status default 'draft' not null,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- ============================================
-- TESTIMONIALS
-- ============================================
create table public.testimonials (
  id serial primary key,
  name text not null,
  role text not null,
  quote text not null,
  avatar_url text,
  is_active boolean default true not null,
  created_at timestamptz default now() not null
);

-- ============================================
-- FAQ_ITEMS
-- ============================================
create table public.faq_items (
  id serial primary key,
  question text not null,
  answer text not null,
  order_index int not null,
  is_active boolean default true not null,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- ============================================
-- FEATURES
-- ============================================
create table public.features (
  id serial primary key,
  title text not null,
  description text not null,
  icon text not null,
  order_index int not null,
  is_active boolean default true not null,
  created_at timestamptz default now() not null
);

-- ============================================
-- CONTACT_MESSAGES
-- ============================================
create table public.contact_messages (
  id serial primary key,
  full_name text not null,
  email text not null,
  request_type text not null,
  message text not null,
  status public.message_status default 'new' not null,
  created_at timestamptz default now() not null
);

-- ============================================
-- REFUND_REQUESTS
-- ============================================
create table public.refund_requests (
  id serial primary key,
  full_name text not null,
  registration_number text not null,
  email text not null,
  bank_rib text not null,
  account_holder text not null,
  bank_name text not null,
  reason text,
  status public.refund_status default 'pending' not null,
  created_at timestamptz default now() not null
);

-- ============================================
-- ORDERS
-- ============================================
create table public.orders (
  id serial primary key,
  user_id uuid references public.profiles(id) on delete set null,
  total_amount numeric(10,2) not null,
  status public.order_status default 'pending' not null,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- ============================================
-- ORDER_ITEMS
-- ============================================
create table public.order_items (
  id serial primary key,
  order_id int references public.orders(id) on delete cascade not null,
  product_id int references public.products(id) on delete restrict not null,
  quantity int not null default 1,
  unit_price numeric(10,2) not null,
  created_at timestamptz default now() not null
);

-- ============================================
-- ENROLLMENTS
-- ============================================
create table public.enrollments (
  id serial primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  course_id int references public.courses(id) on delete cascade not null,
  status public.enrollment_status default 'pending' not null,
  enrolled_at timestamptz default now() not null,
  completed_at timestamptz,
  unique(user_id, course_id)
);

-- ============================================
-- INDEXES
-- ============================================
create index idx_courses_slug on public.courses(slug);
create index idx_courses_status on public.courses(status);
create index idx_courses_featured on public.courses(featured);
create index idx_products_is_active on public.products(is_active);
create index idx_blog_posts_status on public.blog_posts(status);
create index idx_blog_posts_published_at on public.blog_posts(published_at);
create index idx_enrollments_user_id on public.enrollments(user_id);
create index idx_enrollments_course_id on public.enrollments(course_id);
create index idx_orders_user_id on public.orders(user_id);
create index idx_orders_status on public.orders(status);

-- ============================================
-- TRIGGERS for updated_at
-- ============================================
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_profiles_updated_at before update on public.profiles
  for each row execute function public.handle_updated_at();

create trigger set_products_updated_at before update on public.products
  for each row execute function public.handle_updated_at();

create trigger set_courses_updated_at before update on public.courses
  for each row execute function public.handle_updated_at();

create trigger set_services_updated_at before update on public.services
  for each row execute function public.handle_updated_at();

create trigger set_faq_items_updated_at before update on public.faq_items
  for each row execute function public.handle_updated_at();

create trigger set_orders_updated_at before update on public.orders
  for each row execute function public.handle_updated_at();

create trigger set_site_settings_updated_at before update on public.site_settings
  for each row execute function public.handle_updated_at();

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================
alter table public.profiles enable row level security;
alter table public.site_settings enable row level security;
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.product_categories enable row level security;
alter table public.courses enable row level security;
alter table public.course_modules enable row level security;
alter table public.services enable row level security;
alter table public.blog_posts enable row level security;
alter table public.testimonials enable row level security;
alter table public.faq_items enable row level security;
alter table public.features enable row level security;
alter table public.contact_messages enable row level security;
alter table public.refund_requests enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.enrollments enable row level security;

-- ============================================
-- RLS POLICIES
-- ============================================

-- Profiles: users can read/update own profile, admins can do everything
create policy "Public profiles are viewable by everyone" on public.profiles
  for select using (true);
create policy "Users can insert own profile" on public.profiles
  for insert with check (auth.uid() = id);
create policy "Users can update own profile" on public.profiles
  for update using (auth.uid() = id);
create policy "Admins can do everything on profiles" on public.profiles
  for all using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- Site settings: public read, admin write
create policy "Site settings are viewable by everyone" on public.site_settings
  for select using (true);
create policy "Admins can manage site settings" on public.site_settings
  for all using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- Categories: public read, admin/editor write
create policy "Categories are viewable by everyone" on public.categories
  for select using (true);
create policy "Admins and editors can manage categories" on public.categories
  for all using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role in ('admin', 'editor')
    )
  );

-- Products: public read active, admin/editor write
create policy "Active products are viewable by everyone" on public.products
  for select using (is_active = true);
create policy "Admins and editors can view all products" on public.products
  for select using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role in ('admin', 'editor')
    )
  );
create policy "Admins and editors can manage products" on public.products
  for all using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role in ('admin', 'editor')
    )
  );

-- Product categories: public read, admin/editor write
create policy "Product categories are viewable by everyone" on public.product_categories
  for select using (true);
create policy "Admins and editors can manage product categories" on public.product_categories
  for all using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role in ('admin', 'editor')
    )
  );

-- Courses: public read active, admin/editor write
create policy "Active courses are viewable by everyone" on public.courses
  for select using (is_active = true);
create policy "Admins and editors can view all courses" on public.courses
  for select using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role in ('admin', 'editor')
    )
  );
create policy "Admins and editors can manage courses" on public.courses
  for all using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role in ('admin', 'editor')
    )
  );

-- Course modules: public read active courses, admin/editor write
create policy "Course modules are viewable by everyone" on public.course_modules
  for select using (
    exists (
      select 1 from public.courses
      where id = course_modules.course_id and is_active = true
    )
  );
create policy "Admins and editors can manage course modules" on public.course_modules
  for all using (
    exists (
      select 1 from public.courses c
      join public.profiles p on p.id = auth.uid()
      where c.id = course_modules.course_id and p.role in ('admin', 'editor')
    )
  );

-- Services: public read active, admin/editor write
create policy "Active services are viewable by everyone" on public.services
  for select using (is_active = true);
create policy "Admins and editors can manage services" on public.services
  for all using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role in ('admin', 'editor')
    )
  );

-- Blog posts: public read published, admin/editor write
create policy "Published blog posts are viewable by everyone" on public.blog_posts
  for select using (status = 'published');
create policy "Admins and editors can view all blog posts" on public.blog_posts
  for select using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role in ('admin', 'editor')
    )
  );
create policy "Admins and editors can manage blog posts" on public.blog_posts
  for all using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role in ('admin', 'editor')
    )
  );

-- Testimonials: public read active, admin/editor write
create policy "Active testimonials are viewable by everyone" on public.testimonials
  for select using (is_active = true);
create policy "Admins and editors can manage testimonials" on public.testimonials
  for all using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role in ('admin', 'editor')
    )
  );

-- FAQ items: public read active, admin/editor write
create policy "Active FAQ items are viewable by everyone" on public.faq_items
  for select using (is_active = true);
create policy "Admins and editors can manage FAQ items" on public.faq_items
  for all using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role in ('admin', 'editor')
    )
  );

-- Features: public read active, admin/editor write
create policy "Active features are viewable by everyone" on public.features
  for select using (is_active = true);
create policy "Admins and editors can manage features" on public.features
  for all using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role in ('admin', 'editor')
    )
  );

-- Contact messages: anyone can insert, admin can read/update
create policy "Anyone can send contact messages" on public.contact_messages
  for insert with check (true);
create policy "Admins can view contact messages" on public.contact_messages
  for select using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );
create policy "Admins can update contact messages" on public.contact_messages
  for update using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- Refund requests: anyone can insert, admin can read/update
create policy "Anyone can send refund requests" on public.refund_requests
  for insert with check (true);
create policy "Admins can view refund requests" on public.refund_requests
  for select using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );
create policy "Admins can update refund requests" on public.refund_requests
  for update using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- Orders: users can view own, admin can view all
create policy "Users can view own orders" on public.orders
  for select using (auth.uid() = user_id);
create policy "Admins can view all orders" on public.orders
  for select using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );
create policy "Admins can manage orders" on public.orders
  for all using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- Order items: users can view own order items, admin can view all
create policy "Users can view own order items" on public.order_items
  for select using (
    exists (
      select 1 from public.orders
      where id = order_items.order_id and user_id = auth.uid()
    )
  );
create policy "Admins can view all order items" on public.order_items
  for select using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );
create policy "Admins can manage order items" on public.order_items
  for all using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- Enrollments: users can view own, admin can view all
create policy "Users can view own enrollments" on public.enrollments
  for select using (auth.uid() = user_id);
create policy "Admins can view all enrollments" on public.enrollments
  for select using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );
create policy "Admins can manage enrollments" on public.enrollments
  for all using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );
