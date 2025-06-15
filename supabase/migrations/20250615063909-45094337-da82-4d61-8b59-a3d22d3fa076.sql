
-- Create enum types for childcare system
CREATE TYPE public.verification_status AS ENUM (
  'pending',
  'documents_submitted',
  'references_pending',
  'background_check_pending',
  'approved',
  'rejected',
  'suspended'
);

CREATE TYPE public.care_request_status AS ENUM (
  'open',
  'accepted',
  'confirmed',
  'in_progress',
  'completed',
  'cancelled'
);

CREATE TYPE public.emergency_contact_relationship AS ENUM (
  'parent',
  'guardian',
  'grandparent',
  'relative',
  'family_friend',
  'other'
);

CREATE TYPE public.session_status AS ENUM (
  'scheduled',
  'checked_in',
  'in_progress',
  'checked_out',
  'completed',
  'emergency'
);

CREATE TYPE public.skill_badge_type AS ENUM (
  'cpr_certified',
  'first_aid',
  'special_needs',
  'infant_care',
  'toddler_specialist',
  'homework_help',
  'music_activities',
  'outdoor_activities'
);

-- Enhanced profiles table for childcare members
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS phone_number TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS address TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS verification_status verification_status DEFAULT 'pending';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS background_check_date DATE;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS care_philosophy TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS years_experience INTEGER;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS max_children_capacity INTEGER DEFAULT 3;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS care_points_balance INTEGER DEFAULT 0;

