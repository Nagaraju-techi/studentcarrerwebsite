import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  TrendingUp, 
  Users, 
  Mic, 
  Heart, 
  Brain, 
  Zap, 
  Wind,
  Target,
  Clock,
  Award,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Sparkles,
  Building2,
  ArrowRight,
  CheckCircle,
  Star,
  Play
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './CareerWellnessWebsite.css';

const CareerWellnessWebsite = ({ onLogout }) => {
  const [currentQuote, setCurrentQuote] = useState(0);
  const [isVisible, setIsVisible] = useState({});
  const navigate = useNavigate();

  const quotes = [
    { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", author: "Winston Churchill" },
    { text: "The way to get started is to quit talking and begin doing.", author: "Steve Jobs" },
    { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
    { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" }
  ];

  // Auto-rotate quotes
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [quotes.length]);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll('[data-animate]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const nextQuote = () => setCurrentQuote((prev) => (prev + 1) % quotes.length);
  const prevQuote = () => setCurrentQuote((prev) => (prev - 1 + quotes.length) % quotes.length);

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    navigate("/login");
  };

  // Navigation handlers
  const navigateToResumeBuilder = () => {
    navigate('/resume-builder');
  };

  const navigateToCompanyPrep = () => {
    navigate('/company-prep');
  };

  const navigateToStressReliever = () => {
    navigate('/stress-reliever');
  };

  const navigateToProgressTracking = () => {
    navigate('/progress-tracking');
  };

  const navigateToCommunitySupport = () => {
    navigate('/community-support');
  };

  const navigateToMockInterviews = () => {
    navigate('/mock-interviews');
  };

  const features = [
    { 
      icon: FileText, 
      title: 'Resume Builder', 
      description: 'Create ATS-friendly resumes that get noticed by top recruiters',
      color: '#667eea',
      onClick: navigateToResumeBuilder
    },
    { 
      icon: Building2, 
      title: 'Company Preparation', 
      description: 'Get company-specific interview guides and preparation materials',
      color: '#ff6b6b',
      onClick: navigateToCompanyPrep
    },
    { 
      icon: TrendingUp, 
      title: 'Progress Tracking', 
      description: 'Monitor your application progress and interview success rates',
      color: '#f093fb',
      onClick: navigateToProgressTracking
    },
    { 
      icon: Users, 
      title: 'Community Support', 
      description: 'Connect with peers and mentors in your field for guidance',
      color: '#4facfe',
      onClick: navigateToCommunitySupport
    },
    { 
      icon: Mic, 
      title: 'Mock Interviews', 
      description: 'Practice with AI-powered interviews tailored to your target role',
      color: '#43e97b',
      onClick: navigateToMockInterviews
    }
  ];

  const wellnessItems = [
    { icon: Heart, title: 'Daily Motivation', color: '#ff6b6b' },
    { icon: Brain, title: 'Stress Management', color: '#667eea' },
    { icon: Zap, title: 'Mindfulness Tips', color: '#ffd93d' },
    { icon: Wind, title: 'Breathing Exercises', color: '#4facfe' }
  ];

  const stats = [
    { icon: Target, stat: '92%', description: 'Reduce Interview Anxiety', color: '#ff6b6b' },
    { icon: Clock, stat: '15 mins', description: 'Daily Wellness Practice', color: '#667eea' },
    { icon: Award, stat: '98%', description: 'Feel More Confident', color: '#43e97b' }
  ];

  return (
    <div className="career-wellness-website">
      {/* Top Navbar */}
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-brand">
            <Building2 className="brand-icon" size={28} />
            <span className="brand-text">CareerWellness</span>
          </div>
          <div className="navbar-links">
            <button className="nav-link" onClick={navigateToCompanyPrep}>
              <Sparkles size={16} />
              <span>Company Preparation</span>
            </button>
            <button className="nav-link" onClick={navigateToStressReliever}>
              <Heart size={16} />
              <span>Stress Reliever</span>
            </button>
            <button className="nav-link" onClick={navigateToResumeBuilder}>
              <FileText size={16} />
              <span>Resume Builder</span>
            </button>
            <button className="nav-link" onClick={navigateToProgressTracking}>
              <TrendingUp size={16} />
              <span>Progress Tracking</span>
            </button>
            <button className="nav-link" onClick={navigateToMockInterviews}>
              <Mic size={16} />
              <span>Mock Interviews</span>
            </button>
            <button className="nav-link" onClick={navigateToCommunitySupport}>
              <Users size={16} />
              <span>Community</span>
            </button>
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <div className="hero-gradient"></div>
        </div>
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-badge">
              <Star size={16} />
              <span>AI-Powered Career Platform</span>
            </div>
            <h1 className="hero-title">
              Your Smart Path to <span className="gradient-text">Dream Companies</span>
            </h1>
            <p className="hero-description">
              AI-driven platform to help students land their dream jobs while staying mentally strong and focused throughout their career journey.
            </p>
            <div className="hero-actions">
              <button className="btn btn-primary" onClick={navigateToResumeBuilder}>
                <span>Build Your Resume</span>
                <ArrowRight size={20} />
              </button>
              <button className="btn btn-secondary" onClick={navigateToCompanyPrep}>
                <Play size={20} />
                <span>Explore Companies</span>
              </button>
            </div>
            <div className="hero-stats">
              <div className="stat-item">
                <strong>10,000+</strong>
                <span>Students</span>
              </div>
              <div className="stat-item">
                <strong>500+</strong>
                <span>Companies</span>
              </div>
              <div className="stat-item">
                <strong>95%</strong>
                <span>Success Rate</span>
              </div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="floating-card card-1">
              <TrendingUp size={20} />
              <span>Career Growth</span>
            </div>
            <div className="floating-card card-2">
              <Award size={20} />
              <span>Top Offers</span>
            </div>
            <div className="floating-card card-3">
              <Heart size={20} />
              <span>Well-being</span>
            </div>
            <div className="main-visual">
              <div className="visual-content">
                <div className="visual-icon">💼</div>
                <div className="visual-glow"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" data-animate className={`section features-section ${isVisible.features ? 'visible' : ''}`}>
        <div className="container">
          <div className="section-header">
            <h2>Career Success Tools</h2>
            <p>Everything you need to accelerate your career journey and land your dream job</p>
          </div>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card" style={{ '--accent-color': feature.color }}>
                <div className="feature-icon">
                  <feature.icon size={32} />
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
                <button className="feature-link" onClick={feature.onClick}>
                  <span>Learn More</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wellness Section */}
      <section id="wellness" data-animate className={`section wellness-section ${isVisible.wellness ? 'visible' : ''}`}>
        <div className="container">
          <div className="wellness-grid">
            <div className="wellness-visual">
              <div className="wellness-orb">
                <div className="orb-content">🧘‍♀️</div>
                <div className="orb-glow"></div>
              </div>
            </div>
            <div className="wellness-content">
              <h2>
                Stay Balanced During Your <span className="gradient-text-green">Career Journey</span>
              </h2>
              <p className="wellness-description">
                Mental wellness is just as important as career success. Our integrated approach helps you stay centered and focused while pursuing your professional goals.
              </p>
              <div className="wellness-features">
                {wellnessItems.map((item, index) => (
                  <div key={index} className="wellness-feature" style={{ '--feature-color': item.color }}>
                    <div className="wellness-feature-icon">
                      <item.icon size={24} />
                    </div>
                    <span>{item.title}</span>
                  </div>
                ))}
              </div>
              <button className="btn btn-wellness" onClick={navigateToStressReliever}>
                <Sparkles size={20} />
                <span>Start Wellness Journey</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Motivation Section */}
      <section id="motivation" data-animate className={`section motivation-section ${isVisible.motivation ? 'visible' : ''}`}>
        <div className="container">
          <div className="section-header">
            <h2>Daily Motivation</h2>
            <p>Start each day with inspiration from history's greatest minds</p>
          </div>
          <div className="quote-carousel">
            <div className="quote-card">
              <div className="quote-icon">
                <Sparkles size={32} />
              </div>
              <blockquote className="quote-text">"{quotes[currentQuote].text}"</blockquote>
              <cite className="quote-author">— {quotes[currentQuote].author}</cite>
              <div className="quote-controls">
                <button onClick={prevQuote} className="control-btn">
                  <ChevronLeft size={24} />
                </button>
                <div className="carousel-dots">
                  {quotes.map((_, index) => (
                    <button 
                      key={index} 
                      className={`dot ${index === currentQuote ? 'active' : ''}`}
                      onClick={() => setCurrentQuote(index)}
                    />
                  ))}
                </div>
                <button onClick={nextQuote} className="control-btn">
                  <ChevronRight size={24} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" data-animate className={`section stats-section ${isVisible.stats ? 'visible' : ''}`}>
        <div className="container">
          <div className="section-header">
            <h2>Real Impact, Real Results</h2>
            <p>See how our platform transforms students' career journeys</p>
          </div>
          <div className="stats-grid">
            {stats.map((item, index) => (
              <div key={index} className="stat-card" style={{ '--stat-color': item.color }}>
                <div className="stat-icon">
                  <item.icon size={40} />
                </div>
                <h3>{item.stat}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready To Transform Your Career?</h2>
            <p>Join thousands of students who have successfully landed their dream jobs with our AI-driven platform.</p>
            <button className="btn btn-cta" onClick={navigateToCompanyPrep}>
              <Sparkles size={20} />
              <span>Start Free Trial</span>
              <ArrowRight size={20} />
            </button>
            <div className="cta-stats">
              <div className="cta-stat">
                <div className="cta-stat-icon">👥</div>
                <h3>10,000+</h3>
                <p>Students Helped</p>
              </div>
              <div className="cta-stat">
                <div className="cta-stat-icon">🏢</div>
                <h3>500+</h3>
                <p>Partner Companies</p>
              </div>
              <div className="cta-stat">
                <div className="cta-stat-icon">🎯</div>
                <h3>95%</h3>
                <p>Success Rate</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <div className="brand">
                <Building2 size={24} />
                <span>CareerWellness</span>
              </div>
              <p>Empowering students to achieve their career dreams while maintaining mental wellness.</p>
            </div>
            <div className="footer-links">
              <div className="footer-column">
                <h4>Platform</h4>
                <button className="footer-link" onClick={navigateToResumeBuilder}>Resume Builder</button>
                <button className="footer-link" onClick={navigateToCompanyPrep}>Company Prep</button>
                <button className="footer-link" onClick={navigateToStressReliever}>Stress Relief</button>
              </div>
              <div className="footer-column">
                <h4>Resources</h4>
                <button className="footer-link" onClick={navigateToProgressTracking}>Progress Tracking</button>
                <button className="footer-link" onClick={navigateToCommunitySupport}>Community</button>
                <button className="footer-link" onClick={navigateToMockInterviews}>Mock Interviews</button>
              </div>
              <div className="footer-column">
                <h4>Company</h4>
                <button className="footer-link">About Us</button>
                <button className="footer-link">Careers</button>
                <button className="footer-link">Contact</button>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 CareerWellness. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CareerWellnessWebsite;