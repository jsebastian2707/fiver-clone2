import './App.css'
import { Routes, Route } from 'react-router';
import  HomePage  from './pages/HomePage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 text-gray-100">
      <Navbar/>
      <div className="flex-grow mx-auto px-4 sm:px-6 lg:px-8 py-8 ">
        <Routes >
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
      </div>
      <Footer/>
    </div>
  )
}

export default App