-- Children profiles table
CREATE TABLE public.children (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  first_name TEXT NOT NULL,
  birth_date DATE NOT NULL,
  gender TEXT,
  medical_conditions TEXT[],
  allergies TEXT[],
  dietary_restrictions TEXT[],
  medications JSONB, -- {name, dosage, frequency, instructions}
  emergency_instructions TEXT,
  special_needs TEXT,
  favorite_activities TEXT[],
  photo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Emergency contacts table
CREATE TABLE public.emergency_contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  child_id UUID REFERENCES public.children(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  relationship emergency_contact_relationship NOT NULL,
  phone_number TEXT NOT NULL,
  email TEXT,
  address TEXT,
  is_authorized_pickup BOOLEAN DEFAULT false,
  priority_order INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Member verification table
CREATE TABLE public.member_verification (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  member_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  documents_submitted BOOLEAN DEFAULT false,
  references_verified INTEGER DEFAULT 0,
  background_check_completed BOOLEAN DEFAULT false,
  background_check_provider TEXT,
  verification_notes TEXT,
  verified_by UUID REFERENCES public.profiles(id),
  verification_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- References table
CREATE TABLE public.member_references (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  member_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  reference_name TEXT NOT NULL,
  reference_phone TEXT NOT NULL,
  reference_email TEXT,
  relationship TEXT NOT NULL,
  contacted_date TIMESTAMP WITH TIME ZONE,
  verified BOOLEAN DEFAULT false,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Skill badges table
CREATE TABLE public.member_skill_badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  member_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  badge_type skill_badge_type NOT NULL,
  certification_date DATE,
  expiry_date DATE,
  certificate_url TEXT,
  verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(member_id, badge_type)
);

-- Care requests table
CREATE TABLE public.care_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  requesting_parent_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  caregiver_id UUID REFERENCES public.profiles(id),
  children_ids UUID[] NOT NULL,
  start_time TIMESTAMP WITH TIME ZONE NOT NULL,
  end_time TIMESTAMP WITH TIME ZONE NOT NULL,
  location_address TEXT NOT NULL,
  location_lat NUMERIC,
  location_lng NUMERIC,
  care_instructions TEXT,
  emergency_instructions TEXT,
  points_offered INTEGER NOT NULL,
  status care_request_status DEFAULT 'open',
  is_recurring BOOLEAN DEFAULT false,
  recurring_pattern JSONB, -- {frequency, days_of_week, until_date}
  last_minute_request BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Care sessions table (actual care events)
CREATE TABLE public.care_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  care_request_id UUID REFERENCES public.care_requests(id) ON DELETE CASCADE NOT NULL,
  caregiver_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  parent_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  children_ids UUID[] NOT NULL,
  scheduled_start TIMESTAMP WITH TIME ZONE NOT NULL,
  scheduled_end TIMESTAMP WITH TIME ZONE NOT NULL,
  actual_start TIMESTAMP WITH TIME ZONE,
  actual_end TIMESTAMP WITH TIME ZONE,
  check_in_photo_url TEXT,
  check_out_photo_url TEXT,
  location_lat NUMERIC,
  location_lng NUMERIC,
  status session_status DEFAULT 'scheduled',
  session_notes TEXT,
  incident_reports JSONB,
  points_earned INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Care points transactions
CREATE TABLE public.care_points_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  member_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  care_session_id UUID REFERENCES public.care_sessions(id),
  points_change INTEGER NOT NULL, -- positive for earning, negative for spending
  transaction_type TEXT NOT NULL, -- 'earned', 'spent', 'bonus', 'penalty', 'adjustment'
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Secure messaging table
CREATE TABLE public.care_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  care_session_id UUID REFERENCES public.care_sessions(id) ON DELETE CASCADE NOT NULL,
  sender_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  message_content TEXT NOT NULL,
  message_type TEXT DEFAULT 'text', -- 'text', 'photo', 'location', 'emergency'
  attachment_url TEXT,
  is_emergency BOOLEAN DEFAULT false,
  read_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Reviews and testimonials
CREATE TABLE public.caregiver_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  care_session_id UUID REFERENCES public.care_sessions(id) ON DELETE CASCADE NOT NULL,
  reviewer_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  caregiver_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5) NOT NULL,
  review_text TEXT,
  would_recommend BOOLEAN,
  tags TEXT[], -- 'reliable', 'great_with_kids', 'communicative', etc.
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Group activities/events
CREATE TABLE public.group_activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organizer_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  activity_type TEXT NOT NULL, -- 'playground', 'story_time', 'field_trip', 'birthday_party'
  scheduled_date TIMESTAMP WITH TIME ZONE NOT NULL,
  location_name TEXT,
  location_address TEXT,
  location_lat NUMERIC,
  location_lng NUMERIC,
  max_children INTEGER,
  age_min INTEGER,
  age_max INTEGER,
  cost_per_child NUMERIC DEFAULT 0,
  requires_permission_slip BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Activity participants
CREATE TABLE public.activity_participants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  activity_id UUID REFERENCES public.group_activities(id) ON DELETE CASCADE NOT NULL,
  parent_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  children_ids UUID[] NOT NULL,
  permission_slip_signed BOOLEAN DEFAULT false,
  special_instructions TEXT,
  emergency_contact_override JSONB,
  signed_up_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(activity_id, parent_id)
);

-- Consent and liability forms
CREATE TABLE public.consent_forms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  child_id UUID REFERENCES public.children(id) ON DELETE CASCADE NOT NULL,
  form_type TEXT NOT NULL, -- 'general_care', 'medical_consent', 'photo_release', 'liability_waiver'
  form_version TEXT NOT NULL,
  signed_date TIMESTAMP WITH TIME ZONE NOT NULL,
  digital_signature TEXT,
  witness_signature TEXT,
  form_data JSONB,
  expires_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.children ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.emergency_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.member_verification ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.member_references ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.member_skill_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.care_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.care_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.care_points_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.care_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.caregiver_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.group_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.consent_forms ENABLE ROW LEVEL SECURITY;

-- RLS Policies for children (very restrictive)
CREATE POLICY "Parents can view their own children" ON public.children 
  FOR SELECT USING (auth.uid() = parent_id);
CREATE POLICY "Parents can manage their own children" ON public.children 
  FOR ALL USING (auth.uid() = parent_id);

-- Caregivers can view children they're caring for
CREATE POLICY "Caregivers can view children during sessions" ON public.children 
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.care_sessions cs 
      WHERE cs.caregiver_id = auth.uid() 
      AND id = ANY(cs.children_ids)
      AND cs.status IN ('scheduled', 'checked_in', 'in_progress')
    )
  );

-- RLS Policies for emergency contacts
CREATE POLICY "Parents can manage emergency contacts for their children" ON public.emergency_contacts 
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.children c 
      WHERE c.id = child_id AND c.parent_id = auth.uid()
    )
  );

