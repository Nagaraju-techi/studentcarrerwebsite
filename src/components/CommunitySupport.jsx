// components/CommunitySupport.js
import React, { useState, useEffect } from 'react';
import { 
  Users, 
  MessageCircle, 
  Heart, 
  ThumbsUp, 
  Share2, 
  Bookmark,
  Send,
  Search,
  Filter,
  Plus,
  LogOut,
  Building2,
  FileText,
  TrendingUp,
  Sparkles,
  Mic,
  Calendar,
  Clock,
  MapPin,
  User,
  Award,
  Star
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './CommunitySupport.css';

const CommunitySupport = ({ onLogout }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('feed');
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [events, setEvents] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Sample posts data
    const samplePosts = [
      {
        id: 1,
        user: {
          name: 'Sarah Chen',
          role: 'Software Engineer @ Google',
          avatar: '👩‍💻',
          verified: true
        },
        content: 'Just landed my dream job at Google! The key was consistent mock interviews and staying persistent. Happy to help anyone going through the process! 🎉',
        timestamp: '2 hours ago',
        likes: 42,
        comments: 8,
        shares: 3,
        liked: false,
        saved: false,
        tags: ['success-story', 'google', 'career-advice']
      },
      {
        id: 2,
        user: {
          name: 'Alex Rodriguez',
          role: 'Senior Product Manager',
          avatar: '👨‍💼',
          verified: true
        },
        content: 'Sharing some insights about PM interviews: 1) Focus on product thinking 2) Practice case studies 3) Understand metrics 4) Be user-centric. What are your tips?',
        timestamp: '5 hours ago',
        likes: 28,
        comments: 15,
        shares: 4,
        liked: true,
        saved: true,
        tags: ['product-management', 'interview-tips', 'career-growth']
      },
      {
        id: 3,
        user: {
          name: 'Priya Patel',
          role: 'UX Designer seeking new opportunities',
          avatar: '👩‍🎨',
          verified: false
        },
        content: 'Struggling with portfolio presentation for UX roles. Any advice on what hiring managers are looking for in 2024?',
        timestamp: '1 day ago',
        likes: 15,
        comments: 12,
        shares: 1,
        liked: false,
        saved: false,
        tags: ['ux-design', 'portfolio-review', 'help-needed']
      }
    ];

    // Sample events data
    const sampleEvents = [
      {
        id: 1,
        title: 'Tech Interview Bootcamp',
        date: '2024-01-20',
        time: '2:00 PM EST',
        type: 'virtual',
        attendees: 45,
        host: 'Google Engineers',
        description: 'Hands-on session for technical interview preparation'
      },
      {
        id: 2,
        title: 'Product Management Workshop',
        date: '2024-01-22',
        time: '6:00 PM EST',
        type: 'virtual',
        attendees: 32,
        host: 'Senior PMs from FAANG',
        description: 'Case study practice and PM interview strategies'
      },
      {
        id: 3,
        title: 'Networking Mixer',
        date: '2024-01-25',
        time: '7:00 PM EST',
        type: 'in-person',
        location: 'San Francisco, CA',
        attendees: 28,
        host: 'CareerWellness Team',
        description: 'Connect with professionals and recruiters'
      }
    ];

    // Sample mentors data
    const sampleMentors = [
      {
        id: 1,
        name: 'Dr. Michael Tan',
        role: 'Engineering Manager @ Meta',
        avatar: '👨‍🔬',
        expertise: ['System Design', 'Leadership', 'Career Growth'],
        rating: 4.9,
        reviews: 127,
        available: true
      },
      {
        id: 2,
        name: 'Emily Watson',
        role: 'Senior UX Designer @ Apple',
        avatar: '👩‍💻',
        expertise: ['UX Research', 'Design Systems', 'Portfolio Review'],
        rating: 4.8,
        reviews: 89,
        available: true
      },
      {
        id: 3,
        name: 'James Kim',
        role: 'Product Lead @ Microsoft',
        avatar: '👨‍💼',
        expertise: ['Product Strategy', 'Go-to-Market', 'Team Management'],
        rating: 4.9,
        reviews: 156,
        available: false
      }
    ];

    setPosts(samplePosts);
    setEvents(sampleEvents);
    setMentors(sampleMentors);
  }, []);

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    navigate("/login");
  };

  const handleLike = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            liked: !post.liked,
            likes: post.liked ? post.likes - 1 : post.likes + 1
          } 
        : post
    ));
  };

  const handleSave = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, saved: !post.saved } 
        : post
    ));
  };

  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    const newPostObj = {
      id: posts.length + 1,
      user: {
        name: 'You',
        role: 'Current Student',
        avatar: '😊',
        verified: false
      },
      content: newPost,
      timestamp: 'Just now',
      likes: 0,
      comments: 0,
      shares: 0,
      liked: false,
      saved: false,
      tags: ['new-post']
    };

    setPosts([newPostObj, ...posts]);
    setNewPost('');
  };

  const filteredPosts = posts.filter(post =>
    post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="community-support">
      {/* Navigation */}
      <nav className="community-nav">
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
            <button className="nav-link" onClick={() => navigate('/progress-tracking')}>
              <TrendingUp size={16} />
              <span>Progress Tracking</span>
            </button>
            <button className="nav-link" onClick={() => navigate('/mock-interviews')}>
              <Mic size={16} />
              <span>Mock Interviews</span>
            </button>
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </nav>

      <div className="community-container">
        {/* Header */}
        <div className="community-header">
          <div className="header-content">
            <h1>Community Support</h1>
            <p>Connect, share, and grow with peers and mentors in your career journey</p>
          </div>
          <div className="header-stats">
            <div className="stat-card">
              <Users size={24} />
              <div>
                <h3>10K+</h3>
                <span>Members</span>
              </div>
            </div>
            <div className="stat-card">
              <MessageCircle size={24} />
              <div>
                <h3>2.5K+</h3>
                <span>Discussions</span>
              </div>
            </div>
            <div className="stat-card">
              <Award size={24} />
              <div>
                <h3>150+</h3>
                <span>Mentors</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="community-main">
          {/* Sidebar */}
          <div className="community-sidebar">
            {/* Create Post Card */}
            <div className="sidebar-card create-post-card">
              <div className="user-avatar">😊</div>
              <button 
                className="create-post-btn"
                onClick={() => document.getElementById('postInput')?.focus()}
              >
                Share your journey or ask a question...
              </button>
            </div>

            {/* Navigation */}
            <div className="sidebar-card">
              <h3>Community</h3>
              <div className="sidebar-nav">
                <button 
                  className={`nav-item ${activeTab === 'feed' ? 'active' : ''}`}
                  onClick={() => setActiveTab('feed')}
                >
                  <MessageCircle size={20} />
                  <span>Feed</span>
                </button>
                <button 
                  className={`nav-item ${activeTab === 'events' ? 'active' : ''}`}
                  onClick={() => setActiveTab('events')}
                >
                  <Calendar size={20} />
                  <span>Events</span>
                </button>
                <button 
                  className={`nav-item ${activeTab === 'mentors' ? 'active' : ''}`}
                  onClick={() => setActiveTab('mentors')}
                >
                  <Award size={20} />
                  <span>Find Mentors</span>
                </button>
                <button 
                  className={`nav-item ${activeTab === 'groups' ? 'active' : ''}`}
                  onClick={() => setActiveTab('groups')}
                >
                  <Users size={20} />
                  <span>Groups</span>
                </button>
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="sidebar-card">
              <h3>Upcoming Events</h3>
              <div className="events-list">
                {events.slice(0, 3).map(event => (
                  <div key={event.id} className="event-item">
                    <div className="event-date">
                      <span className="event-day">{new Date(event.date).getDate()}</span>
                      <span className="event-month">
                        {new Date(event.date).toLocaleString('default', { month: 'short' })}
                      </span>
                    </div>
                    <div className="event-info">
                      <h4>{event.title}</h4>
                      <div className="event-meta">
                        <Clock size={12} />
                        <span>{event.time}</span>
                        {event.type === 'in-person' && (
                          <>
                            <MapPin size={12} />
                            <span>{event.location}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="view-all-btn">
                View All Events
              </button>
            </div>

            {/* Popular Tags */}
            <div className="sidebar-card">
              <h3>Popular Tags</h3>
              <div className="tags-list">
                {['interview-prep', 'resume-review', 'career-advice', 'tech-interview', 'product-management', 'ux-design', 'salary-negotiation', 'networking'].map(tag => (
                  <button key={tag} className="tag">
                    #{tag}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="community-content">
            {/* Search and Filter */}
            <div className="content-header">
              <div className="search-bar">
                <Search size={20} />
                <input
                  type="text"
                  placeholder="Search discussions, people, or topics..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Filter size={20} />
              </div>
              <button className="btn btn-primary">
                <Plus size={20} />
                <span>New Post</span>
              </button>
            </div>

            {/* Create Post */}
            <div className="create-post-card main">
              <form onSubmit={handlePostSubmit}>
                <textarea
                  id="postInput"
                  placeholder="Share your career journey, ask questions, or offer advice..."
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  rows="3"
                />
                <div className="post-actions">
                  <div className="action-buttons">
                    <button type="button" className="action-btn">
                      📷 Photo
                    </button>
                    <button type="button" className="action-btn">
                      🎥 Video
                    </button>
                    <button type="button" className="action-btn">
                      📊 Poll
                    </button>
                  </div>
                  <button type="submit" className="btn btn-primary" disabled={!newPost.trim()}>
                    <Send size={16} />
                    <span>Post</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Feed */}
            {activeTab === 'feed' && (
              <div className="feed">
                {filteredPosts.map(post => (
                  <div key={post.id} className="post-card">
                    <div className="post-header">
                      <div className="user-info">
                        <div className="user-avatar">
                          {post.user.avatar}
                          {post.user.verified && (
                            <span className="verified-badge">✓</span>
                          )}
                        </div>
                        <div>
                          <h4>{post.user.name}</h4>
                          <p>{post.user.role}</p>
                        </div>
                      </div>
                      <span className="post-time">{post.timestamp}</span>
                    </div>

                    <div className="post-content">
                      <p>{post.content}</p>
                      <div className="post-tags">
                        {post.tags.map(tag => (
                          <span key={tag} className="tag">#{tag}</span>
                        ))}
                      </div>
                    </div>

                    <div className="post-stats">
                      <span>{post.likes} likes</span>
                      <span>{post.comments} comments</span>
                      <span>{post.shares} shares</span>
                    </div>

                    <div className="post-actions">
                      <button 
                        className={`action-btn ${post.liked ? 'liked' : ''}`}
                        onClick={() => handleLike(post.id)}
                      >
                        <ThumbsUp size={18} />
                        <span>Like</span>
                      </button>
                      <button className="action-btn">
                        <MessageCircle size={18} />
                        <span>Comment</span>
                      </button>
                      <button className="action-btn">
                        <Share2 size={18} />
                        <span>Share</span>
                      </button>
                      <button 
                        className={`action-btn ${post.saved ? 'saved' : ''}`}
                        onClick={() => handleSave(post.id)}
                      >
                        <Bookmark size={18} />
                        <span>Save</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Events Tab */}
            {activeTab === 'events' && (
              <div className="events-tab">
                <div className="events-header">
                  <h2>Community Events</h2>
                  <button className="btn btn-primary">
                    <Plus size={20} />
                    <span>Create Event</span>
                  </button>
                </div>
                <div className="events-grid">
                  {events.map(event => (
                    <div key={event.id} className="event-card">
                      <div className="event-header">
                        <div className="event-date-large">
                          <span className="event-day">{new Date(event.date).getDate()}</span>
                          <span className="event-month">
                            {new Date(event.date).toLocaleString('default', { month: 'short' })}
                          </span>
                        </div>
                        <div className="event-details">
                          <h3>{event.title}</h3>
                          <p>{event.description}</p>
                          <div className="event-meta">
                            <div className="meta-item">
                              <Clock size={16} />
                              <span>{event.time}</span>
                            </div>
                            {event.type === 'in-person' ? (
                              <div className="meta-item">
                                <MapPin size={16} />
                                <span>{event.location}</span>
                              </div>
                            ) : (
                              <div className="meta-item">
                                <User size={16} />
                                <span>Virtual Event</span>
                              </div>
                            )}
                            <div className="meta-item">
                              <Users size={16} />
                              <span>{event.attendees} attending</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="event-footer">
                        <span className="event-host">Hosted by {event.host}</span>
                        <button className="btn btn-primary">
                          RSVP
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Mentors Tab */}
            {activeTab === 'mentors' && (
              <div className="mentors-tab">
                <div className="mentors-header">
                  <h2>Find Mentors</h2>
                  <div className="mentors-filter">
                    <button className="filter-btn active">All</button>
                    <button className="filter-btn">Available Now</button>
                    <button className="filter-btn">Tech</button>
                    <button className="filter-btn">Business</button>
                    <button className="filter-btn">Design</button>
                  </div>
                </div>
                <div className="mentors-grid">
                  {mentors.map(mentor => (
                    <div key={mentor.id} className="mentor-card">
                      <div className="mentor-header">
                        <div className="mentor-avatar">
                          {mentor.avatar}
                        </div>
                        <div className="mentor-info">
                          <h3>{mentor.name}</h3>
                          <p>{mentor.role}</p>
                          <div className="mentor-rating">
                            <Star size={16} fill="currentColor" />
                            <span>{mentor.rating}</span>
                            <span>({mentor.reviews} reviews)</span>
                          </div>
                        </div>
                        <div className={`availability-badge ${mentor.available ? 'available' : 'busy'}`}>
                          {mentor.available ? 'Available' : 'Busy'}
                        </div>
                      </div>
                      <div className="mentor-expertise">
                        {mentor.expertise.map(skill => (
                          <span key={skill} className="skill-tag">{skill}</span>
                        ))}
                      </div>
                      <div className="mentor-actions">
                        <button className="btn btn-outline">
                          View Profile
                        </button>
                        <button 
                          className="btn btn-primary"
                          disabled={!mentor.available}
                        >
                          Book Session
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Groups Tab */}
            {activeTab === 'groups' && (
              <div className="groups-tab">
                <h2>Community Groups</h2>
                <div className="groups-grid">
                  {[
                    { name: 'Tech Interview Prep', members: '2.4K', icon: '💻' },
                    { name: 'Product Managers', members: '1.8K', icon: '📊' },
                    { name: 'UX/UI Designers', members: '1.2K', icon: '🎨' },
                    { name: 'Career Changers', members: '890', icon: '🔄' },
                    { name: 'Women in Tech', members: '3.1K', icon: '👩‍💻' },
                    { name: 'New Grad Support', members: '1.5K', icon: '🎓' }
                  ].map((group, index) => (
                    <div key={index} className="group-card">
                      <div className="group-icon">{group.icon}</div>
                      <h3>{group.name}</h3>
                      <p>{group.members} members</p>
                      <button className="btn btn-outline">
                        Join Group
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunitySupport;