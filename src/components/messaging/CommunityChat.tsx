
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Send, 
  MessageCircle, 
  Users, 
  AlertTriangle,
  Heart,
  Shield,
  Paperclip,
  MapPin
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: Date;
  type: 'text' | 'alert' | 'location' | 'image';
  channel: 'general' | 'emergency' | 'mutual-aid' | 'defense';
  urgent?: boolean;
}

interface ChatChannel {
  id: Message['channel'];
  name: string;
  icon: React.ElementType;
  color: string;
  unreadCount: number;
}

const CommunityChat = () => {
  const { user } = useAuth();
  const [activeChannel, setActiveChannel] = useState<Message['channel']>('general');
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      senderId: 'user1',
      senderName: 'Maria S.',
      content: 'Hey everyone, just wanted to share that the community garden harvest is ready! Come by anytime this weekend.',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      type: 'text',
      channel: 'general'
    },
    {
      id: '2',
      senderId: 'user2',
      senderName: 'Alex R.',
      content: 'URGENT: High wind warning for our area. Please secure outdoor items and check on elderly neighbors.',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      type: 'alert',
      channel: 'emergency',
      urgent: true
    },
    {
      id: '3',
      senderId: 'user3',
      senderName: 'Jordan M.',
      content: 'Looking for help moving this weekend. Can offer pizza and good company! 🍕',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      type: 'text',
      channel: 'mutual-aid'
    },
    {
      id: '4',
      senderId: 'user4',
      senderName: 'Sam L.',
      content: 'Tenant meeting tomorrow at 7 PM. We\'re discussing the rent stabilization campaign.',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      type: 'text',
      channel: 'defense'
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const channels: ChatChannel[] = [
    { id: 'general', name: 'General', icon: MessageCircle, color: 'text-blue-500', unreadCount: 2 },
    { id: 'emergency', name: 'Emergency', icon: AlertTriangle, color: 'text-red-500', unreadCount: 1 },
    { id: 'mutual-aid', name: 'Mutual Aid', icon: Heart, color: 'text-green-500', unreadCount: 1 },
    { id: 'defense', name: 'Defense', icon: Shield, color: 'text-purple-500', unreadCount: 0 }
  ];

  const activeChannelMessages = messages.filter(m => m.channel === activeChannel);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeChannelMessages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !user) return;

    const message: Message = {
      id: Date.now().toString(),
      senderId: user.id,
      senderName: 'You',
      content: newMessage,
      timestamp: new Date(),
      type: 'text',
      channel: activeChannel
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));

    if (minutes < 60) return `${minutes}m ago`;
    return `${hours}h ago`;
  };

  const getMessageStyle = (message: Message) => {
    if (message.urgent) return 'bg-red-50 border-l-4 border-l-red-500';
    if (message.type === 'alert') return 'bg-yellow-50 border-l-4 border-l-yellow-500';
    return 'bg-white';
  };

  return (
    <div className="flex h-96 border rounded-lg overflow-hidden">
      {/* Channel Sidebar */}
      <div className="w-1/3 bg-gray-50 border-r">
        <div className="p-4 border-b">
          <h3 className="font-semibold text-gray-900 flex items-center gap-2">
            <Users className="w-4 h-4" />
            Channels
          </h3>
        </div>
        <div className="space-y-1 p-2">
          {channels.map((channel) => {
            const Icon = channel.icon;
            return (
              <button
                key={channel.id}
                onClick={() => setActiveChannel(channel.id)}
                className={`w-full text-left p-3 rounded-lg transition-colors flex items-center justify-between ${
                  activeChannel === channel.id 
                    ? 'bg-blue-100 text-blue-900' 
                    : 'hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Icon className={`w-4 h-4 ${channel.color}`} />
                  <span className="font-medium"># {channel.name}</span>
                </div>
                {channel.unreadCount > 0 && (
                  <Badge variant="destructive" className="text-xs">
                    {channel.unreadCount}
                  </Badge>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="p-4 border-b bg-white">
          <div className="flex items-center gap-2">
            {(() => {
              const channel = channels.find(c => c.id === activeChannel);
              const Icon = channel?.icon || MessageCircle;
              return (
                <>
                  <Icon className={`w-5 h-5 ${channel?.color}`} />
                  <h3 className="font-semibold">
                    # {channel?.name || 'General'}
                  </h3>
                  <Badge variant="outline" className="text-xs">
                    {activeChannelMessages.length} messages
                  </Badge>
                </>
              );
            })()}
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {activeChannelMessages.map((message) => (
              <div
                key={message.id}
                className={`p-3 rounded-lg ${getMessageStyle(message)}`}
              >
                <div className="flex items-start gap-3">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="text-xs">
                      {message.senderName.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm">{message.senderName}</span>
                      <span className="text-xs text-gray-500">
                        {formatTimestamp(message.timestamp)}
                      </span>
                      {message.urgent && (
                        <Badge variant="destructive" className="text-xs">
                          Urgent
                        </Badge>
                      )}
                    </div>
                    
                    <p className="text-sm text-gray-900">{message.content}</p>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Message Input */}
        <div className="p-4 border-t bg-white">
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder={`Message # ${channels.find(c => c.id === activeChannel)?.name}...`}
              className="flex-1"
            />
            <Button type="button" variant="ghost" size="sm">
              <Paperclip className="w-4 h-4" />
            </Button>
            <Button type="button" variant="ghost" size="sm">
              <MapPin className="w-4 h-4" />
            </Button>
            <Button type="submit" size="sm" disabled={!newMessage.trim()}>
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CommunityChat;
