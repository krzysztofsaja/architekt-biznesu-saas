import { useState, useRef } from 'react';
import { addItem as addItemToDb } from '../db';
import { getCurrentPosition } from '../utils/geolocation';

export default function ItemForm({ onSave, onCancel }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [contact, setContact] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleGetLocation = async () => {
    try {
      setError(null);
      const pos = await getCurrentPosition();
      setLocation(pos);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('Zdjęcie jest za duże (max 5MB)');
        return;
      }
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setError('Wpisz tytuł przedmiotu');
      return;
    }
    
    if (!location) {
      setError('Pobierz lokalizację przed dodaniem');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const item = {
        title: title.trim(),
        description: description.trim(),
        contact: contact.trim(),
        image: imagePreview,
        latitude: location.latitude,
        longitude: location.longitude,
        address: ''
      };

      await addItemToDb(item);
      onSave?.(item);
    } catch (err) {
      setError('Błąd zapisu: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-lg p-6 max-w-lg w-full my-8">
        <h2 className="text-xl font-bold mb-4">Dodaj przedmiot</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tytuł *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="np. Stara mikrofalówka"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Opis
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Krótki opis przedmiotu..."
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Kontakt (telefon) *
            </label>
            <input
              type="tel"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="123 456 789"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Zdjęcie
            </label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleImageChange}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full border-2 border-dashed border-gray-300 rounded-lg px-4 py-4 text-gray-500 hover:border-primary hover:text-primary transition"
            >
              {imagePreview ? '📷 Zdjęcie dodane' : '📷 Dodaj zdjęcie'}
            </button>
            {imagePreview && (
              <div className="mt-2">
                <img 
                  src={imagePreview} 
                  alt="Podgląd" 
                  className="w-full h-40 object-cover rounded-lg"
                />
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Lokalizacja *
            </label>
            <button
              type="button"
              onClick={handleGetLocation}
              className={`w-full border rounded-lg px-4 py-2 ${
                location 
                  ? 'border-green-500 bg-green-50 text-green-700' 
                  : 'border-gray-300 text-gray-700 hover:border-primary'
              }`}
            >
              {location 
                ? `📍 ${location.latitude.toFixed(4)}, ${location.longitude.toFixed(4)}` 
                : '📍 Pobierz lokalizację GPS'}
            </button>
            {location && (
              <p className="text-xs text-green-600 mt-1">Lokalizacja pobrana pomyślnie</p>
            )}
          </div>

          {error && (
            <div className="bg-red-50 text-red-700 px-4 py-2 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-medium hover:bg-gray-300"
            >
              Anuluj
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-primary text-white py-3 rounded-lg font-medium hover:bg-green-600 disabled:opacity-50"
            >
              {loading ? 'Zapisuję...' : 'Dodaj przedmiot'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}