
-- Create enum types for garden management
CREATE TYPE public.plot_status AS ENUM (
  'available',
  'assigned',
  'reserved',
  'maintenance'
);

CREATE TYPE public.sun_exposure AS ENUM (
  'full_sun',
  'partial_sun',
  'partial_shade',
  'full_shade'
);

CREATE TYPE public.soil_type AS ENUM (
  'clay',
  'sandy',
  'loamy',
  'rocky',
  'amended'
);

CREATE TYPE public.crop_season AS ENUM (
  'spring',
  'summer',
  'fall',
  'winter',
  'year_round'
);

CREATE TYPE public.work_party_status AS ENUM (
  'planned',
  'active',
  'completed',
  'cancelled'
);

-- Garden plots table
CREATE TABLE public.garden_plots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  plot_number TEXT NOT NULL UNIQUE,
  size_sqft NUMERIC NOT NULL,
  sun_exposure sun_exposure NOT NULL,
  soil_type soil_type NOT NULL,
  status plot_status DEFAULT 'available',
  current_gardener_id UUID REFERENCES public.profiles(id),
  assigned_date DATE,
  coordinates JSONB, -- GeoJSON polygon coordinates
  notes TEXT,
  water_access BOOLEAN DEFAULT false,
  raised_bed BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Plot waitlist table
CREATE TABLE public.plot_waitlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  plot_preferences JSONB, -- preferred size, sun exposure, etc.
  priority_score INTEGER DEFAULT 0,
  join_date DATE DEFAULT CURRENT_DATE,
  notes TEXT,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Plot history table
CREATE TABLE public.plot_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  plot_id UUID REFERENCES public.garden_plots(id) ON DELETE CASCADE NOT NULL,
  gardener_id UUID REFERENCES public.profiles(id),
  start_date DATE NOT NULL,
  end_date DATE,
  crops_grown TEXT[],
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Current plantings table
CREATE TABLE public.current_plantings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  plot_id UUID REFERENCES public.garden_plots(id) ON DELETE CASCADE NOT NULL,
  gardener_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  crop_name TEXT NOT NULL,
  variety TEXT,
  planted_date DATE NOT NULL,
  expected_harvest_date DATE,
  actual_harvest_date DATE,
  notes TEXT,
  companion_plants TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Harvest sharing table
CREATE TABLE public.harvest_sharing (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  gardener_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  crop_name TEXT NOT NULL,
  quantity TEXT NOT NULL,
  unit TEXT NOT NULL, -- 'lbs', 'bunches', 'items', etc.
  available_date DATE DEFAULT CURRENT_DATE,
  location_description TEXT,
  notes TEXT,
  claimed_by UUID REFERENCES public.profiles(id),
  claimed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Work parties table
CREATE TABLE public.work_parties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  scheduled_date TIMESTAMP WITH TIME ZONE NOT NULL,
  duration_hours INTEGER DEFAULT 3,
  max_participants INTEGER,
  organizer_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  status work_party_status DEFAULT 'planned',
  tasks JSONB, -- array of task objects
  tools_needed TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Work party participants table
CREATE TABLE public.work_party_participants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  work_party_id UUID REFERENCES public.work_parties(id) ON DELETE CASCADE NOT NULL,
  participant_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  signed_up_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  attended BOOLEAN,
  UNIQUE(work_party_id, participant_id)
);

