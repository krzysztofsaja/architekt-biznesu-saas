import { useState, useEffect } from 'react';
import './index.css';
import MapView from './components/MapView';
import ItemForm from './components/ItemForm';
import ItemList from './components/ItemList';
import Chat from './components/Chat';
import Loading from './components/Loading';
import Auth from './components/Auth';
import Regulamin from './components/Regulamin';
import ReportModal from './components/ReportModal';
import { getItems, updateItem, getItemsByUser } from './db';
import { getCurrentPosition } from './utils/geolocation';
import { supabase } from './utils/supabase';

function UserModal({ onSave }) {
  const [name, setName] = useState('');
  const [show, setShow] = useState(true);
  
  const handleSave = () => {
    if (name.trim()) {
      onSave(name.trim());
    }
  };
  
  if (!show) return null;
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-[100]">
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
          onClick={handleSave}
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
  const [myItems, setMyItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showList, setShowList] = useState(false);
  const [showUserModal, setShowUserModal] = useState(true);
  const [currentUser, setCurrentUser] = useState(() => {
    return localStorage.getItem('smieciarka-user') || '';
  });
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState('home');
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [authUser, setAuthUser] = useState(null);
  const [showRegulamin, setShowRegulamin] = useState(false);
  const [showReport, setShowReport] = useState(false);

  useEffect(() => {
    checkAuth();
    console.log('App montowana, currentUser:', currentUser);
    if (currentUser) {
      setShowUserModal(false);
    }
    loadItems();
    getCurrentPosition()
      .then(setUserLocation)
      .catch(console.warn);
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      setAuthUser(session.user);
    }
    
    supabase.auth.onAuthStateChange((_event, session) => {
      setAuthUser(session?.user || null);
    });
  };

  const handleAuth = (user) => {
    setAuthUser(user);
    setShowUserModal(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setAuthUser(null);
    localStorage.removeItem('smieciarka-user');
  };

  const loadItems = async () => {
    try {
      setLoading(true);
      console.log('Ładowanie przedmiotów...');
      let data = await getItems();
      if (search) {
        data = data.filter(i => 
          i.title?.toLowerCase().includes(search.toLowerCase()) ||
          i.description?.toLowerCase().includes(search.toLowerCase())
        );
      }
      if (category !== 'all') {
        data = data.filter(i => i.category === category);
      }
      console.log('Załadowano:', data.length, 'przedmiotów');
      setItems(data);
      
      if (authUser) {
        const myData = await getItemsByUser(authUser.id);
        setMyItems(myData);
      }
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
    console.log('Zapisano użytkownika:', user);
  };

  const handleReserve = async () => {
    if (selectedItem) {
      await updateItem(selectedItem.id, { status: 'reserved' });
      loadItems();
      setShowChat(true);
    }
  };

  const handleGive = async () => {
    if (selectedItem) {
      await updateItem(selectedItem.id, { status: 'given' });
      loadItems();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-primary text-white p-4 shadow-md z-50 relative">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-3">
            <h1 className="text-xl font-bold cursor-pointer" onClick={() => setPage('home')}>
              🗑️ Smieciarka
            </h1>
            <div className="flex gap-2">
              <button 
                onClick={() => setPage('home')}
                className={`px-3 py-2 rounded-lg font-medium text-sm ${page === 'home' ? 'bg-white text-primary' : 'bg-white/20'}`}
              >
                🏠
              </button>
              <button 
                onClick={() => setPage('my')}
                className={`px-3 py-2 rounded-lg font-medium text-sm ${page === 'my' ? 'bg-white text-primary' : 'bg-white/20'}`}
              >
                📦 Moje
              </button>
              {authUser ? (
                <>
                  <div className="flex items-center gap-1 bg-yellow-500 px-2 py-1 rounded-lg text-xs font-bold">
                    ⭐ Lv.1
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="bg-red-500 px-3 py-2 rounded-lg font-medium text-sm"
                  >
                    🚪
                  </button>
                </>
              ) : (
                <>
                  <button 
                    onClick={() => setShowUserModal(true)}
                    className="bg-white/20 px-3 py-2 rounded-lg font-medium text-sm"
                  >
                    👤
                  </button>
                  <button 
                    onClick={() => setShowRegulamin(true)}
                    className="bg-white/20 px-3 py-2 rounded-lg font-medium text-sm"
                  >
                    📄
                  </button>
                </>
              )}
            </div>
          </div>
          
          {page === 'home' && (
            <div className="flex gap-2">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && loadItems()}
                placeholder="Szukaj..."
                className="flex-1 px-3 py-2 rounded-lg text-gray-800"
              />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="px-2 py-2 rounded-lg text-gray-800 text-sm"
              >
                <option value="all">Wszystkie</option>
                <option value="meble">Meble</option>
                <option value="elektronika">Elektronika</option>
                <option value="odziez">Odzież</option>
                <option value="sport">Sport</option>
                <option value="zabawki">Zabawki</option>
                <option value="ksiazki">Książki</option>
                <option value="ogrod">Ogród</option>
                <option value="inne">Inne</option>
              </select>
              <button 
                onClick={loadItems}
                className="bg-white/20 px-3 py-2 rounded-lg"
              >
                🔍
              </button>
            </div>
          )}
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-4 relative z-10">
        {page === 'my' ? (
          <div className="bg-white rounded-lg shadow-lg p-4">
            <h2 className="text-xl font-bold mb-4">Moje przedmioty ({myItems.length})</h2>
            {myItems.length === 0 ? (
              <p className="text-gray-500">Nie dodałeś żadnych przedmiotów.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {myItems.map(item => (
                  <div key={item.id} className="border rounded-lg p-4">
                    <h3 className="font-bold">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.description}</p>
                    <span className={`inline-block mt-2 px-2 py-1 rounded text-sm ${
                      item.status === 'available' ? 'bg-green-100 text-green-800' :
                      item.status === 'reserved' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100'
                    }`}>
                      {item.status === 'available' ? 'Dostępny' : 
                       item.status === 'reserved' ? 'Zarezerwowany' : 'Oddany'}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden flex relative z-10" style={{ height: 'calc(100vh - 180px)' }}>
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
        )}

        {page === 'home' && items.length === 0 && !loading && (
          <div className="mt-4 text-center text-gray-500">
            <p>Brak przedmiotów na mapie.</p>
            <p className="text-sm">Kliknij "Dodaj przedmiot" aby coś wystawić.</p>
          </div>
        )}

        {selectedItem && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-[100]">
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
                  {selectedItem.status === 'available' ? '✓ Dostępny' :
                   selectedItem.status === 'reserved' ? '⏳ Zarezerwowany' : '✓ Oddany'}
                </span>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {selectedItem.category}
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
                {selectedItem.status === 'reserved' && (
                  <button 
                    onClick={handleGive}
                    className="flex-1 bg-green-600 text-white py-2 rounded-lg"
                  >
                    ODDANE ✓
                  </button>
                )}
                <button 
                  onClick={() => setShowChat(true)}
                  className="flex-1 bg-secondary text-white py-2 rounded-lg"
                >
                  Czat
                </button>
                <button 
                  onClick={() => setShowReport(true)}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg text-sm"
                >
                  ⚠️ Zgłoś
                </button>
              </div>
            </div>
          </div>
        )}

        {showForm && (
          <ItemForm 
            onSave={handleSaveItem}
            onCancel={() => setShowForm(false)}
            userId={authUser?.id}
          />
        )}

        {showChat && selectedItem && (
          <Chat 
            itemId={selectedItem.id}
            currentUser={currentUser}
            onClose={() => setShowChat(false)}
          />
        )}

        {showUserModal && !currentUser && !authUser && (
          <UserModal 
            onSave={handleSaveUser}
          />
        )}

        {showUserModal && !authUser && (
          <Auth onAuth={handleAuth} />
        )}

        {showRegulamin && (
          <Regulamin onClose={() => setShowRegulamin(false)} />
        )}

        {showReport && selectedItem && (
          <ReportModal 
            itemId={selectedItem.id}
            itemTitle={selectedItem.title}
            onClose={() => setShowReport(false)}
          />
        )}

        <button
          onClick={() => setShowForm(true)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-primary text-white rounded-full shadow-lg flex items-center justify-center text-2xl hover:bg-green-600 z-50"
        >
          +
        </button>
      </main>
    </div>
  );
}

export default App;