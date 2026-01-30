-- Origin Labs Database Schema for Supabase

-- Pricing Tiers Table
CREATE TABLE IF NOT EXISTS pricing_tiers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price TEXT NOT NULL,
  price_note TEXT,
  features JSONB DEFAULT '[]'::jsonb,
  highlighted BOOLEAN DEFAULT false,
  cta_text TEXT DEFAULT 'Anfragen',
  discount_badge TEXT,
  discount_active BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Projects Table
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT,
  category TEXT,
  tags JSONB DEFAULT '[]'::jsonb,
  color TEXT DEFAULT '#2DD4E0',
  year TEXT,
  link TEXT,
  image_url TEXT,
  published BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Contact Info Table (single row)
CREATE TABLE IF NOT EXISTS contact_info (
  id TEXT DEFAULT 'main' PRIMARY KEY,
  phone TEXT,
  email TEXT,
  street TEXT,
  city TEXT,
  country TEXT DEFAULT 'Deutschland',
  linkedin TEXT,
  instagram TEXT,
  github TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Form Submissions Table
CREATE TABLE IF NOT EXISTS form_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  phone TEXT,
  service TEXT,
  budget TEXT,
  message TEXT,
  source TEXT,
  medium TEXT,
  referrer TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Page Views Table (Analytics)
CREATE TABLE IF NOT EXISTS page_views (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  path TEXT NOT NULL,
  referrer TEXT,
  source TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_page_views_path ON page_views(path);
CREATE INDEX IF NOT EXISTS idx_page_views_created_at ON page_views(created_at);
CREATE INDEX IF NOT EXISTS idx_form_submissions_created_at ON form_submissions(created_at);
CREATE INDEX IF NOT EXISTS idx_projects_published ON projects(published);
CREATE INDEX IF NOT EXISTS idx_pricing_tiers_order ON pricing_tiers(sort_order);

-- Enable Row Level Security (RLS)
ALTER TABLE pricing_tiers ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE form_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;

-- Public read access for published content
CREATE POLICY "Public can read pricing tiers" ON pricing_tiers
  FOR SELECT USING (true);

CREATE POLICY "Public can read published projects" ON projects
  FOR SELECT USING (published = true);

CREATE POLICY "Public can read contact info" ON contact_info
  FOR SELECT USING (true);

-- Public can insert page views and form submissions
CREATE POLICY "Public can insert page views" ON page_views
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Public can insert form submissions" ON form_submissions
  FOR INSERT WITH CHECK (true);

-- Authenticated users (admin) have full access
CREATE POLICY "Authenticated users can manage pricing tiers" ON pricing_tiers
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage projects" ON projects
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage contact info" ON contact_info
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can read form submissions" ON form_submissions
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can read page views" ON page_views
  FOR SELECT USING (auth.role() = 'authenticated');

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_pricing_tiers_updated_at
  BEFORE UPDATE ON pricing_tiers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contact_info_updated_at
  BEFORE UPDATE ON contact_info
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert default contact info
INSERT INTO contact_info (id, phone, email, street, city, country)
VALUES ('main', '', '', '', '', 'Deutschland')
ON CONFLICT (id) DO NOTHING;
