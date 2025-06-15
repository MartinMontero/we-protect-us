
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { TimeBankParticipants } from './timebank/TimeBankParticipants';
import { RecentExchanges } from './timebank/RecentExchanges';
import { SkillVerificationSystem } from './timebank/SkillVerificationSystem';

export const TimeBank: React.FC = () => {
  const [searchSkill, setSearchSkill] = useState('');

  const timeBank = [
    {
      id: '1',
      participantName: 'Maya Chen',
      skillsOffered: ['Web Development', 'Garden Design', 'Language Tutoring'],
      skillsNeeded: ['Childcare', 'Home Repairs'],
      hoursAvailable: 15,
      hoursUsed: 8,
      trustScore: 4.8,
      verifications: 12
    },
    {
      id: '2',
      participantName: 'Carlos Rodriguez',
      skillsOffered: ['Carpentry', 'Plumbing', 'Auto Repair'],
      skillsNeeded: ['Tax Preparation', 'Computer Help'],
      hoursAvailable: 20,
      hoursUsed: 18,
      trustScore: 4.9,
      verifications: 25
    },
    {
      id: '3',
      participantName: 'Aisha Patel',
      skillsOffered: ['Accounting', 'Legal Advice', 'Meal Prep'],
      skillsNeeded: ['Moving Help', 'Pet Care'],
      hoursAvailable: 12,
      hoursUsed: 5,
      trustScore: 4.7,
      verifications: 8
    }
  ];

  const recentTransactions = [
    {
      id: '1',
      from: 'Maya Chen',
      to: 'Carlos Rodriguez',
      skill: 'Web Development',
      hours: 3,
      date: '2024-06-14',
      status: 'completed'
    },
    {
      id: '2',
      from: 'Aisha Patel',
      to: 'Maya Chen',
      skill: 'Tax Preparation',
      hours: 2,
      date: '2024-06-13',
      status: 'completed'
    },
    {
      id: '3',
      from: 'Carlos Rodriguez',
      to: 'Aisha Patel',
      skill: 'Home Repairs',
      hours: 4,
      date: '2024-06-12',
      status: 'in_progress'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Time Banking System</h3>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Join Time Bank
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TimeBankParticipants
          searchSkill={searchSkill}
          setSearchSkill={setSearchSkill}
          timeBank={timeBank}
        />
        <RecentExchanges transactions={recentTransactions} />
      </div>

      <SkillVerificationSystem />
    </div>
  );
};
