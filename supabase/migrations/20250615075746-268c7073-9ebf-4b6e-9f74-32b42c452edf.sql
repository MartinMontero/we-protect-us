
-- Create elder care related tables (avoiding conflicts with existing tables)

-- Elder profiles table
CREATE TABLE public.elder_profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  elder_id UUID REFERENCES auth.users NOT NULL,
  full_name TEXT NOT NULL,
  date_of_birth DATE NOT NULL,
  address TEXT,
  phone_number TEXT,
  mobility_level TEXT CHECK (mobility_level IN ('fully_mobile', 'limited_mobility', 'wheelchair_user', 'bedridden')),
  accessibility_needs TEXT[],
  interests TEXT[],
  hobbies TEXT[],
  dietary_restrictions TEXT[],
  dietary_preferences TEXT[],
  preferred_visit_types TEXT[] CHECK (preferred_visit_types <@ ARRAY['social', 'errands', 'medical', 'tech_help', 'companionship']),
  language_preferences TEXT[],
  emergency_contact_primary JSONB,
  emergency_contact_secondary JSONB,
  medical_notes TEXT,
  special_instructions TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Volunteers/supporters table
CREATE TABLE public.volunteer_profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  volunteer_id UUID REFERENCES auth.users NOT NULL,
  full_name TEXT NOT NULL,
  phone_number TEXT,
  skills TEXT[],
  specializations TEXT[] CHECK (specializations <@ ARRAY['medical_companion', 'tech_support', 'transportation', 'errands', 'social_visits', 'language_help', 'home_maintenance']),
  languages_spoken TEXT[],
  availability_days TEXT[] CHECK (availability_days <@ ARRAY['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']),
  availability_times JSONB, -- {morning: bool, afternoon: bool, evening: bool}
  max_hours_per_week INTEGER DEFAULT 5,
  transportation_available BOOLEAN DEFAULT false,
  background_check_date DATE,
  references_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Support matches table
