import { useState } from 'react';
import { supabase } from '../utils/supabase';

export default function ReportModal({ itemId, itemTitle, onClose }) {
  const [reason, setReason] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const reasons = [
    'Nieaktualne ogłoszenie',
    'Nieodpowiednie zdjęcie',
    'Sprzeczny opis',
    'Podejrzany użytkownik',
    'Inne'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!reason) {
      setError('Wybierz powód zgłoszenia');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { error: insertError } = await supabase.from('reports').insert({
        item_id: itemId,
        reason: reason,
        description: description,
        created_at: new Date().toISOString()
      });

      if (insertError) throw insertError;
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-[100]">
        <div className="bg-white rounded-lg p-6 max-w-md w-full text-center">
          <div className="text-5xl mb-4">✅</div>
          <h2 className="text-xl font-bold mb-2">Dziękujemy!</h2>
          <p className="text-gray-600 mb-4">Twoje zgłoszenie zostało wysłane. Przejrzymy je jak najszybciej.</p>
          <button
            onClick={onClose}
            className="w-full bg-primary text-white py-3 rounded-lg font-medium"
          >
            Zamknij
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-[100]">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">⚠️ Zgłoś problem</h2>
          <button onClick={onClose} className="text-gray-500 text-2xl">&times;</button>
        </div>

        <p className="text-sm text-gray-600 mb-4">
          Zgłaszasz: <strong>{itemTitle}</strong>
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Powód zgłoszenia *
            </label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            >
              <option value="">Wybierz powód...</option>
              {reasons.map(r => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Opisz szczegóły (opcjonalne)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Dodaj więcej informacji..."
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>

          {error && (
            <div className="bg-red-50 text-red-700 px-4 py-2 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-500 text-white py-3 rounded-lg font-medium hover:bg-red-600 disabled:opacity-50"
          >
            {loading ? 'Wysyłam...' : 'Wyślij zgłoszenie'}
          </button>
        </form>
      </div>
    </div>
  );
}