import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Schedule from './pages/Schedule'
import Requests from './pages/Requests'
import CommercialProposals from './pages/CommercialProposals'
import Tasks from './pages/Tasks'
import Layout from './components/Layout'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="schedule" element={<Schedule />} />
        <Route path="requests" element={<Requests />} />
        <Route path="proposals" element={<CommercialProposals />} />
        <Route path="tasks" element={<Tasks />} />
      </Route>
    </Routes>
  )
}

export default App
