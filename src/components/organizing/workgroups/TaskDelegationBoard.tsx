
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, User, Clock, AlertCircle } from 'lucide-react';

export const TaskDelegationBoard: React.FC = () => {
  const [showCreateTask, setShowCreateTask] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium',
    workgroup: '',
    skills: []
  });

  const tasks = [
    {
      id: '1',
      title: 'Flyer Design for Housing Action',
      description: 'Create multilingual flyers for upcoming housing justice event',
      assignee: 'Maria S.',
      workgroup: 'Housing Justice',
      priority: 'high',
      status: 'in_progress',
      skills: ['Design', 'Translation'],
      deadline: '2025-01-18'
    },
    {
      id: '2',
      title: 'Legal Observer Training',
      description: 'Coordinate training session for new legal observers',
      assignee: null,
      workgroup: 'Community Defense',
      priority: 'medium',
      status: 'open',
      skills: ['Training', 'Legal Knowledge'],
      deadline: '2025-01-22'
    },
    {
      id: '3',
      title: 'Food Distribution Logistics',
      description: 'Plan routes and volunteer coordination for weekly food distribution',
      assignee: 'Jordan K.',
      workgroup: 'Mutual Aid Network',
      priority: 'high',
      status: 'completed',
      skills: ['Logistics', 'Volunteer Management'],
      deadline: '2025-01-15'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'outline';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'open': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4">
      {/* Create Task Button */}
      <div className="flex justify-between items-center">
        <h4 className="font-medium">Task Board</h4>
        <Button onClick={() => setShowCreateTask(!showCreateTask)} className="gap-2">
          <Plus className="w-4 h-4" />
          Create Task
        </Button>
      </div>

      {/* Create Task Form */}
      {showCreateTask && (
        <div className="p-4 border rounded-lg space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Input
              placeholder="Task title..."
              value={newTask.title}
              onChange={(e) => setNewTask({...newTask, title: e.target.value})}
            />
            <Select value={newTask.workgroup} onValueChange={(value) => setNewTask({...newTask, workgroup: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select working group" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="community_defense">Community Defense</SelectItem>
                <SelectItem value="mutual_aid">Mutual Aid Network</SelectItem>
                <SelectItem value="housing_justice">Housing Justice</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Textarea
            placeholder="Task description..."
            value={newTask.description}
            onChange={(e) => setNewTask({...newTask, description: e.target.value})}
          />
          
          <div className="flex gap-2">
            <Button size="sm">Create Task</Button>
            <Button size="sm" variant="outline" onClick={() => setShowCreateTask(false)}>
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Task Cards */}
      <div className="space-y-3">
        {tasks.map((task) => (
          <div key={task.id} className="p-4 border rounded-lg">
            <div className="flex items-start justify-between mb-2">
              <h5 className="font-medium">{task.title}</h5>
              <div className="flex items-center gap-2">
                <Badge variant={getPriorityColor(task.priority)}>
                  {task.priority}
                </Badge>
                <div className={`px-2 py-1 rounded-full text-xs ${getStatusColor(task.status)}`}>
                  {task.status.replace('_', ' ')}
                </div>
              </div>
            </div>
            
            <p className="text-sm text-gray-600 mb-3">{task.description}</p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
              <div className="flex items-center gap-1">
                <User className="w-4 h-4 text-gray-500" />
                <span>{task.assignee || 'Unassigned'}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4 text-gray-500" />
                <span>{task.deadline}</span>
              </div>
              <div>
                <span className="text-gray-500">Group: </span>
                <span>{task.workgroup}</span>
              </div>
              <div>
                <span className="text-gray-500">Skills: </span>
                <span>{task.skills.join(', ')}</span>
              </div>
            </div>
            
            <div className="flex gap-2 mt-3">
              {!task.assignee && (
                <Button size="sm" variant="outline">
                  Claim Task
                </Button>
              )}
              <Button size="sm" variant="outline">
                View Details
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
