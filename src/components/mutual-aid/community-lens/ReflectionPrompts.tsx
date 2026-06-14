
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { MessageSquare } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface ReflectionPrompt {
  type: string;
  text: string;
}

interface ReflectionPromptsProps {
  postId?: string;
  postType?: 'request' | 'offer';
  category?: string;
}

export const ReflectionPrompts: React.FC<ReflectionPromptsProps> = ({ 
  postId, 
  postType, 
  category 
}) => {
  const [reflectionPrompts, setReflectionPrompts] = useState<ReflectionPrompt[]>([]);
  const [selectedReflection, setSelectedReflection] = useState<string>('');
  const [reflectionResponse, setReflectionResponse] = useState<string>('');

  useEffect(() => {
    generateReflectionPrompts();
  }, [category, postType]);

  const generateReflectionPrompts = () => {
    const basePrompts = [
      {
        type: 'sovereignty',
        text: 'How does this exchange strengthen community sovereignty and self-determination?'
      },
      {
        type: 'vulnerability',
        text: 'What vulnerabilities does this address, and how might it prevent future crises?'
      },
      {
        type: 'network',
        text: 'How might this interaction expand trust networks and community resilience?'
      },
      {
        type: 'economic',
        text: 'What alternative economic relationships does this create outside of capitalist markets?'
      },
      {
        type: 'power',
        text: 'How does this shift power dynamics and challenge existing hierarchies?'
      }
    ];

    // Customize prompts based on post type and category
    const customPrompts = [...basePrompts];
    
    if (postType === 'request') {
      customPrompts.push({
        type: 'need',
        text: 'What systemic conditions created this need, and how can community action address root causes?'
      });
    }

    if (postType === 'offer') {
      customPrompts.push({
        type: 'abundance',
        text: 'How does sharing this resource demonstrate community abundance over artificial scarcity?'
      });
    }

    if (category === 'food') {
      customPrompts.push({
        type: 'food_sovereignty',
        text: 'How does this contribute to food sovereignty and challenge corporate food systems?'
      });
    }

    setReflectionPrompts(customPrompts);
  };

  const saveReflection = async () => {
    if (!selectedReflection || !reflectionResponse.trim()) return;
    
    try {
      const { error } = await supabase
        .from('reflections')
        .insert({
          user_id: (await supabase.auth.getUser()).data.user?.id,
          mutual_aid_post_id: postId,
          prompt_type: selectedReflection,
          prompt_text: reflectionPrompts.find(p => p.type === selectedReflection)?.text || '',
          response: reflectionResponse
        });

      if (error) throw error;
      
      setReflectionResponse('');
      setSelectedReflection('');
    } catch (error) {
      console.error('Error saving reflection:', error);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <MessageSquare className="w-5 h-5" />
        <h3 className="text-lg font-semibold">Reflective Questions</h3>
      </div>

      <div className="space-y-3">
        {reflectionPrompts.map((prompt) => (
          <Card 
            key={prompt.type}
            className={`cursor-pointer transition-colors ${
              selectedReflection === prompt.type ? 'ring-2 ring-blue-500' : ''
            }`}
            onClick={() => setSelectedReflection(prompt.type)}
          >
            <CardContent className="p-4">
              <p className="text-sm font-medium">{prompt.text}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedReflection && (
        <div className="space-y-3 pt-4 border-t">
          <h4 className="font-semibold">Your Reflection:</h4>
          <Textarea
            placeholder="Share your thoughts on how this exchange contributes to community solidarity..."
            value={reflectionResponse}
            onChange={(e) => setReflectionResponse(e.target.value)}
            rows={4}
          />
          <Button onClick={saveReflection} disabled={!reflectionResponse.trim()}>
            Save Reflection
          </Button>
        </div>
      )}
    </div>
  );
};
