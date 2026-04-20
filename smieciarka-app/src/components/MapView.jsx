import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { getCurrentPosition } from '../utils/geolocation';

const DEFAULT_CENTER = [52.2297, 21.0122];
const DEFAULT_ZOOM = 13;

export default function MapView({ items, onMarkerClick, onMapClick }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);
  const [userLocation, setUserLocation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (mapRef.current && !mapInstanceRef.current) {
      mapInstanceRef.current = L.map(mapRef.current).setView(
        DEFAULT_CENTER,
        DEFAULT_ZOOM
      );

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(mapInstanceRef.current);
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    getCurrentPosition()
      .then((pos) => {
        setUserLocation(pos);
        if (mapInstanceRef.current) {
          mapInstanceRef.current.setView([pos.latitude, pos.longitude], 15);
          L.marker([pos.latitude, pos.longitude], {
            icon: L.divIcon({
              className: 'user-marker',
              html: '<div class="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg"></div>',
              iconSize: [16, 16]
            })
          }).addTo(mapInstanceRef.current).bindPopup('Twoja lokalizacja');
        }
      })
      .catch((err) => {
        setError(err.message);
        console.warn('GPS niedostępne:', err.message);
      });
  }, []);

  useEffect(() => {
    if (!mapInstanceRef.current || !items) return;

    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    items.forEach(item => {
      if (item.latitude && item.longitude) {
        const color = item.status === 'available' ? '#10B981' : 
                    item.status === 'reserved' ? '#F59E0B' : '#EF4444';
        
        const marker = L.marker([item.latitude, item.longitude], {
          icon: L.divIcon({
            className: 'custom-marker',
            html: `<div style="background-color: ${color}; width: 30px; height: 30px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.3);"></div>`,
            iconSize: [30, 30],
            iconAnchor: [15, 15]
          })
        }).addTo(mapInstanceRef.current);

        marker.on('click', () => onMarkerClick?.(item));
        marker.bindPopup(item.title);
        markersRef.current.push(marker);
      }
    });
  }, [items, onMarkerClick]);

  return (
    <div className="relative w-full h-full">
      <div ref={mapRef} className="w-full h-full" style={{ minHeight: '400px' }} />
      {error && (
        <div className="absolute bottom-4 left-4 bg-yellow-100 text-yellow-800 px-3 py-2 rounded text-sm">
          ⚠️ {error}
        </div>
      )}
    </div>
  );
}