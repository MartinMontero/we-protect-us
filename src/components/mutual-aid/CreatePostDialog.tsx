
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { useMutualAidPosts } from '@/hooks/useMutualAidPosts';
import { Plus, X, Calendar, MapPin } from 'lucide-react';
import { PostType, UrgencyLevel, NeedCategory } from '@/types/mutualAid';

const CATEGORIES: { value: NeedCategory; label: string }[] = [
  { value: 'food', label: 'Food' },
  { value: 'housing', label: 'Housing' },
  { value: 'transportation', label: 'Transportation' },
  { value: 'childcare', label: 'Childcare' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'education', label: 'Education' },
  { value: 'technology', label: 'Technology' },
  { value: 'labor', label: 'Labor' },
  { value: 'financial', label: 'Financial' },
  { value: 'emotional_support', label: 'Emotional Support' }
];

export const CreatePostDialog: React.FC = () => {
  const { createPost } = useMutualAidPosts();
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<PostType>('request');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<NeedCategory | ''>('');
  const [urgency, setUrgency] = useState<UrgencyLevel>('medium');
  const [timeCommitment, setTimeCommitment] = useState('');
  const [radiusKm, setRadiusKm] = useState('5');
  const [locationLat, setLocationLat] = useState('');
  const [locationLng, setLocationLng] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [expiresAt, setExpiresAt] = useState('');
  const [skillsNeeded, setSkillsNeeded] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState('');
  const [newTag, setNewTag] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addSkill = () => {
    if (newSkill.trim() && !skillsNeeded.includes(newSkill.trim())) {
      setSkillsNeeded([...skillsNeeded, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkillsNeeded(skillsNeeded.filter(skill => skill !== skillToRemove));
  };

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setCategory('');
    setUrgency('medium');
    setTimeCommitment('');
    setRadiusKm('5');
    setLocationLat('');
    setLocationLng('');
    setContactInfo('');
    setExpiresAt('');
    setSkillsNeeded([]);
    setTags([]);
    setNewSkill('');
    setNewTag('');
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocationLat(position.coords.latitude.toString());
          setLocationLng(position.coords.longitude.toString());
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!category) {
      return;
    }
    
    setIsSubmitting(true);

    const postData = {
      type,
      title: title.trim(),
      description: description.trim(),
      category,
      urgency,
      time_commitment_hours: timeCommitment ? parseFloat(timeCommitment) : undefined,
      radius_km: radiusKm ? parseInt(radiusKm) : undefined,
      location_lat: locationLat ? parseFloat(locationLat) : undefined,
      location_lng: locationLng ? parseFloat(locationLng) : undefined,
      skills_needed: skillsNeeded.length > 0 ? skillsNeeded : undefined,
      contact_info: contactInfo.trim() || undefined,
      tags: tags.length > 0 ? tags : undefined,
      expires_at: expiresAt ? new Date(expiresAt).toISOString() : undefined,
    };

    const result = await createPost(postData);
    
    if (result) {
      resetForm();
      setOpen(false);
    }

    setIsSubmitting(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      action();
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Create Post
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Mutual Aid Post</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Type</Label>
                  <Select value={type} onValueChange={(value: PostType) => setType(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="request">Request for Help</SelectItem>
                      <SelectItem value="offer">Offer to Help</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Urgency</Label>
                  <Select value={urgency} onValueChange={(value: UrgencyLevel) => setUrgency(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Brief summary of your request/offer"
                  required
                  maxLength={100}
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide details about what you need or what you're offering..."
                  rows={4}
                  required
                  maxLength={1000}
                />
              </div>

              <div>
                <Label>Category</Label>
                <Select value={category} onValueChange={(value: NeedCategory) => setCategory(value)} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="timeCommitment">Time Commitment (hours)</Label>
                  <Input
                    id="timeCommitment"
                    type="number"
                    step="0.5"
                    min="0"
                    max="999"
                    value={timeCommitment}
                    onChange={(e) => setTimeCommitment(e.target.value)}
                    placeholder="e.g., 2"
                  />
                </div>

                <div>
                  <Label htmlFor="radiusKm">Service Radius (km)</Label>
                  <Input
                    id="radiusKm"
                    type="number"
                    min="1"
                    max="100"
                    value={radiusKm}
                    onChange={(e) => setRadiusKm(e.target.value)}
                    placeholder="5"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label>Location (Optional)</Label>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Latitude"
                      value={locationLat}
                      onChange={(e) => setLocationLat(e.target.value)}
                      type="number"
                      step="any"
                    />
                    <Input
                      placeholder="Longitude"
                      value={locationLng}
                      onChange={(e) => setLocationLng(e.target.value)}
                      type="number"
                      step="any"
                    />
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={getCurrentLocation}
                    className="w-full gap-2"
                  >
                    <MapPin className="w-4 h-4" />
                    Use My Current Location
                  </Button>
                </div>
              </div>

              <div>
                <Label htmlFor="contactInfo">Contact Information (Optional)</Label>
                <Textarea
                  id="contactInfo"
                  value={contactInfo}
                  onChange={(e) => setContactInfo(e.target.value)}
                  placeholder="How should people contact you? (email, phone, etc.)"
                  rows={2}
                  maxLength={200}
                />
              </div>

              <div>
                <Label htmlFor="expiresAt">Expires At (Optional)</Label>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <Input
                    id="expiresAt"
                    type="datetime-local"
                    value={expiresAt}
                    onChange={(e) => setExpiresAt(e.target.value)}
                    min={new Date().toISOString().slice(0, 16)}
                  />
                </div>
              </div>

              <div>
                <Label>Skills Needed/Offered</Label>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Input
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      placeholder="Add a skill..."
                      onKeyPress={(e) => handleKeyPress(e, addSkill)}
                      maxLength={50}
                    />
                    <Button type="button" onClick={addSkill} size="sm" disabled={!newSkill.trim()}>
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skillsNeeded.map((skill) => (
                      <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                        {skill}
                        <X
                          className="w-3 h-3 cursor-pointer"
                          onClick={() => removeSkill(skill)}
                        />
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <Label>Tags</Label>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Input
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      placeholder="Add a tag..."
                      onKeyPress={(e) => handleKeyPress(e, addTag)}
                      maxLength={30}
                    />
                    <Button type="button" onClick={addTag} size="sm" disabled={!newTag.trim()}>
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="flex items-center gap-1">
                        {tag}
                        <X
                          className="w-3 h-3 cursor-pointer"
                          onClick={() => removeTag(tag)}
                        />
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isSubmitting}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting || !category}
              className="flex-1"
            >
              {isSubmitting ? 'Creating...' : `Create ${type === 'request' ? 'Request' : 'Offer'}`}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
