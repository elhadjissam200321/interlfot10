
-- Enable Row Level Security
-- (We will set up specific policies later for public reading and admin writing)

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id TEXT PRIMARY KEY, -- Slug used as ID
  label TEXT NOT NULL,
  image TEXT NOT NULL,
  href TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  category TEXT REFERENCES categories(id) ON DELETE CASCADE,
  description TEXT NOT NULL,
  materials TEXT[] DEFAULT '{}',
  dimensions TEXT,
  image TEXT NOT NULL,
  gallery TEXT[] DEFAULT '{}',
  collection_id TEXT REFERENCES collections(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Collections table
CREATE TABLE IF NOT EXISTS collections (
  id TEXT PRIMARY KEY, -- Slug used as ID
  label TEXT NOT NULL,
  description TEXT NOT NULL,
  href TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Collaborators table
CREATE TABLE IF NOT EXISTS collaborators (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  profession TEXT NOT NULL, -- 'Architecte' | 'Designer d\'Intérieur'
  city TEXT,
  description TEXT NOT NULL,
  collaboration_story TEXT,
  image TEXT NOT NULL,
  hero_image TEXT,
  email TEXT,
  phone TEXT,
  website TEXT,
  address TEXT,
  expertise JSONB DEFAULT '[]'::jsonb,
  projects JSONB DEFAULT '[]'::jsonb, -- Array of { title, image }
  featured_project JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS Policies (Public Read Access)
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE collaborators ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public Read Categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Public Read Products" ON products FOR SELECT USING (true);
CREATE POLICY "Public Read Collections" ON collections FOR SELECT USING (true);
CREATE POLICY "Public Read Collaborators" ON collaborators FOR SELECT USING (true);

-- Admin Write Policies
-- IMPORTANT: The current policies allow ANY authenticated user to write.
-- BEFORE PRODUCTION: Replace with role-based policies:
--
-- Option A: Check user_metadata.is_admin (set per-user in Supabase Auth dashboard):
--   CREATE POLICY "Admin Write Categories" ON categories FOR ALL
--     TO authenticated USING (auth.jwt() -> 'user_metadata' ->> 'is_admin' = 'true')
--     WITH CHECK (auth.jwt() -> 'user_metadata' ->> 'is_admin' = 'true');
--
-- Option B: Maintain an admin_users table and join:
--   CREATE POLICY "Admin Write Categories" ON categories FOR ALL
--     TO authenticated USING (
--       EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid())
--     );
--
-- Option A: Check user_metadata.role or is_admin
CREATE POLICY "Admin All Categories" ON categories FOR ALL TO authenticated USING (auth.jwt() -> 'user_metadata' ->> 'is_admin' = 'true') WITH CHECK (auth.jwt() -> 'user_metadata' ->> 'is_admin' = 'true');
CREATE POLICY "Admin All Products" ON products FOR ALL TO authenticated USING (auth.jwt() -> 'user_metadata' ->> 'is_admin' = 'true') WITH CHECK (auth.jwt() -> 'user_metadata' ->> 'is_admin' = 'true');
CREATE POLICY "Admin All Collections" ON collections FOR ALL TO authenticated USING (auth.jwt() -> 'user_metadata' ->> 'is_admin' = 'true') WITH CHECK (auth.jwt() -> 'user_metadata' ->> 'is_admin' = 'true');
CREATE POLICY "Admin All Collaborators" ON collaborators FOR ALL TO authenticated USING (auth.jwt() -> 'user_metadata' ->> 'is_admin' = 'true') WITH CHECK (auth.jwt() -> 'user_metadata' ->> 'is_admin' = 'true');

-- Pages Content
CREATE TABLE IF NOT EXISTS pages_content (
  id TEXT PRIMARY KEY,
  title TEXT,
  subtitle TEXT,
  description TEXT,
  content JSONB DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE pages_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access" ON pages_content
  FOR SELECT USING (true);

CREATE POLICY "Allow authenticated users to manage content" ON pages_content
  FOR ALL USING (auth.role() = 'authenticated');

-- ============================================================
-- FAVORITES TABLE (Recommended over user_metadata for scalability)
-- The current use-favorites.ts hook stores favorites in user_metadata,
-- which has a ~100 item practical limit and causes lock contention.
-- Replace with this table for production:
-- ============================================================
CREATE TABLE IF NOT EXISTS favorites (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  product_id TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own favorites" ON favorites
  FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Public can read favorites" ON favorites FOR SELECT USING (true);
-- NOTE: Update hooks/use-favorites.ts to query this table instead of user_metadata

-- ============================================================
-- CONTACT MESSAGES TABLE
-- Stores all contact form submissions
-- ============================================================
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can insert contact messages" ON contact_messages
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Authenticated can read contact messages" ON contact_messages
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated can update contact messages" ON contact_messages
  FOR UPDATE TO authenticated USING (true);
