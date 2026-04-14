import { useState } from 'react';

export default function ItemList({ items, onItemClick, userLocation }) {
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('newest');

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    if (!lat2 || !lon2) return null;
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const filteredItems = items
    .filter(item => {
      if (filter === 'all') return true;
      return item.status === filter;
    })
    .sort((a, b) => {
      if (sort === 'newest') {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      if (sort === 'oldest') {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }
      if (sort === 'closest' && userLocation) {
        const distA = calculateDistance(userLocation.latitude, userLocation.longitude, a.latitude, a.longitude);
        const distB = calculateDistance(userLocation.latitude, userLocation.longitude, b.latitude, b.longitude);
        return (distA || 0) - (distB || 0);
      }
      return 0;
    });

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'reserved': return 'bg-yellow-100 text-yellow-800';
      case 'taken': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'available': return 'Dostępny';
      case 'reserved': return 'Zarezerwowany';
      case 'taken': return 'Oddany';
      default: return status;
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-3 border-b bg-gray-50">
        <div className="flex gap-2 mb-2">
          <select 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="flex-1 border rounded px-2 py-1 text-sm"
          >
            <option value="all">Wszystkie</option>
            <option value="available">Dostępne</option>
            <option value="reserved">Zarezerwowane</option>
            <option value="taken">Oddane</option>
          </select>
          <select 
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="flex-1 border rounded px-2 py-1 text-sm"
          >
            <option value="newest">Najnowsze</option>
            <option value="oldest">Najstarsze</option>
            <option value="closest">Najbliższe</option>
          </select>
        </div>
        <div className="text-xs text-gray-500">
          {filteredItems.length} przedmiotów
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {filteredItems.length === 0 ? (
          <div className="p-4 text-center text-gray-500 text-sm">
            Brak przedmiotów
          </div>
        ) : (
          <div className="divide-y">
            {filteredItems.map((item) => {
              const distance = userLocation 
                ? calculateDistance(userLocation.latitude, userLocation.longitude, item.latitude, item.longitude)
                : null;
              
              return (
                <button
                  key={item.id}
                  onClick={() => onItemClick(item)}
                  className="w-full p-3 text-left hover:bg-gray-50 transition"
                >
                  <div className="flex gap-3">
                    {item.image ? (
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0 flex items-center justify-center">
                        <span className="text-2xl">📦</span>
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium text-sm truncate">{item.title}</h3>
                        <span className={`px-2 py-0.5 rounded-full text-xs ${getStatusColor(item.status)}`}>
                          {getStatusLabel(item.status)}
                        </span>
                      </div>
                      {item.description && (
                        <p className="text-xs text-gray-500 truncate mt-1">
                          {item.description}
                        </p>
                      )}
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-gray-400">
                          {new Date(item.createdAt).toLocaleDateString('pl-PL')}
                        </span>
                        {distance !== null && (
                          <span className="text-xs text-primary font-medium">
                            {distance < 1 
                              ? `${Math.round(distance * 1000)}m` 
                              : `${distance.toFixed(1)}km`}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}