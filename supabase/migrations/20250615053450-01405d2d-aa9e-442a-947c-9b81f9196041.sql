
-- Create enum types for tool categories and conditions
CREATE TYPE public.tool_category AS ENUM (
  'power_tools',
  'garden_equipment', 
  'kitchen_appliances',
  'camping_gear',
  'party_supplies',
  'electronics',
  'hand_tools',
  'cleaning_equipment',
  'automotive',
  'sports_recreation',
  'home_improvement',
  'art_craft'
);

CREATE TYPE public.tool_condition AS ENUM (
  'excellent',
  'good', 
  'fair',
  'needs_repair',
  'out_of_service'
);

CREATE TYPE public.reservation_status AS ENUM (
  'pending',
  'approved',
  'active',
  'completed',
  'cancelled',
  'overdue'
);

-- Tools table
CREATE TABLE public.tools (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  category tool_category NOT NULL,
  condition tool_condition NOT NULL DEFAULT 'good',
  owner_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  location_description TEXT,
  location_lat NUMERIC,
  location_lng NUMERIC,
  availability_status BOOLEAN DEFAULT true,
  purchase_date DATE,
  estimated_value NUMERIC,
  qr_code TEXT UNIQUE,
  photos TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Tool reservations table
CREATE TABLE public.tool_reservations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tool_id UUID REFERENCES public.tools(id) ON DELETE CASCADE NOT NULL,
  borrower_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  start_date TIMESTAMP WITH TIME ZONE NOT NULL,
  end_date TIMESTAMP WITH TIME ZONE NOT NULL,
  actual_return_date TIMESTAMP WITH TIME ZONE,
  status reservation_status DEFAULT 'pending',
  notes TEXT,
  time_credits_earned NUMERIC DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Maintenance records table
CREATE TABLE public.tool_maintenance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tool_id UUID REFERENCES public.tools(id) ON DELETE CASCADE NOT NULL,
  volunteer_id UUID REFERENCES public.profiles(id),
  maintenance_type TEXT NOT NULL, -- 'repair', 'cleaning', 'inspection', 'upgrade'
  description TEXT NOT NULL,
  cost NUMERIC DEFAULT 0,
  parts_needed TEXT[],
  completed_date TIMESTAMP WITH TIME ZONE,
  photos TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Issue reports table
CREATE TABLE public.tool_issues (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tool_id UUID REFERENCES public.tools(id) ON DELETE CASCADE NOT NULL,
  reporter_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  reservation_id UUID REFERENCES public.tool_reservations(id),
  issue_description TEXT NOT NULL,
  severity TEXT NOT NULL DEFAULT 'minor', -- 'minor', 'major', 'safety_concern'
  photos TEXT[] DEFAULT '{}',
  resolved BOOLEAN DEFAULT false,
  resolution_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.tools ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tool_reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tool_maintenance ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tool_issues ENABLE ROW LEVEL SECURITY;

-- RLS Policies for tools (publicly viewable, owner can edit)
CREATE POLICY "Anyone can view tools" ON public.tools FOR SELECT USING (true);
CREATE POLICY "Users can create tools" ON public.tools FOR INSERT WITH CHECK (auth.uid() = owner_id);
CREATE POLICY "Owners can update their tools" ON public.tools FOR UPDATE USING (auth.uid() = owner_id);
CREATE POLICY "Owners can delete their tools" ON public.tools FOR DELETE USING (auth.uid() = owner_id);

-- RLS Policies for reservations
CREATE POLICY "Users can view their own reservations and tools they own" ON public.tool_reservations 
  FOR SELECT USING (auth.uid() = borrower_id OR auth.uid() IN (SELECT owner_id FROM public.tools WHERE id = tool_id));
CREATE POLICY "Users can create reservations" ON public.tool_reservations FOR INSERT WITH CHECK (auth.uid() = borrower_id);
CREATE POLICY "Borrowers and owners can update reservations" ON public.tool_reservations 
  FOR UPDATE USING (auth.uid() = borrower_id OR auth.uid() IN (SELECT owner_id FROM public.tools WHERE id = tool_id));

-- RLS Policies for maintenance
CREATE POLICY "Anyone can view maintenance records" ON public.tool_maintenance FOR SELECT USING (true);
CREATE POLICY "Users can create maintenance records" ON public.tool_maintenance FOR INSERT WITH CHECK (auth.uid() = volunteer_id);
CREATE POLICY "Volunteers and tool owners can update maintenance" ON public.tool_maintenance 
  FOR UPDATE USING (auth.uid() = volunteer_id OR auth.uid() IN (SELECT owner_id FROM public.tools WHERE id = tool_id));

-- RLS Policies for issues
CREATE POLICY "Tool owners and reporters can view issues" ON public.tool_issues 
  FOR SELECT USING (auth.uid() = reporter_id OR auth.uid() IN (SELECT owner_id FROM public.tools WHERE id = tool_id));
CREATE POLICY "Users can report issues" ON public.tool_issues FOR INSERT WITH CHECK (auth.uid() = reporter_id);
CREATE POLICY "Reporters and tool owners can update issues" ON public.tool_issues 
  FOR UPDATE USING (auth.uid() = reporter_id OR auth.uid() IN (SELECT owner_id FROM public.tools WHERE id = tool_id));

-- Function to generate QR codes (placeholder - would integrate with QR service)
CREATE OR REPLACE FUNCTION generate_tool_qr_code()
RETURNS TRIGGER AS $$
BEGIN
  NEW.qr_code := 'QR_' || NEW.id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-generate QR codes
CREATE TRIGGER generate_qr_trigger
  BEFORE INSERT ON public.tools
  FOR EACH ROW
  EXECUTE FUNCTION generate_tool_qr_code();

-- Function to update time bank credits on completed reservations
CREATE OR REPLACE FUNCTION update_time_credits()
RETURNS TRIGGER AS $$
DECLARE
  owner_user_id UUID;
  hours_borrowed NUMERIC;
BEGIN
  IF NEW.status = 'completed' AND OLD.status != 'completed' THEN
    -- Get tool owner
    SELECT owner_id INTO owner_user_id FROM public.tools WHERE id = NEW.tool_id;
    
    -- Calculate hours borrowed
    hours_borrowed := EXTRACT(EPOCH FROM (NEW.actual_return_date - NEW.start_date)) / 3600;
    
    -- Update time credits for tool owner (they earn credits)
    UPDATE public.profiles 
    SET time_bank_hours = COALESCE(time_bank_hours, 0) + (hours_borrowed * 0.5)
    WHERE id = owner_user_id;
    
    -- Update reservation record
    NEW.time_credits_earned := hours_borrowed * 0.5;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for time credit updates
CREATE TRIGGER time_credits_trigger
  BEFORE UPDATE ON public.tool_reservations
  FOR EACH ROW
  EXECUTE FUNCTION update_time_credits();

-- Insert sample tools data
INSERT INTO public.tools (name, description, category, condition, location_description, estimated_value, photos) VALUES
('DeWalt Circular Saw', '7.25" cordless circular saw with battery and charger', 'power_tools', 'excellent', 'North Park Community Center', 150, '{"https://example.com/saw.jpg"}'),
('Pressure Washer', 'Electric pressure washer, 1800 PSI, great for driveways and decks', 'cleaning_equipment', 'good', 'Sunset District Tool Hub', 200, '{"https://example.com/pressure.jpg"}'),
('Stand Mixer', 'KitchenAid 5-quart stand mixer with dough hook and whisk', 'kitchen_appliances', 'excellent', 'Mission Bay Kitchen Collective', 300, '{"https://example.com/mixer.jpg"}'),
('Camping Tent (4-person)', 'Waterproof 4-person tent with rainfly and footprint', 'camping_gear', 'good', 'Golden Gate Park Ranger Station', 120, '{"https://example.com/tent.jpg"}'),
('Folding Tables (6)', 'Set of 6 folding tables perfect for parties and events', 'party_supplies', 'fair', 'Community Center Storage', 180, '{"https://example.com/tables.jpg"}'),
('Lawn Mower', 'Self-propelled gas lawn mower, recently serviced', 'garden_equipment', 'good', 'Richmond Green Space', 250, '{"https://example.com/mower.jpg"}'),
('Drill Press', 'Benchtop drill press with various bits', 'power_tools', 'excellent', 'Makers Workshop', 180, '{"https://example.com/drill_press.jpg"}'),
('Garden Hoses (50ft)', 'Heavy duty garden hose with spray nozzle', 'garden_equipment', 'good', 'Community Garden Shed', 40, '{"https://example.com/hose.jpg"}'),
('Sound System', 'Portable PA system with wireless mics', 'electronics', 'excellent', 'Cultural Arts Center', 400, '{"https://example.com/sound.jpg"}'),
('Ladder (8ft)', 'Aluminum step ladder, weight rated to 250lbs', 'home_improvement', 'good', 'Hardware Sharing Hub', 80, '{"https://example.com/ladder.jpg"}'),
('Hedge Trimmer', 'Electric hedge trimmer with extension cord', 'garden_equipment', 'good', 'Parkside Tool Library', 75, '{"https://example.com/trimmer.jpg"}'),
('Canopy Tent', '10x10 pop-up canopy for outdoor events', 'party_supplies', 'excellent', 'Event Supplies Collective', 100, '{"https://example.com/canopy.jpg"}'),
('Tool Set', 'Comprehensive mechanic tool set with ratchets and sockets', 'automotive', 'good', 'Auto Repair Cooperative', 200, '{"https://example.com/tools.jpg"}'),
('Projector', 'HD projector with screen and cables', 'electronics', 'excellent', 'Media Center', 350, '{"https://example.com/projector.jpg"}'),
('Chainsaw', 'Gas chainsaw for tree trimming, safety gear included', 'power_tools', 'good', 'Forest Stewardship Hub', 300, '{"https://example.com/chainsaw.jpg"}');
