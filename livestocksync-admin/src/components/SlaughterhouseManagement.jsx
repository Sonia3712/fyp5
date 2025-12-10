import React, { useState } from 'react';
import { Search, Plus, MapPin, Phone, Clock, Edit, Trash2, Warehouse, X } from 'lucide-react';

const SlaughterhouseManagement = ({ onAddActivity }) => {
  const [slaughterhouses, setSlaughterhouses] = useState([
    {
      id: 1,
      name: 'Al-Madina Halal Meats',
      email: 'info@almadina.com',
      phone: '+92 300 1234567',
      address: '123 Industrial Area, Faisalabad',
      hours: '6:00 AM - 10:00 PM',
      capacity: '50 animals/day',
      status: 'Active'
    },
    {
      id: 2,
      name: 'Fresh Quality Meats',
      email: 'contact@freshquality.com',
      phone: '+92 300 7654321',
      address: '456 Commercial Road, Lahore',
      hours: '5:00 AM - 11:00 PM',
      capacity: '75 animals/day',
      status: 'Active'
    },
    {
      id: 3,
      name: 'Rural Slaughter Services',
      email: 'service@ruralslaughter.com',
      phone: '+92 300 1122334',
      address: '789 Village Center, Chiniot',
      hours: '7:00 AM - 9:00 PM',
      capacity: '25 animals/day',
      status: 'Inactive'
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingSlaughterhouse, setEditingSlaughterhouse] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newSlaughterhouse, setNewSlaughterhouse] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    hours: '',
    capacity: '',
    status: 'Active'
  });

  // Search functionality
  const filteredSlaughterhouses = slaughterhouses.filter(sh =>
    sh.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sh.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sh.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Add new slaughterhouse
  const handleAddSlaughterhouse = () => {
    if (!newSlaughterhouse.name || !newSlaughterhouse.email || !newSlaughterhouse.phone) {
      alert('Please fill in all required fields');
      return;
    }

    const slaughterhouse = {
      ...newSlaughterhouse,
      id: slaughterhouses.length + 1
    };
    
    setSlaughterhouses([...slaughterhouses, slaughterhouse]);
    setShowAddModal(false);
    
    // Reset form
    setNewSlaughterhouse({
      name: '',
      email: '',
      phone: '',
      address: '',
      hours: '',
      capacity: '',
      status: 'Active'
    });
    
    // Add to recent activities
    if (onAddActivity) {
      onAddActivity({
        action: 'New slaughterhouse added',
        user: slaughterhouse.name,
        time: 'Just now',
        type: 'business',
        status: 'completed'
      });
    }
    
    alert('Slaughterhouse added successfully!');
  };

  // Edit slaughterhouse
  const handleEditSlaughterhouse = (slaughterhouse) => {
    setEditingSlaughterhouse({ ...slaughterhouse });
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    if (editingSlaughterhouse) {
      const updatedSlaughterhouses = slaughterhouses.map(sh =>
        sh.id === editingSlaughterhouse.id ? editingSlaughterhouse : sh
      );
      setSlaughterhouses(updatedSlaughterhouses);
      setShowEditModal(false);
      setEditingSlaughterhouse(null);
      
      // Add to recent activities
      if (onAddActivity) {
        onAddActivity({
          action: 'Slaughterhouse updated',
          user: editingSlaughterhouse.name,
          time: 'Just now',
          type: 'business',
          status: 'completed'
        });
      }
      
      alert('Slaughterhouse updated successfully!');
    }
  };

  // Delete slaughterhouse
  const handleDeleteSlaughterhouse = (slaughterhouseId) => {
    if (window.confirm('Are you sure you want to delete this slaughterhouse?')) {
      const slaughterhouse = slaughterhouses.find(sh => sh.id === slaughterhouseId);
      const updatedSlaughterhouses = slaughterhouses.filter(sh => sh.id !== slaughterhouseId);
      setSlaughterhouses(updatedSlaughterhouses);
      
      // Add to recent activities
      if (slaughterhouse && onAddActivity) {
        onAddActivity({
          action: 'Slaughterhouse deleted',
          user: slaughterhouse.name,
          time: 'Just now',
          type: 'business',
          status: 'completed'
        });
      }
      
      alert('Slaughterhouse deleted successfully!');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Slaughterhouse Management</h1>
          <p className="text-base text-muted-foreground">Manage registered slaughterhouses</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
            <input
              type="text"
              placeholder="Search slaughterhouses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary w-64 text-base"
            />
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-lg hover:opacity-90 transition-colors text-base"
          >
            <Plus size={20} />
            Add Slaughterhouse
          </button>
        </div>
      </div>

      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left p-4 font-medium text-sm text-foreground">Slaughterhouse</th>
                <th className="text-left p-4 font-medium text-sm text-foreground">Contact</th>
                <th className="text-left p-4 font-medium text-sm text-foreground">Location</th>
                <th className="text-left p-4 font-medium text-sm text-foreground">Operating Hours</th>
                <th className="text-left p-4 font-medium text-sm text-foreground">Capacity</th>
                <th className="text-left p-4 font-medium text-sm text-foreground">Status</th>
                <th className="text-left p-4 font-medium text-sm text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSlaughterhouses.map((sh) => (
                <tr key={sh.id} className="border-b border-border hover:bg-accent/50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Warehouse size={20} className="text-primary" />
                      </div>
                      <div>
                        <p className="text-base font-medium text-foreground">{sh.name}</p>
                        <p className="text-sm text-muted-foreground">{sh.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1 text-base text-foreground">
                      <Phone size={16} />
                      {sh.phone}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-start gap-1 text-base text-foreground max-w-xs">
                      <MapPin size={16} className="mt-0.5 flex-shrink-0" />
                      <span>{sh.address}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1 text-base text-foreground">
                      <Clock size={16} />
                      {sh.hours}
                    </div>
                  </td>
                  <td className="p-4 text-base text-foreground">{sh.capacity}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      sh.status === 'Active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {sh.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleEditSlaughterhouse(sh)}
                        className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        onClick={() => handleDeleteSlaughterhouse(sh.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Slaughterhouse Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-card rounded-lg p-6 w-96 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-foreground">Add New Slaughterhouse</h3>
              <button onClick={() => setShowAddModal(false)} className="text-muted-foreground hover:text-foreground">
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Slaughterhouse Name *</label>
                <input
                  type="text"
                  value={newSlaughterhouse.name}
                  onChange={(e) => setNewSlaughterhouse({...newSlaughterhouse, name: e.target.value})}
                  className="w-full p-2 border border-border rounded-lg bg-background text-base focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter slaughterhouse name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Email *</label>
                <input
                  type="email"
                  value={newSlaughterhouse.email}
                  onChange={(e) => setNewSlaughterhouse({...newSlaughterhouse, email: e.target.value})}
                  className="w-full p-2 border border-border rounded-lg bg-background text-base focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter email address"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Phone *</label>
                <input
                  type="text"
                  value={newSlaughterhouse.phone}
                  onChange={(e) => setNewSlaughterhouse({...newSlaughterhouse, phone: e.target.value})}
                  className="w-full p-2 border border-border rounded-lg bg-background text-base focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter phone number"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Address</label>
                <textarea
                  value={newSlaughterhouse.address}
                  onChange={(e) => setNewSlaughterhouse({...newSlaughterhouse, address: e.target.value})}
                  className="w-full p-2 border border-border rounded-lg bg-background text-base focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter full address"
                  rows="3"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Operating Hours</label>
                  <input
                    type="text"
                    value={newSlaughterhouse.hours}
                    onChange={(e) => setNewSlaughterhouse({...newSlaughterhouse, hours: e.target.value})}
                    className="w-full p-2 border border-border rounded-lg bg-background text-base focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="e.g., 6:00 AM - 10:00 PM"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Capacity</label>
                  <input
                    type="text"
                    value={newSlaughterhouse.capacity}
                    onChange={(e) => setNewSlaughterhouse({...newSlaughterhouse, capacity: e.target.value})}
                    className="w-full p-2 border border-border rounded-lg bg-background text-base focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="e.g., 50 animals/day"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Status</label>
                <select 
                  value={newSlaughterhouse.status}
                  onChange={(e) => setNewSlaughterhouse({...newSlaughterhouse, status: e.target.value})}
                  className="w-full p-2 border border-border rounded-lg bg-background text-base focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button 
                onClick={handleAddSlaughterhouse}
                className="flex-1 bg-gradient-to-r from-primary to-accent text-primary-foreground py-2 rounded-lg hover:opacity-90 transition-colors text-base"
              >
                Add Slaughterhouse
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

      {/* Edit Slaughterhouse Modal */}
      {showEditModal && editingSlaughterhouse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-card rounded-lg p-6 w-96">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-foreground">Edit Slaughterhouse</h3>
              <button onClick={() => setShowEditModal(false)} className="text-muted-foreground hover:text-foreground">
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Slaughterhouse Name</label>
                <input
                  type="text"
                  value={editingSlaughterhouse.name}
                  onChange={(e) => setEditingSlaughterhouse({...editingSlaughterhouse, name: e.target.value})}
                  className="w-full p-2 border border-border rounded-lg bg-background text-base focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                <input
                  type="email"
                  value={editingSlaughterhouse.email}
                  onChange={(e) => setEditingSlaughterhouse({...editingSlaughterhouse, email: e.target.value})}
                  className="w-full p-2 border border-border rounded-lg bg-background text-base focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Status</label>
                <select 
                  value={editingSlaughterhouse.status}
                  onChange={(e) => setEditingSlaughterhouse({...editingSlaughterhouse, status: e.target.value})}
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

export default SlaughterhouseManagement;