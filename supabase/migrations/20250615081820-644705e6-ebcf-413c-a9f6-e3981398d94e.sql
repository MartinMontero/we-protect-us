
-- Create disaster preparedness and response tables (fixed syntax error)

-- Households/families registry
CREATE TABLE public.households (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  location_lat NUMERIC,
  location_lng NUMERIC,
  primary_contact_id UUID REFERENCES auth.users NOT NULL,
  household_size INTEGER DEFAULT 1,
  special_needs_members INTEGER DEFAULT 0,
  pets_count INTEGER DEFAULT 0,
  livestock_count INTEGER DEFAULT 0,
  emergency_contact_external JSONB, -- out-of-area emergency contact
  accessibility_requirements TEXT[],
  languages_spoken TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Preparedness checklist items
CREATE TABLE public.preparedness_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  household_id UUID REFERENCES public.households(id) NOT NULL,
  category TEXT CHECK (category IN ('water', 'food', 'medical', 'tools', 'communication', 'shelter', 'documents', 'pets', 'lighting', 'sanitation')) NOT NULL,
  item_name TEXT NOT NULL,
  recommended_quantity TEXT,
  current_quantity TEXT,
  expiration_date DATE,
  location_stored TEXT,
  notes TEXT,
  checked BOOLEAN DEFAULT false,
  last_checked_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Community resource inventory
CREATE TABLE public.community_resources (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  owner_id UUID REFERENCES auth.users NOT NULL,
  household_id UUID REFERENCES public.households(id),
  resource_type TEXT CHECK (resource_type IN ('generator', 'medical_supplies', 'tools', 'transportation', 'shelter_space', 'communication', 'water_storage', 'food_supplies')) NOT NULL,
  resource_name TEXT NOT NULL,
  description TEXT,
  capacity TEXT, -- "seats 7", "20kW", "sleeps 4", etc.
  availability_status TEXT CHECK (availability_status IN ('available', 'in_use', 'needs_repair', 'unavailable')) DEFAULT 'available',
  location_description TEXT,
  location_lat NUMERIC,
  location_lng NUMERIC,
  access_instructions TEXT, -- how to access during emergency
  contact_preference TEXT CHECK (contact_preference IN ('phone', 'radio', 'in_person', 'app')) DEFAULT 'app',
  sharing_conditions TEXT, -- "fuel not included", "trained operator required", etc.
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Community member skills registry
CREATE TABLE public.member_skills (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  skill_category TEXT CHECK (skill_category IN ('medical', 'radio', 'construction', 'electrical', 'search_rescue', 'childcare', 'eldercare', 'mechanical', 'logistics', 'translation', 'counseling')) NOT NULL,
  skill_name TEXT NOT NULL,
  proficiency_level TEXT CHECK (proficiency_level IN ('basic', 'intermediate', 'advanced', 'professional')) NOT NULL,
  certifications TEXT[],
  years_experience INTEGER,
  available_for_emergency BOOLEAN DEFAULT true,
  equipment_owned TEXT[], -- related equipment they have
  notes TEXT,
  verified_by UUID REFERENCES auth.users,
  verified_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Emergency alerts and communications
CREATE TABLE public.emergency_alerts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  sender_id UUID REFERENCES auth.users NOT NULL,
  alert_type TEXT CHECK (alert_type IN ('warning', 'evacuation', 'shelter', 'all_clear', 'resource_request', 'safety_check', 'information')) NOT NULL,
  severity TEXT CHECK (severity IN ('low', 'medium', 'high', 'critical')) NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  affected_areas TEXT[], -- geographic areas affected
  expiration_time TIMESTAMP WITH TIME ZONE,
  communication_methods TEXT[] DEFAULT ARRAY['app', 'sms'], -- app, sms, radio, loudspeaker
  target_languages TEXT[] DEFAULT ARRAY['en'],
  attachments TEXT[], -- URLs to images, maps, documents
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Evacuation routes and plans
CREATE TABLE public.evacuation_routes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  route_name TEXT NOT NULL,
  origin_area TEXT NOT NULL,
  destination_area TEXT NOT NULL,
  route_coordinates JSONB, -- array of lat/lng points
  route_description TEXT,
  estimated_travel_time INTEGER, -- minutes
  road_conditions TEXT,
  capacity_vehicles_per_hour INTEGER,
  accessibility_level TEXT CHECK (accessibility_level IN ('walking_only', 'bicycle_friendly', 'vehicle_accessible', 'wheelchair_accessible')) NOT NULL,
  hazard_warnings TEXT[],
  alternative_route_ids UUID[],
  last_surveyed_date DATE,
  status TEXT CHECK (status IN ('open', 'congested', 'damaged', 'closed')) DEFAULT 'open',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Transportation coordination
CREATE TABLE public.transportation_offers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  driver_id UUID REFERENCES auth.users NOT NULL,
  vehicle_type TEXT CHECK (vehicle_type IN ('car', 'suv', 'truck', 'van', 'bus', 'motorcycle', 'bicycle')) NOT NULL,
  seats_available INTEGER NOT NULL,
  pet_friendly BOOLEAN DEFAULT false,
  wheelchair_accessible BOOLEAN DEFAULT false,
  cargo_capacity TEXT,
  fuel_range_miles INTEGER,
  departure_location TEXT NOT NULL,
  departure_time TIMESTAMP WITH TIME ZONE,
  destination_area TEXT,
  route_flexibility TEXT CHECK (route_flexibility IN ('fixed', 'flexible', 'multiple_stops')) DEFAULT 'flexible',
  special_requirements TEXT,
  contact_method TEXT CHECK (contact_method IN ('app', 'phone', 'radio')) DEFAULT 'app',
  status TEXT CHECK (status IN ('available', 'assigned', 'in_transit', 'completed', 'cancelled')) DEFAULT 'available',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Transportation requests
CREATE TABLE public.transportation_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  requester_id UUID REFERENCES auth.users NOT NULL,
  household_id UUID REFERENCES public.households(id),
  pickup_location TEXT NOT NULL,
  pickup_time_preferred TIMESTAMP WITH TIME ZONE,
  destination_area TEXT NOT NULL,
  passengers_count INTEGER NOT NULL,
  pets_count INTEGER DEFAULT 0,
  wheelchair_needed BOOLEAN DEFAULT false,
  medical_priority BOOLEAN DEFAULT false,
  special_needs TEXT,
  luggage_description TEXT,
  assigned_driver_id UUID REFERENCES auth.users,
  transportation_offer_id UUID REFERENCES public.transportation_offers(id),
  status TEXT CHECK (status IN ('pending', 'assigned', 'picked_up', 'delivered', 'cancelled')) DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Emergency shelters
CREATE TABLE public.emergency_shelters (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  shelter_name TEXT NOT NULL,
  manager_id UUID REFERENCES auth.users,
  address TEXT NOT NULL,
  location_lat NUMERIC,
  location_lng NUMERIC,
  shelter_type TEXT CHECK (shelter_type IN ('public', 'private', 'temporary', 'vehicle', 'outdoor')) NOT NULL,
  capacity_people INTEGER NOT NULL,
  current_occupancy INTEGER DEFAULT 0,
  pet_friendly BOOLEAN DEFAULT false,
  wheelchair_accessible BOOLEAN DEFAULT false,
  medical_facilities BOOLEAN DEFAULT false,
  power_available BOOLEAN DEFAULT false,
  water_available BOOLEAN DEFAULT false,
  internet_available BOOLEAN DEFAULT false,
  registration_required BOOLEAN DEFAULT true,
  operating_hours TEXT,
  amenities TEXT[],
  restrictions TEXT[],
  contact_info JSONB,
  status TEXT CHECK (status IN ('open', 'full', 'closed', 'damaged')) DEFAULT 'open',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Safety check-ins
CREATE TABLE public.safety_checkins (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  household_id UUID REFERENCES public.households(id),
  status TEXT CHECK (status IN ('safe', 'needs_help', 'evacuated', 'sheltering', 'unknown')) NOT NULL,
  location_description TEXT,
  location_lat NUMERIC,
  location_lng NUMERIC,
  needs_assistance TEXT[],
  medical_emergency BOOLEAN DEFAULT false,
  additional_info TEXT,
  contact_method TEXT CHECK (contact_method IN ('app', 'sms', 'radio', 'in_person', 'third_party')),
  verified_by UUID REFERENCES auth.users,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Damage assessments (FIXED SYNTAX ERROR HERE)
CREATE TABLE public.damage_reports (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  reporter_id UUID REFERENCES auth.users NOT NULL,
  incident_type TEXT CHECK (incident_type IN ('structural', 'flooding', 'fire', 'utility', 'road', 'environmental', 'medical', 'security')) NOT NULL,
  severity TEXT CHECK (severity IN ('minor', 'moderate', 'major', 'severe')) NOT NULL,
  location_description TEXT NOT NULL,
  location_lat NUMERIC,
  location_lng NUMERIC,
  description TEXT NOT NULL,
  photos TEXT[], -- URLs to uploaded photos
  safety_hazards TEXT[],
  people_affected INTEGER,
  immediate_needs TEXT[],
  access_blocked BOOLEAN DEFAULT false,
  utilities_affected TEXT[], -- power, water, gas, internet, phone
  estimated_repair_time TEXT,
  priority_level INTEGER DEFAULT 3, -- 1-5 scale
  assigned_to UUID REFERENCES auth.users,
  status TEXT CHECK (status IN ('reported', 'assessed', 'in_progress', 'completed', 'unable_to_fix')) DEFAULT 'reported',
  resolution_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Volunteer coordination
CREATE TABLE public.volunteer_assignments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  volunteer_id UUID REFERENCES auth.users NOT NULL,
  coordinator_id UUID REFERENCES auth.users,
  assignment_type TEXT CHECK (assignment_type IN ('damage_assessment', 'search_rescue', 'medical_aid', 'evacuation_support', 'shelter_operations', 'logistics', 'communications', 'cleanup', 'construction', 'counseling')) NOT NULL,
  description TEXT NOT NULL,
  location_description TEXT,
  location_lat NUMERIC,
  location_lng NUMERIC,
  start_time TIMESTAMP WITH TIME ZONE,
  estimated_duration_hours INTEGER,
  skills_required TEXT[],
  equipment_needed TEXT[],
  safety_briefing TEXT,
  team_members UUID[], -- other volunteers on same assignment
  priority_level INTEGER DEFAULT 3,
  status TEXT CHECK (status IN ('pending', 'accepted', 'in_progress', 'completed', 'cancelled')) DEFAULT 'pending',
  completion_notes TEXT,
  hours_logged NUMERIC,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Resource distribution points
CREATE TABLE public.distribution_points (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  point_name TEXT NOT NULL,
  manager_id UUID REFERENCES auth.users,
  address TEXT NOT NULL,
  location_lat NUMERIC,
  location_lng NUMERIC,
  distribution_type TEXT CHECK (distribution_type IN ('food', 'water', 'medical', 'supplies', 'fuel', 'general')) NOT NULL,
  operating_schedule JSONB, -- {days: [], hours: {start: "", end: ""}}
  capacity_people_per_hour INTEGER,
  volunteer_needed_count INTEGER DEFAULT 0,
  current_volunteers_count INTEGER DEFAULT 0,
  access_requirements TEXT[], -- ID, proof of address, etc.
  available_resources JSONB, -- {resource_name: quantity}
  distribution_limits JSONB, -- per person/family limits
  special_accommodations TEXT[],
  status TEXT CHECK (status IN ('setup', 'operational', 'low_supplies', 'closed')) DEFAULT 'setup',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Resource requests
CREATE TABLE public.resource_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  requester_id UUID REFERENCES auth.users NOT NULL,
  household_id UUID REFERENCES public.households(id),
  request_type TEXT CHECK (request_type IN ('food', 'water', 'medical', 'shelter', 'transportation', 'communication', 'tools', 'fuel', 'clothing', 'pet_supplies')) NOT NULL,
  item_description TEXT NOT NULL,
  quantity_needed TEXT,
  urgency TEXT CHECK (urgency IN ('low', 'medium', 'high', 'critical')) NOT NULL,
  location_for_delivery TEXT,
  location_lat NUMERIC,
  location_lng NUMERIC,
  special_requirements TEXT,
  medical_related BOOLEAN DEFAULT false,
  preferred_fulfillment_method TEXT CHECK (preferred_fulfillment_method IN ('pickup', 'delivery', 'either')) DEFAULT 'either',
  fulfilled_by UUID REFERENCES auth.users,
  fulfillment_notes TEXT,
  status TEXT CHECK (status IN ('open', 'assigned', 'partially_filled', 'fulfilled', 'cancelled')) DEFAULT 'open',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Communication networks (for radio operators, mesh networks)
CREATE TABLE public.communication_nodes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  operator_id UUID REFERENCES auth.users NOT NULL,
  node_type TEXT CHECK (node_type IN ('ham_radio', 'mesh_wifi', 'satellite', 'cellular_repeater', 'emergency_phone')) NOT NULL,
  callsign TEXT, -- for ham radio operators
  frequency_bands TEXT[], -- radio frequencies available
  coverage_radius_miles NUMERIC,
  location_description TEXT NOT NULL,
  location_lat NUMERIC,
  location_lng NUMERIC,
  power_source TEXT CHECK (power_source IN ('grid', 'battery', 'generator', 'solar')) NOT NULL,
  backup_power_hours INTEGER,
  operational_status TEXT CHECK (operational_status IN ('active', 'standby', 'maintenance', 'offline')) DEFAULT 'active',
  connected_nodes UUID[], -- other nodes this can reach
  capabilities TEXT[], -- voice, data, internet_gateway, emergency_services
  access_level TEXT CHECK (access_level IN ('public', 'emergency_only', 'licensed_only', 'private')) DEFAULT 'emergency_only',
  contact_schedule JSONB, -- when operator is available
  equipment_details JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.households ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.preparedness_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.member_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.emergency_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.evacuation_routes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transportation_offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transportation_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.emergency_shelters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.safety_checkins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.damage_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.volunteer_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.distribution_points ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resource_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.communication_nodes ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Households policies
CREATE POLICY "Users can view nearby households" ON public.households
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Users can manage their own household" ON public.households
  FOR ALL USING (primary_contact_id = auth.uid());

-- Preparedness items policies
CREATE POLICY "Users can manage their household preparedness" ON public.preparedness_items
  FOR ALL USING (
    household_id IN (
      SELECT id FROM public.households WHERE primary_contact_id = auth.uid()
    )
  );

-- Community resources policies
CREATE POLICY "Users can view community resources" ON public.community_resources
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Users can manage their own resources" ON public.community_resources
  FOR ALL USING (owner_id = auth.uid());

-- Member skills policies
CREATE POLICY "Users can view community skills" ON public.member_skills
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Users can manage their own skills" ON public.member_skills
  FOR ALL USING (user_id = auth.uid());

-- Emergency alerts policies (public for emergency situations)
CREATE POLICY "Anyone can view emergency alerts" ON public.emergency_alerts
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authorized users can create alerts" ON public.emergency_alerts
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- Evacuation routes policies (public information)
CREATE POLICY "Anyone can view evacuation routes" ON public.evacuation_routes
  FOR SELECT TO authenticated USING (true);

-- Transportation policies
CREATE POLICY "Users can view transportation offers" ON public.transportation_offers
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Users can manage their transportation offers" ON public.transportation_offers
  FOR ALL USING (driver_id = auth.uid());

CREATE POLICY "Users can view transportation requests" ON public.transportation_requests
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Users can manage their transportation requests" ON public.transportation_requests
  FOR ALL USING (requester_id = auth.uid() OR assigned_driver_id = auth.uid());

-- Emergency shelters policies (public information)
CREATE POLICY "Anyone can view emergency shelters" ON public.emergency_shelters
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Shelter managers can update their shelters" ON public.emergency_shelters
  FOR UPDATE USING (manager_id = auth.uid());

-- Safety check-ins policies
CREATE POLICY "Users can view safety check-ins" ON public.safety_checkins
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Users can create their own check-ins" ON public.safety_checkins
  FOR INSERT WITH CHECK (user_id = auth.uid());

-- Damage reports policies
CREATE POLICY "Users can view damage reports" ON public.damage_reports
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Users can create damage reports" ON public.damage_reports
  FOR INSERT WITH CHECK (reporter_id = auth.uid());

CREATE POLICY "Users can update their own damage reports" ON public.damage_reports
  FOR UPDATE USING (reporter_id = auth.uid() OR assigned_to = auth.uid());

-- Volunteer assignments policies
CREATE POLICY "Users can view relevant volunteer assignments" ON public.volunteer_assignments
  FOR SELECT TO authenticated USING (
    volunteer_id = auth.uid() OR 
    coordinator_id = auth.uid() OR
    auth.uid() = ANY(team_members)
  );

CREATE POLICY "Users can manage assignments involving them" ON public.volunteer_assignments
  FOR ALL USING (volunteer_id = auth.uid() OR coordinator_id = auth.uid());

-- Distribution points policies
CREATE POLICY "Users can view distribution points" ON public.distribution_points
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Managers can update their distribution points" ON public.distribution_points
  FOR UPDATE USING (manager_id = auth.uid());

-- Resource requests policies
CREATE POLICY "Users can view resource requests" ON public.resource_requests
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Users can manage their own resource requests" ON public.resource_requests
  FOR ALL USING (requester_id = auth.uid() OR fulfilled_by = auth.uid());

-- Communication nodes policies
CREATE POLICY "Users can view communication nodes" ON public.communication_nodes
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Operators can manage their own nodes" ON public.communication_nodes
  FOR ALL USING (operator_id = auth.uid());

-- Add indexes for performance
CREATE INDEX idx_community_resources_type ON public.community_resources (resource_type);
CREATE INDEX idx_member_skills_category ON public.member_skills (skill_category);
CREATE INDEX idx_emergency_alerts_created ON public.emergency_alerts (created_at DESC);
CREATE INDEX idx_transportation_offers_status ON public.transportation_offers (status, departure_time);
CREATE INDEX idx_safety_checkins_created ON public.safety_checkins (created_at DESC);
CREATE INDEX idx_damage_reports_severity ON public.damage_reports (severity, created_at DESC);
CREATE INDEX idx_resource_requests_urgency ON public.resource_requests (urgency, created_at DESC);
