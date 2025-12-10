import React, { useState } from 'react';
import { Search, Filter, MoreVertical, Edit, Trash2, User, Mail, Phone, MapPin, X, Plus, Eye, Lock, Unlock } from 'lucide-react';

const UserManagement = ({ onAddActivity }) => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'Ali Ahmed',
      email: 'ali.ahmed@email.com',
      phone: '+92 300 1234567',
      type: 'Farmer',
      location: 'Faisalabad',
      status: 'Active',
      joinDate: '2024-01-15'
    },
    {
      id: 2,
      name: 'Dr. Sara Khan',
      email: 'sara.khan@email.com',
      phone: '+92 300 7654321',
      type: 'Veterinarian',
      location: 'Lahore',
      status: 'Active',
      joinDate: '2024-01-10'
    },
    {
      id: 3,
      name: 'Saba',
      email: 'saba@email.com',
      phone: '+92 300 1122334',
      type: 'Farmer',
      location: 'Chiniot',
      status: 'Inactive',
      joinDate: '2024-01-05'
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showMoreOptions, setShowMoreOptions] = useState(null);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'Farmer',
    location: '',
    status: 'Active',
    joinDate: new Date().toISOString().split('T')[0]
  });

  // Search functionality
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.phone.includes(searchQuery);
    
    const matchesType = filterType === 'all' || user.type === filterType;
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  // Delete user
  const handleDeleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      const user = users.find(u => u.id === userId);
      const updatedUsers = users.filter(user => user.id !== userId);
      setUsers(updatedUsers);
      
      // Add to recent activities
      if (user && onAddActivity) {
        onAddActivity({
          action: 'User deleted',
          user: user.name,
          time: 'Just now',
          type: 'user',
          status: 'completed'
        });
      }
      
      alert('User deleted successfully!');
    }
  };

  // Edit user
  const handleEditUser = (user) => {
    setEditingUser({ ...user });
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    if (editingUser) {
      const updatedUsers = users.map(user => 
        user.id === editingUser.id ? editingUser : user
      );
      setUsers(updatedUsers);
      setShowEditModal(false);
      setEditingUser(null);
      
      // Add to recent activities
      if (onAddActivity) {
        onAddActivity({
          action: 'User updated',
          user: editingUser.name,
          time: 'Just now',
          type: 'user',
          status: 'completed'
        });
      }
      
      alert('User updated successfully!');
    }
  };

  // Toggle user status
  const handleToggleStatus = (userId) => {
    const updatedUsers = users.map(user => {
      if (user.id === userId) {
        const newStatus = user.status === 'Active' ? 'Inactive' : 'Active';
        const updatedUser = { ...user, status: newStatus };
        
        // Add to recent activities
        if (onAddActivity) {
          onAddActivity({
            action: `User ${newStatus.toLowerCase()}`,
            user: user.name,
            time: 'Just now',
            type: 'user',
            status: 'completed'
          });
        }
        
        return updatedUser;
      }
      return user;
    });
    
    setUsers(updatedUsers);
    setShowMoreOptions(null);
  };

  // Add new user
  const handleAddUser = () => {
    if (!newUser.name || !newUser.email || !newUser.phone) {
      alert('Please fill in all required fields');
      return;
    }

    const user = {
      ...newUser,
      id: users.length + 1
    };
    
    setUsers([...users, user]);
    setShowAddModal(false);
    
    // Reset form
    setNewUser({
      name: '',
      email: '',
      phone: '',
      type: 'Farmer',
      location: '',
      status: 'Active',
      joinDate: new Date().toISOString().split('T')[0]
    });
    
    // Add to recent activities
    if (onAddActivity) {
      onAddActivity({
        action: 'New user added',
        user: user.name,
        time: 'Just now',
        type: 'user',
        status: 'completed'
      });
    }
    
    alert('User added successfully!');
  };

  // Apply filters
  const handleApplyFilters = () => {
    setShowFilterModal(false);
  };

  // Clear filters
  const handleClearFilters = () => {
    setFilterType('all');
    setFilterStatus('all');
    setShowFilterModal(false);
  };

  // More options handlers
  const handleViewDetails = (user) => {
    alert(`Viewing details for ${user.name}\nEmail: ${user.email}\nPhone: ${user.phone}\nType: ${user.type}\nLocation: ${user.location}\nStatus: ${user.status}`);
    setShowMoreOptions(null);
  };

  const handleResetPassword = (userId) => {
    if (window.confirm('Are you sure you want to reset this user\'s password?')) {
      const user = users.find(u => u.id === userId);
      
      // Add to recent activities
      if (user && onAddActivity) {
        onAddActivity({
          action: 'Password reset',
          user: user.name,
          time: 'Just now',
          type: 'user',
          status: 'completed'
        });
      }
      
      alert('Password reset email sent to user!');
      setShowMoreOptions(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">User Management</h1>
          <p className="text-base text-muted-foreground">Manage farmers, veterinarians, and service providers</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary w-64 text-base"
            />
          </div>
          <button 
            onClick={() => setShowFilterModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors text-base"
          >
            <Filter size={20} />
            Filter
          </button>
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-lg hover:opacity-90 transition-colors text-base"
          >
            <Plus size={20} />
            Add User
          </button>
        </div>
      </div>

      {/* Filter Summary */}
      {(filterType !== 'all' || filterStatus !== 'all') && (
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Active filters:</span>
          {filterType !== 'all' && (
            <span className="bg-primary/10 text-primary px-2 py-1 rounded-lg">
              Type: {filterType}
            </span>
          )}
          {filterStatus !== 'all' && (
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-lg">
              Status: {filterStatus}
            </span>
          )}
          <button 
            onClick={handleClearFilters}
            className="text-red-600 hover:text-red-800 text-sm"
          >
            Clear all
          </button>
        </div>
      )}

      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left p-4 font-medium text-sm text-foreground">User</th>
                <th className="text-left p-4 font-medium text-sm text-foreground">Type</th>
                <th className="text-left p-4 font-medium text-sm text-foreground">Location</th>
                <th className="text-left p-4 font-medium text-sm text-foreground">Status</th>
                <th className="text-left p-4 font-medium text-sm text-foreground">Join Date</th>
                <th className="text-left p-4 font-medium text-sm text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-border hover:bg-accent/50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
                        <User size={20} className="text-primary-foreground" />
                      </div>
                      <div>
                        <p className="text-base font-medium text-foreground">{user.name}</p>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Mail size={14} />
                          {user.email}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Phone size={14} />
                          {user.phone}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      user.type === 'Farmer' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {user.type}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1 text-base text-foreground">
                      <MapPin size={16} />
                      {user.location}
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      user.status === 'Active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="p-4 text-base text-foreground">{user.joinDate}</td>
                  <td className="p-4 relative">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleEditUser(user)}
                        className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        onClick={() => handleDeleteUser(user.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                      <button 
                        onClick={() => setShowMoreOptions(showMoreOptions === user.id ? null : user.id)}
                        className="p-2 text-foreground hover:bg-accent rounded-lg transition-colors relative"
                      >
                        <MoreVertical size={16} />
                      </button>
                    </div>
                    
                    {/* More Options Dropdown */}
                    {showMoreOptions === user.id && (
                      <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg z-10">
                        <div className="p-2">
                          <button
                            onClick={() => handleViewDetails(user)}
                            className="flex items-center w-full px-3 py-2 text-sm text-foreground hover:bg-accent rounded-lg transition-colors mb-1"
                          >
                            <Eye size={16} className="mr-2" />
                            View Details
                          </button>
                          <button
                            onClick={() => handleToggleStatus(user.id)}
                            className="flex items-center w-full px-3 py-2 text-sm text-foreground hover:bg-accent rounded-lg transition-colors mb-1"
                          >
                            {user.status === 'Active' ? (
                              <>
                                <Lock size={16} className="mr-2" />
                                Deactivate
                              </>
                            ) : (
                              <>
                                <Unlock size={16} className="mr-2" />
                                Activate
                              </>
                            )}
                          </button>
                          <button
                            onClick={() => handleResetPassword(user.id)}
                            className="flex items-center w-full px-3 py-2 text-sm text-primary hover:bg-primary/10 rounded-lg transition-colors"
                          >
                            <Lock size={16} className="mr-2" />
                            Reset Password
                          </button>
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Filter Modal */}
      {showFilterModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-card rounded-lg p-6 w-80">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-foreground">Filter Users</h3>
              <button onClick={() => setShowFilterModal(false)} className="text-muted-foreground hover:text-foreground">
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">User Type</label>
                <select 
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="w-full p-2 border border-border rounded-lg bg-background text-base focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="all">All Types</option>
                  <option value="Farmer">Farmer</option>
                  <option value="Veterinarian">Veterinarian</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Status</label>
                <select 
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full p-2 border border-border rounded-lg bg-background text-base focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="all">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button 
                onClick={handleApplyFilters}
                className="flex-1 bg-gradient-to-r from-primary to-accent text-primary-foreground py-2 rounded-lg hover:opacity-90 transition-colors text-base"
              >
                Apply Filters
              </button>
              <button 
                onClick={handleClearFilters}
                className="flex-1 bg-muted text-foreground py-2 rounded-lg hover:bg-muted/80 transition-colors text-base"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-card rounded-lg p-6 w-96 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-foreground">Add New User</h3>
              <button onClick={() => setShowAddModal(false)} className="text-muted-foreground hover:text-foreground">
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Name *</label>
                <input
                  type="text"
                  value={newUser.name}
                  onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                  className="w-full p-2 border border-border rounded-lg bg-background text-base focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter user name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Email *</label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                  className="w-full p-2 border border-border rounded-lg bg-background text-base focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter email address"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Phone *</label>
                <input
                  type="text"
                  value={newUser.phone}
                  onChange={(e) => setNewUser({...newUser, phone: e.target.value})}
                  className="w-full p-2 border border-border rounded-lg bg-background text-base focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter phone number"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">User Type</label>
                <select 
                  value={newUser.type}
                  onChange={(e) => setNewUser({...newUser, type: e.target.value})}
                  className="w-full p-2 border border-border rounded-lg bg-background text-base focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="Farmer">Farmer</option>
                  <option value="Veterinarian">Veterinarian</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Location</label>
                <input
                  type="text"
                  value={newUser.location}
                  onChange={(e) => setNewUser({...newUser, location: e.target.value})}
                  className="w-full p-2 border border-border rounded-lg bg-background text-base focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter location"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Status</label>
                <select 
                  value={newUser.status}
                  onChange={(e) => setNewUser({...newUser, status: e.target.value})}
                  className="w-full p-2 border border-border rounded-lg bg-background text-base focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button 
                onClick={handleAddUser}
                className="flex-1 bg-gradient-to-r from-primary to-accent text-primary-foreground py-2 rounded-lg hover:opacity-90 transition-colors text-base"
              >
                Add User
              </button>
              <button 
                onClick={() => setShowAddModal(false)}
                className="flex-1 bg-muted text-foreground py-2 rounded-lg hover:bg-muted/80 transition-colors text-base"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {showEditModal && editingUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-card rounded-lg p-6 w-96">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-foreground">Edit User</h3>
              <button onClick={() => setShowEditModal(false)} className="text-muted-foreground hover:text-foreground">
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Name</label>
                <input
                  type="text"
                  value={editingUser.name}
                  onChange={(e) => setEditingUser({...editingUser, name: e.target.value})}
                  className="w-full p-2 border border-border rounded-lg bg-background text-base focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                <input
                  type="email"
                  value={editingUser.email}
                  onChange={(e) => setEditingUser({...editingUser, email: e.target.value})}
                  className="w-full p-2 border border-border rounded-lg bg-background text-base focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
                <input
                  type="text"
                  value={editingUser.phone}
                  onChange={(e) => setEditingUser({...editingUser, phone: e.target.value})}
                  className="w-full p-2 border border-border rounded-lg bg-background text-base focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Status</label>
                <select 
                  value={editingUser.status}
                  onChange={(e) => setEditingUser({...editingUser, status: e.target.value})}
                  className="w-full p-2 border border-border rounded-lg bg-background text-base focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button 
                onClick={handleSaveEdit}
                className="flex-1 bg-gradient-to-r from-primary to-accent text-primary-foreground py-2 rounded-lg hover:opacity-90 transition-colors text-base"
              >
                Save Changes
              </button>
              <button 
                onClick={() => setShowEditModal(false)}
                className="flex-1 bg-muted text-foreground py-2 rounded-lg hover:bg-muted/80 transition-colors text-base"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;