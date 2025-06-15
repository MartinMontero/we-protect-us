import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Users, CheckCircle, Clock } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description: string;
  assignee: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in_progress' | 'completed';
  created_at: Date;
}

interface Message {
  id: string;
  author: string;
  content: string;
  timestamp: Date;
}

export const CollaborationTools: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Review flagged content',
      description: 'Multiple posts have been flagged and need moderation review',
      assignee: 'Sarah M.',
      priority: 'high',
      status: 'pending',
      created_at: new Date(Date.now() - 2 * 60 * 60 * 1000),
    },
    {
      id: '2',
      title: 'Update volunteer matching algorithm',
      description: 'Implement the new matching criteria based on AI insights',
      assignee: 'Alex K.',
      priority: 'medium',
      status: 'in_progress',
      created_at: new Date(Date.now() - 24 * 60 * 60 * 1000),
    },
  ]);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      author: 'Admin Team',
      content: 'Weekly admin meeting scheduled for Friday 2PM',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
    },
    {
      id: '2',
      author: 'Sarah M.',
      content: 'Completed review of reported posts - all clear',
      timestamp: new Date(Date.now() - 60 * 60 * 1000),
    },
  ]);

  const [newTask, setNewTask] = useState({ 
    title: '', 
    description: '', 
    assignee: '', 
    priority: 'medium' as Task['priority'] 
  });
  const [newMessage, setNewMessage] = useState('');

  const addTask = () => {
    if (newTask.title.trim()) {
      const task: Task = {
        id: Date.now().toString(),
        ...newTask,
        status: 'pending',
        created_at: new Date(),
      };
      setTasks([task, ...tasks]);
      setNewTask({ title: '', description: '', assignee: '', priority: 'medium' });
    }
  };

  const updateTaskStatus = (taskId: string, status: Task['status']) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status } : task
    ));
  };

  const addMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        author: 'You',
        content: newMessage,
        timestamp: new Date(),
      };
      setMessages([message, ...messages]);
      setNewMessage('');
    }
  };

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Task Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            Task Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Add new task */}
          <div className="space-y-3 mb-6 p-4 border rounded-lg bg-gray-50">
            <Input
              placeholder="Task title"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            />
            <Textarea
              placeholder="Task description"
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              rows={2}
            />
            <div className="flex gap-2">
              <Input
                placeholder="Assignee"
                value={newTask.assignee}
                onChange={(e) => setNewTask({ ...newTask, assignee: e.target.value })}
                className="flex-1"
              />
              <select
                value={newTask.priority}
                onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as Task['priority'] })}
                className="px-3 py-2 border rounded-md"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
              <Button onClick={addTask}>Add Task</Button>
            </div>
          </div>

          {/* Task list */}
          <div className="space-y-3">
            {tasks.map((task) => (
              <div key={task.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">{task.title}</h3>
                  <div className="flex gap-1">
                    <Badge className={getPriorityColor(task.priority)}>
                      {task.priority}
                    </Badge>
                    <Badge className={getStatusColor(task.status)}>
                      {task.status.replace('_', ' ')}
                    </Badge>
                  </div>
                </div>
                <p className="text-gray-600 mb-2">{task.description}</p>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    Assigned to: {task.assignee} • {task.created_at.toLocaleString()}
                  </div>
                  <div className="flex gap-1">
                    {task.status !== 'completed' && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateTaskStatus(task.id, 
                          task.status === 'pending' ? 'in_progress' : 'completed'
                        )}
                      >
                        {task.status === 'pending' ? 'Start' : 'Complete'}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Team Communication */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Team Communication
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Add new message */}
          <div className="flex gap-2 mb-6">
            <Input
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addMessage()}
              className="flex-1"
            />
            <Button onClick={addMessage}>Send</Button>
          </div>

          {/* Message list */}
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {messages.map((message) => (
              <div key={message.id} className="p-3 border rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-sm">{message.author}</span>
                  <span className="text-xs text-gray-500">
                    {message.timestamp.toLocaleTimeString()}
                  </span>
                </div>
                <p className="text-gray-700">{message.content}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
