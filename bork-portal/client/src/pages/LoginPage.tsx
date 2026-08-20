import { useState, FormEvent } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Link } from 'react-router-dom';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading, error } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await login({ email, password });
    } catch (err) {
      // Error handled in hook
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bork-dark px-4">
      <div className="max-w-md w-full bg-bork-gray rounded-xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">BORK Portal</h1>
          <p className="text-bork-textMuted">Вход в корпоративный портал</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-900/50 border border-red-500 rounded-lg text-red-200 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-bork-textMuted mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 bg-bork-dark border border-bork-light rounded-lg text-white placeholder-bork-textMuted focus:outline-none focus:ring-2 focus:ring-bork-accent focus:border-transparent transition-all"
              placeholder="employee@bork.ru"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-bork-textMuted mb-2">
              Пароль
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 bg-bork-dark border border-bork-light rounded-lg text-white placeholder-bork-textMuted focus:outline-none focus:ring-2 focus:ring-bork-accent focus:border-transparent transition-all"
              placeholder="••••••••"
            />
          </div>

          {/* TODO: Add Yandex SmartCaptcha here */}
          {/* <div className="flex justify-center">
            <div ref={captchaRef} className="captcha-container" />
          </div> */}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 bg-bork-accent hover:bg-bork-accentHover disabled:bg-bork-light disabled:cursor-not-allowed text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
          >
            {isLoading ? 'Вход...' : 'Войти'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link 
            to="/register" 
            className="text-sm text-bork-textMuted hover:text-bork-accent transition-colors"
          >
            Нет аккаунта? Обратитесь к администратору
          </Link>
        </div>

        <div className="mt-8 pt-6 border-t border-bork-light">
          <div className="grid grid-cols-2 gap-4 text-xs text-bork-textMuted">
            <div className="text-center">
              <span className="block font-medium text-bork-text">SDEK</span>
              <span>Логистика</span>
            </div>
            <div className="text-center">
              <span className="block font-medium text-bork-text">1C</span>
              <span>Учёт</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
