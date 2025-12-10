import React, { useState } from 'react';
import { 
  BarChart3, 
  Users, 
  Building2, 
  Warehouse, 
  MessageSquare, 
  Search, 
  Bell, 
  User, 
  Menu, 
  X,
  LogOut,
  Settings,
  ChevronDown,
  CheckCircle,
  AlertCircle,
  Info,
  Save,
  Moon,
  Sun,
  Volume2,
  VolumeX,
  Globe,
  Shield,
  Palette
} from 'lucide-react';

const TopNavbar = ({ activeTab, setActiveTab, user, onSignOut }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isNotificationDropdownOpen, setIsNotificationDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  // Settings state
  const [settings, setSettings] = useState({
    theme: 'light',
    language: 'english',
    notifications: true,
    sounds: true,
    autoSave: true,
    twoFactorAuth: false
  });

  // Mock notifications data
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'success',
      title: 'New User Registration',
      message: 'Ali Ahmed just registered on the platform',
      time: '2 minutes ago',
      read: false
    },
    {
      id: 2,
      type: 'warning',
      title: 'Appointment Reminder',
      message: 'Dr. Sara Khan has a pending appointment confirmation',
      time: '5 minutes ago',
      read: false
    },
    {
      id: 3,
      type: 'info',
      title: 'System Update',
      message: 'New features have been deployed to the platform',
      time: '1 hour ago',
      read: true
    },
    {
      id: 4,
      type: 'success',
      title: 'Feedback Received',
      message: 'New feedback from Usman Farooq about Al-Madina Halal Meats',
      time: '2 hours ago',
      read: true
    }
  ]);

  // Mock search results data
  const searchResults = {
    users: [
      { id: 1, name: 'Ali Ahmed', type: 'Farmer', email: 'ali.ahmed@email.com' },
      { id: 2, name: 'Dr. Sara Khan', type: 'Veterinarian', email: 'sara.khan@email.com' }
    ],
    hospitals: [
      { id: 1, name: 'City Veterinary Hospital', location: 'Faisalabad' },
      { id: 2, name: 'Animal Care Center', location: 'Lahore' }
    ],
    slaughterhouses: [
      { id: 1, name: 'Al-Madina Halal Meats', location: 'Faisalabad' },
      { id: 2, name: 'Fresh Quality Meats', location: 'Lahore' }
    ]
  };

  const menuItems = [
    { 
      id: 'dashboard', 
      label: 'Dashboard', 
      icon: BarChart3, 
      emoji: '📊',
      line1: 'Dashboard', 
      line2: '',
      activeColor: 'text-primary',
      inactiveColor: 'text-blue-500',
      iconColor: 'text-blue-500'
    },
    { 
      id: 'users', 
      label: 'User Management', 
      icon: Users, 
      emoji: '👥',
      line1: 'User', 
      line2: 'Management',
      activeColor: 'text-primary',
      inactiveColor: 'text-green-500',
      iconColor: 'text-green-500'
    },
    { 
      id: 'hospitals', 
      label: 'Hospital Management', 
      icon: Building2, 
      emoji: '🏥',
      line1: 'Hospital', 
      line2: 'Management',
      activeColor: 'text-primary',
      inactiveColor: 'text-red-500',
      iconColor: 'text-red-500'
    },
    { 
      id: 'slaughterhouses', 
      label: 'Slaughterhouse Management', 
      icon: Warehouse, 
      emoji: '🏭',
      line1: 'Slaughterhouse', 
      line2: 'Management',
      activeColor: 'text-primary',
      inactiveColor: 'text-orange-500',
      iconColor: 'text-orange-500'
    },
    { 
      id: 'feedback', 
      label: 'Feedback Management', 
      icon: MessageSquare, 
      emoji: '💬',
      line1: 'Feedback', 
      line2: 'Management',
      activeColor: 'text-primary',
      inactiveColor: 'text-purple-500',
      iconColor: 'text-purple-500'
    },
  ];

  // Handle search functionality
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setShowSearchResults(query.length > 0);
  };

  const handleSearchResultClick = (type, id) => {
    setSearchQuery('');
    setShowSearchResults(false);
    // Navigate to the appropriate section based on type
    switch (type) {
      case 'users':
        setActiveTab('users');
        break;
      case 'hospitals':
        setActiveTab('hospitals');
        break;
      case 'slaughterhouses':
        setActiveTab('slaughterhouses');
        break;
      default:
        break;
    }
    console.log(`Navigating to ${type} with ID: ${id}`);
  };

  // Handle notification actions
  const handleMarkAsRead = (notificationId) => {
    setNotifications(notifications.map(notif => 
      notif.id === notificationId ? { ...notif, read: true } : notif
    ));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  const handleClearAllNotifications = () => {
    if (window.confirm('Are you sure you want to clear all notifications?')) {
      setNotifications([]);
    }
  };

  // Handle user profile actions
  const handleSettings = () => {
    setIsProfileDropdownOpen(false);
    setShowSettingsModal(true);
  };

  const handleSignOut = () => {
    setIsProfileDropdownOpen(false);
    if (window.confirm('Are you sure you want to sign out?')) {
      console.log('Signing out...');
      // Call the onSignOut prop to handle the sign out and redirect to landing page
      if (onSignOut) {
        onSignOut();
      }
    }
  };

  // Handle settings changes
  const handleSettingsChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSaveSettings = () => {
    console.log('Settings saved:', settings);
    setShowSettingsModal(false);
    alert('Settings saved successfully!');
  };

  // Get notification icon based on type
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'warning':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case 'info':
        return <Info className="h-4 w-4 text-blue-500" />;
      default:
        return <Bell className="h-4 w-4 text-gray-500" />;
    }
  };

  const unreadCount = notifications.filter(notif => !notif.read).length;

  return (
    <>
      {/* Top Navigation Bar */}
      <nav className="bg-card border-b border-border sticky top-0 z-50">
        <div className="max-w-8xl mx-auto px-6">
          {/* First Row - Logo, Title, Navigation Tabs, and User Profile */}
          <div className="flex items-center justify-between py-4">
            {/* Logo and Brand */}
            <div className="flex items-center space-x-4">
              {/* Floating Logo Card */}
              <div className="relative">
                <div className="w-14 h-14 bg-card rounded-2xl shadow-lg border border-border flex items-center justify-center transition-all duration-300 hover:shadow-xl hover:scale-105">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent rounded-2xl"></div>
                  <img 
                    src="/logo1.png" 
                    alt="LivestockSync Logo" 
                    className="w-8 h-8 object-contain relative z-10"
                  />
                </div>
                {/* Soft Shadow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl blur-md opacity-50 -z-10"></div>
              </div>

              {/* Brand Text - Updated with gradient */}
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  LivestockSync
                </h1>
                <p className="text-sm text-muted-foreground">Digital Farming Revolution</p>
              </div>
            </div>

            {/* Pill-Shaped Navigation Container - Perfectly centered */}
            <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2">
              <div className="bg-card border border-border rounded-2xl shadow-lg px-6 py-3">
                <div className="flex gap-4">
                  {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`flex flex-col items-center justify-center px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 min-w-[85px] ${
                          isActive
                            ? 'bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-md scale-105'
                            : 'text-foreground hover:bg-accent hover:text-accent-foreground shadow-sm'
                        }`}
                      >
                        <div className="flex items-center gap-1 mb-1">
                          {isActive ? (
                            <Icon className={`h-4 w-4 text-primary-foreground`} />
                          ) : (
                            <>
                              <span className="text-base">{item.emoji}</span>
                              <Icon className={`h-4 w-4 ${item.iconColor}`} />
                            </>
                          )}
                        </div>
                        <span className="text-xs font-semibold leading-tight">{item.line1}</span>
                        {item.line2 && <span className="text-xs font-semibold leading-tight">{item.line2}</span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* User Profile and Mobile Menu */}
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <div className="relative">
                <button 
                  onClick={() => setIsNotificationDropdownOpen(!isNotificationDropdownOpen)}
                  className="relative p-2 text-foreground hover:bg-accent rounded-lg transition-colors"
                >
                  <Bell className="h-5 w-5" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 w-4 h-4 bg-destructive text-primary-foreground text-xs rounded-full flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {/* Notifications Dropdown */}
                {isNotificationDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-card border border-border rounded-lg shadow-lg z-50">
                    <div className="p-4 border-b border-border flex justify-between items-center">
                      <h3 className="text-lg font-semibold text-foreground">Notifications</h3>
                      <div className="flex gap-2">
                        {unreadCount > 0 && (
                          <button 
                            onClick={handleMarkAllAsRead}
                            className="text-sm text-primary hover:text-primary/80 transition-colors"
                          >
                            Mark all read
                          </button>
                        )}
                        <button 
                          onClick={handleClearAllNotifications}
                          className="text-sm text-destructive hover:text-destructive/80 transition-colors"
                        >
                          Clear all
                        </button>
                      </div>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.length > 0 ? (
                        notifications.map((notification) => (
                          <div 
                            key={notification.id}
                            className={`p-4 border-b border-border hover:bg-accent transition-colors cursor-pointer ${
                              !notification.read ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                            }`}
                            onClick={() => handleMarkAsRead(notification.id)}
                          >
                            <div className="flex items-start gap-3">
                              {getNotificationIcon(notification.type)}
                              <div className="flex-1">
                                <p className="text-base font-medium text-foreground">
                                  {notification.title}
                                </p>
                                <p className="text-sm text-muted-foreground mt-1">
                                  {notification.message}
                                </p>
                                <p className="text-xs text-muted-foreground mt-2">
                                  {notification.time}
                                </p>
                              </div>
                              {!notification.read && (
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              )}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="p-8 text-center">
                          <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                          <p className="text-base text-muted-foreground">No notifications</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-accent transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium text-foreground">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.role}</p>
                  </div>
                  <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${
                    isProfileDropdownOpen ? 'rotate-180' : ''
                  }`} />
                </button>

                {/* Profile Dropdown Menu */}
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-card border border-border rounded-lg shadow-lg z-50">
                    <div className="p-4 border-b border-border">
                      <p className="text-base font-medium text-foreground">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                    <div className="p-2">
                      <button 
                        onClick={handleSettings}
                        className="flex items-center w-full px-3 py-2 text-sm text-foreground hover:bg-accent rounded-lg transition-colors"
                      >
                        <Settings className="h-4 w-4 mr-3" />
                        Settings
                      </button>
                      <button 
                        onClick={handleSignOut}
                        className="flex items-center w-full px-3 py-2 text-sm text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                      >
                        <LogOut className="h-4 w-4 mr-3" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-foreground hover:bg-accent transition-colors"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Desktop Search Bar - Centered below tabs */}
          <div className="hidden lg:flex justify-center py-4 relative">
            <div className="relative w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search across platform..."
                value={searchQuery}
                onChange={handleSearch}
                className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 text-base"
              />
              
              {/* Search Results Dropdown */}
              {showSearchResults && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-lg z-50 max-h-96 overflow-y-auto">
                  <div className="p-3">
                    {/* Users Results */}
                    {searchResults.users.length > 0 && (
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-muted-foreground mb-2">Users</h4>
                        {searchResults.users.map(user => (
                          <button
                            key={user.id}
                            onClick={() => handleSearchResultClick('users', user.id)}
                            className="flex items-center gap-3 w-full p-2 hover:bg-accent rounded-lg transition-colors text-left"
                          >
                            <User className="h-4 w-4 text-primary" />
                            <div>
                              <p className="text-sm font-medium text-foreground">{user.name}</p>
                              <p className="text-xs text-muted-foreground">{user.type} • {user.email}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Hospitals Results */}
                    {searchResults.hospitals.length > 0 && (
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-muted-foreground mb-2">Hospitals</h4>
                        {searchResults.hospitals.map(hospital => (
                          <button
                            key={hospital.id}
                            onClick={() => handleSearchResultClick('hospitals', hospital.id)}
                            className="flex items-center gap-3 w-full p-2 hover:bg-accent rounded-lg transition-colors text-left"
                          >
                            <Building2 className="h-4 w-4 text-primary" />
                            <div>
                              <p className="text-sm font-medium text-foreground">{hospital.name}</p>
                              <p className="text-xs text-muted-foreground">{hospital.location}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Slaughterhouses Results */}
                    {searchResults.slaughterhouses.length > 0 && (
                      <div>
                        <h4 className="text-sm font-semibold text-muted-foreground mb-2">Slaughterhouses</h4>
                        {searchResults.slaughterhouses.map(sh => (
                          <button
                            key={sh.id}
                            onClick={() => handleSearchResultClick('slaughterhouses', sh.id)}
                            className="flex items-center gap-3 w-full p-2 hover:bg-accent rounded-lg transition-colors text-left"
                          >
                            <Warehouse className="h-4 w-4 text-primary" />
                            <div>
                              <p className="text-sm font-medium text-foreground">{sh.name}</p>
                              <p className="text-xs text-muted-foreground">{sh.location}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Search Bar */}
          <div className="pb-4 lg:hidden relative">
            <div className="flex justify-center">
              <div className="relative w-full max-w-2xl">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search across platform..."
                  value={searchQuery}
                  onChange={handleSearch}
                  className="w-full pl-12 pr-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 text-base"
                />
                
                {/* Mobile Search Results Dropdown */}
                {showSearchResults && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-lg z-50 max-h-96 overflow-y-auto">
                    <div className="p-3">
                      {/* Similar search results structure as desktop */}
                      {searchResults.users.length > 0 && (
                        <div className="mb-4">
                          <h4 className="text-sm font-semibold text-muted-foreground mb-2">Users</h4>
                          {searchResults.users.map(user => (
                            <button
                              key={user.id}
                              onClick={() => handleSearchResultClick('users', user.id)}
                              className="flex items-center gap-3 w-full p-2 hover:bg-accent rounded-lg transition-colors text-left"
                            >
                              <User className="h-4 w-4 text-primary" />
                              <div>
                                <p className="text-sm font-medium text-foreground">{user.name}</p>
                                <p className="text-xs text-muted-foreground">{user.type}</p>
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-card border-t border-border">
            <div className="px-4 pt-2 pb-4 space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`flex items-center w-full px-4 py-3 rounded-lg text-base font-medium ${
                      isActive
                        ? 'bg-gradient-to-r from-primary to-accent text-primary-foreground'
                        : 'text-foreground hover:bg-accent hover:text-accent-foreground'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {isActive ? (
                        <Icon className={`h-5 w-5 text-primary-foreground`} />
                      ) : (
                        <>
                          <span className="text-lg">{item.emoji}</span>
                          <Icon className={`h-5 w-5 ${item.iconColor}`} />
                        </>
                      )}
                      {item.label}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </nav>

      {/* Settings Modal */}
      {showSettingsModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-2xl border border-border shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div className="flex items-center gap-3">
                <Settings className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold text-foreground">Settings</h2>
              </div>
              <button
                onClick={() => setShowSettingsModal(false)}
                className="p-2 hover:bg-accent rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Theme Settings */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <Palette className="h-5 w-5 text-primary" />
                  Appearance
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Theme
                    </label>
                    <select
                      value={settings.theme}
                      onChange={(e) => handleSettingsChange('theme', e.target.value)}
                      className="w-full p-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary text-base"
                    >
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                      <option value="auto">Auto</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Language
                    </label>
                    <select
                      value={settings.language}
                      onChange={(e) => handleSettingsChange('language', e.target.value)}
                      className="w-full p-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary text-base"
                    >
                      <option value="english">English</option>
                      <option value="urdu">Urdu</option>
                      <option value="spanish">Spanish</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Notification Settings */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <Bell className="h-5 w-5 text-primary" />
                  Notifications
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div>
                      <p className="text-base font-medium text-foreground">Push Notifications</p>
                      <p className="text-sm text-muted-foreground">Receive browser notifications</p>
                    </div>
                    <button
                      onClick={() => handleSettingsChange('notifications', !settings.notifications)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        settings.notifications ? 'bg-primary' : 'bg-muted'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          settings.notifications ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div>
                      <p className="text-base font-medium text-foreground">Sound Effects</p>
                      <p className="text-sm text-muted-foreground">Play sounds for notifications</p>
                    </div>
                    <button
                      onClick={() => handleSettingsChange('sounds', !settings.sounds)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        settings.sounds ? 'bg-primary' : 'bg-muted'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          settings.sounds ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>

              {/* Security Settings */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Security
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div>
                      <p className="text-base font-medium text-foreground">Two-Factor Authentication</p>
                      <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                    </div>
                    <button
                      onClick={() => handleSettingsChange('twoFactorAuth', !settings.twoFactorAuth)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        settings.twoFactorAuth ? 'bg-primary' : 'bg-muted'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          settings.twoFactorAuth ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div>
                      <p className="text-base font-medium text-foreground">Auto Save</p>
                      <p className="text-sm text-muted-foreground">Automatically save changes</p>
                    </div>
                    <button
                      onClick={() => handleSettingsChange('autoSave', !settings.autoSave)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        settings.autoSave ? 'bg-primary' : 'bg-muted'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          settings.autoSave ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex gap-3 p-6 border-t border-border bg-muted/20">
              <button
                onClick={() => setShowSettingsModal(false)}
                className="flex-1 px-4 py-3 text-foreground border border-border rounded-lg hover:bg-accent transition-colors text-base"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveSettings}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-lg hover:opacity-90 transition-colors flex items-center justify-center gap-2 text-base"
              >
                <Save className="h-4 w-4" />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Backdrop for mobile menu */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Backdrop for dropdowns and modals */}
      {(isProfileDropdownOpen || isNotificationDropdownOpen || showSearchResults || showSettingsModal) && (
        <div 
          className="fixed inset-0 z-30"
          onClick={() => {
            setIsProfileDropdownOpen(false);
            setIsNotificationDropdownOpen(false);
            setShowSearchResults(false);
            setShowSettingsModal(false);
          }}
        />
      )}
    </>
  );
};

export default TopNavbar;