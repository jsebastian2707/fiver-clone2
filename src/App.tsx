import './App.css'
import { Routes, Route } from 'react-router';
import  HomePage  from './pages/HomePage';
function App() {
  return (
    <>
      <Routes>
          <Route index element={<HomePage />} />
          {/* <Route path="auth" element={<AuthPage />} />
          <Route path="profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
          <Route path="services" element={<ServicesListPage />} />
          <Route path="services/:id" element={<ServiceDetailPage />} />
          <Route path="admin" element={
            <ProtectedRoute adminOnly={true}>
              <AdminDashboardPage />
            </ProtectedRoute>
          } />
          <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>
    </>
  )
}

export default App
