import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement actual login logic with API call
    console.log('Login attempt:', { email, password })
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-bork-dark">
      <div className="card w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-bork-primary mb-2">BORK Portal</h1>
          <p className="text-gray-400">Корпоративный портал для сотрудников</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
              placeholder="employee@bork.ru"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-2">
              Пароль
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
              placeholder="••••••••"
              required
            />
          </div>

          {/* TODO: Add Captcha integration placeholder */}
          <div className="bg-bork-dark p-4 rounded border border-gray-700">
            <p className="text-sm text-gray-400 text-center">
              [Место для Yandex SmartCaptcha]
            </p>
          </div>

          <button type="submit" className="btn-primary w-full">
            Войти
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>© 2024 BORK. Все права защищены.</p>
          <p className="mt-1">Соответствует 152-ФЗ</p>
        </div>
      </div>
    </div>
  )
}
