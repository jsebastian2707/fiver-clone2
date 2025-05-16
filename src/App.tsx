import "./App.css";
import { Routes, Route } from "react-router";
import { UserProvider } from "./context/UserContext";
import AuthPage from "./pages/AuthPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProfilePage from "./pages/ProfilePage";
import ServiceDetailPage from "./pages/ServiceDetailPage";
import ServicesListPage from "./pages/ServicesListPage";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Toaster } from 'sonner';
function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 text-gray-100">
      <UserProvider>
        <Navbar />
        <div className="flex-grow mx-auto px-4 sm:px-6 lg:px-8 py-8 ">
          <Routes>
            <Route index element={<HomePage />} />
            <Route path="auth" element={<AuthPage />} />
            <Route path="profile" element={ <ProfilePage /> }/>
            {/*
            <Route path="services" element={<ServicesListPage />} />
            <Route path="services/:id" element={<ServiceDetailPage />} />
            <Route
              path="admin"
              element={
                <ProtectedRoute adminOnly={true}>
                  <AdminDashboardPage />
                </ProtectedRoute>
              }
            /> */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
        <Footer />
        <Toaster />
      </UserProvider>
    </div>
  );
}

export default App;
