
import { Icon } from 'leaflet';

export const getMarkerColor = (type: string, urgency: string) => {
  if (type === 'request') {
    switch (urgency) {
      case 'critical': return '#dc2626';
      case 'high': return '#ea580c';
      case 'medium': return '#d97706';
      default: return '#65a30d';
    }
  }
  return '#2563eb';
};

export const createCustomIcon = (type: string, urgency: string) => {
  const color = getMarkerColor(type, urgency);
  return new Icon({
    iconUrl: `data:image/svg+xml;base64,${btoa(`
      <svg width="25" height="41" viewBox="0 0 25 41" xmlns="http://www.w3.org/2000/svg">
        <path fill="${color}" stroke="#fff" stroke-width="2" d="M12.5 0C5.6 0 0 5.6 0 12.5S12.5 41 12.5 41s12.5-23.9 12.5-28.5S19.4 0 12.5 0z"/>
        <circle fill="#fff" cx="12.5" cy="12.5" r="6"/>
        <text x="12.5" y="16" text-anchor="middle" font-size="10" fill="${color}">
          ${type === 'request' ? 'R' : 'O'}
        </text>
      </svg>
    `)}`,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });
};

// Fix for default markers in React Leaflet
export const initializeLeafletIcons = () => {
  delete (Icon.Default.prototype as any)._getIconUrl;
  Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  });
};
