import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import ProtectedRoute from '@/components/ProtectedRoute';
import DashboardLayout from '@/components/DashboardLayout';
import LoginPage from '@/pages/LoginPage';
import DashboardPage from '@/pages/DashboardPage';

// Placeholder pages - will be implemented later
const TasksPage = () => <div className="text-white">Страница задач</div>;
const SchedulePage = () => <div className="text-white">Страница графика</div>;
const RequestsPage = () => <div className="text-white">Страница заявок</div>;
const ProposalsPage = () => <div className="text-white">Страница КП</div>;

export default function App() {
  const { isAuthenticated, isLoading } = useAuthStore();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bork-dark">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-bork-accent"></div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route 
        path="/login" 
        element={isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage />} 
      />
      
      {/* Protected Routes */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="tasks" element={<TasksPage />} />
        <Route path="schedule" element={<SchedulePage />} />
        <Route path="requests" element={<RequestsPage />} />
        <Route path="proposals" element={<ProposalsPage />} />
      </Route>

      {/* Redirects */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