-- Caregivers can view emergency contacts during active sessions
CREATE POLICY "Caregivers can view emergency contacts during sessions" ON public.emergency_contacts 
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.care_sessions cs 
      JOIN public.children c ON c.id = child_id
      WHERE cs.caregiver_id = auth.uid() 
      AND c.id = ANY(cs.children_ids)
      AND cs.status IN ('scheduled', 'checked_in', 'in_progress')
    )
  );

-- RLS Policies for member verification
CREATE POLICY "Members can view their own verification" ON public.member_verification 
  FOR SELECT USING (auth.uid() = member_id);
CREATE POLICY "Verified members can view verification status of others" ON public.member_verification 
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles p 
      WHERE p.id = auth.uid() AND p.verification_status = 'approved'
    )
  );

-- RLS Policies for care requests
CREATE POLICY "Members can view relevant care requests" ON public.care_requests 
  FOR SELECT USING (
    auth.uid() = requesting_parent_id OR 
    auth.uid() = caregiver_id OR
    EXISTS (
      SELECT 1 FROM public.profiles p 
      WHERE p.id = auth.uid() AND p.verification_status = 'approved'
    )
  );

CREATE POLICY "Parents can create care requests" ON public.care_requests 
  FOR INSERT WITH CHECK (auth.uid() = requesting_parent_id);

CREATE POLICY "Parents and caregivers can update relevant requests" ON public.care_requests 
  FOR UPDATE USING (auth.uid() = requesting_parent_id OR auth.uid() = caregiver_id);

-- RLS Policies for care sessions
CREATE POLICY "Session participants can view sessions" ON public.care_sessions 
  FOR SELECT USING (auth.uid() = caregiver_id OR auth.uid() = parent_id);

CREATE POLICY "Session participants can update sessions" ON public.care_sessions 
  FOR UPDATE USING (auth.uid() = caregiver_id OR auth.uid() = parent_id);

-- RLS Policies for secure messaging
CREATE POLICY "Session participants can view messages" ON public.care_messages 
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.care_sessions cs 
      WHERE cs.id = care_session_id 
      AND (cs.caregiver_id = auth.uid() OR cs.parent_id = auth.uid())
    )
  );

CREATE POLICY "Session participants can send messages" ON public.care_messages 
  FOR INSERT WITH CHECK (
    auth.uid() = sender_id AND
    EXISTS (
      SELECT 1 FROM public.care_sessions cs 
      WHERE cs.id = care_session_id 
      AND (cs.caregiver_id = auth.uid() OR cs.parent_id = auth.uid())
    )
  );

-- RLS Policies for reviews
CREATE POLICY "Anyone can view reviews" ON public.caregiver_reviews FOR SELECT USING (true);
CREATE POLICY "Parents can create reviews for their sessions" ON public.caregiver_reviews 
  FOR INSERT WITH CHECK (
    auth.uid() = reviewer_id AND
    EXISTS (
      SELECT 1 FROM public.care_sessions cs 
      WHERE cs.id = care_session_id AND cs.parent_id = auth.uid()
    )
  );

-- RLS Policies for group activities
CREATE POLICY "Verified members can view activities" ON public.group_activities 
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles p 
      WHERE p.id = auth.uid() AND p.verification_status = 'approved'
    )
  );

CREATE POLICY "Verified members can create activities" ON public.group_activities 
  FOR INSERT WITH CHECK (
    auth.uid() = organizer_id AND
    EXISTS (
      SELECT 1 FROM public.profiles p 
      WHERE p.id = auth.uid() AND p.verification_status = 'approved'
    )
  );

-- Sample data for testing
INSERT INTO public.children (parent_id, first_name, birth_date, allergies, medical_conditions) 
SELECT id, 'Emma', '2019-03-15', ARRAY['peanuts'], ARRAY['asthma'] 
FROM public.profiles LIMIT 1;

INSERT INTO public.children (parent_id, first_name, birth_date, dietary_restrictions) 
SELECT id, 'Liam', '2021-07-22', ARRAY['vegetarian'] 
FROM public.profiles LIMIT 1;
