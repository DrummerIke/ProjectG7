import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { authApi } from '@/api/auth';

export default function DashboardLayout() {
  const { user, setUser } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await authApi.logout();
      setUser(null);
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const navigation = [
    { name: 'Главная', href: '/dashboard' },
    { name: 'Задачи', href: '/dashboard/tasks' },
    { name: 'График', href: '/dashboard/schedule' },
    { name: 'Заявки', href: '/dashboard/requests' },
    { name: 'КП', href: '/dashboard/proposals' },
  ];

  return (
    <div className="min-h-screen bg-bork-dark">
      {/* Header */}
      <header className="bg-bork-gray border-b border-bork-light sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <Link to="/dashboard" className="text-xl font-bold text-white">
                BORK Portal
              </Link>
              <nav className="hidden md:flex space-x-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="text-bork-textMuted hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-white">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-xs text-bork-textMuted">
                  {user?.role === 'CONSULTANT_G6' && 'Консультант'}
                  {user?.role === 'LEADER_G6' && 'Руководитель'}
                  {user?.role === 'ADMIN' && 'Администратор'}
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-bork-accent hover:bg-bork-accentHover text-white text-sm font-medium rounded-lg transition-all"
              >
                Выход
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <nav className="md:hidden bg-bork-gray border-b border-bork-light fixed bottom-0 left-0 right-0 z-50">
        <div className="grid grid-cols-5 gap-1 px-2 py-2">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="flex flex-col items-center justify-center p-2 text-xs text-bork-textMuted hover:text-white transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 md:pb-8">
        <Outlet />
      </main>
    </div>
  );
}
