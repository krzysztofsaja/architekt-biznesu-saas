import { useState, useEffect } from 'react';
import './index.css';
import MapView from './components/MapView';
import ItemForm from './components/ItemForm';
import ItemList from './components/ItemList';
import Chat from './components/Chat';
import Loading from './components/Loading';
import { getItems, updateItem } from './db';
import { getCurrentPosition } from './utils/geolocation';

function UserModal({ onSave }) {
  const [name, setName] = useState('');
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Witaj w Smieciarka App!</h2>
        <p className="text-gray-600 mb-4">Jak mam Cię nazywać?</p>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Twój nick lub imię"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:ring-2 focus:ring-primary focus:border-transparent"
        />
        <button
          onClick={() => name.trim() && onSave(name.trim())}
          disabled={!name.trim()}
          className="w-full bg-primary text-white py-3 rounded-lg font-medium disabled:opacity-50"
        >
          Dalej
        </button>
      </div>
    </div>
  );
}

function App() {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showList, setShowList] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(() => {
    return localStorage.getItem('smieciarka-user') || '';
  });
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) {
      setShowUserModal(true);
    }
    loadItems();
    getCurrentPosition()
      .then(setUserLocation)
      .catch(console.warn);
  }, []);

  const loadItems = async () => {
    try {
      setLoading(true);
      const data = await getItems();
      setItems(data);
    } catch (err) {
      console.error('Błąd ładowania:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkerClick = (item) => {
    setSelectedItem(item);
  };

  const handleSaveItem = (item) => {
    setShowForm(false);
    loadItems();
  };

  const handleSaveUser = (user) => {
    localStorage.setItem('smieciarka-user', user);
    setCurrentUser(user);
    setShowUserModal(false);
  };

  const handleReserve = async () => {
    if (selectedItem) {
      await updateItem(selectedItem.id, { status: 'reserved' });
      loadItems();
      setShowChat(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-primary text-white p-4 shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center md:justify-between">
          <h1 className="text-xl font-bold">🗑️ Smieciarka App</h1>
          <div className="flex gap-2">
            <button 
              onClick={() => setShowList(!showList)}
              className={`px-3 py-2 rounded-lg font-medium text-sm ${showList ? 'bg-white text-primary' : 'bg-white/20 text-white'}`}
            >
              📋 Lista
            </button>
            <span className="bg-white/20 px-2 py-1 rounded text-sm">
              {items.length}
            </span>
            <button 
              onClick={() => setShowForm(true)}
              className="bg-white text-primary px-4 py-2 rounded-lg font-medium hover:bg-green-50"
            >
              + Dodaj
            </button>
            <button 
              onClick={() => loadItems()}
              className="bg-white/20 text-white px-4 py-2 rounded-lg font-medium hover:bg-white/30"
            >
              ↻
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-4">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden flex" style={{ height: 'calc(100vh - 120px)' }}>
          {showList && (
            <div className="w-80 border-r flex-shrink-0">
              <ItemList 
                items={items} 
                onItemClick={handleMarkerClick}
                userLocation={userLocation}
              />
            </div>
          )}
          <div className="flex-1">
            {loading ? (
              <Loading text="Ładowanie mapy..." />
            ) : (
            <MapView 
              items={items} 
              onMarkerClick={handleMarkerClick}
            />
            )}
          </div>
        </div>

        {items.length === 0 && !loading && (
          <div className="mt-4 text-center text-gray-500">
            <p>Brak przedmiotów na mapie.</p>
            <p className="text-sm">Kliknij "Dodaj przedmiot" aby coś wystawić.</p>
          </div>
        )}

        {selectedItem && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              {selectedItem.image && (
                <img 
                  src={selectedItem.image} 
                  alt={selectedItem.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              )}
              <h2 className="text-xl font-bold mb-2">{selectedItem.title}</h2>
              <p className="text-gray-600 mb-4">{selectedItem.description}</p>
              <div className="flex gap-2 mb-4">
                <span className={`px-3 py-1 rounded-full text-sm ${
                  selectedItem.status === 'available' ? 'bg-green-100 text-green-800' :
                  selectedItem.status === 'reserved' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {selectedItem.status === 'available' ? 'Dostępny' :
                   selectedItem.status === 'reserved' ? 'Zarezerwowany' : 'Oddany'}
                </span>
              </div>
              {selectedItem.contact && (
                <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">Kontakt:</p>
                  <a href={`tel:${selectedItem.contact}`} className="text-primary font-medium">
                    {selectedItem.contact}
                  </a>
                </div>
              )}
              <div className="flex gap-2">
                <button 
                  onClick={() => setSelectedItem(null)}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg"
                >
                  Zamknij
                </button>
                {selectedItem.status === 'available' && (
                  <button 
                    onClick={handleReserve}
                    className="flex-1 bg-accent text-white py-2 rounded-lg"
                  >
                    Rezerwuj
                  </button>
                )}
                <button 
                  onClick={() => setShowChat(true)}
                  className="flex-1 bg-secondary text-white py-2 rounded-lg"
                >
                  Czat
                </button>
              </div>
            </div>
          </div>
        )}

        {showForm && (
          <ItemForm 
            onSave={handleSaveItem}
            onCancel={() => setShowForm(false)}
          />
        )}

        {showChat && selectedItem && (
          <Chat 
            itemId={selectedItem.id}
            currentUser={currentUser}
            onClose={() => setShowChat(false)}
          />
        )}

        {showUserModal && (
          <UserModal 
            onSave={handleSaveUser}
          />
        )}

        <button
          onClick={() => setShowForm(true)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-primary text-white rounded-full shadow-lg flex items-center justify-center text-2xl hover:bg-green-600 md:hidden z-40"
        >
          +
        </button>
      </main>
    </div>
  );
}

export default App;