
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Plus, ExternalLink, Github, Users, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { CreateProjectModal } from './CreateProjectModal';

interface Project {
  id: string;
  title: string;
  description: string;
  project_images: string[];
  project_video_url: string;
  source_code_url: string;
  demo_url: string;
  collaboration_open: boolean;
  created_at: string;
  profiles?: {
    full_name: string;
    avatar_url: string;
  } | null;
}

interface ProjectShowcaseProps {
  searchQuery: string;
}

export const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({ searchQuery }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [filter, setFilter] = useState<'all' | 'my-projects' | 'open-collab'>('all');

  useEffect(() => {
    fetchProjects();
  }, [filter, searchQuery]);

  const fetchProjects = async () => {
    try {
      let query = supabase
        .from('project_showcase')
        .select(`
          *,
          profiles (
            full_name,
            avatar_url
          )
        `);

      if (filter === 'my-projects' && user) {
        query = query.eq('creator_id', user.id);
      } else if (filter === 'open-collab') {
        query = query.eq('collaboration_open', true);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) throw error;

      // Map the data to match our interface
      const mappedData: Project[] = (data || []).map(project => {
        const profiles = project.profiles;
        const profileData = profiles && 
          typeof profiles === 'object' && 
          'full_name' in profiles && 
          profiles !== null
          ? profiles as { full_name: string; avatar_url: string }
          : null;
          
        return {
          id: project.id,
          title: project.title || '',
          description: project.description || '',
          project_images: Array.isArray(project.project_images) 
            ? project.project_images as string[]
            : project.project_images 
              ? [project.project_images as string]
              : [],
          project_video_url: project.project_video_url || '',
          source_code_url: project.source_code_url || '',
          demo_url: project.demo_url || '',
          collaboration_open: project.collaboration_open || false,
          created_at: project.created_at || '',
          profiles: profileData ? {
            full_name: profileData.full_name || '',
            avatar_url: profileData.avatar_url || ''
          } : null
        };
      });

      let filteredData = mappedData;

      if (searchQuery) {
        filteredData = filteredData.filter(
          project => 
            project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      setProjects(filteredData);
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast({
        title: "Error",
        description: "Failed to load projects",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-32">Loading projects...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            onClick={() => setFilter('all')}
            size="sm"
          >
            All Projects
          </Button>
          <Button
            variant={filter === 'open-collab' ? 'default' : 'outline'}
            onClick={() => setFilter('open-collab')}
            size="sm"
          >
            Open for Collaboration
          </Button>
          <Button
            variant={filter === 'my-projects' ? 'default' : 'outline'}
            onClick={() => setFilter('my-projects')}
            size="sm"
          >
            My Projects
          </Button>
        </div>

        <Button onClick={() => setShowCreateModal(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          Share Project
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="hover:shadow-lg transition-shadow">
            {project.project_images && project.project_images.length > 0 && (
              <div className="h-48 overflow-hidden rounded-t-lg">
                <img 
                  src={project.project_images[0]} 
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg line-clamp-2">{project.title}</CardTitle>
                {project.collaboration_open && (
                  <Badge className="bg-green-100 text-green-800 gap-1">
                    <Users className="w-3 h-3" />
                    Open
                  </Badge>
                )}
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600 line-clamp-3">{project.description}</p>

              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(project.created_at).toLocaleDateString()}
                </div>
              </div>

              {project.profiles && (
                <div className="flex items-center gap-2 pt-2 border-t">
                  <img 
                    src={project.profiles.avatar_url || '/placeholder-avatar.png'} 
                    alt={project.profiles.full_name}
                    className="w-6 h-6 rounded-full"
                  />
                  <span className="text-sm text-gray-600">{project.profiles.full_name}</span>
                </div>
              )}

              <div className="flex flex-wrap gap-2">
                {project.demo_url && (
                  <Button size="sm" variant="outline" asChild>
                    <a href={project.demo_url} target="_blank" rel="noopener noreferrer" className="gap-1">
                      <ExternalLink className="w-3 h-3" />
                      Demo
                    </a>
                  </Button>
                )}
                {project.source_code_url && (
                  <Button size="sm" variant="outline" asChild>
                    <a href={project.source_code_url} target="_blank" rel="noopener noreferrer" className="gap-1">
                      <Github className="w-3 h-3" />
                      Code
                    </a>
                  </Button>
                )}
                {project.collaboration_open && (
                  <Button size="sm" className="gap-1">
                    <Users className="w-3 h-3" />
                    Collaborate
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {projects.length === 0 && (
        <Card className="p-8 text-center">
          <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No Projects Found</h3>
          <p className="text-gray-600 mb-4">
            {searchQuery 
              ? `No projects match "${searchQuery}"`
              : filter === 'my-projects'
                ? "You haven't shared any projects yet"
                : "No projects shared yet"
            }
          </p>
          <Button onClick={() => setShowCreateModal(true)}>
            Share Your First Project
          </Button>
        </Card>
      )}

      <CreateProjectModal
        open={showCreateModal}
        onOpenChange={setShowCreateModal}
        onProjectCreated={fetchProjects}
      />
    </div>
  );
};
