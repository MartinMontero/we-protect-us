
-- Create enum types for mutual aid system
CREATE TYPE public.need_category AS ENUM (
  'food', 'housing', 'transportation', 'childcare', 'healthcare', 
  'education', 'technology', 'labor', 'financial', 'emotional_support'
);

CREATE TYPE public.urgency_level AS ENUM ('low', 'medium', 'high', 'critical');

CREATE TYPE public.fulfillment_status AS ENUM ('open', 'in_progress', 'fulfilled', 'expired');

-- User profiles for pseudonymous community members
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  pseudonym TEXT NOT NULL,
  bio TEXT,
  skills TEXT[],
  location_lat DECIMAL(10, 8),
  location_lng DECIMAL(11, 8),
  trust_score INTEGER DEFAULT 50 CHECK (trust_score >= 0 AND trust_score <= 100),
  time_bank_hours DECIMAL(10, 2) DEFAULT 0,
  vulnerability_factors TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Mutual aid requests and offers
CREATE TABLE public.mutual_aid_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('request', 'offer')),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category need_category NOT NULL,
  urgency urgency_level DEFAULT 'medium',
  status fulfillment_status DEFAULT 'open',
  location_lat DECIMAL(10, 8),
  location_lng DECIMAL(11, 8),
  radius_km INTEGER DEFAULT 5,
  time_commitment_hours DECIMAL(10, 2),
  skills_needed TEXT[],
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Time banking transactions
CREATE TABLE public.time_bank_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  giver_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  receiver_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  mutual_aid_post_id UUID REFERENCES public.mutual_aid_posts(id) ON DELETE SET NULL,
  hours DECIMAL(10, 2) NOT NULL,
  skill_category TEXT NOT NULL,
  description TEXT,
  verified_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Trust relationships between community members
CREATE TABLE public.trust_relations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  from_user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  to_user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  trust_level INTEGER CHECK (trust_level >= 0 AND trust_level <= 100),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(from_user_id, to_user_id)
);

-- Community impact metrics
CREATE TABLE public.solidarity_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  total_hours_exchanged DECIMAL(10, 2) DEFAULT 0,
  active_participants INTEGER DEFAULT 0,
  network_density DECIMAL(5, 4) DEFAULT 0,
  wealth_circulated DECIMAL(15, 2) DEFAULT 0,
  trust_network_size INTEGER DEFAULT 0,
  vulnerability_support_ratio DECIMAL(5, 4) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(date)
);

-- Historical case studies for education
CREATE TABLE public.case_studies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  organization TEXT NOT NULL,
  time_period TEXT NOT NULL,
  location TEXT NOT NULL,
  description TEXT NOT NULL,
  key_principles TEXT[],
  outcomes TEXT[],
  lessons TEXT[],
  relevance_score INTEGER CHECK (relevance_score >= 1 AND relevance_score <= 10),
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Reflection prompts and responses
CREATE TABLE public.reflections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  mutual_aid_post_id UUID REFERENCES public.mutual_aid_posts(id) ON DELETE SET NULL,
  prompt_type TEXT NOT NULL,
  prompt_text TEXT NOT NULL,
  response TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mutual_aid_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.time_bank_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trust_relations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.solidarity_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.case_studies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reflections ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Public profiles are viewable by everyone"
  ON public.profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- RLS Policies for mutual aid posts
CREATE POLICY "Mutual aid posts are viewable by everyone"
  ON public.mutual_aid_posts FOR SELECT
  USING (true);

CREATE POLICY "Users can create mutual aid posts"
  ON public.mutual_aid_posts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own posts"
  ON public.mutual_aid_posts FOR UPDATE
  USING (auth.uid() = user_id);

-- RLS Policies for time bank transactions
CREATE POLICY "Users can view transactions they're involved in"
  ON public.time_bank_transactions FOR SELECT
  USING (auth.uid() = giver_id OR auth.uid() = receiver_id OR auth.uid() = verified_by);

CREATE POLICY "Users can create transactions as giver"
  ON public.time_bank_transactions FOR INSERT
  WITH CHECK (auth.uid() = giver_id);

-- RLS Policies for trust relations
CREATE POLICY "Users can view trust relations involving them"
  ON public.trust_relations FOR SELECT
  USING (auth.uid() = from_user_id OR auth.uid() = to_user_id);

CREATE POLICY "Users can create trust relations from themselves"
  ON public.trust_relations FOR INSERT
  WITH CHECK (auth.uid() = from_user_id);

CREATE POLICY "Users can update trust relations they created"
  ON public.trust_relations FOR UPDATE
  USING (auth.uid() = from_user_id);

-- Public access for metrics and case studies
CREATE POLICY "Solidarity metrics are viewable by everyone"
  ON public.solidarity_metrics FOR SELECT
  USING (true);

CREATE POLICY "Case studies are viewable by everyone"
  ON public.case_studies FOR SELECT
  USING (true);

-- RLS Policies for reflections
CREATE POLICY "Users can view their own reflections"
  ON public.reflections FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own reflections"
  ON public.reflections FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Insert some sample case studies
