
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, MapPin, Camera, Phone, MessageSquare, Clock, AlertTriangle } from 'lucide-react';

export const SafetyFeatures: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Safety Overview */}
      <Card className="border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-800">
            <Shield className="w-5 h-5" />
            Safety-First Approach
          </CardTitle>
          <CardDescription className="text-green-700">
            Multiple layers of protection ensure your child's safety during every care session
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto bg-green-200 rounded-full flex items-center justify-center mb-2">
                <Camera className="w-6 h-6 text-green-700" />
              </div>
              <h4 className="font-semibold text-green-800">Photo Check-ins</h4>
              <p className="text-sm text-green-600">Required photos at start and end</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto bg-green-200 rounded-full flex items-center justify-center mb-2">
                <MapPin className="w-6 h-6 text-green-700" />
              </div>
              <h4 className="font-semibold text-green-800">Location Tracking</h4>
              <p className="text-sm text-green-600">Real-time location sharing</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto bg-green-200 rounded-full flex items-center justify-center mb-2">
                <Phone className="w-6 h-6 text-green-700" />
              </div>
              <h4 className="font-semibold text-green-800">Emergency Access</h4>
              <p className="text-sm text-green-600">Instant emergency contacts</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Safety Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Check-in System */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="w-5 h-5 text-blue-600" />
              Check-in/Check-out System
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-semibold text-blue-600">1</span>
                </div>
                <div>
                  <h4 className="font-medium">Photo Check-in Required</h4>
                  <p className="text-sm text-gray-600">Caregiver must take a photo when care begins</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-semibold text-blue-600">2</span>
                </div>
                <div>
                  <h4 className="font-medium">Location Verification</h4>
                  <p className="text-sm text-gray-600">GPS location confirms caregiver is at agreed location</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-semibold text-blue-600">3</span>
                </div>
                <div>
                  <h4 className="font-medium">Check-out Confirmation</h4>
                  <p className="text-sm text-gray-600">Final photo and status update when care ends</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Emergency Features */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              Emergency Features
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                <Phone className="w-5 h-5 text-red-600" />
                <div>
                  <h4 className="font-medium text-red-800">Emergency Quick Dial</h4>
                  <p className="text-sm text-red-600">One-tap calling to emergency contacts and 911</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-orange-600" />
                <div>
                  <h4 className="font-medium text-orange-800">Medical Alert Display</h4>
                  <p className="text-sm text-orange-600">Allergies and medical conditions prominently shown</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                <MessageSquare className="w-5 h-5 text-blue-600" />
                <div>
                  <h4 className="font-medium text-blue-800">Emergency Messaging</h4>
                  <p className="text-sm text-blue-600">Priority messaging system for urgent situations</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Secure Messaging */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-purple-600" />
              Secure Communication
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                  <Shield className="w-3 h-3 mr-1" />
                  Encrypted
                </Badge>
                <span className="text-sm">End-to-end encrypted messaging</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  <Camera className="w-3 h-3 mr-1" />
                  Photos
                </Badge>
                <span className="text-sm">Share photos and updates securely</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  <MapPin className="w-3 h-3 mr-1" />
                  Location
                </Badge>
                <span className="text-sm">Optional location sharing</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-red-100 text-red-800">
                  <AlertTriangle className="w-3 h-3 mr-1" />
                  Priority
                </Badge>
                <span className="text-sm">Emergency message alerts</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Location Sharing */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-green-600" />
              Location Sharing
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-medium">Real-time Location</h4>
                  <p className="text-sm text-gray-600">
                    Optional location sharing during care sessions for added peace of mind
                  </p>
                </div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-xs text-gray-600">
                  <strong>Privacy Note:</strong> Location data is only shared during active care sessions 
                  and is automatically deleted after 30 days. Parents can control sharing preferences.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Data Security */}
      <Card className="border-purple-200 bg-purple-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-800">
            <Shield className="w-5 h-5" />
            Data Security & Privacy
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-purple-600" />
              <span>End-to-end encryption for all communications</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-purple-600" />
              <span>Secure photo storage with automatic deletion</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-purple-600" />
              <span>Zero-knowledge architecture for medical data</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-purple-600" />
              <span>COPPA and GDPR compliant data handling</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
