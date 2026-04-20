import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';

export default function ReviewModal({ itemId, itemTitle, currentUserId, onClose }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [existingReview, setExistingReview] = useState(null);

  useEffect(() => {
    loadExistingReview();
  }, [itemId, currentUserId]);

  const loadExistingReview = async () => {
    if (!itemId || !currentUserId) return;
    
    const { data } = await supabase
      .from('reviews')
      .select('*')
      .eq('item_id', itemId)
      .eq('reviewer_id', currentUserId)
      .single();
    
    if (data) {
      setExistingReview(data);
      setRating(data.rating);
      setComment(data.comment || '');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (existingReview) {
        await supabase.from('reviews').update({
          rating,
          comment,
          updated_at: new Date().toISOString()
        }).eq('id', existingReview.id);
      } else {
        await supabase.from('reviews').insert({
          item_id: itemId,
          reviewer_id: currentUserId,
          rating,
          comment,
          created_at: new Date().toISOString()
        });
      }
      setSuccess(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-[100]">
        <div className="bg-white rounded-lg p-6 max-w-md w-full text-center">
          <div className="text-5xl mb-4">⭐</div>
          <h2 className="text-xl font-bold mb-2">Dziękujemy za opinię!</h2>
          <p className="text-gray-600 mb-4">Twoja ocena pomaga innym użytkownikom.</p>
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
          <h2 className="text-xl font-bold">⭐ Oceń transakcję</h2>
          <button onClick={onClose} className="text-gray-500 text-2xl">&times;</button>
        </div>

        <p className="text-sm text-gray-600 mb-4">
          Przedmiot: <strong>{itemTitle}</strong>
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ocena *
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className={`text-3xl ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
                >
                  ★
                </button>
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-1">
              {rating === 1 && 'Bardzo źle'}
              {rating === 2 && 'Źle'}
              {rating === 3 && 'Okej'}
              {rating === 4 && 'Dobrze'}
              {rating === 5 && 'Super!'}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Komentarz (opcjonalne)
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Jak przebiegła transakcja?..."
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-green-600 disabled:opacity-50"
          >
            {loading ? 'Wysyłam...' : existingReview ? 'Aktualizuj opinię' : 'Wyślij opinię'}
          </button>
        </form>
      </div>
    </div>
  );
}