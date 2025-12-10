import React, { useState } from 'react';
import { Search, Filter, Star, User, Building2, Warehouse, MessageSquare, ThumbsUp, ThumbsDown, Eye, X, Plus } from 'lucide-react';

const FeedbackManagement = ({ onAddActivity }) => {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  
  const [feedbacks, setFeedbacks] = useState([
    {
      id: 1,
      user: 'Ali Ahmed',
      type: 'Farmer',
      target: 'City Veterinary Hospital',
      targetType: 'hospital',
      rating: 5,
      comment: 'Excellent service! The doctors were very professional and helped my cattle recover quickly.',
      date: '2024-01-20',
      status: 'New'
    },
    {
      id: 2,
      user: 'Usman Farooq',
      type: 'Farmer',
      target: 'Al-Madina Halal Meats',
      targetType: 'slaughterhouse',
      rating: 4,
      comment: 'Good service but waiting time was a bit long. Overall satisfied with the quality.',
      date: '2024-01-19',
      status: 'Reviewed'
    },
    {
      id: 3,
      user: 'Dr. Sara Khan',
      type: 'Veterinarian',
      target: 'Platform Service',
      targetType: 'platform',
      rating: 5,
      comment: 'Great platform for connecting with farmers. The appointment system works smoothly.',
      date: '2024-01-18',
      status: 'New'
    }
  ]);

  const [newFeedback, setNewFeedback] = useState({
    user: '',
    type: 'Farmer',
    target: '',
    targetType: 'hospital',
    rating: 5,
    comment: '',
    date: new Date().toISOString().split('T')[0],
    status: 'New'
  });

  const getTargetIcon = (type) => {
    switch (type) {
      case 'hospital':
        return <Building2 size={16} className="text-primary" />;
      case 'slaughterhouse':
        return <Warehouse size={16} className="text-primary" />;
      default:
        return <MessageSquare size={16} className="text-primary" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'New':
        return 'bg-blue-100 text-blue-800';
      case 'Reviewed':
        return 'bg-green-100 text-green-800';
      case 'Archived':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Filter and search functionality
  const filteredFeedbacks = feedbacks.filter(fb => {
    const matchesFilter = filter === 'all' || fb.status.toLowerCase() === filter.toLowerCase();
    const matchesSearch = fb.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         fb.target.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         fb.comment.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  // Handle approve feedback
  const handleApprove = (feedbackId) => {
    const updatedFeedbacks = feedbacks.map(fb => 
      fb.id === feedbackId ? { ...fb, status: 'Reviewed' } : fb
    );
    setFeedbacks(updatedFeedbacks);
    
    // Add to recent activities
    const feedback = feedbacks.find(fb => fb.id === feedbackId);
    if (feedback && onAddActivity) {
      onAddActivity({
        action: 'Feedback approved',
        user: feedback.user,
        time: 'Just now',
        type: 'feedback',
        status: 'completed'
      });
    }
    
    alert('Feedback approved successfully!');
  };

  // Handle reject feedback
  const handleReject = (feedbackId) => {
    if (window.confirm('Are you sure you want to reject this feedback?')) {
      const updatedFeedbacks = feedbacks.map(fb => 
        fb.id === feedbackId ? { ...fb, status: 'Archived' } : fb
      );
      setFeedbacks(updatedFeedbacks);
      
      // Add to recent activities
      const feedback = feedbacks.find(fb => fb.id === feedbackId);
      if (feedback && onAddActivity) {
        onAddActivity({
          action: 'Feedback rejected',
          user: feedback.user,
          time: 'Just now',
          type: 'feedback',
          status: 'completed'
        });
      }
      
      alert('Feedback rejected and archived.');
    }
  };

  // Handle view details
  const handleViewDetails = (feedback) => {
    setSelectedFeedback(feedback);
    setShowDetailModal(true);
  };

  // Handle add feedback
  const handleAddFeedback = () => {
    if (!newFeedback.user || !newFeedback.target || !newFeedback.comment) {
      alert('Please fill in all required fields');
      return;
    }

    const feedback = {
      ...newFeedback,
      id: feedbacks.length + 1,
      date: new Date().toISOString().split('T')[0]
    };
    
    setFeedbacks([...feedbacks, feedback]);
    setShowAddModal(false);
    
    // Reset form
    setNewFeedback({
      user: '',
      type: 'Farmer',
      target: '',
      targetType: 'hospital',
      rating: 5,
      comment: '',
      date: new Date().toISOString().split('T')[0],
      status: 'New'
    });
    
    // Add to recent activities
    if (onAddActivity) {
      onAddActivity({
        action: 'New feedback added',
        user: feedback.user,
        time: 'Just now',
        type: 'feedback',
        status: 'completed'
      });
    }
    
    alert('Feedback added successfully!');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Feedback Management</h1>
          <p className="text-base text-muted-foreground">Monitor and manage user feedback</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
            <input
              type="text"
              placeholder="Search feedback..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary w-64 text-base hover:border-primary transition-colors"
            />
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-lg hover:opacity-90 transition-colors text-base"
          >
            <Plus size={20} />
            Add Feedback
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 border-b border-border">
        {['all', 'new', 'reviewed', 'archived'].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
              filter === tab
                ? 'bg-gradient-to-r from-primary to-accent text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground hover:bg-accent'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Feedback List */}
      <div className="space-y-4">
        {filteredFeedbacks.map((feedback) => (
          <div 
            key={feedback.id} 
            className="bg-card rounded-lg border border-border p-6 hover:shadow-lg hover:border-primary transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
                  <User size={20} className="text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{feedback.user}</h3>
                  <p className="text-sm text-muted-foreground">{feedback.type}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(feedback.status)}`}>
                  {feedback.status}
                </span>
                <span className="text-sm text-muted-foreground">{feedback.date}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 mb-3">
              {getTargetIcon(feedback.targetType)}
              <span className="text-base font-medium text-foreground">About: {feedback.target}</span>
            </div>

            <div className="flex items-center gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={i < feedback.rating ? "text-yellow-500 fill-current" : "text-gray-300"}
                />
              ))}
              <span className="text-sm text-muted-foreground ml-2">({feedback.rating}/5)</span>
            </div>

            <p className="text-base text-foreground mb-4">{feedback.comment}</p>

            <div className="flex items-center justify-between pt-4 border-t border-border">
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => handleApprove(feedback.id)}
                  className="flex items-center gap-1 px-3 py-1 text-green-600 hover:bg-green-50 rounded-lg transition-colors text-sm border border-transparent hover:border-green-600"
                >
                  <ThumbsUp size={16} />
                  <span>Approve</span>
                </button>
                <button 
                  onClick={() => handleReject(feedback.id)}
                  className="flex items-center gap-1 px-3 py-1 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm border border-transparent hover:border-red-600"
                >
                  <ThumbsDown size={16} />
                  <span>Reject</span>
                </button>
              </div>
              <button 
                onClick={() => handleViewDetails(feedback)}
                className="flex items-center gap-1 px-3 py-1 text-primary hover:bg-primary/10 rounded-lg transition-colors text-sm border border-transparent hover:border-primary"
              >
                <Eye size={16} />
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Feedback Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-card rounded-lg border border-border p-6 w-96 max-h-[90vh] overflow-y-auto hover:border-primary transition-colors">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-foreground">Add New Feedback</h3>
              <button onClick={() => setShowAddModal(false)} className="text-muted-foreground hover:text-foreground">
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">User Name *</label>
                <input
                  type="text"
                  value={newFeedback.user}
                  onChange={(e) => setNewFeedback({...newFeedback, user: e.target.value})}
                  className="w-full p-2 border border-border rounded-lg bg-background text-base focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter user name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">User Type</label>
                <select 
                  value={newFeedback.type}
                  onChange={(e) => setNewFeedback({...newFeedback, type: e.target.value})}
                  className="w-full p-2 border border-border rounded-lg bg-background text-base focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="Farmer">Farmer</option>
                  <option value="Veterinarian">Veterinarian</option>
                  <option value="Slaughterhouse">Slaughterhouse</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Target *</label>
                <input
                  type="text"
                  value={newFeedback.target}
                  onChange={(e) => setNewFeedback({...newFeedback, target: e.target.value})}
                  className="w-full p-2 border border-border rounded-lg bg-background text-base focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter target (hospital, slaughterhouse, etc.)"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Target Type</label>
                <select 
                  value={newFeedback.targetType}
                  onChange={(e) => setNewFeedback({...newFeedback, targetType: e.target.value})}
                  className="w-full p-2 border border-border rounded-lg bg-background text-base focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="hospital">Hospital</option>
                  <option value="slaughterhouse">Slaughterhouse</option>
                  <option value="platform">Platform</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Rating</label>
                <select 
                  value={newFeedback.rating}
                  onChange={(e) => setNewFeedback({...newFeedback, rating: parseInt(e.target.value)})}
                  className="w-full p-2 border border-border rounded-lg bg-background text-base focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="5">5 Stars</option>
                  <option value="4">4 Stars</option>
                  <option value="3">3 Stars</option>
                  <option value="2">2 Stars</option>
                  <option value="1">1 Star</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Comment *</label>
                <textarea
                  value={newFeedback.comment}
                  onChange={(e) => setNewFeedback({...newFeedback, comment: e.target.value})}
                  className="w-full p-2 border border-border rounded-lg bg-background text-base focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter feedback comment"
                  rows="3"
                />
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button 
                onClick={handleAddFeedback}
                className="flex-1 bg-gradient-to-r from-primary to-accent text-primary-foreground py-2 rounded-lg hover:opacity-90 transition-colors text-base"
              >
                Add Feedback
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

      {/* Feedback Detail Modal */}
      {showDetailModal && selectedFeedback && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-card rounded-lg border border-border p-6 w-96 max-h-[90vh] overflow-y-auto hover:border-primary transition-colors">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-foreground">Feedback Details</h3>
              <button onClick={() => setShowDetailModal(false)} className="text-muted-foreground hover:text-foreground">
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
                  <User size={20} className="text-primary-foreground" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-foreground">{selectedFeedback.user}</h4>
                  <p className="text-sm text-muted-foreground">{selectedFeedback.type}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Target:</span>
                  <p className="font-medium text-foreground">{selectedFeedback.target}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Type:</span>
                  <p className="font-medium text-foreground">{selectedFeedback.targetType}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Date:</span>
                  <p className="font-medium">{selectedFeedback.date}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Status:</span>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedFeedback.status)}`}>
                    {selectedFeedback.status}
                  </span>
                </div>
              </div>
              
              <div>
                <span className="text-muted-foreground text-sm">Rating:</span>
                <div className="flex items-center gap-1 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < selectedFeedback.rating ? "text-yellow-500 fill-current" : "text-gray-300"}
                    />
                  ))}
                  <span className="text-sm text-muted-foreground ml-2">({selectedFeedback.rating}/5)</span>
                </div>
              </div>
              
              <div>
                <span className="text-muted-foreground text-sm">Comment:</span>
                <p className="mt-1 p-3 bg-muted rounded-lg text-base text-foreground">{selectedFeedback.comment}</p>
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button 
                onClick={() => {
                  handleApprove(selectedFeedback.id);
                  setShowDetailModal(false);
                }}
                className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors text-base"
              >
                Approve
              </button>
              <button 
                onClick={() => {
                  handleReject(selectedFeedback.id);
                  setShowDetailModal(false);
                }}
                className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors text-base"
              >
                Reject
              </button>
              <button 
                onClick={() => setShowDetailModal(false)}
                className="flex-1 bg-muted text-foreground py-2 rounded-lg hover:bg-muted/80 transition-colors text-base"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedbackManagement;