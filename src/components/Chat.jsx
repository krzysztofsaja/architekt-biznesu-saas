import { useState, useEffect, useRef } from 'react';
import { addMessage, getMessagesByItemId } from '../db';

export default function Chat({ itemId, currentUser, onClose }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    loadMessages();
  }, [itemId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const loadMessages = async () => {
    try {
      setLoading(true);
      const data = await getMessagesByItemId(itemId);
      setMessages(data.reverse());
    } catch (err) {
      console.error('Błąd ładowania wiadomości:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    setSending(true);
    try {
      await addMessage({
        itemId,
        sender: currentUser || 'Anonim',
        message: newMessage.trim()
      });
      setNewMessage('');
      loadMessages();
    } catch (err) {
      console.error('Błąd wysyłania:', err);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-lg h-[500px] flex flex-col">
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="font-bold">Czat</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {loading ? (
            <div className="text-center text-gray-500">Ładowanie...</div>
          ) : messages.length === 0 ? (
            <div className="text-center text-gray-500">
              Brak wiadomości. Napisz pierwszy!
            </div>
          ) : (
            messages.map((msg, index) => {
              const isMine = msg.sender === currentUser;
              return (
                <div 
                  key={index} 
                  className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] rounded-lg p-3 ${
                    isMine 
                      ? 'bg-primary text-white' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    <p className="text-xs opacity-70 mb-1">{msg.sender}</p>
                    <p>{msg.message}</p>
                    <p className="text-xs opacity-70 text-right mt-1">
                      {new Date(msg.createdAt).toLocaleTimeString('pl-PL', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSend} className="p-4 border-t">
          <div className="flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Napisz wiadomość..."
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent"
              disabled={sending}
            />
            <button
              type="submit"
              disabled={sending || !newMessage.trim()}
              className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-green-600 disabled:opacity-50"
            >
              ➤
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}