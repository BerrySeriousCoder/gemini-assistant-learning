import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/firebase';
import { useAuthStore } from './store/authStore';
import { Sidebar } from './components/Layout/Sidebar';
import { Header } from './components/Layout/Header';
import { ConfigPanel } from './components/Dashboard/ConfigPanel';
import { Analytics } from './components/Dashboard/Analytics';
import { IntegrationPage } from './pages/IntegrationPage';
import { ChatWindow } from './components/ChatWindow';
import { LoginPage } from './pages/LoginPage';
import { AuthGuard } from './components/Auth/AuthGuard';

function App() {
  const { setUser } = useAuthStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, [setUser]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/*"
          element={
            <AuthGuard>
              <div className="min-h-screen bg-gray-100 flex">
                <Sidebar />
                <div className="flex-1 ml-64">
                  <Header />
                  <main className="mt-16 p-6">
                    <Routes>
                      <Route path="/" element={<Analytics />} />
                      <Route path="/config" element={<ConfigPanel />} />
                      <Route path="/analytics" element={<Analytics />} />
                      <Route path="/integration" element={<IntegrationPage />} />
                    </Routes>
                  </main>
                </div>
                <ChatWindow />
              </div>
            </AuthGuard>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;