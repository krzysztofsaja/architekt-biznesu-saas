import { useState } from 'react';
import { supabase } from '../utils/supabase';

export default function Auth({ onAuth }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isLogin) {
        const { data, error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        if (signInError) throw signInError;
        onAuth(data.user);
      } else {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { username } }
        });
        if (signUpError) throw signUpError;
        
        if (data.user) {
          onAuth(data.user);
        } else {
          setError('Sprawdź swoją skrzynkę email aby potwierdzić konto!');
        }
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin }
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-[100]">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 className="text-xl font-bold mb-4 text-center">
          {isLogin ? '🔐 Logowanie' : '📝 Rejestracja'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nazwa użytkownika
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Twój nick"
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                required={!isLogin}
              />
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="twoj@email.pl"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Hasło
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              required
              minLength={6}
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
            className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-green-600 disabled:opacity-50"
          >
            {loading ? 'Ładowanie...' : (isLogin ? 'Zaloguj się' : 'Zarejestruj się')}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-primary hover:underline text-sm"
          >
            {isLogin ? 'Nie masz konta? Zarejestruj się' : 'Masz konto? Zaloguj się'}
          </button>
        </div>
      </div>
    </div>
  );
}