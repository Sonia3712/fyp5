import React, { useState, useEffect } from 'react';
import { Users, Building2, Warehouse, MessageSquare, TrendingUp, Activity, Eye, Calendar, ArrowUp } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';

const Dashboard = ({ recentActivities = [] }) => {
  const [stats, setStats] = useState([
    {
      title: 'Total Users',
      value: '1,234',
      icon: Users,
      change: '+12%',
      trend: 'up',
      color: 'from-primary to-accent',
      description: 'Registered farmers & providers'
    },
    {
      title: 'Hospitals',
      value: '89',
      icon: Building2,
      change: '+5%',
      trend: 'up',
      color: 'from-primary to-accent',
      description: 'Veterinary centers'
    },
    {
      title: 'Slaughterhouses',
      value: '45',
      icon: Warehouse,
      change: '+3%',
      trend: 'up',
      color: 'from-primary to-accent',
      description: 'Registered facilities'
    },
    {
      title: 'Feedback',
      value: '567',
      icon: MessageSquare,
      change: '+8%',
      trend: 'up',
      color: 'from-primary to-accent',
      description: 'User reviews & ratings'
    }
  ]);

  const chartData = [
    { name: 'Jan', users: 400, appointments: 240, revenue: 3200 },
    { name: 'Feb', users: 300, appointments: 139, revenue: 2800 },
    { name: 'Mar', users: 200, appointments: 980, revenue: 4500 },
    { name: 'Apr', users: 278, appointments: 390, revenue: 3800 },
    { name: 'May', users: 189, appointments: 480, revenue: 4200 },
    { name: 'Jun', users: 239, appointments: 380, revenue: 3600 },
  ];

  const pieData = [
    { name: 'Farmers', value: 75, color: 'oklch(0.56 0.18 190)' },
    { name: 'Veterinarians', value: 15, color: 'oklch(0.40 0.15 285)' },
    { name: 'Slaughterhouses', value: 10, color: 'oklch(0.45 0.15 200)' },
  ];

  const COLORS = ['oklch(0.56 0.18 190)', 'oklch(0.40 0.15 285)', 'oklch(0.45 0.15 200)'];

  // Update stats when recent activities change
  useEffect(() => {
    // This would normally update based on actual data changes
    // For now, we'll just simulate updates
    console.log('Recent activities updated:', recentActivities.length);
  }, [recentActivities]);

  // Get default recent activities if none provided
  const defaultActivities = [
    { 
      action: 'New user registration', 
      user: 'Ali Ahmed', 
      time: '2 min ago', 
      type: 'user',
      status: 'completed'
    },
    { 
      action: 'Hospital appointment booked', 
      user: 'Dr. Sara Khan', 
      time: '5 min ago', 
      type: 'appointment',
      status: 'pending'
    },
    { 
      action: 'Feedback submitted', 
      user: 'Farmer Usman', 
      time: '10 min ago', 
      type: 'feedback',
      status: 'completed'
    },
    { 
      action: 'Slaughterhouse registered', 
      user: 'Al-Madina Meats', 
      time: '15 min ago', 
      type: 'business',
      status: 'completed'
    },
  ];

  // Use provided activities or default
  const displayActivities = recentActivities.length > 0 ? recentActivities : defaultActivities;

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div 
              key={index} 
              className="bg-card rounded-2xl border border-border p-6 shadow-sm hover:shadow-2xl hover:border-primary transition-all duration-500 animate-fade-in-up group cursor-pointer transform hover:-translate-y-2"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-foreground mt-2 group-hover:scale-105 transition-transform">
                    {stat.value}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
                  <div className="flex items-center mt-3">
                    <div className="flex items-center bg-green-50 text-green-700 px-2 py-1 rounded-lg">
                      <ArrowUp className="h-3 w-3 mr-1" />
                      <span className="text-xs font-medium">{stat.change}</span>
                    </div>
                    <span className="text-xs text-muted-foreground ml-2">from last month</span>
                  </div>
                </div>
                <div className={`p-4 bg-gradient-to-br ${stat.color} rounded-2xl shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500`}>
                  <Icon className="h-6 w-6 text-primary-foreground" />
                </div>
              </div>
              
              {/* Progress bar */}
              <div className="mt-4">
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-1000 group-hover:animate-pulse-scale"
                    style={{ width: `${Math.min(100, parseInt(stat.value) * 0.8)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Revenue Chart */}
        <div className="bg-card rounded-2xl border border-border p-6 shadow-sm hover:shadow-2xl hover:border-primary transition-all duration-500 group">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-semibold text-foreground group-hover:opacity-90 transition-opacity">
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Platform Growth Analytics
                </span>
              </h3>
              <p className="text-sm text-muted-foreground">User engagement & revenue trends</p>
            </div>
            <div className="flex items-center space-x-2 text-sm text-primary bg-primary/10 px-3 py-1 rounded-lg border border-primary/20">
              <Eye className="h-4 w-4" />
              <span className="font-medium">Last 6 months</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0 0)" />
              <XAxis 
                dataKey="name" 
                stroke="oklch(0.50 0 0)" 
                tick={{ fill: 'oklch(0.50 0 0)' }}
              />
              <YAxis 
                stroke="oklch(0.50 0 0)" 
                tick={{ fill: 'oklch(0.50 0 0)' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'oklch(1 0 0)',
                  border: '1px solid oklch(0.92 0 0)',
                  borderRadius: '0.75rem',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                  color: 'oklch(0.12 0 0)'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="oklch(0.56 0.18 190)" 
                strokeWidth={3}
                dot={{ fill: 'oklch(0.56 0.18 190)', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: 'oklch(0.56 0.18 190)' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* User Distribution */}
        <div className="bg-card rounded-2xl border border-border p-6 shadow-sm hover:shadow-2xl hover:border-primary transition-all duration-500 group">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-semibold text-foreground group-hover:opacity-90 transition-opacity">
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  User Distribution
                </span>
              </h3>
              <p className="text-sm text-muted-foreground">Platform user segments</p>
            </div>
            <div className="flex items-center space-x-2 text-sm text-primary bg-primary/10 px-3 py-1 rounded-lg border border-primary/20">
              <Users className="h-4 w-4" />
              <span className="font-medium">All Users</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                innerRadius={60}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'oklch(1 0 0)',
                  border: '1px solid oklch(0.92 0 0)',
                  borderRadius: '0.75rem',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                  color: 'oklch(0.12 0 0)'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-card rounded-2xl border border-border p-6 shadow-sm hover:shadow-2xl hover:border-primary transition-all duration-500 group">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-semibold text-foreground group-hover:opacity-90 transition-opacity">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Recent Platform Activity
              </span>
            </h3>
            <p className="text-sm text-muted-foreground">Latest user interactions and system events</p>
          </div>
          <div className="flex items-center space-x-2 text-sm text-primary bg-primary/10 px-3 py-1 rounded-lg border border-primary/20">
            <Activity className="h-4 w-4" />
            <span className="font-medium">Live Updates</span>
          </div>
        </div>
        <div className="space-y-4">
          {displayActivities.map((activity, index) => (
            <div 
              key={index} 
              className="flex items-center space-x-4 p-4 hover:bg-accent rounded-xl transition-all duration-300 group-hover-item cursor-pointer transform hover:scale-[1.02] hover:border hover:border-primary/30"
            >
              <div className={`p-3 rounded-xl ${
                activity.type === 'user' ? 'bg-blue-100 text-blue-600' :
                activity.type === 'appointment' ? 'bg-green-100 text-green-600' :
                activity.type === 'feedback' ? 'bg-orange-100 text-orange-600' :
                'bg-purple-100 text-purple-600'
              } group-hover-item:scale-110 transition-transform duration-300`}>
                <Activity className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <p className="text-base font-medium text-foreground group-hover-item:text-primary transition-colors">
                  {activity.action}
                </p>
                <p className="text-sm text-muted-foreground">by {activity.user}</p>
              </div>
              <div className="flex items-center space-x-3">
                <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                  activity.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {activity.status}
                </span>
                <span className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-lg">
                  {activity.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;