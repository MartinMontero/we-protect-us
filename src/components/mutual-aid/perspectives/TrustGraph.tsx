
import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Network } from 'lucide-react';

interface TrustNode {
  id: string;
  label: string;
  trust_level: number;
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
}

interface TrustLink {
  source: string;
  target: string;
  strength: number;
}

interface TrustGraphProps {
  postId: string;
}

export const TrustGraph: React.FC<TrustGraphProps> = ({ postId }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [nodes, setNodes] = useState<TrustNode[]>([]);
  const [links, setLinks] = useState<TrustLink[]>([]);

  useEffect(() => {
    generateMockData();
  }, [postId]);

  useEffect(() => {
    if (nodes.length > 0 && svgRef.current) {
      renderGraph();
    }
  }, [nodes, links]);

  const generateMockData = () => {
    // Generate mock trust network data
    const mockNodes: TrustNode[] = [
      { id: 'center', label: 'This Exchange', trust_level: 1.0 },
      { id: 'neighbor1', label: 'Direct Neighbor', trust_level: 0.8 },
      { id: 'neighbor2', label: 'Community Member', trust_level: 0.7 },
      { id: 'neighbor3', label: 'Local Group', trust_level: 0.9 },
      { id: 'neighbor4', label: 'Extended Network', trust_level: 0.6 },
      { id: 'neighbor5', label: 'Resource Hub', trust_level: 0.85 }
    ];

    const mockLinks: TrustLink[] = [
      { source: 'center', target: 'neighbor1', strength: 0.9 },
      { source: 'center', target: 'neighbor2', strength: 0.7 },
      { source: 'center', target: 'neighbor3', strength: 0.8 },
      { source: 'neighbor1', target: 'neighbor4', strength: 0.6 },
      { source: 'neighbor3', target: 'neighbor5', strength: 0.75 },
      { source: 'neighbor2', target: 'neighbor5', strength: 0.65 }
    ];

    setNodes(mockNodes);
    setLinks(mockLinks);
  };

  const renderGraph = () => {
    if (!svgRef.current) return;

    const svg = svgRef.current;
    const width = 400;
    const height = 300;

    // Clear previous content
    svg.innerHTML = '';

    // Create simple force-directed layout simulation
    const simulation = {
      nodes: nodes.map(d => ({
        ...d,
        x: width / 2 + (Math.random() - 0.5) * 200,
        y: height / 2 + (Math.random() - 0.5) * 150,
        vx: 0,
        vy: 0
      })),
      links: links.slice()
    };

    // Simple physics simulation
    for (let i = 0; i < 100; i++) {
      // Link force
      simulation.links.forEach(link => {
        const source = simulation.nodes.find(n => n.id === link.source);
        const target = simulation.nodes.find(n => n.id === link.target);
        
        if (source && target) {
          const dx = target.x! - source.x!;
          const dy = target.y! - source.y!;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const targetDistance = 80 * link.strength;
          
          if (distance > 0) {
            const force = (distance - targetDistance) * 0.1;
            const fx = (dx / distance) * force;
            const fy = (dy / distance) * force;
            
            source.vx! += fx;
            source.vy! += fy;
            target.vx! -= fx;
            target.vy! -= fy;
          }
        }
      });

      // Center force
      simulation.nodes.forEach(node => {
        node.vx! += (width / 2 - node.x!) * 0.01;
        node.vy! += (height / 2 - node.y!) * 0.01;
      });

      // Apply velocity
      simulation.nodes.forEach(node => {
        node.x! += node.vx! * 0.8;
        node.y! += node.vy! * 0.8;
        node.vx! *= 0.9;
        node.vy! *= 0.9;
      });
    }

    // Render links
    simulation.links.forEach(link => {
      const source = simulation.nodes.find(n => n.id === link.source);
      const target = simulation.nodes.find(n => n.id === link.target);
      
      if (source && target) {
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', source.x!.toString());
        line.setAttribute('y1', source.y!.toString());
        line.setAttribute('x2', target.x!.toString());
        line.setAttribute('y2', target.y!.toString());
        line.setAttribute('stroke', '#94a3b8');
        line.setAttribute('stroke-width', (link.strength * 3).toString());
        line.setAttribute('opacity', '0.6');
        svg.appendChild(line);
      }
    });

    // Render nodes
    simulation.nodes.forEach(node => {
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', node.x!.toString());
      circle.setAttribute('cy', node.y!.toString());
      circle.setAttribute('r', (node.trust_level * 15 + 5).toString());
      circle.setAttribute('fill', node.id === 'center' ? '#3b82f6' : '#10b981');
      circle.setAttribute('stroke', '#ffffff');
      circle.setAttribute('stroke-width', '2');
      circle.setAttribute('opacity', '0.8');
      svg.appendChild(circle);

      // Add labels
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x', node.x!.toString());
      text.setAttribute('y', (node.y! + 30).toString());
      text.setAttribute('text-anchor', 'middle');
      text.setAttribute('font-size', '10');
      text.setAttribute('fill', '#374151');
      text.textContent = node.label;
      svg.appendChild(text);
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Network className="w-5 h-5" />
          Trust Network Visualization
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center">
          <svg
            ref={svgRef}
            width="400"
            height="300"
            className="border rounded-lg bg-muted/20"
          />
        </div>
        <div className="mt-4 text-sm text-muted-foreground">
          <p>This visualization shows how trust relationships strengthen through mutual aid exchanges.</p>
          <div className="flex gap-4 mt-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span>Current Exchange</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Community Members</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
