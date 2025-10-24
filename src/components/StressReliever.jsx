import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  LogOut, 
  Wind, 
  Brain, 
  Music, 
  Smile, 
  Coffee, 
  Heart, 
  Clock, 
  Sun 
} from 'lucide-react';
import './StressReliever.css';

const StressReliever = ({ onLogout }) => {
  const navigate = useNavigate();
  const [selectedActivity, setSelectedActivity] = useState(null);

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    navigate("/login");
  };

  const activities = [
    {
      title: 'Breathing Exercise',
      icon: Wind,
      color: '#3b82f6',
      description: 'Calm your mind with guided breathing',
      duration: '5 min'
    },
    {
      title: 'Quick Meditation',
      icon: Brain,
      color: '#8b5cf6',
      description: 'Short meditation for instant relaxation',
      duration: '10 min'
    },
    {
      title: 'Mood Music',
      icon: Music,
      color: '#ec4899',
      description: 'Listen to calming playlists',
      duration: '15 min'
    },
    {
      title: 'Positive Affirmations',
      icon: Smile,
      color: '#f59e0b',
      description: 'Boost your confidence with affirmations',
      duration: '3 min'
    },
    {
      title: 'Mindful Break',
      icon: Coffee,
      color: '#10b981',
      description: 'Take a mindful break from work',
      duration: '5 min'
    },
    {
      title: 'Gratitude Journal',
      icon: Heart,
      color: '#ef4444',
      description: 'Write down things you\'re grateful for',
      duration: '7 min'
    }
  ];

  return (
    <div className="stress-reliever-page">
      {/* Top Navbar */}
      <nav className="navbar">
        <h2 className="logo">CareerWellness</h2>
        <button className="btn-logout" onClick={handleLogout}>
          <LogOut size={18} /> Logout
        </button>
      </nav>

      <header className="stress-header">
        <button className="back-btn" onClick={() => navigate('/dashboard')}>
          <ArrowLeft size={20} /> Back to Home
        </button>
        <h1>Stress Reliever Center</h1>
        <p>Take a break and recharge your mind</p>
      </header>

      <div className="stress-intro">
        <Sun size={48} color="#f59e0b" />
        <h2>Your Mental Wellness Matters</h2>
        <p>Choose an activity below to reduce stress and improve focus</p>
      </div>

      <div className="activities-grid">
        {activities.map((activity, index) => (
          <div 
            key={index} 
            className="activity-card"
            onClick={() => setSelectedActivity(activity)}
          >
            <div className="activity-icon" style={{ background: activity.color }}>
              <activity.icon size={32} color="white" />
            </div>
            <h3>{activity.title}</h3>
            <p>{activity.description}</p>
            <div className="activity-duration">
              <Clock size={16} />
              <span>{activity.duration}</span>
            </div>
          </div>
        ))}
      </div>

      {selectedActivity && (
        <div className="activity-modal" onClick={() => setSelectedActivity(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-icon" style={{ background: selectedActivity.color }}>
              <selectedActivity.icon size={48} color="white" />
            </div>
            <h2>{selectedActivity.title}</h2>
            <p>{selectedActivity.description}</p>
            <div className="modal-duration">
              <Clock size={18} />
              <span>Duration: {selectedActivity.duration}</span>
            </div>
            <button className="start-activity-btn" style={{ background: selectedActivity.color }}>
              Start Activity
            </button>
            <button className="close-modal-btn" onClick={() => setSelectedActivity(null)}>
              Close
            </button>
          </div>
        </div>
      )}

      <div className="stress-tips">
        <h2>Quick Stress Relief Tips</h2>
        <div className="tips-grid">
          <div className="tip-card">
            <h4>🌊 Deep Breathing</h4>
            <p>Inhale for 4 seconds, hold for 4, exhale for 4</p>
          </div>
          <div className="tip-card">
            <h4>🚶 Take a Walk</h4>
            <p>Short walks can clear your mind instantly</p>
          </div>
          <div className="tip-card">
            <h4>💧 Stay Hydrated</h4>
            <p>Drink water to keep your body and mind fresh</p>
          </div>
          <div className="tip-card">
            <h4>😊 Smile More</h4>
            <p>Smiling releases endorphins and reduces stress</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StressReliever;