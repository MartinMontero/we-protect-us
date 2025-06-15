
-- Create enums only if they don't exist
DO $$ BEGIN
    CREATE TYPE teaching_style AS ENUM ('hands_on', 'lecture', 'discussion', 'project_based', 'mentoring');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE location_type AS ENUM ('in_person', 'virtual', 'hybrid');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE session_status AS ENUM ('scheduled', 'in_progress', 'completed', 'cancelled');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE course_status AS ENUM ('draft', 'published', 'archived');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE learning_format AS ENUM ('one_on_one', 'small_group', 'large_class', 'self_paced', 'apprenticeship');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Skills catalog table
CREATE TABLE IF NOT EXISTS public.skills_catalog (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  skill_name TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  prerequisites JSONB DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- User skills (what people can teach or want to learn)
CREATE TABLE IF NOT EXISTS public.user_skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users NOT NULL,
  skill_id UUID REFERENCES public.skills_catalog NOT NULL,
  skill_level skill_level NOT NULL,
  is_teaching BOOLEAN DEFAULT false,
  is_learning BOOLEAN DEFAULT false,
  teaching_styles teaching_style[] DEFAULT '{}',
  preferred_location location_type[] DEFAULT '{}',
  hourly_rate DECIMAL(10,2),
  availability_schedule JSONB DEFAULT '{}',
  bio TEXT,
  years_experience INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, skill_id)
);

-- Courses created by educators
CREATE TABLE IF NOT EXISTS public.courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id UUID REFERENCES auth.users NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  skill_ids UUID[] DEFAULT '{}',
  difficulty_level skill_level NOT NULL,
  learning_format learning_format NOT NULL,
  max_participants INTEGER DEFAULT 10,
  duration_weeks INTEGER DEFAULT 4,
  price DECIMAL(10,2) DEFAULT 0,
  location_type location_type NOT NULL,
  location_details TEXT,
  curriculum JSONB DEFAULT '{}',
  resources JSONB DEFAULT '{}',
  status course_status DEFAULT 'draft',
  featured_image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Course lessons/modules
CREATE TABLE IF NOT EXISTS public.course_lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID REFERENCES public.courses NOT NULL,
  lesson_order INTEGER NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL, -- Markdown content
  video_url TEXT,
  resources JSONB DEFAULT '{}',
  assignments JSONB DEFAULT '{}',
  estimated_duration_minutes INTEGER DEFAULT 60,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Course enrollments
CREATE TABLE IF NOT EXISTS public.course_enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID REFERENCES public.courses NOT NULL,
  student_id UUID REFERENCES auth.users NOT NULL,
  enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE,
  progress_percentage INTEGER DEFAULT 0,
  notes TEXT,
  UNIQUE(course_id, student_id)
);

-- Learning sessions (one-on-one, workshops, etc.)
CREATE TABLE IF NOT EXISTS public.learning_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID REFERENCES public.courses,
  teacher_id UUID REFERENCES auth.users NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  skill_ids UUID[] DEFAULT '{}',
  learning_format learning_format NOT NULL,
  location_type location_type NOT NULL,
  location_details TEXT,
  scheduled_start TIMESTAMP WITH TIME ZONE NOT NULL,
  scheduled_end TIMESTAMP WITH TIME ZONE NOT NULL,
  max_participants INTEGER DEFAULT 1,
  current_participants INTEGER DEFAULT 0,
  price DECIMAL(10,2) DEFAULT 0,
  status session_status DEFAULT 'scheduled',
  meeting_url TEXT,
  recording_url TEXT,
  session_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Session participants
CREATE TABLE IF NOT EXISTS public.session_participants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES public.learning_sessions NOT NULL,
  participant_id UUID REFERENCES auth.users NOT NULL,
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  completed BOOLEAN DEFAULT false,
  feedback_rating INTEGER CHECK (feedback_rating >= 1 AND feedback_rating <= 5),
  feedback_text TEXT,
  time_credits_earned DECIMAL(10,2) DEFAULT 0,
  UNIQUE(session_id, participant_id)
);

-- Skill badges and achievements
CREATE TABLE IF NOT EXISTS public.skill_badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  badge_name TEXT NOT NULL,
  description TEXT,
  skill_id UUID REFERENCES public.skills_catalog,
  requirements JSONB DEFAULT '{}',
  badge_image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- User earned badges
CREATE TABLE IF NOT EXISTS public.user_badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users NOT NULL,
  badge_id UUID REFERENCES public.skill_badges NOT NULL,
  earned_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  verified_by UUID REFERENCES auth.users,
  evidence_url TEXT,
  UNIQUE(user_id, badge_id)
);

-- Community knowledge base/wiki
CREATE TABLE IF NOT EXISTS public.knowledge_articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id UUID REFERENCES auth.users NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL, -- Markdown content
  skill_ids UUID[] DEFAULT '{}',
  tags TEXT[] DEFAULT '{}',
  is_featured BOOLEAN DEFAULT false,
  view_count INTEGER DEFAULT 0,
  like_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Project showcase
