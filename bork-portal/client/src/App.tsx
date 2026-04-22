import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ProtectedRoute from './layouts/ProtectedRoute';

// Placeholder pages
const TasksPage = () => <div className="text-white">Страница задач (в разработке)</div>;
const SchedulePage = () => <div className="text-white">Страница графика (в разработке)</div>;
const ProposalsPage = () => <div className="text-white">Страница КП (в разработке)</div>;

export default function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<LoginPage />} />

      {/* Protected routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="/schedule" element={<SchedulePage />} />
        <Route path="/proposals" element={<ProposalsPage />} />
      </Route>

      {/* Redirects */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
