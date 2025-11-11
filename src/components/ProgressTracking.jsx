// components/ProgressTracking.js
import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Target, 
  Calendar,  
  Award, 
  BarChart3,
  LogOut,
  Building2,
  FileText,
  Users,
  Sparkles
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './ProgressTracking.css';

const ProgressTracking = ({ onLogout }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [applications, setApplications] = useState([]);
  const [stats, setStats] = useState({
    totalApplications: 0,
    interviews: 0,
    offers: 0,
    responseRate: 0,
    successRate: 0
  });

  // Sample data - in real app, this would come from backend
  useEffect(() => {
    const sampleApplications = [
      { id: 1, company: 'Google', position: 'Software Engineer', status: 'Applied', date: '2024-01-15', notes: 'Waiting for response' },
      { id: 2, company: 'Microsoft', position: 'Frontend Developer', status: 'Interview', date: '2024-01-20', notes: 'Technical round scheduled' },
      { id: 3, company: 'Amazon', position: 'Product Manager', status: 'Rejected', date: '2024-01-10', notes: 'Need more experience' },
      { id: 4, company: 'Meta', position: 'UX Designer', status: 'Offer', date: '2024-01-25', notes: 'Offer received!' },
      { id: 5, company: 'Netflix', position: 'Backend Engineer', status: 'Applied', date: '2024-01-18', notes: 'Application submitted' }
    ];

    const sampleStats = {
      totalApplications: 24,
      interviews: 8,
      offers: 2,
      responseRate: 45,
      successRate: 8.3
    };

    setApplications(sampleApplications);
    setStats(sampleStats);
  }, []);

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    navigate("/login");
  };

  const statusColors = {
    Applied: '#4facfe',
    Interview: '#ffd93d',
    Rejected: '#ff6b6b',
    Offer: '#43e97b'
  };

  const progressGoals = [
    { title: 'Weekly Applications', current: 5, target: 10, progress: 50 },
    { title: 'Mock Interviews', current: 3, target: 5, progress: 60 },
    { title: 'Skills Learned', current: 2, target: 4, progress: 50 },
    { title: 'Networking Events', current: 1, target: 3, progress: 33 }
  ];

  return (
    <div className="progress-tracking">
      {/* Navigation */}
      <nav className="progress-nav">
        <div className="nav-container">
          <div className="nav-brand">
            <Building2 className="brand-icon" size={28} />
            <span className="brand-text">CareerWellness</span>
          </div>
          <div className="nav-links">
            <button className="nav-link" onClick={() => navigate('/dashboard')}>
              <Sparkles size={16} />
              <span>Dashboard</span>
            </button>
            <button className="nav-link" onClick={() => navigate('/resume-builder')}>
              <FileText size={16} />
              <span>Resume Builder</span>
            </button>
            <button className="nav-link" onClick={() => navigate('/mock-interviews')}>
              <Users size={16} />
              <span>Mock Interviews</span>
            </button>
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </nav>

      <div className="progress-container">
        {/* Header */}
        <div className="progress-header">
          <div className="header-content">
            <h1>Progress Tracking</h1>
            <p>Monitor your job search journey and track your success metrics</p>
          </div>
          <div className="header-stats">
            <div className="stat-card">
              <TrendingUp size={24} />
              <div>
                <h3>{stats.totalApplications}</h3>
                <span>Total Applications</span>
              </div>
            </div>
            <div className="stat-card">
              <Calendar size={24} />
              <div>
                <h3>{stats.interviews}</h3>
                <span>Interviews</span>
              </div>
            </div>
            <div className="stat-card">
              <Award size={24} />
              <div>
                <h3>{stats.offers}</h3>
                <span>Offers</span>
              </div>
            </div>
            <div className="stat-card">
              <BarChart3 size={24} />
              <div>
                <h3>{stats.responseRate}%</h3>
                <span>Response Rate</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="tabs">
          <button 
            className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <TrendingUp size={18} />
            Overview
          </button>
          <button 
            className={`tab ${activeTab === 'applications' ? 'active' : ''}`}
            onClick={() => setActiveTab('applications')}
          >
            <FileText size={18} />
            Applications
          </button>
          <button 
            className={`tab ${activeTab === 'goals' ? 'active' : ''}`}
            onClick={() => setActiveTab('goals')}
          >
            <Target size={18} />
            Goals
          </button>
        </div>

        {/* Content */}
        <div className="tab-content">
          {activeTab === 'overview' && (
            <div className="overview-grid">
              {/* Progress Chart */}
              <div className="chart-card">
                <h3>Application Progress</h3>
                <div className="progress-bars">
                  {Object.entries(statusColors).map(([status, color]) => {
                    const count = applications.filter(app => app.status === status).length;
                    const percentage = applications.length > 0 ? (count / applications.length) * 100 : 0;
                    return (
                      <div key={status} className="progress-item">
                        <div className="progress-info">
                          <span className="status" style={{ color }}>{status}</span>
                          <span className="count">{count}</span>
                        </div>
                        <div className="progress-bar">
                          <div 
                            className="progress-fill" 
                            style={{ 
                              width: `${percentage}%`,
                              backgroundColor: color
                            }}
                          ></div>
                        </div>
                        <span className="percentage">{percentage.toFixed(1)}%</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="activity-card">
                <h3>Recent Activity</h3>
                <div className="activity-list">
                  {applications.slice(0, 5).map(app => (
                    <div key={app.id} className="activity-item">
                      <div className="activity-icon">
                        <Building2 size={16} />
                      </div>
                      <div className="activity-content">
                        <p>Applied to {app.position} at {app.company}</p>
                        <span className="activity-date">{app.date}</span>
                      </div>
                      <div 
                        className="status-badge"
                        style={{ backgroundColor: statusColors[app.status] }}
                      >
                        {app.status}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Success Rate */}
              <div className="success-card">
                <h3>Success Rate</h3>
                <div className="success-metric">
                  <div className="success-circle">
                    <span className="success-percentage">{stats.successRate}%</span>
                  </div>
                  <p>Overall success rate based on applications to interviews</p>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="stats-card">
                <h3>Performance Metrics</h3>
                <div className="metric-grid">
                  <div className="metric">
                    <span className="metric-label">Avg. Response Time</span>
                    <span className="metric-value">4.2 days</span>
                  </div>
                  <div className="metric">
                    <span className="metric-label">Interview Conversion</span>
                    <span className="metric-value">33%</span>
                  </div>
                  <div className="metric">
                    <span className="metric-label">Offer Rate</span>
                    <span className="metric-value">8.3%</span>
                  </div>
                  <div className="metric">
                    <span className="metric-label">Active Applications</span>
                    <span className="metric-value">12</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'applications' && (
            <div className="applications-tab">
              <div className="applications-header">
                <h3>Job Applications</h3>
                <button className="btn btn-primary">
                  <span>Add Application</span>
                  <FileText size={16} />
                </button>
              </div>
              <div className="applications-table">
                {applications.map(app => (
                  <div key={app.id} className="application-row">
                    <div className="company-info">
                      <div className="company-avatar">
                        {app.company.charAt(0)}
                      </div>
                      <div>
                        <h4>{app.company}</h4>
                        <p>{app.position}</p>
                      </div>
                    </div>
                    <div className="application-date">{app.date}</div>
                    <div className="application-status">
                      <span 
                        className="status-badge"
                        style={{ backgroundColor: statusColors[app.status] }}
                      >
                        {app.status}
                      </span>
                    </div>
                    <div className="application-notes">{app.notes}</div>
                    <div className="application-actions">
                      <button className="action-btn">Edit</button>
                      <button className="action-btn delete">Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'goals' && (
            <div className="goals-tab">
              <h3>Progress Goals</h3>
              <div className="goals-grid">
                {progressGoals.map((goal, index) => (
                  <div key={index} className="goal-card">
                    <h4>{goal.title}</h4>
                    <div className="goal-progress">
                      <div className="progress-text">
                        <span>{goal.current}/{goal.target}</span>
                        <span>{goal.progress}%</span>
                      </div>
                      <div className="progress-bar">
                        <div 
                          className="progress-fill"
                          style={{ width: `${goal.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    <button className="btn btn-outline">
                      Update Progress
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgressTracking;