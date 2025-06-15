
-- Create enums for various status types
CREATE TYPE public.tenant_issue_status AS ENUM ('open', 'in_progress', 'resolved', 'escalated');
CREATE TYPE public.campaign_status AS ENUM ('planning', 'active', 'completed', 'paused');
CREATE TYPE public.legal_case_status AS ENUM ('intake', 'active', 'resolved', 'referred');
CREATE TYPE public.property_alert_type AS ENUM ('sale', 'development', 'zoning', 'violation');
CREATE TYPE public.environmental_threat_level AS ENUM ('low', 'medium', 'high', 'critical');

-- Tenant organizing tables
CREATE TABLE public.rental_properties (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  address TEXT NOT NULL,
  property_name TEXT,
  landlord_name TEXT,
  management_company TEXT,
  contact_info JSONB,
  location_lat NUMERIC,
  location_lng NUMERIC,
  unit_count INTEGER,
  property_type TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE public.rent_tracking (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tenant_id UUID REFERENCES auth.users NOT NULL,
  property_id UUID REFERENCES public.rental_properties,
  unit_number TEXT,
  monthly_rent NUMERIC NOT NULL,
  lease_start_date DATE,
  lease_end_date DATE,
  rent_increase_notices JSONB DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE public.tenant_issues (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  reporter_id UUID REFERENCES auth.users NOT NULL,
  property_id UUID REFERENCES public.rental_properties,
  issue_type TEXT NOT NULL,
  description TEXT NOT NULL,
  documentation JSONB DEFAULT '[]',
  status public.tenant_issue_status DEFAULT 'open',
  priority_level INTEGER DEFAULT 3,
  date_reported DATE DEFAULT CURRENT_DATE,
  resolution_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Anti-displacement monitoring
CREATE TABLE public.property_alerts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  property_address TEXT NOT NULL,
  alert_type public.property_alert_type NOT NULL,
  alert_details JSONB NOT NULL,
  source_url TEXT,
  notification_sent BOOLEAN DEFAULT false,
  location_lat NUMERIC,
  location_lng NUMERIC,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE public.development_projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_name TEXT NOT NULL,
  developer_name TEXT,
  address TEXT NOT NULL,
  project_type TEXT,
  units_proposed INTEGER,
  affordable_units INTEGER,
  public_hearing_dates JSONB DEFAULT '[]',
  opposition_campaign_id UUID,
  status TEXT DEFAULT 'proposed',
  documents JSONB DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Environmental justice
CREATE TABLE public.pollution_reports (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  reporter_id UUID REFERENCES auth.users,
  location_lat NUMERIC NOT NULL,
  location_lng NUMERIC NOT NULL,
  location_description TEXT NOT NULL,
  pollution_type TEXT NOT NULL,
  description TEXT NOT NULL,
  photos JSONB DEFAULT '[]',
  threat_level public.environmental_threat_level DEFAULT 'medium',
  health_impacts TEXT,
  suspected_source TEXT,
  verified_by_officials BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE public.corporate_violations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_name TEXT NOT NULL,
  violation_type TEXT NOT NULL,
  violation_date DATE NOT NULL,
  regulatory_agency TEXT,
  fine_amount NUMERIC,
  description TEXT,
  source_documents JSONB DEFAULT '[]',
  location_affected TEXT,
  status TEXT DEFAULT 'reported',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Legal support network
CREATE TABLE public.legal_resources (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  content TEXT NOT NULL,
  document_templates JSONB DEFAULT '[]',
  applicable_situations JSONB DEFAULT '[]',
  languages JSONB DEFAULT '["en"]',
  last_updated DATE DEFAULT CURRENT_DATE,
  created_by UUID REFERENCES auth.users,
  helpful_votes INTEGER DEFAULT 0
);

CREATE TABLE public.legal_cases (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID REFERENCES auth.users NOT NULL,
  case_type TEXT NOT NULL,
  case_description TEXT NOT NULL,
  assigned_advocate UUID REFERENCES auth.users,
  status public.legal_case_status DEFAULT 'intake',
  court_dates JSONB DEFAULT '[]',
  documents JSONB DEFAULT '[]',
  notes TEXT,
  emergency_fund_needed NUMERIC DEFAULT 0,
  emergency_fund_raised NUMERIC DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Campaign coordination
CREATE TABLE public.organizing_campaigns (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  campaign_name TEXT NOT NULL,
  campaign_type TEXT NOT NULL,
  description TEXT NOT NULL,
  coordinator_id UUID REFERENCES auth.users NOT NULL,
  target_outcome TEXT,
  target_signatures INTEGER,
  current_signatures INTEGER DEFAULT 0,
  petition_text TEXT,
  campaign_timeline JSONB,
  media_contacts JSONB DEFAULT '[]',
  status public.campaign_status DEFAULT 'planning',
  victory_metrics JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE public.campaign_actions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  campaign_id UUID REFERENCES public.organizing_campaigns NOT NULL,
  action_type TEXT NOT NULL,
  action_name TEXT NOT NULL,
  description TEXT,
  location_address TEXT,
  location_lat NUMERIC,
  location_lng NUMERIC,
  scheduled_date TIMESTAMP WITH TIME ZONE,
  organizer_id UUID REFERENCES auth.users NOT NULL,
  max_participants INTEGER,
  current_participants INTEGER DEFAULT 0,
  security_considerations TEXT,
  legal_observers_needed INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE public.campaign_stories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  campaign_id UUID REFERENCES public.organizing_campaigns NOT NULL,
  storyteller_id UUID REFERENCES auth.users NOT NULL,
  story_title TEXT NOT NULL,
  story_content TEXT NOT NULL,
  is_anonymous BOOLEAN DEFAULT false,
  consent_for_media BOOLEAN DEFAULT false,
  story_tags JSONB DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.rental_properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rent_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tenant_issues ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.property_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.development_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pollution_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.corporate_violations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.legal_resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.legal_cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organizing_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaign_actions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaign_stories ENABLE ROW LEVEL SECURITY;

-- Basic RLS policies for authenticated users
CREATE POLICY "Authenticated users can view rental properties" ON public.rental_properties FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can insert rental properties" ON public.rental_properties FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Users can view their own rent tracking" ON public.rent_tracking FOR ALL TO authenticated USING (auth.uid() = tenant_id);

CREATE POLICY "Users can view and report tenant issues" ON public.tenant_issues FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can insert tenant issues" ON public.tenant_issues FOR INSERT TO authenticated WITH CHECK (auth.uid() = reporter_id);

CREATE POLICY "All users can view property alerts" ON public.property_alerts FOR SELECT TO authenticated USING (true);

CREATE POLICY "All users can view development projects" ON public.development_projects FOR SELECT TO authenticated USING (true);

CREATE POLICY "Users can view pollution reports" ON public.pollution_reports FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can insert pollution reports" ON public.pollution_reports FOR INSERT TO authenticated WITH CHECK (auth.uid() = reporter_id);

CREATE POLICY "All users can view corporate violations" ON public.corporate_violations FOR SELECT TO authenticated USING (true);

CREATE POLICY "All users can view legal resources" ON public.legal_resources FOR SELECT TO authenticated USING (true);

CREATE POLICY "Users can view their own legal cases" ON public.legal_cases FOR ALL TO authenticated USING (auth.uid() = client_id OR auth.uid() = assigned_advocate);

CREATE POLICY "All users can view campaigns" ON public.organizing_campaigns FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can create campaigns" ON public.organizing_campaigns FOR INSERT TO authenticated WITH CHECK (auth.uid() = coordinator_id);

CREATE POLICY "All users can view campaign actions" ON public.campaign_actions FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can create campaign actions" ON public.campaign_actions FOR INSERT TO authenticated WITH CHECK (auth.uid() = organizer_id);

CREATE POLICY "All users can view campaign stories" ON public.campaign_stories FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can create campaign stories" ON public.campaign_stories FOR INSERT TO authenticated WITH CHECK (auth.uid() = storyteller_id);
