
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface CreateProjectModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onProjectCreated: () => void;
}

export const CreateProjectModal: React.FC<CreateProjectModalProps> = ({
  open,
  onOpenChange,
  onProjectCreated
}) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    project_images: '',
    project_video_url: '',
    source_code_url: '',
    demo_url: '',
    collaboration_open: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      const imagesArray = formData.project_images
        .split(',')
        .map(url => url.trim())
        .filter(url => url.length > 0);

      const { error } = await supabase
        .from('project_showcase')
        .insert({
          creator_id: user.id,
          title: formData.title,
          description: formData.description,
          project_images: imagesArray,
          project_video_url: formData.project_video_url || null,
          source_code_url: formData.source_code_url || null,
          demo_url: formData.demo_url || null,
          collaboration_open: formData.collaboration_open
        });

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Project shared successfully"
      });

      onProjectCreated();
      onOpenChange(false);
      setFormData({
        title: '',
        description: '',
        project_images: '',
        project_video_url: '',
        source_code_url: '',
        demo_url: '',
        collaboration_open: false
      });
    } catch (error) {
      console.error('Error creating project:', error);
      toast({
        title: "Error",
        description: "Failed to share project",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Share Your Project</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Project Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter project title..."
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe your project, what it does, technologies used..."
                rows={4}
                required
              />
            </div>

            <div>
              <Label htmlFor="images">Project Images (comma-separated URLs)</Label>
              <Textarea
                id="images"
                value={formData.project_images}
                onChange={(e) => setFormData(prev => ({ ...prev, project_images: e.target.value }))}
                placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                rows={2}
              />
            </div>

            <div>
              <Label htmlFor="video">Project Video URL (Optional)</Label>
              <Input
                id="video"
                type="url"
                value={formData.project_video_url}
                onChange={(e) => setFormData(prev => ({ ...prev, project_video_url: e.target.value }))}
                placeholder="https://youtube.com/watch?v=..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="demo">Demo URL (Optional)</Label>
                <Input
                  id="demo"
                  type="url"
                  value={formData.demo_url}
                  onChange={(e) => setFormData(prev => ({ ...prev, demo_url: e.target.value }))}
                  placeholder="https://myproject.com"
                />
              </div>

              <div>
                <Label htmlFor="source">Source Code URL (Optional)</Label>
                <Input
                  id="source"
                  type="url"
                  value={formData.source_code_url}
                  onChange={(e) => setFormData(prev => ({ ...prev, source_code_url: e.target.value }))}
                  placeholder="https://github.com/username/project"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="collaboration"
                checked={formData.collaboration_open}
                onCheckedChange={(checked) => 
                  setFormData(prev => ({ ...prev, collaboration_open: checked as boolean }))
                }
              />
              <Label htmlFor="collaboration">Open for collaboration</Label>
            </div>
          </div>

          <div className="flex gap-3">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={loading || !formData.title || !formData.description}
            >
              {loading ? 'Sharing...' : 'Share Project'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