CREATE TABLE public.support_matches (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  elder_id UUID REFERENCES public.elder_profiles(id) NOT NULL,
  volunteer_id UUID REFERENCES public.volunteer_profiles(id) NOT NULL,
  match_type TEXT CHECK (match_type IN ('regular_visitor', 'task_specific', 'emergency_contact', 'skill_match')),
  match_score INTEGER, -- AI matching confidence 0-100
  status TEXT CHECK (status IN ('pending', 'active', 'paused', 'completed')) DEFAULT 'pending',
  start_date DATE,
  end_date DATE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Visit requests table
CREATE TABLE public.visit_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  elder_id UUID REFERENCES public.elder_profiles(id) NOT NULL,
  requested_by UUID REFERENCES auth.users NOT NULL, -- could be elder or family member
  volunteer_id UUID REFERENCES public.volunteer_profiles(id),
  visit_type TEXT CHECK (visit_type IN ('social', 'errands', 'medical_appointment', 'tech_help', 'emergency', 'group_activity')) NOT NULL,
  scheduled_date TIMESTAMP WITH TIME ZONE NOT NULL,
  duration_minutes INTEGER DEFAULT 60,
  location_type TEXT CHECK (location_type IN ('elder_home', 'community_center', 'medical_facility', 'virtual', 'public_space')) DEFAULT 'elder_home',
  location_address TEXT,
  description TEXT,
  special_requirements TEXT[],
  urgency_level TEXT CHECK (urgency_level IN ('low', 'medium', 'high', 'emergency')) DEFAULT 'medium',
  status TEXT CHECK (status IN ('pending', 'assigned', 'confirmed', 'in_progress', 'completed', 'cancelled')) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Visit logs table
CREATE TABLE public.visit_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  visit_request_id UUID REFERENCES public.visit_requests(id) NOT NULL,
  volunteer_id UUID REFERENCES public.volunteer_profiles(id) NOT NULL,
  elder_id UUID REFERENCES public.elder_profiles(id) NOT NULL,
  actual_start_time TIMESTAMP WITH TIME ZONE,
  actual_end_time TIMESTAMP WITH TIME ZONE,
  visit_notes TEXT,
  elder_mood TEXT CHECK (elder_mood IN ('excellent', 'good', 'fair', 'poor', 'concerning')),
  tasks_completed TEXT[],
  follow_up_needed BOOLEAN DEFAULT false,
  follow_up_notes TEXT,
  family_notification_sent BOOLEAN DEFAULT false,
  emergency_triggered BOOLEAN DEFAULT false,
  photos TEXT[], -- URLs to photos if any
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Elder group activities table (renamed to avoid conflict)
CREATE TABLE public.elder_group_activities (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  organizer_id UUID REFERENCES auth.users NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  activity_type TEXT CHECK (activity_type IN ('cards', 'crafts', 'exercise', 'music', 'discussion', 'games', 'educational', 'intergenerational')),
  scheduled_date TIMESTAMP WITH TIME ZONE NOT NULL,
  duration_minutes INTEGER DEFAULT 120,
  location_type TEXT CHECK (location_type IN ('community_center', 'virtual', 'elder_home', 'outdoor')) DEFAULT 'community_center',
  location_address TEXT,
  max_participants INTEGER DEFAULT 10,
  accessibility_features TEXT[],
  materials_needed TEXT[],
  cost_per_person NUMERIC DEFAULT 0,
  status TEXT CHECK (status IN ('planned', 'open_registration', 'full', 'in_progress', 'completed', 'cancelled')) DEFAULT 'planned',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Elder group activity participants table
CREATE TABLE public.elder_group_activity_participants (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  activity_id UUID REFERENCES public.elder_group_activities(id) NOT NULL,
  participant_id UUID REFERENCES auth.users NOT NULL,
  participant_type TEXT CHECK (participant_type IN ('elder', 'volunteer', 'family_member')) NOT NULL,
  registration_date TIMESTAMP WITH TIME ZONE DEFAULT now(),
  attendance_status TEXT CHECK (attendance_status IN ('registered', 'confirmed', 'attended', 'no_show', 'cancelled')) DEFAULT 'registered',
  special_needs TEXT,
  transportation_needed BOOLEAN DEFAULT false,
  UNIQUE(activity_id, participant_id)
);

-- Family connections table
CREATE TABLE public.family_connections (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  elder_id UUID REFERENCES public.elder_profiles(id) NOT NULL,
  family_member_id UUID REFERENCES auth.users NOT NULL,
  relationship TEXT CHECK (relationship IN ('child', 'spouse', 'sibling', 'grandchild', 'other_family', 'friend', 'caregiver')) NOT NULL,
  notification_preferences JSONB, -- {visit_updates: bool, emergency_only: bool, weekly_summary: bool}
  emergency_contact_priority INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Resource directory table
CREATE TABLE public.senior_resources (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  resource_name TEXT NOT NULL,
  category TEXT CHECK (category IN ('transportation', 'meals', 'medical', 'home_maintenance', 'benefits', 'social_services', 'emergency', 'technology')) NOT NULL,
  description TEXT,
  contact_phone TEXT,
  contact_email TEXT,
  website_url TEXT,
  address TEXT,
  service_area TEXT[],
  eligibility_requirements TEXT,
  cost_info TEXT,
  hours_of_operation JSONB,
  languages_supported TEXT[],
  accessibility_features TEXT[],
  rating NUMERIC CHECK (rating >= 0 AND rating <= 5),
  verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Story recordings table for family archives
CREATE TABLE public.story_recordings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  elder_id UUID REFERENCES public.elder_profiles(id) NOT NULL,
  recorded_by UUID REFERENCES auth.users NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  recording_url TEXT, -- URL to audio/video file
  transcript TEXT,
  topics TEXT[],
  date_recorded TIMESTAMP WITH TIME ZONE DEFAULT now(),
  is_public BOOLEAN DEFAULT false,
  family_access_only BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Celebration reminders table
CREATE TABLE public.celebration_reminders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  elder_id UUID REFERENCES public.elder_profiles(id) NOT NULL,
  celebration_type TEXT CHECK (celebration_type IN ('birthday', 'anniversary', 'holiday', 'personal_milestone', 'family_event')) NOT NULL,
  title TEXT NOT NULL,
  celebration_date DATE NOT NULL,
  description TEXT,
  reminder_days_before INTEGER[] DEFAULT ARRAY[7, 3, 1], -- days before to send reminders
  notification_recipients UUID[], -- array of user IDs to notify
  is_recurring BOOLEAN DEFAULT false,
  recurring_interval TEXT CHECK (recurring_interval IN ('yearly', 'monthly')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.elder_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.volunteer_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.support_matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.visit_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.visit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.elder_group_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.elder_group_activity_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.family_connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.senior_resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.story_recordings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.celebration_reminders ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Elder profiles policies
CREATE POLICY "Users can view elder profiles they're connected to" ON public.elder_profiles
  FOR SELECT USING (
    elder_id = auth.uid() OR
    id IN (
      SELECT elder_id FROM public.family_connections 
      WHERE family_member_id = auth.uid()
    ) OR
    id IN (
      SELECT elder_id FROM public.support_matches 
      WHERE volunteer_id IN (
        SELECT id FROM public.volunteer_profiles WHERE volunteer_id = auth.uid()
      )
    )
  );

CREATE POLICY "Elders can update their own profiles" ON public.elder_profiles
  FOR UPDATE USING (elder_id = auth.uid());

CREATE POLICY "Elders and family can insert profiles" ON public.elder_profiles
  FOR INSERT WITH CHECK (elder_id = auth.uid());

-- Volunteer profiles policies
CREATE POLICY "Volunteers can manage their own profiles" ON public.volunteer_profiles
  FOR ALL USING (volunteer_id = auth.uid());

CREATE POLICY "Users can view volunteer profiles for matching" ON public.volunteer_profiles
  FOR SELECT TO authenticated USING (true);

-- Support matches policies
CREATE POLICY "Users can view their support matches" ON public.support_matches
  FOR SELECT USING (
    elder_id IN (
      SELECT id FROM public.elder_profiles WHERE elder_id = auth.uid()
    ) OR
    volunteer_id IN (
      SELECT id FROM public.volunteer_profiles WHERE volunteer_id = auth.uid()
    ) OR
    elder_id IN (
      SELECT elder_id FROM public.family_connections WHERE family_member_id = auth.uid()
    )
  );

-- Visit requests policies
CREATE POLICY "Users can view relevant visit requests" ON public.visit_requests
  FOR SELECT USING (
    requested_by = auth.uid() OR
    elder_id IN (
      SELECT id FROM public.elder_profiles WHERE elder_id = auth.uid()
    ) OR
    volunteer_id IN (
      SELECT id FROM public.volunteer_profiles WHERE volunteer_id = auth.uid()
    ) OR
    elder_id IN (
      SELECT elder_id FROM public.family_connections WHERE family_member_id = auth.uid()
    )
  );

CREATE POLICY "Users can create visit requests" ON public.visit_requests
  FOR INSERT WITH CHECK (
    requested_by = auth.uid() OR
    elder_id IN (
      SELECT elder_id FROM public.family_connections WHERE family_member_id = auth.uid()
    )
  );

-- Visit logs policies
CREATE POLICY "Users can view relevant visit logs" ON public.visit_logs
  FOR SELECT USING (
    elder_id IN (
      SELECT id FROM public.elder_profiles WHERE elder_id = auth.uid()
    ) OR
    volunteer_id IN (
      SELECT id FROM public.volunteer_profiles WHERE volunteer_id = auth.uid()
    ) OR
    elder_id IN (
      SELECT elder_id FROM public.family_connections WHERE family_member_id = auth.uid()
    )
  );

CREATE POLICY "Volunteers can create visit logs" ON public.visit_logs
  FOR INSERT WITH CHECK (
    volunteer_id IN (
      SELECT id FROM public.volunteer_profiles WHERE volunteer_id = auth.uid()
    )
  );

-- Elder group activities policies
CREATE POLICY "Users can view elder group activities" ON public.elder_group_activities
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Users can create elder group activities" ON public.elder_group_activities
  FOR INSERT WITH CHECK (organizer_id = auth.uid());

CREATE POLICY "Organizers can update their elder activities" ON public.elder_group_activities
  FOR UPDATE USING (organizer_id = auth.uid());

-- Elder group activity participants policies
CREATE POLICY "Users can view elder activity participants" ON public.elder_group_activity_participants
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Users can register for elder activities" ON public.elder_group_activity_participants
  FOR INSERT WITH CHECK (participant_id = auth.uid());

CREATE POLICY "Users can update their elder activity participation" ON public.elder_group_activity_participants
  FOR UPDATE USING (participant_id = auth.uid());

-- Family connections policies
CREATE POLICY "Family members can view connections" ON public.family_connections
  FOR SELECT USING (
    family_member_id = auth.uid() OR
    elder_id IN (
      SELECT id FROM public.elder_profiles WHERE elder_id = auth.uid()
    )
  );

CREATE POLICY "Family members can create connections" ON public.family_connections
  FOR INSERT WITH CHECK (family_member_id = auth.uid());

-- Senior resources policies (public read access)
CREATE POLICY "Anyone can view senior resources" ON public.senior_resources
  FOR SELECT TO authenticated USING (true);

-- Story recordings policies
CREATE POLICY "Users can view family story recordings" ON public.story_recordings
  FOR SELECT USING (
    elder_id IN (
      SELECT id FROM public.elder_profiles WHERE elder_id = auth.uid()
    ) OR
    recorded_by = auth.uid() OR
    elder_id IN (
      SELECT elder_id FROM public.family_connections WHERE family_member_id = auth.uid()
    )
  );

CREATE POLICY "Users can create story recordings" ON public.story_recordings
  FOR INSERT WITH CHECK (recorded_by = auth.uid());

-- Celebration reminders policies
CREATE POLICY "Users can view relevant celebration reminders" ON public.celebration_reminders
  FOR SELECT USING (
    elder_id IN (
      SELECT id FROM public.elder_profiles WHERE elder_id = auth.uid()
    ) OR
    elder_id IN (
      SELECT elder_id FROM public.family_connections WHERE family_member_id = auth.uid()
    ) OR
    auth.uid() = ANY(notification_recipients)
  );

CREATE POLICY "Family members can create celebration reminders" ON public.celebration_reminders
  FOR INSERT WITH CHECK (
    elder_id IN (
      SELECT elder_id FROM public.family_connections WHERE family_member_id = auth.uid()
    ) OR
    elder_id IN (
      SELECT id FROM public.elder_profiles WHERE elder_id = auth.uid()
    )
  );
