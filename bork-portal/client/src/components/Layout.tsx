import { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const navigation = [
    { name: 'Главная', href: '/dashboard', icon: '🏠' },
    { name: 'Задачи', href: '/tasks', icon: '📋' },
    { name: 'График', href: '/schedule', icon: '📅' },
    { name: 'Заявки', href: '/requests', icon: '📝' },
    { name: 'КП', href: '/proposals', icon: '💼' },
  ]

  return (
    <div className="min-h-screen bg-bork-dark">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 z-30 h-full w-64 bg-bork-secondary transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-700">
          <h1 className="text-xl font-bold text-bork-primary">BORK Portal</h1>
          <button 
            className="lg:hidden text-gray-400 hover:text-white"
            onClick={() => setSidebarOpen(false)}
          >
            ✕
          </button>
        </div>

        <nav className="mt-6 px-4 space-y-2">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="flex items-center px-4 py-3 text-gray-300 hover:bg-bork-dark hover:text-white rounded-lg transition-colors duration-200"
              onClick={() => setSidebarOpen(false)}
            >
              <span className="mr-3 text-xl">{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-bork-primary rounded-full flex items-center justify-center text-white font-bold">
              U
            </div>
            <div>
              <p className="text-sm font-medium text-white">User Name</p>
              <p className="text-xs text-gray-400">consultant_g6</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <header className="h-16 bg-bork-secondary border-b border-gray-700 flex items-center justify-between px-4 lg:px-6">
          <button 
            className="lg:hidden text-gray-400 hover:text-white"
            onClick={() => setSidebarOpen(true)}
          >
            ☰
          </button>

          <div className="flex items-center space-x-4 ml-auto">
            <button className="text-gray-400 hover:text-white">
              🔔
            </button>
            <button className="text-gray-400 hover:text-white">
              ⚙️
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
