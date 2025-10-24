// components/MockInterviews.js
import React, { useState } from 'react';
import { 
  Mic, 
  Video, 
  Clock, 
  Star, 
  Play, 
  Pause, 
  Download,
  LogOut,
  Building2,
  FileText,
  TrendingUp,
  Sparkles,
  Users,
  Heart,
  Calendar,
  Target
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './MockInterviews.css';

const MockInterviews = ({ onLogout }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('practice');
  const [isRecording, setIsRecording] = useState(false);
  const [selectedRole, setSelectedRole] = useState('software-engineer');
  const [interviewTime, setInterviewTime] = useState(30);

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    navigate("/login");
  };

  const roles = [
    { id: 'software-engineer', name: 'Software Engineer', icon: '💻' },
    { id: 'product-manager', name: 'Product Manager', icon: '📊' },
    { id: 'ux-designer', name: 'UX Designer', icon: '🎨' },
    { id: 'data-scientist', name: 'Data Scientist', icon: '📈' },
    { id: 'business-analyst', name: 'Business Analyst', icon: '💼' },
    { id: 'marketing-manager', name: 'Marketing Manager', icon: '📱' }
  ];

  const timeOptions = [15, 30, 45, 60];

  const questions = [
    "Tell me about yourself and your background.",
    "What are your greatest strengths and weaknesses?",
    "Why do you want to work at our company?",
    "Describe a challenging project and how you handled it.",
    "Where do you see yourself in 5 years?",
    "How do you handle pressure and tight deadlines?"
  ];

  const pastInterviews = [
    { id: 1, role: 'Software Engineer', date: '2024-01-15', score: 85, duration: '28:45' },
    { id: 2, role: 'Product Manager', date: '2024-01-10', score: 78, duration: '32:20' },
    { id: 3, role: 'UX Designer', date: '2024-01-05', score: 92, duration: '35:15' }
  ];

  const startInterview = () => {
    setIsRecording(true);
    // In a real app, this would start the recording and interview process
  };

  const stopInterview = () => {
    setIsRecording(false);
    // In a real app, this would stop the recording and process results
  };

  return (
    <div className="mock-interviews">
      {/* Navigation */}
      <nav className="mock-nav">
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
            <button className="nav-link" onClick={() => navigate('/progress-tracking')}>
              <TrendingUp size={16} />
              <span>Progress Tracking</span>
            </button>
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </nav>

      <div className="mock-container">
        {/* Header */}
        <div className="mock-header">
          <div className="header-content">
            <h1>AI Mock Interviews</h1>
            <p>Practice with AI-powered interviews tailored to your target role and get instant feedback</p>
          </div>
          <div className="header-stats">
            <div className="stat-card">
              <Mic size={24} />
              <div>
                <h3>24</h3>
                <span>Interviews Completed</span>
              </div>
            </div>
            <div className="stat-card">
              <Star size={24} />
              <div>
                <h3>86%</h3>
                <span>Average Score</span>
              </div>
            </div>
            <div className="stat-card">
              <Target size={24} />
              <div>
                <h3>5</h3>
                <span>Roles Practiced</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="tabs">
          <button 
            className={`tab ${activeTab === 'practice' ? 'active' : ''}`}
            onClick={() => setActiveTab('practice')}
          >
            <Mic size={18} />
            Practice Interview
          </button>
          <button 
            className={`tab ${activeTab === 'history' ? 'active' : ''}`}
            onClick={() => setActiveTab('history')}
          >
            <Calendar size={18} />
            Interview History
          </button>
          <button 
            className={`tab ${activeTab === 'feedback' ? 'active' : ''}`}
            onClick={() => setActiveTab('feedback')}
          >
            <Star size={18} />
            Feedback Analysis
          </button>
        </div>

        {/* Content */}
        <div className="tab-content">
          {activeTab === 'practice' && (
            <div className="practice-tab">
              <div className="practice-grid">
                {/* Role Selection */}
                <div className="selection-card">
                  <h3>Select Target Role</h3>
                  <div className="roles-grid">
                    {roles.map(role => (
                      <button
                        key={role.id}
                        className={`role-card ${selectedRole === role.id ? 'selected' : ''}`}
                        onClick={() => setSelectedRole(role.id)}
                      >
                        <span className="role-icon">{role.icon}</span>
                        <span className="role-name">{role.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time Selection */}
                <div className="selection-card">
                  <h3>Interview Duration</h3>
                  <div className="time-options">
                    {timeOptions.map(time => (
                      <button
                        key={time}
                        className={`time-option ${interviewTime === time ? 'selected' : ''}`}
                        onClick={() => setInterviewTime(time)}
                      >
                        <Clock size={20} />
                        <span>{time} min</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Interview Interface */}
                <div className="interview-card">
                  <h3>Ready to Start Your Interview</h3>
                  <div className="interview-preview">
                    <div className="video-preview">
                      <div className="video-placeholder">
                        <Video size={48} />
                        <span>Camera Preview</span>
                      </div>
                    </div>
                    <div className="interview-info">
                      <div className="info-item">
                        <span className="label">Role:</span>
                        <span className="value">
                          {roles.find(r => r.id === selectedRole)?.name}
                        </span>
                      </div>
                      <div className="info-item">
                        <span className="label">Duration:</span>
                        <span className="value">{interviewTime} minutes</span>
                      </div>
                      <div className="info-item">
                        <span className="label">Questions:</span>
                        <span className="value">6-8 questions</span>
                      </div>
                      <div className="info-item">
                        <span className="label">Feedback:</span>
                        <span className="value">Instant AI analysis</span>
                      </div>
                    </div>
                  </div>
                  <div className="interview-controls">
                    {!isRecording ? (
                      <button className="btn btn-start" onClick={startInterview}>
                        <Play size={20} />
                        <span>Start Interview</span>
                      </button>
                    ) : (
                      <button className="btn btn-stop" onClick={stopInterview}>
                        <Pause size={20} />
                        <span>Stop Interview</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Sample Questions */}
                <div className="questions-card">
                  <h3>Sample Questions You Might Get</h3>
                  <div className="questions-list">
                    {questions.map((question, index) => (
                      <div key={index} className="question-item">
                        <span className="question-number">Q{index + 1}</span>
                        <p className="question-text">{question}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="history-tab">
              <div className="history-header">
                <h3>Past Interviews</h3>
                <button className="btn btn-outline">
                  <Download size={16} />
                  <span>Export All</span>
                </button>
              </div>
              <div className="interviews-list">
                {pastInterviews.map(interview => (
                  <div key={interview.id} className="interview-item">
                    <div className="interview-main">
                      <div className="interview-role">
                        <span className="role-icon">💼</span>
                        <div>
                          <h4>{interview.role}</h4>
                          <span className="interview-date">{interview.date}</span>
                        </div>
                      </div>
                      <div className="interview-metrics">
                        <div className="metric">
                          <span className="metric-label">Score</span>
                          <span className="metric-value">{interview.score}%</span>
                        </div>
                        <div className="metric">
                          <span className="metric-label">Duration</span>
                          <span className="metric-value">{interview.duration}</span>
                        </div>
                      </div>
                    </div>
                    <div className="interview-actions">
                      <button className="action-btn primary">View Feedback</button>
                      <button className="action-btn">Watch Recording</button>
                      <button className="action-btn">Download Report</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'feedback' && (
            <div className="feedback-tab">
              <div className="feedback-grid">
                {/* Overall Score */}
                <div className="score-card">
                  <h3>Overall Performance</h3>
                  <div className="score-circle">
                    <span className="score-percentage">85%</span>
                    <span className="score-label">Average Score</span>
                  </div>
                  <div className="score-breakdown">
                    <div className="breakdown-item">
                      <span className="breakdown-label">Communication</span>
                      <div className="breakdown-bar">
                        <div className="breakdown-fill" style={{ width: '88%' }}></div>
                      </div>
                      <span className="breakdown-value">88%</span>
                    </div>
                    <div className="breakdown-item">
                      <span className="breakdown-label">Technical Skills</span>
                      <div className="breakdown-bar">
                        <div className="breakdown-fill" style={{ width: '82%' }}></div>
                      </div>
                      <span className="breakdown-value">82%</span>
                    </div>
                    <div className="breakdown-item">
                      <span className="breakdown-label">Problem Solving</span>
                      <div className="breakdown-bar">
                        <div className="breakdown-fill" style={{ width: '85%' }}></div>
                      </div>
                      <span className="breakdown-value">85%</span>
                    </div>
                    <div className="breakdown-item">
                      <span className="breakdown-label">Confidence</span>
                      <div className="breakdown-bar">
                        <div className="breakdown-fill" style={{ width: '78%' }}></div>
                      </div>
                      <span className="breakdown-value">78%</span>
                    </div>
                  </div>
                </div>

                {/* Improvement Tips */}
                <div className="tips-card">
                  <h3>Areas for Improvement</h3>
                  <div className="tips-list">
                    <div className="tip-item">
                      <div className="tip-icon">💡</div>
                      <div className="tip-content">
                        <h4>Structure Your Answers</h4>
                        <p>Use the STAR method (Situation, Task, Action, Result) to provide more structured responses</p>
                      </div>
                    </div>
                    <div className="tip-item">
                      <div className="tip-icon">🎯</div>
                      <div className="tip-content">
                        <h4>Be More Specific</h4>
                        <p>Include specific metrics and numbers when discussing your achievements</p>
                      </div>
                    </div>
                    <div className="tip-item">
                      <div className="tip-icon">⚡</div>
                      <div className="tip-content">
                        <h4>Reduce Filler Words</h4>
                        <p>Practice speaking without using "um", "like", and "you know" frequently</p>
                      </div>
                    </div>
                    <div className="tip-item">
                      <div className="tip-icon">📊</div>
                      <div className="tip-content">
                        <h4>Research Companies</h4>
                        <p>Spend more time researching companies to provide better "why us" answers</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progress Chart */}
                <div className="progress-card">
                  <h3>Score Trend</h3>
                  <div className="progress-chart">
                    <div className="chart-bars">
                      {[75, 78, 82, 85, 88, 85].map((score, index) => (
                        <div key={index} className="chart-bar">
                          <div 
                            className="bar-fill" 
                            style={{ height: `${score}%` }}
                          ></div>
                          <span className="bar-label">{score}%</span>
                        </div>
                      ))}
                    </div>
                    <div className="chart-labels">
                      <span>1 mo ago</span>
                      <span>2 w ago</span>
                      <span>1 w ago</span>
                      <span>5 d ago</span>
                      <span>3 d ago</span>
                      <span>Today</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MockInterviews;