-- Seed library table
CREATE TABLE public.seed_library (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  variety_name TEXT NOT NULL,
  crop_type TEXT NOT NULL,
  donated_by UUID REFERENCES public.profiles(id),
  quantity_available INTEGER DEFAULT 0,
  harvest_year INTEGER,
  germination_rate INTEGER, -- percentage
  planting_instructions TEXT,
  days_to_maturity INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Compost bins table
CREATE TABLE public.compost_bins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  bin_name TEXT NOT NULL,
  location_description TEXT,
  current_stage TEXT, -- 'filling', 'composting', 'ready', 'empty'
  last_turned_date DATE,
  estimated_ready_date DATE,
  temperature NUMERIC,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Garden knowledge base table
CREATE TABLE public.garden_knowledge (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL, -- 'planting', 'pest_control', 'harvesting', 'composting', etc.
  author_id UUID REFERENCES public.profiles(id),
  tags TEXT[],
  helpful_votes INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Bulk orders table
CREATE TABLE public.bulk_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  item_name TEXT NOT NULL,
  supplier TEXT,
  unit_price NUMERIC,
  minimum_quantity INTEGER,
  current_quantity INTEGER DEFAULT 0,
  order_deadline DATE,
  organizer_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  status TEXT DEFAULT 'open', -- 'open', 'closed', 'ordered', 'delivered'
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Bulk order participants table
CREATE TABLE public.bulk_order_participants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  bulk_order_id UUID REFERENCES public.bulk_orders(id) ON DELETE CASCADE NOT NULL,
  participant_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  quantity_requested INTEGER NOT NULL,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(bulk_order_id, participant_id)
);

-- Enable RLS on all tables
ALTER TABLE public.garden_plots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.plot_waitlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.plot_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.current_plantings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.harvest_sharing ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.work_parties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.work_party_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seed_library ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.compost_bins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.garden_knowledge ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bulk_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bulk_order_participants ENABLE ROW LEVEL SECURITY;

-- RLS Policies for garden plots (publicly viewable)
CREATE POLICY "Anyone can view garden plots" ON public.garden_plots FOR SELECT USING (true);
CREATE POLICY "Gardeners can update their assigned plots" ON public.garden_plots 
  FOR UPDATE USING (auth.uid() = current_gardener_id);

-- RLS Policies for plot waitlist
CREATE POLICY "Users can view and manage their waitlist entry" ON public.plot_waitlist 
  FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Anyone can view waitlist for transparency" ON public.plot_waitlist 
  FOR SELECT USING (true);

-- RLS Policies for plot history
CREATE POLICY "Anyone can view plot history" ON public.plot_history FOR SELECT USING (true);
CREATE POLICY "Gardeners can create history entries" ON public.plot_history 
  FOR INSERT WITH CHECK (auth.uid() = gardener_id);

-- RLS Policies for current plantings
CREATE POLICY "Anyone can view current plantings" ON public.current_plantings FOR SELECT USING (true);
CREATE POLICY "Gardeners can manage their plantings" ON public.current_plantings 
  FOR ALL USING (auth.uid() = gardener_id);

-- RLS Policies for harvest sharing
CREATE POLICY "Anyone can view harvest shares" ON public.harvest_sharing FOR SELECT USING (true);
CREATE POLICY "Gardeners can manage their shares" ON public.harvest_sharing 
  FOR ALL USING (auth.uid() = gardener_id OR auth.uid() = claimed_by);

-- RLS Policies for work parties
CREATE POLICY "Anyone can view work parties" ON public.work_parties FOR SELECT USING (true);
CREATE POLICY "Users can create work parties" ON public.work_parties 
  FOR INSERT WITH CHECK (auth.uid() = organizer_id);
CREATE POLICY "Organizers can update their work parties" ON public.work_parties 
  FOR UPDATE USING (auth.uid() = organizer_id);

-- RLS Policies for work party participants
CREATE POLICY "Anyone can view participants" ON public.work_party_participants FOR SELECT USING (true);
CREATE POLICY "Users can manage their participation" ON public.work_party_participants 
  FOR ALL USING (auth.uid() = participant_id);

-- RLS Policies for seed library
CREATE POLICY "Anyone can view seed library" ON public.seed_library FOR SELECT USING (true);
CREATE POLICY "Users can add to seed library" ON public.seed_library 
  FOR INSERT WITH CHECK (auth.uid() = donated_by);
CREATE POLICY "Donors can update their seeds" ON public.seed_library 
  FOR UPDATE USING (auth.uid() = donated_by);

-- RLS Policies for compost bins
CREATE POLICY "Anyone can view compost bins" ON public.compost_bins FOR SELECT USING (true);
CREATE POLICY "Authenticated users can update compost bins" ON public.compost_bins 
  FOR UPDATE USING (auth.uid() IS NOT NULL);

-- RLS Policies for garden knowledge
CREATE POLICY "Anyone can view garden knowledge" ON public.garden_knowledge FOR SELECT USING (true);
CREATE POLICY "Users can create knowledge entries" ON public.garden_knowledge 
  FOR INSERT WITH CHECK (auth.uid() = author_id);
CREATE POLICY "Authors can update their entries" ON public.garden_knowledge 
  FOR UPDATE USING (auth.uid() = author_id);

-- RLS Policies for bulk orders
CREATE POLICY "Anyone can view bulk orders" ON public.bulk_orders FOR SELECT USING (true);
CREATE POLICY "Users can create bulk orders" ON public.bulk_orders 
  FOR INSERT WITH CHECK (auth.uid() = organizer_id);
CREATE POLICY "Organizers can update their orders" ON public.bulk_orders 
  FOR UPDATE USING (auth.uid() = organizer_id);

-- RLS Policies for bulk order participants
CREATE POLICY "Anyone can view order participants" ON public.bulk_order_participants FOR SELECT USING (true);
CREATE POLICY "Users can manage their participation in orders" ON public.bulk_order_participants 
  FOR ALL USING (auth.uid() = participant_id);

-- Sample data for garden plots
INSERT INTO public.garden_plots (plot_number, size_sqft, sun_exposure, soil_type, coordinates, water_access, raised_bed) VALUES
('A1', 100, 'full_sun', 'loamy', '{"type":"Polygon","coordinates":[[[-122.4194,37.7749],[-122.4190,37.7749],[-122.4190,37.7745],[-122.4194,37.7745],[-122.4194,37.7749]]]}', true, true),
('A2', 100, 'full_sun', 'loamy', '{"type":"Polygon","coordinates":[[[-122.4190,37.7749],[-122.4186,37.7749],[-122.4186,37.7745],[-122.4190,37.7745],[-122.4190,37.7749]]]}', true, true),
('B1', 150, 'partial_sun', 'clay', '{"type":"Polygon","coordinates":[[[-122.4194,37.7745],[-122.4188,37.7745],[-122.4188,37.7740],[-122.4194,37.7740],[-122.4194,37.7745]]]}', false, false),
('B2', 150, 'partial_sun', 'amended', '{"type":"Polygon","coordinates":[[[-122.4188,37.7745],[-122.4182,37.7745],[-122.4182,37.7740],[-122.4188,37.7740],[-122.4188,37.7745]]]}', false, false),
('C1', 200, 'full_sun', 'sandy', '{"type":"Polygon","coordinates":[[[-122.4194,37.7740],[-122.4186,37.7740],[-122.4186,37.7734],[-122.4194,37.7734],[-122.4194,37.7740]]]}', true, false);

-- Sample compost bins
INSERT INTO public.compost_bins (bin_name, location_description, current_stage, last_turned_date, estimated_ready_date) VALUES
('Bin A', 'Near garden entrance', 'composting', '2024-06-10', '2024-08-10'),
('Bin B', 'Behind tool shed', 'ready', '2024-05-15', '2024-06-15'),
('Bin C', 'Northwest corner', 'filling', '2024-06-12', '2024-09-12');

-- Sample seed library entries
INSERT INTO public.seed_library (variety_name, crop_type, quantity_available, harvest_year, days_to_maturity, planting_instructions) VALUES
('Cherokee Purple', 'Tomato', 25, 2023, 80, 'Start indoors 6-8 weeks before last frost. Transplant after soil warms.'),
('Detroit Dark Red', 'Beet', 50, 2023, 55, 'Direct sow 2-3 weeks before last frost. Succession plant every 2 weeks.'),
('Scarlet Nantes', 'Carrot', 100, 2023, 70, 'Direct sow in loose, deep soil. Keep soil moist until germination.'),
('Provider', 'Green Bean', 40, 2023, 50, 'Direct sow after last frost when soil is warm. Plant 1 inch deep.'),
('Black Beauty', 'Eggplant', 15, 2023, 85, 'Start indoors 8-10 weeks before last frost. Needs warm soil to transplant.');
