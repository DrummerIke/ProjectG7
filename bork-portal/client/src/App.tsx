import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import Layout from './components/Layout';

// Placeholder pages
const TasksPage = () => <div className="p-6 text-white"><h1 className="text-2xl font-bold mb-4">Задачи</h1><p className="text-bork-textSecondary">Модуль в разработке...</p></div>;
const SchedulePage = () => <div className="p-6 text-white"><h1 className="text-2xl font-bold mb-4">График</h1><p className="text-bork-textSecondary">Модуль в разработке...</p></div>;
const ProposalsPage = () => <div className="p-6 text-white"><h1 className="text-2xl font-bold mb-4">Коммерческие предложения</h1><p className="text-bork-textSecondary">Модуль в разработке...</p></div>;
const NotesPage = () => <div className="p-6 text-white"><h1 className="text-2xl font-bold mb-4">Заметки</h1><p className="text-bork-textSecondary">Модуль в разработке...</p></div>;
const TeamSchedulePage = () => <div className="p-6 text-white"><h1 className="text-2xl font-bold mb-4">График команды</h1><p className="text-bork-textSecondary">Модуль в разработке...</p></div>;
const UsersPage = () => <div className="p-6 text-white"><h1 className="text-2xl font-bold mb-4">Управление пользователями</h1><p className="text-bork-textSecondary">Модуль в разработке...</p></div>;

function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#2a2a2a',
            color: '#ffffff',
            border: '1px solid #3a3a3a',
          },
          success: {
            iconTheme: {
              primary: '#0066cc',
              secondary: '#ffffff',
            },
          },
          error: {
            iconTheme: {
              primary: '#dc2626',
              secondary: '#ffffff',
            },
          },
        }}
      />
      
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<LoginPage />} />
        
        {/* Protected routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="tasks" element={<TasksPage />} />
          <Route path="schedule" element={<SchedulePage />} />
          <Route path="schedule/team" element={<TeamSchedulePage />} />
          <Route path="proposals" element={<ProposalsPage />} />
          <Route path="notes" element={<NotesPage />} />
          <Route path="admin/users" element={<UsersPage />} />
        </Route>

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
