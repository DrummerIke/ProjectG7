import { useAuthStore } from '@/store/authStore';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string[];
}

export default function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { user, isAuthenticated, isLoading } = useAuthStore();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bork-dark">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-bork-accent"></div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && !requiredRole.includes(user.role)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bork-dark px-4">
        <div className="max-w-md w-full bg-bork-gray rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Доступ запрещён</h2>
          <p className="text-bork-textMuted mb-6">
            У вас недостаточно прав для доступа к этой странице.
          </p>
          <button
            onClick={() => window.history.back()}
            className="px-6 py-3 bg-bork-accent hover:bg-bork-accentHover text-white font-medium rounded-lg transition-all"
          >
            Назад
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
