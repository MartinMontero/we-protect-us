
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Scale, AlertTriangle, Shield, BookOpen, Phone } from 'lucide-react';

interface LegalRightsEducationProps {
  securityMode: 'standard' | 'high_risk';
}

export const LegalRightsEducation: React.FC<LegalRightsEducationProps> = ({ securityMode }) => {
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);

  const knowYourRights = [
    {
      category: 'Police Encounters',
      icon: Shield,
      scenarios: [
        {
          title: 'Police Request for Information',
          right: 'You have the right to remain silent',
          action: 'Ask "Am I free to leave?" If yes, leave. If no, invoke your right to remain silent.',
          legal: 'Fifth Amendment protection against self-incrimination'
        },
        {
          title: 'Search Requests',
          right: 'You can refuse consent to search',
          action: 'Clearly state "I do not consent to a search" but do not physically resist.',
          legal: 'Fourth Amendment protection against unreasonable searches'
        }
      ]
    },
    {
      category: 'Digital Privacy',
      icon: Phone,
      scenarios: [
        {
          title: 'Device Search at Border',
          right: 'Limited privacy rights at borders',
          action: 'Consider traveling with a clean device. Know that devices can be searched.',
          legal: 'Border search exception to Fourth Amendment'
        },
        {
          title: 'Subpoena for Digital Records',
          right: 'Right to legal representation',
          action: 'Contact a lawyer immediately. Do not voluntarily provide access.',
          legal: 'Attorney-client privilege and due process rights'
        }
      ]
    },
    {
      category: 'Organizing Rights',
      icon: Users,
      scenarios: [
        {
          title: 'Peaceful Assembly',
          right: 'Right to peaceful protest',
          action: 'Stay peaceful, know permit requirements, designate legal observers.',
          legal: 'First Amendment freedom of assembly'
        },
        {
          title: 'Surveillance of Activists',
          right: 'Right to privacy in lawful activities',
          action: 'Use secure communications, vary meeting locations, trust your instincts.',
          legal: 'First and Fourth Amendment protections'
        }
      ]
    }
  ];

  const emergencyContacts = [
    {
      org: 'National Lawyers Guild',
      number: '(415) 285-1011',
      purpose: 'Legal observer training, protest legal support'
    },
    {
      org: 'ACLU Digital Privacy',
      number: '1-800-ACLU-1',
      purpose: 'Digital rights violations, surveillance concerns'
    },
    {
      org: 'Electronic Frontier Foundation',
      number: '(415) 436-9333',
      purpose: 'Technology and civil liberties issues'
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Scale className="w-5 h-5" />
          Legal Rights Education
          {securityMode === 'high_risk' && (
            <Badge variant="destructive">High Risk Context</Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="rights" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="rights">Know Your Rights</TabsTrigger>
            <TabsTrigger value="scenarios">Risk Scenarios</TabsTrigger>
            <TabsTrigger value="contacts">Emergency Contacts</TabsTrigger>
          </TabsList>

          <TabsContent value="rights" className="space-y-4">
            <div className="space-y-4">
              {knowYourRights.map((category) => {
                const Icon = category.icon;
                return (
                  <div key={category.category} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4" />
                      <h4 className="font-medium">{category.category}</h4>
                    </div>
                    <div className="grid gap-2">
                      {category.scenarios.map((scenario, index) => (
                        <div
                          key={index}
                          className="p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
                          onClick={() => setSelectedScenario(`${category.category}-${index}`)}
                        >
                          <div className="font-medium text-sm mb-1">{scenario.title}</div>
                          <div className="text-xs text-gray-600">{scenario.right}</div>
                          
                          {selectedScenario === `${category.category}-${index}` && (
                            <div className="mt-3 pt-3 border-t space-y-2">
                              <div>
                                <span className="font-medium text-xs">Recommended Action:</span>
                                <p className="text-xs text-gray-700 mt-1">{scenario.action}</p>
                              </div>
                              <div>
                                <span className="font-medium text-xs">Legal Basis:</span>
                                <p className="text-xs text-gray-700 mt-1">{scenario.legal}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="scenarios" className="space-y-4">
            {securityMode === 'high_risk' && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-red-800">High Risk Mode Active</h4>
                    <p className="text-sm text-red-700 mt-1">
                      Enhanced security measures recommended. Consider operational security (OPSEC) protocols.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-3">
              <h4 className="font-medium">Common Risk Scenarios</h4>
              <div className="grid gap-3">
                <div className="p-3 border rounded-lg">
                  <h5 className="font-medium text-sm">Infiltration Attempts</h5>
                  <p className="text-xs text-gray-600 mt-1">
                    Be cautious of new members asking detailed questions about plans or pushing for more radical actions.
                  </p>
                  <Badge variant="outline" className="mt-2 text-xs">Medium Risk</Badge>
                </div>
                
                <div className="p-3 border rounded-lg">
                  <h5 className="font-medium text-sm">Digital Surveillance</h5>
                  <p className="text-xs text-gray-600 mt-1">
                    Assume communications may be monitored. Use secure channels and code words when necessary.
                  </p>
                  <Badge variant="destructive" className="mt-2 text-xs">High Risk</Badge>
                </div>
                
                <div className="p-3 border rounded-lg">
                  <h5 className="font-medium text-sm">Legal Retaliation</h5>
                  <p className="text-xs text-gray-600 mt-1">
                    Document interactions with authorities. Maintain legal fund and know your rights.
                  </p>
                  <Badge variant="default" className="mt-2 text-xs">Variable Risk</Badge>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="contacts" className="space-y-4">
            <div className="space-y-3">
              <h4 className="font-medium">Emergency Legal Contacts</h4>
              <div className="space-y-2">
                {emergencyContacts.map((contact, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <h5 className="font-medium text-sm">{contact.org}</h5>
                      <Button variant="outline" size="sm">
                        <Phone className="w-3 h-3 mr-1" />
                        {contact.number}
                      </Button>
                    </div>
                    <p className="text-xs text-gray-600">{contact.purpose}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start gap-2">
                <BookOpen className="w-4 h-4 text-blue-600 mt-0.5" />
                <div className="text-sm text-blue-800">
                  <strong>Legal Disclaimer:</strong> This information is for educational purposes only 
                  and does not constitute legal advice. Consult with a qualified attorney for specific legal matters.
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
