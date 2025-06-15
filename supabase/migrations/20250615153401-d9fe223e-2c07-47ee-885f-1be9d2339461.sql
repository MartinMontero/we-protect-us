
-- Create enum types for food-related data
CREATE TYPE food_asset_type AS ENUM ('garden', 'fruit_tree', 'nut_tree', 'foraging_spot', 'chicken_coop', 'beehive', 'indoor_growing');
CREATE TYPE harvest_season AS ENUM ('spring', 'summer', 'fall', 'winter', 'year_round');
CREATE TYPE distribution_type AS ENUM ('pantry', 'fridge', 'mobile', 'gleaning', 'meal_share');
CREATE TYPE crisis_priority AS ENUM ('low', 'medium', 'high', 'critical');

-- Food Assets table for mapping all food production locations
CREATE TABLE public.food_assets (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  asset_name TEXT NOT NULL,
  asset_type food_asset_type NOT NULL,
  location_lat NUMERIC NOT NULL,
  location_lng NUMERIC NOT NULL,
  location_description TEXT,
  owner_id UUID REFERENCES auth.users NOT NULL,
  is_public BOOLEAN DEFAULT true,
  harvest_seasons harvest_season[] DEFAULT ARRAY[]::harvest_season[],
  crops_varieties TEXT[],
  estimated_yield_per_season TEXT,
  sustainability_notes TEXT,
  access_instructions TEXT,
  contact_method TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Distribution Points table for food pantries, fridges, etc.
CREATE TABLE public.food_distribution_points (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  point_name TEXT NOT NULL,
  distribution_type distribution_type NOT NULL,
  location_lat NUMERIC NOT NULL,
  location_lng NUMERIC NOT NULL,
  address TEXT NOT NULL,
  manager_id UUID REFERENCES auth.users,
  operating_hours JSONB,
  current_inventory JSONB,
  capacity_info JSONB,
  temperature_sensor_id TEXT,
  last_restocked TIMESTAMP WITH TIME ZONE,
  accessibility_features TEXT[],
  contact_info JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Food Production Plans table for community planning
CREATE TABLE public.food_production_plans (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  plan_name TEXT NOT NULL,
  target_season harvest_season NOT NULL,
  coordinator_id UUID REFERENCES auth.users NOT NULL,
  target_crops JSONB NOT NULL,
  participating_assets UUID[],
  community_goals TEXT,
  planting_schedule JSONB,
  estimated_harvest JSONB,
  resource_needs JSONB,
  status TEXT DEFAULT 'planning',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Knowledge Base table for growing guides and resources
CREATE TABLE public.food_knowledge_base (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL,
  tags TEXT[],
  author_id UUID REFERENCES auth.users,
  climate_zones TEXT[],
  growing_seasons harvest_season[],
  difficulty_level TEXT,
  resource_links JSONB,
  helpful_votes INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Crisis Response Plans table
CREATE TABLE public.food_crisis_response (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  response_name TEXT NOT NULL,
  coordinator_id UUID REFERENCES auth.users NOT NULL,
  crisis_type TEXT NOT NULL,
  priority_level crisis_priority DEFAULT 'medium',
  affected_area JSONB,
  vulnerable_households UUID[],
  volunteer_needs JSONB,
  resource_allocation JSONB,
  distribution_schedule JSONB,
  status TEXT DEFAULT 'planned',
  activation_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Gleaning Coordination table
CREATE TABLE public.gleaning_opportunities (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  location_name TEXT NOT NULL,
  asset_id UUID REFERENCES food_assets,
  coordinator_id UUID REFERENCES auth.users NOT NULL,
  available_produce TEXT NOT NULL,
  estimated_quantity TEXT,
  harvest_date DATE NOT NULL,
  volunteer_spots_needed INTEGER DEFAULT 3,
  current_volunteers INTEGER DEFAULT 0,
  equipment_needed TEXT[],
  transportation_needed BOOLEAN DEFAULT false,
  distribution_plan TEXT,
  status TEXT DEFAULT 'open',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Recipe Exchange table
CREATE TABLE public.recipe_exchange (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  recipe_name TEXT NOT NULL,
  contributor_id UUID REFERENCES auth.users NOT NULL,
  ingredients JSONB NOT NULL,
  instructions TEXT NOT NULL,
  prep_time_minutes INTEGER,
  cook_time_minutes INTEGER,
  servings INTEGER,
  seasonal_ingredients TEXT[],
  local_substitutions JSONB,
  nutrition_notes TEXT,
  preservation_method TEXT,
  tags TEXT[],
  helpful_votes INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.food_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.food_distribution_points ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.food_production_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.food_knowledge_base ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.food_crisis_response ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gleaning_opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recipe_exchange ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for food_assets
CREATE POLICY "Anyone can view public food assets" ON public.food_assets
  FOR SELECT USING (is_public = true OR auth.uid() = owner_id);

CREATE POLICY "Users can create their own food assets" ON public.food_assets
  FOR INSERT WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Users can update their own food assets" ON public.food_assets
  FOR UPDATE USING (auth.uid() = owner_id);

CREATE POLICY "Users can delete their own food assets" ON public.food_assets
  FOR DELETE USING (auth.uid() = owner_id);

-- Create RLS policies for food_distribution_points
CREATE POLICY "Anyone can view distribution points" ON public.food_distribution_points
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create distribution points" ON public.food_distribution_points
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Managers can update their distribution points" ON public.food_distribution_points
  FOR UPDATE USING (auth.uid() = manager_id OR auth.uid() IS NOT NULL);

-- Create RLS policies for other tables (basic authenticated access)
CREATE POLICY "Authenticated users can access production plans" ON public.food_production_plans
  FOR ALL USING (auth.uid() IS NOT NULL);

CREATE POLICY "Anyone can view knowledge base" ON public.food_knowledge_base
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can contribute to knowledge base" ON public.food_knowledge_base
  FOR INSERT WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Authors can update their knowledge articles" ON public.food_knowledge_base
  FOR UPDATE USING (auth.uid() = author_id);

CREATE POLICY "Authenticated users can access crisis response" ON public.food_crisis_response
  FOR ALL USING (auth.uid() IS NOT NULL);

CREATE POLICY "Anyone can view gleaning opportunities" ON public.gleaning_opportunities
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create gleaning opportunities" ON public.gleaning_opportunities
  FOR INSERT WITH CHECK (auth.uid() = coordinator_id);

CREATE POLICY "Coordinators can update their gleaning opportunities" ON public.gleaning_opportunities
  FOR UPDATE USING (auth.uid() = coordinator_id);

CREATE POLICY "Anyone can view recipes" ON public.recipe_exchange
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can contribute recipes" ON public.recipe_exchange
  FOR INSERT WITH CHECK (auth.uid() = contributor_id);

CREATE POLICY "Contributors can update their recipes" ON public.recipe_exchange
  FOR UPDATE USING (auth.uid() = contributor_id);
