import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Calendar, 
  FileText, 
  StickyNote, 
  Settings, 
  LogOut,
  Users,
  Briefcase
} from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { canManageUsers, canViewTeamSchedule } from '@/hooks/useRoles';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Задачи', href: '/tasks', icon: Briefcase },
  { name: 'График', href: '/schedule', icon: Calendar },
  { name: 'КП', href: '/proposals', icon: FileText },
  { name: 'Заметки', href: '/notes', icon: StickyNote },
];

export default function Sidebar() {
  const location = useLocation();
  const { user, logout } = useAuthStore();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="flex flex-col h-full bg-bork-dark border-r border-bork-gray">
      {/* Logo */}
      <div className="flex items-center h-16 px-6 border-b border-bork-gray">
        <h1 className="text-xl font-bold text-white">BORK Portal</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                isActive
                  ? 'bg-bork-accent text-white'
                  : 'text-bork-textSecondary hover:bg-bork-gray hover:text-white'
              }`}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.name}
            </Link>
          );
        })}

        {/* Admin-only links */}
        {canManageUsers(user) && (
          <Link
            to="/admin/users"
            className="flex items-center px-4 py-3 text-sm font-medium text-bork-textSecondary rounded-lg hover:bg-bork-gray hover:text-white transition-colors"
          >
            <Users className="w-5 h-5 mr-3" />
            Пользователи
          </Link>
        )}

        {/* Leader & Admin links */}
        {canViewTeamSchedule(user) && (
          <Link
            to="/schedule/team"
            className="flex items-center px-4 py-3 text-sm font-medium text-bork-textSecondary rounded-lg hover:bg-bork-gray hover:text-white transition-colors"
          >
            <Calendar className="w-5 h-5 mr-3" />
            График команды
          </Link>
        )}
      </nav>

      {/* User section */}
      <div className="p-4 border-t border-bork-gray">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 rounded-full bg-bork-accent flex items-center justify-center text-white font-semibold">
            {user?.firstName?.[0]}{user?.lastName?.[0]}
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-white">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-xs text-bork-textSecondary">{user?.role}</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center w-full px-4 py-2 text-sm font-medium text-bork-textSecondary rounded-lg hover:bg-bork-gray hover:text-white transition-colors"
        >
          <LogOut className="w-5 h-5 mr-3" />
          Выйти
        </button>
      </div>
    </div>
  );
}