CREATE TABLE IF NOT EXISTS public.project_showcase (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id UUID REFERENCES auth.users NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  skill_ids UUID[] DEFAULT '{}',
  project_images JSONB DEFAULT '[]',
  project_video_url TEXT,
  source_code_url TEXT,
  demo_url TEXT,
  collaboration_open BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Learning paths
CREATE TABLE IF NOT EXISTS public.learning_paths (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id UUID REFERENCES auth.users NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  skill_ids UUID[] DEFAULT '{}',
  course_sequence JSONB DEFAULT '[]', -- Ordered list of course IDs
  estimated_duration_weeks INTEGER DEFAULT 12,
  difficulty_level skill_level NOT NULL,
  is_public BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- User progress on learning paths
CREATE TABLE IF NOT EXISTS public.learning_path_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users NOT NULL,
  learning_path_id UUID REFERENCES public.learning_paths NOT NULL,
  current_course_id UUID REFERENCES public.courses,
  completed_courses UUID[] DEFAULT '{}',
  started_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE,
  UNIQUE(user_id, learning_path_id)
);

-- Enable Row Level Security
ALTER TABLE public.skills_catalog ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.session_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skill_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.knowledge_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_showcase ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning_paths ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning_path_progress ENABLE ROW LEVEL SECURITY;

-- RLS Policies for skills_catalog (public read)
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'skills_catalog' AND policyname = 'Anyone can view skills catalog') THEN
        CREATE POLICY "Anyone can view skills catalog" ON public.skills_catalog FOR SELECT USING (true);
    END IF;
END $$;

DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'skills_catalog' AND policyname = 'Authenticated users can suggest skills') THEN
        CREATE POLICY "Authenticated users can suggest skills" ON public.skills_catalog FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
    END IF;
END $$;

-- RLS Policies for user_skills
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'user_skills' AND policyname = 'Users can view all public skills') THEN
        CREATE POLICY "Users can view all public skills" ON public.user_skills FOR SELECT USING (true);
    END IF;
END $$;

DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'user_skills' AND policyname = 'Users can manage their own skills') THEN
        CREATE POLICY "Users can manage their own skills" ON public.user_skills FOR ALL USING (auth.uid() = user_id);
    END IF;
END $$;

-- RLS Policies for courses
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'courses' AND policyname = 'Anyone can view published courses') THEN
        CREATE POLICY "Anyone can view published courses" ON public.courses FOR SELECT USING (status = 'published' OR creator_id = auth.uid());
    END IF;
END $$;

DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'courses' AND policyname = 'Users can create courses') THEN
        CREATE POLICY "Users can create courses" ON public.courses FOR INSERT WITH CHECK (auth.uid() = creator_id);
    END IF;
END $$;

DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'courses' AND policyname = 'Creators can update their courses') THEN
        CREATE POLICY "Creators can update their courses" ON public.courses FOR UPDATE USING (auth.uid() = creator_id);
    END IF;
END $$;

-- Insert sample data only if tables are empty (fixed JSONB casting)
INSERT INTO public.skills_catalog (skill_name, category, description) 
SELECT skill_name, category, description FROM (VALUES
    ('React Development', 'Programming', 'Frontend web development using React library'),
    ('Data Analysis', 'Data Science', 'Analyzing and interpreting complex data sets'),
    ('Digital Marketing', 'Marketing', 'Online marketing strategies and tools'),
    ('Graphic Design', 'Design', 'Visual design for print and digital media'),
    ('Public Speaking', 'Communication', 'Effective presentation and speaking skills'),
    ('Project Management', 'Business', 'Planning and executing projects efficiently'),
    ('Photography', 'Creative', 'Digital photography techniques and editing'),
    ('Spanish Language', 'Languages', 'Conversational and written Spanish'),
    ('Yoga Instruction', 'Health & Wellness', 'Teaching yoga poses and meditation'),
    ('Financial Planning', 'Finance', 'Personal and business financial management')
) AS v(skill_name, category, description)
WHERE NOT EXISTS (SELECT 1 FROM public.skills_catalog LIMIT 1);

-- Insert skill badges with proper JSONB casting
INSERT INTO public.skill_badges (badge_name, description, requirements) 
SELECT badge_name, description, requirements::jsonb FROM (VALUES
    ('React Apprentice', 'Completed basic React course and built first app', '{"courses_completed": 1, "projects_created": 1}'),
    ('Data Detective', 'Analyzed 5 different datasets and presented findings', '{"datasets_analyzed": 5, "presentations_given": 1}'),
    ('Design Guru', 'Created 10 design projects with community feedback', '{"projects_created": 10, "avg_rating": 4.0}'),
    ('Public Speaker Pro', 'Delivered 3 public presentations with positive feedback', '{"presentations_given": 3, "avg_rating": 4.5}'),
    ('Mentor Master', 'Successfully mentored 5 learners to completion', '{"mentees_completed": 5}')
) AS v(badge_name, description, requirements)
WHERE NOT EXISTS (SELECT 1 FROM public.skill_badges LIMIT 1);
