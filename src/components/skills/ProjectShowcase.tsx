
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { ExternalLink, Github, Plus, User, Calendar, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { CreateProjectModal } from './CreateProjectModal';

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  project_url?: string;
  github_url?: string;
  image_url?: string;
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
  const [filter, setFilter] = useState<'all' | 'my-projects'>('all');

  useEffect(() => {
    fetchProjects();
  }, [filter, searchQuery]);

  const fetchProjects = async () => {
    try {
      let query = supabase
        .from('skill_projects')
        .select(`
          *,
          profiles (
            full_name,
            avatar_url
          )
        `);

      if (filter === 'my-projects' && user) {
        query = query.eq('creator_id', user.id);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) throw error;

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
          technologies: project.technologies || [],
          project_url: project.project_url,
          github_url: project.github_url,
          image_url: project.image_url,
          created_at: project.created_at || '',
          profiles: profileData
        };
      });

      let filteredData = mappedData;

      if (searchQuery) {
        filteredData = filteredData.filter(
          project => 
            project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.technologies.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()))
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
            {project.image_url && (
              <div className="aspect-video overflow-hidden rounded-t-lg">
                <img 
                  src={project.image_url} 
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            <CardHeader>
              <CardTitle className="text-lg">{project.title}</CardTitle>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                {project.profiles && (
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{project.profiles.full_name}</span>
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(project.created_at).toLocaleDateString()}</span>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600 line-clamp-3">{project.description}</p>

              <div className="flex flex-wrap gap-1">
                {project.technologies.map((tech, idx) => (
                  <Badge key={idx} variant="secondary" className="text-xs">
                    {tech}
                  </Badge>
                ))}
              </div>

              <div className="flex gap-2">
                {project.project_url && (
                  <Button size="sm" variant="outline" className="gap-1" asChild>
                    <a href={project.project_url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-3 h-3" />
                      Demo
                    </a>
                  </Button>
                )}
                {project.github_url && (
                  <Button size="sm" variant="outline" className="gap-1" asChild>
                    <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                      <Github className="w-3 h-3" />
                      Code
                    </a>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {projects.length === 0 && (
        <Card className="p-8 text-center">
          <Star className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No Projects Found</h3>
          <p className="text-gray-600 mb-4">
            {searchQuery 
              ? `No projects match "${searchQuery}"`
              : filter === 'my-projects'
                ? "You haven't shared any projects yet"
                : "No projects available yet"
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
