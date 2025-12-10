// App.jsx - Updated to fix initial loading
import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import TopNavbar from './components/TopNavbar';
import Dashboard from './components/Dashboard';
import UserManagement from './components/UserManagement';
import HospitalManagement from './components/HospitalManagement';
import SlaughterhouseManagement from './components/SlaughterhouseManagement';
import FeedbackManagement from './components/FeedbackManagement';
import Footer from './components/Footer';

// Import Hospital and Slaughterhouse Portal components
import HospitalPortal from './components/HospitalPortal/HospitalPortal';
import SlaughterhousePortal from './components/SlaughterhousePortal/SlaughterhousePortal';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on component mount
  useEffect(() => {
    const savedUser = localStorage.getItem('livestocksync_user');
    const savedRole = localStorage.getItem('livestocksync_role');
    
    if (savedUser && savedRole) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        setIsLoggedIn(true);
        setActiveTab(savedRole === 'admin' ? 'dashboard' : 'portal');
      } catch (error) {
        console.error('Error parsing saved user data:', error);
        // Clear invalid data
        localStorage.removeItem('livestocksync_user');
        localStorage.removeItem('livestocksync_role');
      }
    }
    setIsLoading(false);
  }, []);

  const handleLogin = (userData, role) => {
    setUser(userData);
    setIsLoggedIn(true);
    setActiveTab(role === 'admin' ? 'dashboard' : 'portal');
  };

  const handleSignOut = () => {
    localStorage.removeItem('livestocksync_user');
    localStorage.removeItem('livestocksync_role');
    setUser(null);
    setIsLoggedIn(false);
    setActiveTab('dashboard');
  };

  // Render content based on role
  const renderAdminContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'users':
        return <UserManagement />;
      case 'hospitals':
        return <HospitalManagement />;
      case 'slaughterhouses':
        return <SlaughterhouseManagement />;
      case 'feedback':
        return <FeedbackManagement />;
      default:
        return <Dashboard />;
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Show landing page if not logged in
  if (!isLoggedIn) {
    return <LandingPage onLogin={handleLogin} />;
  }

  // Determine which portal to show based on user role
  const userRole = user?.role || 'admin';
  
  if (userRole === 'hospital') {
    return <HospitalPortal user={user} onSignOut={handleSignOut} />;
  }
  
  if (userRole === 'slaughterhouse') {
    return <SlaughterhousePortal user={user} onSignOut={handleSignOut} />;
  }

  // Show admin dashboard if logged in as admin
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <TopNavbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        user={user}
        onSignOut={handleSignOut}
      />
      
      {/* Main Content */}
      <main className="flex-1 max-w-8xl mx-auto w-full py-8 px-6">
        {/* Page Header */}
        <div className="mb-8 animate-fade-in-up">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1).replace(/([A-Z])/g, ' $1')}
          </h1>
          <p className="text-muted-foreground mt-3 text-lg">
            Manage your livestock platform efficiently and effectively
          </p>
        </div>

        {/* Page Content */}
        <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          {renderAdminContent()}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;