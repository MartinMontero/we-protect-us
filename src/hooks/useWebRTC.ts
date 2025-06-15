
import { useState, useEffect, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';

interface PeerConnection {
  id: string;
  connection: RTCPeerConnection;
  dataChannel?: RTCDataChannel;
}

interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: number;
  type: 'text' | 'location' | 'status' | 'emergency';
}

export const useWebRTC = (userId: string) => {
  const [peers, setPeers] = useState<Map<string, PeerConnection>>(new Map());
  const [messages, setMessages] = useState<Message[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const { toast } = useToast();
  
  const localConnectionRef = useRef<RTCPeerConnection | null>(null);

  useEffect(() => {
    // Initialize WebRTC when component mounts
    initializeWebRTC();
    
    return () => {
      // Cleanup connections
      peers.forEach(peer => {
        peer.connection.close();
      });
      if (localConnectionRef.current) {
        localConnectionRef.current.close();
      }
    };
  }, []);

  const initializeWebRTC = async () => {
    try {
      // Create a new RTCPeerConnection with STUN servers
      const configuration: RTCConfiguration = {
        iceServers: [
          { urls: 'stun:stun.l.google.com:19302' },
          { urls: 'stun:stun1.l.google.com:19302' }
        ]
      };

      const peerConnection = new RTCPeerConnection(configuration);
      localConnectionRef.current = peerConnection;

      // Create data channel for emergency communications
      const dataChannel = peerConnection.createDataChannel('emergency-chat', {
        ordered: true
      });

      setupDataChannel(dataChannel, 'local');

      // Handle incoming data channels
      peerConnection.ondatachannel = (event) => {
        const channel = event.channel;
        setupDataChannel(channel, 'remote');
      };

      // Handle ICE candidates
      peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
          // In a real implementation, you'd send this to a signaling server
          // For mesh networking during emergencies, you might use local discovery
          broadcastICECandidate(event.candidate);
        }
      };

      // Handle connection state changes
      peerConnection.onconnectionstatechange = () => {
        console.log('Connection state:', peerConnection.connectionState);
        if (peerConnection.connectionState === 'connected') {
          toast({
            title: "Peer Connected",
            description: "Direct communication channel established",
          });
        }
      };

    } catch (error) {
      console.error('Error initializing WebRTC:', error);
      toast({
        title: "Connection Error",
        description: "Failed to initialize peer-to-peer communication",
        variant: "destructive",
      });
    }
  };

  const setupDataChannel = (channel: RTCDataChannel, type: 'local' | 'remote') => {
    channel.onopen = () => {
      console.log(`Data channel ${type} opened`);
    };

    channel.onmessage = (event) => {
      try {
        const message: Message = JSON.parse(event.data);
        setMessages(prev => [...prev, message]);
        
        // Show notification for emergency messages
        if (message.type === 'emergency') {
          toast({
            title: "Emergency Message Received",
            description: message.content,
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error('Error parsing message:', error);
      }
    };

    channel.onerror = (error) => {
      console.error('Data channel error:', error);
    };

    channel.onclose = () => {
      console.log(`Data channel ${type} closed`);
    };
  };

  const sendMessage = (content: string, type: Message['type'] = 'text') => {
    const message: Message = {
      id: crypto.randomUUID(),
      senderId: userId,
      content,
      timestamp: Date.now(),
      type
    };

    // Add to local messages
    setMessages(prev => [...prev, message]);

    // Send to all connected peers
    peers.forEach(peer => {
      if (peer.dataChannel && peer.dataChannel.readyState === 'open') {
        try {
          peer.dataChannel.send(JSON.stringify(message));
        } catch (error) {
          console.error('Error sending message to peer:', error);
        }
      }
    });
  };

  const sendLocationUpdate = async () => {
    if (!navigator.geolocation) {
      toast({
        title: "Location Not Available",
        description: "Geolocation is not supported on this device",
        variant: "destructive",
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const locationMessage = `Location: ${position.coords.latitude}, ${position.coords.longitude}`;
        sendMessage(locationMessage, 'location');
      },
      (error) => {
        console.error('Error getting location:', error);
        toast({
          title: "Location Error",
          description: "Failed to get current location",
          variant: "destructive",
        });
      }
    );
  };

  const sendEmergencyAlert = (alertMessage: string) => {
    sendMessage(`🚨 EMERGENCY: ${alertMessage}`, 'emergency');
    
    // Also try to trigger emergency notifications
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Emergency Alert Sent', {
        body: alertMessage,
        icon: '/icons/icon-192x192.png',
        requireInteraction: true
      });
    }
  };

  const discoverPeers = async () => {
    setIsSearching(true);
    
    try {
      // In a real emergency mesh network, this would use:
      // - Bluetooth for local device discovery
      // - WiFi Direct for peer-to-peer connections
      // - mDNS/Bonjour for local network discovery
      // - QR codes for manual peer addition
      
      // For now, simulate peer discovery
      setTimeout(() => {
        setIsSearching(false);
        toast({
          title: "Peer Discovery",
          description: "Searching for nearby emergency communication devices...",
        });
      }, 3000);
      
    } catch (error) {
      console.error('Error discovering peers:', error);
      setIsSearching(false);
      toast({
        title: "Discovery Error",
        description: "Failed to discover nearby devices",
        variant: "destructive",
      });
    }
  };

  const broadcastICECandidate = (candidate: RTCIceCandidate) => {
    // In a real implementation, this would broadcast the ICE candidate
    // through available local discovery mechanisms:
    // - Local network broadcast
    // - Bluetooth advertising
    // - WiFi Direct
    // - Manual exchange via QR codes
    console.log('Broadcasting ICE candidate:', candidate);
  };

  const connectToPeer = async (peerId: string, offer?: RTCSessionDescriptionInit) => {
    try {
      if (!localConnectionRef.current) {
        await initializeWebRTC();
      }

      const peerConnection = localConnectionRef.current!;

      if (offer) {
        // Handle incoming offer
        await peerConnection.setRemoteDescription(offer);
        const answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answer);
        
        // In real implementation, send answer back to peer
        console.log('Created answer for peer:', peerId);
      } else {
        // Create offer
        const offer = await peerConnection.createOffer();
        await peerConnection.setLocalDescription(offer);
        
        // In real implementation, send offer to peer
        console.log('Created offer for peer:', peerId);
      }

    } catch (error) {
      console.error('Error connecting to peer:', error);
      toast({
        title: "Connection Error",
        description: `Failed to connect to peer ${peerId}`,
        variant: "destructive",
      });
    }
  };

  return {
    peers: Array.from(peers.values()),
    messages,
    isSearching,
    sendMessage,
    sendLocationUpdate,
    sendEmergencyAlert,
    discoverPeers,
    connectToPeer
  };
};