INSERT INTO public.case_studies (title, organization, time_period, location, description, key_principles, outcomes, lessons, relevance_score, tags) VALUES
('Survival Programs', 'Black Panther Party', '1966-1982', 'Oakland, CA & National', 'Comprehensive community survival programs including free breakfast for children, free health clinics, and community education.', 
 ARRAY['Community self-determination', 'Meeting basic needs', 'Political education', 'Youth empowerment'], 
 ARRAY['Fed thousands of children daily', 'Provided healthcare to underserved communities', 'Influenced government social programs', 'Built community solidarity'],
 ARRAY['Address immediate needs while building power', 'Community control is essential', 'Programs must be accessible to all'], 
 10, ARRAY['mutual aid', 'food security', 'healthcare', 'community organizing']),

('Cooperation Jackson', 'Cooperation Jackson', '2014-Present', 'Jackson, Mississippi', 'Network of worker cooperatives and community land trusts building economic democracy and community self-determination.',
 ARRAY['Economic democracy', 'Ecological sustainability', 'Community land ownership', 'Solidarity economy'],
 ARRAY['Multiple worker cooperatives established', 'Community land trust created', 'Local food systems developed', 'Youth training programs'],
 ARRAY['Start with existing community assets', 'Build alternative institutions', 'Connect economic and political power'],
 9, ARRAY['cooperatives', 'land trust', 'economic democracy', 'solidarity economy']),

('Zapatista Communities', 'EZLN Autonomous Municipalities', '1994-Present', 'Chiapas, Mexico', 'Indigenous autonomous communities practicing direct democracy, collective land ownership, and mutual aid.',
 ARRAY['Autonomy', 'Direct democracy', 'Collective ownership', 'Cultural preservation'],
 ARRAY['Self-governing communities', 'Alternative education systems', 'Community healthcare', 'Sustainable agriculture'],
 ARRAY['Indigenous knowledge is valuable', 'Autonomy requires community organization', 'Alternative economies are possible'],
 8, ARRAY['indigenous rights', 'autonomy', 'direct democracy', 'collective ownership']);

-- Function to calculate trust network density
CREATE OR REPLACE FUNCTION calculate_network_density()
RETURNS DECIMAL AS $$
DECLARE
  total_users INTEGER;
  total_connections INTEGER;
  max_possible_connections INTEGER;
BEGIN
  SELECT COUNT(*) INTO total_users FROM public.profiles;
  SELECT COUNT(*) INTO total_connections FROM public.trust_relations;
  
  IF total_users <= 1 THEN
    RETURN 0;
  END IF;
  
  max_possible_connections := total_users * (total_users - 1);
  
  RETURN ROUND((total_connections::DECIMAL / max_possible_connections::DECIMAL), 4);
END;
$$ LANGUAGE plpgsql;

-- Function to update daily solidarity metrics
CREATE OR REPLACE FUNCTION update_solidarity_metrics()
RETURNS VOID AS $$
DECLARE
  today DATE := CURRENT_DATE;
  hours_today DECIMAL;
  active_users INTEGER;
  network_density DECIMAL;
  total_hours DECIMAL;
  trust_size INTEGER;
  vulnerability_ratio DECIMAL;
BEGIN
  -- Calculate metrics
  SELECT COALESCE(SUM(hours), 0) INTO hours_today
  FROM public.time_bank_transactions
  WHERE DATE(created_at) = today;
  
  SELECT COUNT(DISTINCT user_id) INTO active_users
  FROM public.mutual_aid_posts
  WHERE DATE(created_at) = today;
  
  SELECT calculate_network_density() INTO network_density;
  
  SELECT COALESCE(SUM(time_bank_hours), 0) INTO total_hours
  FROM public.profiles;
  
  SELECT COUNT(*) INTO trust_size
  FROM public.trust_relations;
  
  -- Calculate vulnerability support ratio
  SELECT 
    CASE 
      WHEN COUNT(*) > 0 THEN 
        COUNT(CASE WHEN array_length(vulnerability_factors, 1) > 0 THEN 1 END)::DECIMAL / COUNT(*)::DECIMAL
      ELSE 0
    END INTO vulnerability_ratio
  FROM public.profiles;
  
  -- Insert or update metrics
  INSERT INTO public.solidarity_metrics (
    date, total_hours_exchanged, active_participants, network_density,
    wealth_circulated, trust_network_size, vulnerability_support_ratio
  )
  VALUES (
    today, hours_today, active_users, network_density,
    total_hours * 15, trust_size, vulnerability_ratio -- $15/hour estimate
  )
  ON CONFLICT (date) DO UPDATE SET
    total_hours_exchanged = EXCLUDED.total_hours_exchanged,
    active_participants = EXCLUDED.active_participants,
    network_density = EXCLUDED.network_density,
    wealth_circulated = EXCLUDED.wealth_circulated,
    trust_network_size = EXCLUDED.trust_network_size,
    vulnerability_support_ratio = EXCLUDED.vulnerability_support_ratio;
END;
$$ LANGUAGE plpgsql;
