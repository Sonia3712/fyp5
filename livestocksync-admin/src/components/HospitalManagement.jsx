import React, { useState } from 'react';
import { Search, Plus, MapPin, Phone, Star, Edit, Trash2, Building2, X } from 'lucide-react';

const HospitalManagement = ({ onAddActivity }) => {
  const [hospitals, setHospitals] = useState([
    {
      id: 1,
      name: 'City Veterinary Hospital',
      email: 'info@cityvet.com',
      phone: '+92 300 1234567',
      address: '123 Main Street, Faisalabad',
      rating: 4.5,
      doctors: 5,
      status: 'Verified'
    },
    {
      id: 2,
      name: 'Animal Care Center',
      email: 'care@animalcenter.com',
      phone: '+92 300 7654321',
      address: '456 Mall Road, Lahore',
      rating: 4.2,
      doctors: 3,
      status: 'Verified'
    },
    {
      id: 3,
      name: 'Rural Vet Clinic',
      email: 'contact@ruralvet.com',
      phone: '+92 300 1122334',
      address: '789 Village Road, Chiniot',
      rating: 4.0,
      doctors: 2,
      status: 'Pending'
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingHospital, setEditingHospital] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newHospital, setNewHospital] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    rating: 0,
    doctors: 0,
    status: 'Pending'
  });

  // Search functionality
  const filteredHospitals = hospitals.filter(hospital =>
    hospital.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    hospital.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    hospital.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Add new hospital
  const handleAddHospital = () => {
    if (!newHospital.name || !newHospital.email || !newHospital.phone) {
      alert('Please fill in all required fields');
      return;
    }

    const hospital = {
      ...newHospital,
      id: hospitals.length + 1,
      rating: parseFloat(newHospital.rating) || 0,
      doctors: parseInt(newHospital.doctors) || 0
    };
    
    setHospitals([...hospitals, hospital]);
    setShowAddModal(false);
    
    // Reset form
    setNewHospital({
      name: '',
      email: '',
      phone: '',
      address: '',
      rating: 0,
      doctors: 0,
      status: 'Pending'
    });
    
    // Add to recent activities
    if (onAddActivity) {
      onAddActivity({
        action: 'New hospital added',
        user: hospital.name,
        time: 'Just now',
        type: 'business',
        status: 'completed'
      });
    }
    
    alert('Hospital added successfully!');
  };

  // Edit hospital
  const handleEditHospital = (hospital) => {
    setEditingHospital({ ...hospital });
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    if (editingHospital) {
      const updatedHospitals = hospitals.map(hospital =>
        hospital.id === editingHospital.id ? editingHospital : hospital
      );
      setHospitals(updatedHospitals);
      setShowEditModal(false);
      setEditingHospital(null);
      
      // Add to recent activities
      if (onAddActivity) {
        onAddActivity({
          action: 'Hospital updated',
          user: editingHospital.name,
          time: 'Just now',
          type: 'business',
          status: 'completed'
        });
      }
      
      alert('Hospital updated successfully!');
    }
  };

  // Delete hospital
  const handleDeleteHospital = (hospitalId) => {
    if (window.confirm('Are you sure you want to delete this hospital?')) {
      const hospital = hospitals.find(h => h.id === hospitalId);
      const updatedHospitals = hospitals.filter(hospital => hospital.id !== hospitalId);
      setHospitals(updatedHospitals);
      
      // Add to recent activities
      if (hospital && onAddActivity) {
        onAddActivity({
          action: 'Hospital deleted',
          user: hospital.name,
          time: 'Just now',
          type: 'business',
          status: 'completed'
        });
      }
      
      alert('Hospital deleted successfully!');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Hospital Management</h1>
          <p className="text-base text-muted-foreground">Manage veterinary hospitals and clinics</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
            <input
              type="text"
              placeholder="Search hospitals..."
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
            Add Hospital
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHospitals.map((hospital) => (
          <div key={hospital.id} className="bg-card rounded-lg border border-border p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Building2 size={24} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{hospital.name}</h3>
                  <div className="flex items-center gap-1 mt-1">
                    <Star size={16} className="text-yellow-500 fill-current" />
                    <span className="text-sm text-foreground">{hospital.rating}</span>
                    <span className="text-sm text-muted-foreground">({hospital.doctors} doctors)</span>
                  </div>
                </div>
              </div>
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                hospital.status === 'Verified' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {hospital.status}
              </span>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone size={16} />
                {hospital.phone}
              </div>
              <div className="flex items-start gap-2 text-muted-foreground">
                <MapPin size={16} className="mt-0.5" />
                {hospital.address}
              </div>
            </div>

            <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
              <span className="text-sm text-muted-foreground">{hospital.email}</span>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => handleEditHospital(hospital)}
                  className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
                >
                  <Edit size={16} />
                </button>
                <button 
                  onClick={() => handleDeleteHospital(hospital.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Hospital Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-card rounded-lg p-6 w-96 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-foreground">Add New Hospital</h3>
              <button onClick={() => setShowAddModal(false)} className="text-muted-foreground hover:text-foreground">
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Hospital Name *</label>
                <input
                  type="text"
                  value={newHospital.name}
                  onChange={(e) => setNewHospital({...newHospital, name: e.target.value})}
                  className="w-full p-2 border border-border rounded-lg bg-background text-base focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter hospital name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Email *</label>
                <input
                  type="email"
                  value={newHospital.email}
                  onChange={(e) => setNewHospital({...newHospital, email: e.target.value})}
                  className="w-full p-2 border border-border rounded-lg bg-background text-base focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter email address"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Phone *</label>
                <input
                  type="text"
                  value={newHospital.phone}
                  onChange={(e) => setNewHospital({...newHospital, phone: e.target.value})}
                  className="w-full p-2 border border-border rounded-lg bg-background text-base focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter phone number"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Address</label>
                <textarea
                  value={newHospital.address}
                  onChange={(e) => setNewHospital({...newHospital, address: e.target.value})}
                  className="w-full p-2 border border-border rounded-lg bg-background text-base focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter full address"
                  rows="3"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Rating</label>
                  <input
                    type="number"
                    min="0"
                    max="5"
                    step="0.1"
                    value={newHospital.rating}
                    onChange={(e) => setNewHospital({...newHospital, rating: e.target.value})}
                    className="w-full p-2 border border-border rounded-lg bg-background text-base focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Doctors</label>
                  <input
                    type="number"
                    min="0"
                    value={newHospital.doctors}
                    onChange={(e) => setNewHospital({...newHospital, doctors: e.target.value})}
                    className="w-full p-2 border border-border rounded-lg bg-background text-base focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Status</label>
                <select 
                  value={newHospital.status}
                  onChange={(e) => setNewHospital({...newHospital, status: e.target.value})}
                  className="w-full p-2 border border-border rounded-lg bg-background text-base focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="Pending">Pending</option>
                  <option value="Verified">Verified</option>
                </select>
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button 
                onClick={handleAddHospital}
                className="flex-1 bg-gradient-to-r from-primary to-accent text-primary-foreground py-2 rounded-lg hover:opacity-90 transition-colors text-base"
              >
                Add Hospital
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

      {/* Edit Hospital Modal */}
      {showEditModal && editingHospital && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-card rounded-lg p-6 w-96">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-foreground">Edit Hospital</h3>
              <button onClick={() => setShowEditModal(false)} className="text-muted-foreground hover:text-foreground">
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Hospital Name</label>
                <input
                  type="text"
                  value={editingHospital.name}
                  onChange={(e) => setEditingHospital({...editingHospital, name: e.target.value})}
                  className="w-full p-2 border border-border rounded-lg bg-background text-base focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                <input
                  type="email"
                  value={editingHospital.email}
                  onChange={(e) => setEditingHospital({...editingHospital, email: e.target.value})}
                  className="w-full p-2 border border-border rounded-lg bg-background text-base focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
                <input
                  type="text"
                  value={editingHospital.phone}
                  onChange={(e) => setEditingHospital({...editingHospital, phone: e.target.value})}
                  className="w-full p-2 border border-border rounded-lg bg-background text-base focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Status</label>
                <select 
                  value={editingHospital.status}
                  onChange={(e) => setEditingHospital({...editingHospital, status: e.target.value})}
                  className="w-full p-2 border border-border rounded-lg bg-background text-base focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="Pending">Pending</option>
                  <option value="Verified">Verified</option>
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

export default HospitalManagement;