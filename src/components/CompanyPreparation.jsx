// components/CompanyPreparation.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Search, 
  Filter,
  Building2,
  Users,
  TrendingUp,
  Award,
  Clock,
  Star,
  BookOpen,
  Video,
  FileText,
  LogOut,
  Sparkles,
  Target,
  ChevronRight,
  Play,
  Download,
  Share2,
  Bookmark
} from 'lucide-react';
import './CompanyPreparation.css';

const CompanyPreparation = ({ onLogout }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [savedCompanies, setSavedCompanies] = useState([]);

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    navigate("/login");
  };

  const toggleSaveCompany = (companyName) => {
    setSavedCompanies(prev => 
      prev.includes(companyName)
        ? prev.filter(name => name !== companyName)
        : [...prev, companyName]
    );
  };

  const companies = [
    {
      name: 'Google',
      logo: '🔍',
      category: 'Tech',
      difficulty: 'hard',
      hiringRate: '0.2%',
      avgPreparation: '3-6 months',
      topics: ['Algorithms', 'System Design', 'Data Structures', 'Behavioral', 'Leadership'],
      resources: {
        videos: 45,
        articles: 120,
        questions: 300
      },
      recentHires: '2,500+',
      avgSalary: '$180,000',
      color: '#4285F4'
    },
    {
      name: 'Amazon',
      logo: '📦',
      category: 'Tech',
      difficulty: 'hard',
      hiringRate: '0.8%',
      avgPreparation: '2-4 months',
      topics: ['Leadership Principles', 'System Design', 'Coding', 'Behavioral', 'Case Studies'],
      resources: {
        videos: 38,
        articles: 95,
        questions: 280
      },
      recentHires: '3,800+',
      avgSalary: '$165,000',
      color: '#FF9900'
    },
    {
      name: 'Microsoft',
      logo: '🪟',
      category: 'Tech',
      difficulty: 'medium',
      hiringRate: '1.2%',
      avgPreparation: '2-3 months',
      topics: ['Problem Solving', 'System Design', 'Behavioral', 'C#/.NET', 'Azure'],
      resources: {
        videos: 32,
        articles: 85,
        questions: 220
      },
      recentHires: '2,200+',
      avgSalary: '$155,000',
      color: '#00A4EF'
    },
    {
      name: 'Apple',
      logo: '🍎',
      category: 'Tech',
      difficulty: 'hard',
      hiringRate: '0.5%',
      avgPreparation: '3-5 months',
      topics: ['iOS Development', 'Design Patterns', 'Coding', 'System Design', 'Culture Fit'],
      resources: {
        videos: 28,
        articles: 75,
        questions: 190
      },
      recentHires: '1,800+',
      avgSalary: '$175,000',
      color: '#A2AAAD'
    },
    {
      name: 'Meta',
      logo: '👍',
      category: 'Tech',
      difficulty: 'hard',
      hiringRate: '0.3%',
      avgPreparation: '3-6 months',
      topics: ['Algorithms', 'System Design', 'Product Design', 'Behavioral', 'Data Structures'],
      resources: {
        videos: 42,
        articles: 110,
        questions: 320
      },
      recentHires: '2,100+',
      avgSalary: '$185,000',
      color: '#1877F2'
    },
    {
      name: 'Netflix',
      logo: '🎬',
      category: 'Tech',
      difficulty: 'hard',
      hiringRate: '0.1%',
      avgPreparation: '4-6 months',
      topics: ['System Design', 'Coding', 'Culture Fit', 'Domain Knowledge', 'Behavioral'],
      resources: {
        videos: 25,
        articles: 65,
        questions: 150
      },
      recentHires: '800+',
      avgSalary: '$220,000',
      color: '#E50914'
    },
    {
      name: 'Goldman Sachs',
      logo: '💼',
      category: 'Finance',
      difficulty: 'hard',
      hiringRate: '0.8%',
      avgPreparation: '2-4 months',
      topics: ['Finance', 'Quantitative', 'Behavioral', 'Case Studies', 'Markets'],
      resources: {
        videos: 35,
        articles: 90,
        questions: 180
      },
      recentHires: '1,500+',
      avgSalary: '$140,000',
      color: '#FF6B6B'
    },
    {
      name: 'McKinsey & Company',
      logo: '📊',
      category: 'Consulting',
      difficulty: 'hard',
      hiringRate: '0.5%',
      avgPreparation: '3-5 months',
      topics: ['Case Studies', 'Business Acumen', 'Behavioral', 'Analytics', 'Strategy'],
      resources: {
        videos: 40,
        articles: 120,
        questions: 200
      },
      recentHires: '1,200+',
      avgSalary: '$160,000',
      color: '#00B894'
    }
  ];

  const categories = ['all', 'Tech', 'Finance', 'Consulting'];
  const difficulties = ['all', 'easy', 'medium', 'hard'];

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || company.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'all' || company.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const stats = [
    { icon: Building2, value: '50+', label: 'Companies' },
    { icon: Users, value: '10K+', label: 'Successful Hires' },
    { icon: TrendingUp, value: '85%', label: 'Success Rate' },
    { icon: Clock, value: '3.2M', label: 'Prep Hours' }
  ];

  return (
    <div className="company-prep-page">
      {/* Navigation */}
      <nav className="company-nav">
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
              <span>Progress</span>
            </button>
            <button className="nav-link" onClick={() => navigate('/mock-interviews')}>
              <Users size={16} />
              <span>Interviews</span>
            </button>
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </nav>

      <div className="company-container">
        {/* Header */}
        <div className="company-header">
          <div className="header-content">
            <button className="back-btn" onClick={() => navigate('/dashboard')}>
              <ArrowLeft size={20} />
              <span>Back to Dashboard</span>
            </button>
            <div className="header-text">
              <h1>Company-Wise Preparation</h1>
              <p>Ace your interviews with curated resources and insights for top companies</p>
            </div>
          </div>

          {/* Stats */}
          <div className="stats-container">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-icon">
                  <stat.icon size={24} />
                </div>
                <div className="stat-info">
                  <h3>{stat.value}</h3>
                  <span>{stat.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="controls-section">
          <div className="search-container">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              placeholder="Search companies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          
          <div className="filters-container">
            <div className="filter-group">
              <Filter size={16} />
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="filter-select"
              >
                <option value="all">All Categories</option>
                {categories.filter(cat => cat !== 'all').map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <Target size={16} />
              <select 
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="filter-select"
              >
                <option value="all">All Difficulties</option>
                {difficulties.filter(diff => diff !== 'all').map(difficulty => (
                  <option key={difficulty} value={difficulty}>
                    {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Company Grid */}
        <div className="company-grid">
          {filteredCompanies.map((company, index) => (
            <div 
              key={company.name} 
              className="company-card"
              style={{ '--company-color': company.color }}
            >
              <div className="card-accent"></div>
              
              <div className="company-header">
                <div className="company-logo-wrapper">
                  <span className="company-logo">{company.logo}</span>
                </div>
                <div className="company-info">
                  <h3 className="company-name">{company.name}</h3>
                  <p className="company-category">
                    <Building2 size={14} />
                    {company.category}
                  </p>
                </div>
                <button 
                  className={`save-btn ${savedCompanies.includes(company.name) ? 'saved' : ''}`}
                  onClick={() => toggleSaveCompany(company.name)}
                >
                  <Bookmark size={18} fill={savedCompanies.includes(company.name) ? 'currentColor' : 'none'} />
                </button>
              </div>

              <div className="company-meta">
                <div className={`difficulty-badge ${company.difficulty}`}>
                  <Target size={14} />
                  {company.difficulty.charAt(0).toUpperCase() + company.difficulty.slice(1)}
                </div>
                <div className="rounds-badge">
                  <Clock size={14} />
                  {company.avgPreparation} prep
                </div>
              </div>

              <div className="company-stats">
                <div className="stat">
                  <span className="stat-value">{company.hiringRate}</span>
                  <span className="stat-label">Hiring Rate</span>
                </div>
                <div className="stat">
                  <span className="stat-value">{company.recentHires}</span>
                  <span className="stat-label">Recent Hires</span>
                </div>
                <div className="stat">
                  <span className="stat-value">{company.avgSalary}</span>
                  <span className="stat-label">Avg Salary</span>
                </div>
              </div>

              <div className="company-topics">
                <h4 className="topics-title">
                  <BookOpen size={16} />
                  Key Topics
                </h4>
                <div className="topics-tags">
                  {company.topics.map((topic, i) => (
                    <span key={i} className="topic-tag">{topic}</span>
                  ))}
                </div>
              </div>

              <div className="resources-preview">
                <h4 className="resources-title">
                  <FileText size={16} />
                  Learning Resources
                </h4>
                <div className="resources-stats">
                  <div className="resource-stat">
                    <Video size={14} />
                    <span>{company.resources.videos} videos</span>
                  </div>
                  <div className="resource-stat">
                    <FileText size={14} />
                    <span>{company.resources.articles} articles</span>
                  </div>
                  <div className="resource-stat">
                    <Target size={14} />
                    <span>{company.resources.questions} questions</span>
                  </div>
                </div>
              </div>

              <div className="card-actions">
                <button 
                  className="btn btn-primary"
                  onClick={() => navigate(`/company-prep/${company.name.toLowerCase()}`)}
                >
                  <Play size={18} />
                  <span>Start Preparation</span>
                  <ChevronRight size={16} />
                </button>
                <div className="action-buttons">
                  <button className="action-btn">
                    <Download size={16} />
                  </button>
                  <button className="action-btn">
                    <Share2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCompanies.length === 0 && (
          <div className="no-results">
            <Search size={48} />
            <h3 className="no-results-text">No companies found</h3>
            <p className="no-results-subtext">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyPreparation;