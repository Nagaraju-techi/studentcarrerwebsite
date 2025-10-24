import React, { useState, useRef } from 'react';
import { 
  Save, 
  Download, 
  Eye, 
  EyeOff, 
  Plus, 
  Trash2, 
  FileText,
  Award,
  Briefcase,
  GraduationCap,
  Mail,
  Phone,
  MapPin,
  Globe,
  Linkedin,
  Github,
  ChevronDown,
  ChevronUp,
  Sparkles,
  RotateCcw,
  ArrowLeft,
  LogOut,
  User,
  Code,
  BookOpen
} from 'lucide-react';

const ResumeBuilder = ({ onLogout, onBackToDashboard }) => {
  const [resume, setResume] = useState({
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      location: '',
      portfolio: '',
      linkedin: '',
      github: ''
    },
    summary: '',
    experience: [],
    education: [],
    skills: [],
    projects: [],
    certifications: []
  });

  const [activeSection, setActiveSection] = useState('personal');
  const [previewMode, setPreviewMode] = useState(false);
  const [templates, setTemplates] = useState([
    { id: 1, name: 'Professional', color: '#667eea', selected: true },
    { id: 2, name: 'Modern', color: '#43e97b', selected: false },
    { id: 3, name: 'Creative', color: '#f093fb', selected: false }
  ]);
  
  const resumeRef = useRef(null);

  const handleBackToDashboard = () => {
    if (onBackToDashboard) {
      onBackToDashboard();
    }
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
  };

  const handleInputChange = (section, field, value) => {
    setResume(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleSummaryChange = (value) => {
    setResume(prev => ({
      ...prev,
      summary: value
    }));
  };

  const addItem = (section) => {
    const newItem = getDefaultItem(section);
    setResume(prev => ({
      ...prev,
      [section]: [...prev[section], newItem]
    }));
  };

  const removeItem = (section, index) => {
    setResume(prev => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index)
    }));
  };

  const updateItem = (section, index, field, value) => {
    setResume(prev => ({
      ...prev,
      [section]: prev[section].map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const getDefaultItem = (section) => {
    const defaults = {
      experience: {
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        current: false,
        description: '',
        achievements: ['']
      },
      education: {
        institution: '',
        degree: '',
        field: '',
        startDate: '',
        endDate: '',
        gpa: '',
        honors: ''
      },
      skills: {
        name: '',
        category: 'Technical',
        level: 'Intermediate'
      },
      projects: {
        name: '',
        description: '',
        technologies: '',
        link: '',
        startDate: '',
        endDate: ''
      },
      certifications: {
        name: '',
        issuer: '',
        date: '',
        link: '',
        expiryDate: ''
      }
    };
    return defaults[section] || {};
  };

  const addAchievement = (expIndex) => {
    const updatedExperience = [...resume.experience];
    if (!updatedExperience[expIndex].achievements) {
      updatedExperience[expIndex].achievements = [''];
    }
    updatedExperience[expIndex].achievements.push('');
    setResume(prev => ({
      ...prev,
      experience: updatedExperience
    }));
  };

  const removeAchievement = (expIndex, achIndex) => {
    const updatedExperience = [...resume.experience];
    if (updatedExperience[expIndex].achievements) {
      updatedExperience[expIndex].achievements = updatedExperience[expIndex].achievements.filter((_, i) => i !== achIndex);
      setResume(prev => ({
        ...prev,
        experience: updatedExperience
      }));
    }
  };

  const updateAchievement = (expIndex, achIndex, value) => {
    const updatedExperience = [...resume.experience];
    if (updatedExperience[expIndex].achievements) {
      updatedExperience[expIndex].achievements[achIndex] = value;
      setResume(prev => ({
        ...prev,
        experience: updatedExperience
      }));
    }
  };

  const selectTemplate = (templateId) => {
    setTemplates(templates.map(tpl => ({
      ...tpl,
      selected: tpl.id === templateId
    })));
  };

  const downloadPDF = () => {
    alert('PDF download functionality would be implemented here with a library like jsPDF or html2pdf!');
  };

  const exportJSON = () => {
    const dataStr = JSON.stringify(resume, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'resume-data.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const resetResume = () => {
    if (window.confirm('Are you sure you want to reset all data? This action cannot be undone.')) {
      setResume({
        personalInfo: {
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          location: '',
          portfolio: '',
          linkedin: '',
          github: ''
        },
        summary: '',
        experience: [],
        education: [],
        skills: [],
        projects: [],
        certifications: []
      });
    }
  };

  const calculateCompletion = () => {
    let completed = 0;
    let total = 0;

    const personalFields = ['firstName', 'lastName', 'email'];
    total += personalFields.length;
    completed += personalFields.filter(field => resume.personalInfo[field]?.trim()).length;

    total += 1;
    if (resume.summary.trim()) completed += 1;

    total += 1;
    if (resume.experience.length > 0) completed += 1;

    total += 1;
    if (resume.education.length > 0) completed += 1;

    total += 1;
    if (resume.skills.length > 0) completed += 1;

    return Math.round((completed / total) * 100);
  };

  const completionPercentage = calculateCompletion();

  const SectionHeader = ({ icon: Icon, title, count, isOpen, onToggle, onAdd }) => (
    <div 
      style={{
        padding: '16px',
        cursor: 'pointer',
        backgroundColor: isOpen ? '#f8fafc' : 'white',
        borderBottom: '1px solid #e2e8f0'
      }}
      onClick={onToggle}
    >
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center' 
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Icon size={20} />
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '600' }}>{title}</h3>
          {count > 0 && (
            <span style={{
              backgroundColor: '#667eea',
              color: 'white',
              padding: '2px 8px',
              borderRadius: '12px',
              fontSize: '12px'
            }}>
              {count}
            </span>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button 
            onClick={(e) => { 
              e.stopPropagation(); 
              onAdd(); 
            }}
            type="button"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Plus size={16} />
          </button>
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      {/* Header */}
      <div style={{
        backgroundColor: 'white',
        borderBottom: '1px solid #e2e8f0',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{
          maxWidth: '1600px',
          margin: '0 auto',
          padding: '16px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
            <button 
              onClick={handleBackToDashboard} 
              type="button"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                background: 'white',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              <ArrowLeft size={20} />
              Back to Dashboard
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <FileText size={32} color="#667eea" />
              <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '700' }}>AI Resume Builder</h1>
              <span style={{
                backgroundColor: '#667eea',
                color: 'white',
                padding: '4px 8px',
                borderRadius: '4px',
                fontSize: '12px',
                fontWeight: '600'
              }}>
                BETA
              </span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
            <button 
              onClick={() => setPreviewMode(!previewMode)}
              type="button"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                border: previewMode ? '2px solid #667eea' : '1px solid #e2e8f0',
                borderRadius: '8px',
                background: previewMode ? '#f0f4ff' : 'white',
                cursor: 'pointer',
                fontWeight: '500',
                fontSize: '14px'
              }}
            >
              {previewMode ? <EyeOff size={20} /> : <Eye size={20} />}
              {previewMode ? 'Edit Mode' : 'Preview Mode'}
            </button>
            <button 
              onClick={downloadPDF} 
              type="button"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                border: 'none',
                borderRadius: '8px',
                background: '#10b981',
                color: 'white',
                cursor: 'pointer',
                fontWeight: '500',
                fontSize: '14px'
              }}
            >
              <Download size={20} />
              Export PDF
            </button>
            <button 
              onClick={exportJSON} 
              type="button"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                border: 'none',
                borderRadius: '8px',
                background: '#667eea',
                color: 'white',
                cursor: 'pointer',
                fontWeight: '500',
                fontSize: '14px'
              }}
            >
              <Save size={20} />
              Save JSON
            </button>
            <button 
              onClick={resetResume} 
              type="button"
              style={{
                padding: '8px',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                background: 'white',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <RotateCcw size={20} />
            </button>
            <button 
              onClick={handleLogout} 
              type="button"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                background: 'white',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      <div style={{
        maxWidth: '1600px',
        margin: '0 auto',
        padding: '24px',
        display: 'grid',
        gridTemplateColumns: previewMode ? '1fr' : '400px 1fr 300px',
        gap: '24px'
      }}>
        {/* Sidebar - Form */}
        {!previewMode && (
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            height: 'fit-content',
            maxHeight: 'calc(100vh - 140px)',
            overflowY: 'auto',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <div style={{ padding: '24px', borderBottom: '1px solid #e2e8f0' }}>
              <h3 style={{ marginBottom: '16px', fontSize: '14px', fontWeight: '600', textTransform: 'uppercase', color: '#64748b' }}>
                Choose Template
              </h3>
              <div style={{ display: 'flex', gap: '12px' }}>
                {templates.map(template => (
                  <button
                    key={template.id}
                    onClick={() => selectTemplate(template.id)}
                    type="button"
                    style={{
                      flex: 1,
                      padding: '12px',
                      border: template.selected ? `2px solid ${template.color}` : '1px solid #e2e8f0',
                      borderRadius: '8px',
                      background: 'white',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                      alignItems: 'center'
                    }}
                  >
                    <div style={{ width: '100%' }}>
                      <div style={{ height: '4px', background: template.color, borderRadius: '2px', marginBottom: '4px' }}></div>
                      <div style={{ height: '3px', background: template.color, borderRadius: '2px', width: '60%', marginBottom: '4px', opacity: 0.5 }}></div>
                      <div style={{ height: '4px', background: template.color, borderRadius: '2px' }}></div>
                    </div>
                    <span style={{ fontSize: '12px', fontWeight: '500' }}>{template.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              {/* Personal Information */}
              <div style={{ borderBottom: '1px solid #e2e8f0' }}>
                <SectionHeader
                  icon={User}
                  title="Personal Information"
                  count={0}
                  isOpen={activeSection === 'personal'}
                  onToggle={() => setActiveSection(activeSection === 'personal' ? '' : 'personal')}
                  onAdd={() => {}}
                />
                {activeSection === 'personal' && (
                  <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', marginBottom: '4px', color: '#475569' }}>
                          First Name *
                        </label>
                        <input
                          type="text"
                          value={resume.personalInfo.firstName}
                          onChange={(e) => handleInputChange('personalInfo', 'firstName', e.target.value)}
                          placeholder="John"
                          style={{
                            width: '100%',
                            padding: '8px 12px',
                            border: '1px solid #e2e8f0',
                            borderRadius: '6px',
                            fontSize: '14px',
                            boxSizing: 'border-box'
                          }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', marginBottom: '4px', color: '#475569' }}>
                          Last Name *
                        </label>
                        <input
                          type="text"
                          value={resume.personalInfo.lastName}
                          onChange={(e) => handleInputChange('personalInfo', 'lastName', e.target.value)}
                          placeholder="Doe"
                          style={{
                            width: '100%',
                            padding: '8px 12px',
                            border: '1px solid #e2e8f0',
                            borderRadius: '6px',
                            fontSize: '14px',
                            boxSizing: 'border-box'
                          }}
                        />
                      </div>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', marginBottom: '4px', color: '#475569' }}>
                        Email *
                      </label>
                      <input
                        type="email"
                        value={resume.personalInfo.email}
                        onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
                        placeholder="john.doe@email.com"
                        style={{
                          width: '100%',
                          padding: '8px 12px',
                          border: '1px solid #e2e8f0',
                          borderRadius: '6px',
                          fontSize: '14px',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', marginBottom: '4px', color: '#475569' }}>
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={resume.personalInfo.phone}
                        onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)}
                        placeholder="+1 (555) 123-4567"
                        style={{
                          width: '100%',
                          padding: '8px 12px',
                          border: '1px solid #e2e8f0',
                          borderRadius: '6px',
                          fontSize: '14px',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', marginBottom: '4px', color: '#475569' }}>
                        Location
                      </label>
                      <input
                        type="text"
                        value={resume.personalInfo.location}
                        onChange={(e) => handleInputChange('personalInfo', 'location', e.target.value)}
                        placeholder="San Francisco, CA"
                        style={{
                          width: '100%',
                          padding: '8px 12px',
                          border: '1px solid #e2e8f0',
                          borderRadius: '6px',
                          fontSize: '14px',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', marginBottom: '4px', color: '#475569' }}>
                        Portfolio URL
                      </label>
                      <input
                        type="url"
                        value={resume.personalInfo.portfolio}
                        onChange={(e) => handleInputChange('personalInfo', 'portfolio', e.target.value)}
                        placeholder="https://johndoe.dev"
                        style={{
                          width: '100%',
                          padding: '8px 12px',
                          border: '1px solid #e2e8f0',
                          borderRadius: '6px',
                          fontSize: '14px',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', marginBottom: '4px', color: '#475569' }}>
                        LinkedIn
                      </label>
                      <input
                        type="url"
                        value={resume.personalInfo.linkedin}
                        onChange={(e) => handleInputChange('personalInfo', 'linkedin', e.target.value)}
                        placeholder="https://linkedin.com/in/johndoe"
                        style={{
                          width: '100%',
                          padding: '8px 12px',
                          border: '1px solid #e2e8f0',
                          borderRadius: '6px',
                          fontSize: '14px',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', marginBottom: '4px', color: '#475569' }}>
                        GitHub
                      </label>
                      <input
                        type="url"
                        value={resume.personalInfo.github}
                        onChange={(e) => handleInputChange('personalInfo', 'github', e.target.value)}
                        placeholder="https://github.com/johndoe"
                        style={{
                          width: '100%',
                          padding: '8px 12px',
                          border: '1px solid #e2e8f0',
                          borderRadius: '6px',
                          fontSize: '14px',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Professional Summary */}
              <div style={{ borderBottom: '1px solid #e2e8f0' }}>
                <SectionHeader
                  icon={FileText}
                  title="Professional Summary"
                  count={resume.summary ? 1 : 0}
                  isOpen={activeSection === 'summary'}
                  onToggle={() => setActiveSection(activeSection === 'summary' ? '' : 'summary')}
                  onAdd={() => {}}
                />
                {activeSection === 'summary' && (
                  <div style={{ padding: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', marginBottom: '4px', color: '#475569' }}>
                        Professional Summary *
                      </label>
                      <textarea
                        value={resume.summary}
                        onChange={(e) => handleSummaryChange(e.target.value)}
                        placeholder="Experienced software developer with 5+ years in web development..."
                        rows={6}
                        style={{
                          width: '100%',
                          padding: '8px 12px',
                          border: '1px solid #e2e8f0',
                          borderRadius: '6px',
                          fontSize: '14px',
                          resize: 'vertical',
                          boxSizing: 'border-box'
                        }}
                      />
                      <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>
                        {resume.summary.length}/500 characters
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Work Experience */}
              <div style={{ borderBottom: '1px solid #e2e8f0' }}>
                <SectionHeader
                  icon={Briefcase}
                  title="Work Experience"
                  count={resume.experience.length}
                  isOpen={activeSection === 'experience'}
                  onToggle={() => setActiveSection(activeSection === 'experience' ? '' : 'experience')}
                  onAdd={() => addItem('experience')}
                />
                {activeSection === 'experience' && (
                  <div style={{ padding: '16px' }}>
                    {resume.experience.length === 0 ? (
                      <div style={{ textAlign: 'center', padding: '32px 16px' }}>
                        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
                          <Briefcase size={48} color="#cbd5e1" />
                        </div>
                        <p style={{ color: '#64748b', marginBottom: '16px', fontSize: '14px' }}>
                          No work experience added yet
                        </p>
                        <button 
                          onClick={() => addItem('experience')}
                          type="button"
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '8px 16px',
                            border: 'none',
                            borderRadius: '6px',
                            background: '#667eea',
                            color: 'white',
                            cursor: 'pointer',
                            fontWeight: '500',
                            fontSize: '14px'
                          }}
                        >
                          <Plus size={20} />
                          Add First Experience
                        </button>
                      </div>
                    ) : (
                      <p style={{ color: '#64748b', fontSize: '14px', margin: 0 }}>
                        {resume.experience.length} experience{resume.experience.length !== 1 ? 's' : ''} added
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Education */}
              <div style={{ borderBottom: '1px solid #e2e8f0' }}>
                <SectionHeader
                  icon={GraduationCap}
                  title="Education"
                  count={resume.education.length}
                  isOpen={activeSection === 'education'}
                  onToggle={() => setActiveSection(activeSection === 'education' ? '' : 'education')}
                  onAdd={() => addItem('education')}
                />
              </div>

              {/* Skills */}
              <div style={{ borderBottom: '1px solid #e2e8f0' }}>
                <SectionHeader
                  icon={Award}
                  title="Skills"
                  count={resume.skills.length}
                  isOpen={activeSection === 'skills'}
                  onToggle={() => setActiveSection(activeSection === 'skills' ? '' : 'skills')}
                  onAdd={() => addItem('skills')}
                />
              </div>

              {/* Projects */}
              <div style={{ borderBottom: '1px solid #e2e8f0' }}>
                <SectionHeader
                  icon={Code}
                  title="Projects"
                  count={resume.projects.length}
                  isOpen={activeSection === 'projects'}
                  onToggle={() => setActiveSection(activeSection === 'projects' ? '' : 'projects')}
                  onAdd={() => addItem('projects')}
                />
              </div>

              {/* Certifications */}
              <div>
                <SectionHeader
                  icon={BookOpen}
                  title="Certifications"
                  count={resume.certifications.length}
                  isOpen={activeSection === 'certifications'}
                  onToggle={() => setActiveSection(activeSection === 'certifications' ? '' : 'certifications')}
                  onAdd={() => addItem('certifications')}
                />
              </div>
            </div>
          </div>
        )}

        {/* Main Content - Preview */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '48px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          minHeight: '842px'
        }} ref={resumeRef}>
          <div>
            {/* Header */}
            <div style={{ marginBottom: '32px', borderBottom: '2px solid #e2e8f0', paddingBottom: '24px' }}>
              <h1 style={{ 
                fontSize: '36px', 
                fontWeight: '700', 
                margin: '0 0 8px 0',
                color: '#1e293b'
              }}>
                {resume.personalInfo.firstName || 'Your Name'} {resume.personalInfo.lastName}
              </h1>
              {resume.summary && (
                <p style={{ 
                  fontSize: '16px', 
                  color: '#475569',
                  margin: '8px 0 16px 0'
                }}>
                  {resume.summary.split('.')[0]}.
                </p>
              )}
              <div style={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                gap: '16px',
                fontSize: '14px',
                color: '#64748b'
              }}>
                {resume.personalInfo.email && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Mail size={14} />
                    <span>{resume.personalInfo.email}</span>
                  </div>
                )}
                                {resume.personalInfo.phone && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Phone size={14} />
                    <span>{resume.personalInfo.phone}</span>
                  </div>
                )}
                {resume.personalInfo.location && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <MapPin size={14} />
                    <span>{resume.personalInfo.location}</span>
                  </div>
                )}
                {resume.personalInfo.portfolio && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Globe size={14} />
                    <a href={resume.personalInfo.portfolio} target="_blank" rel="noreferrer">
                      {resume.personalInfo.portfolio}
                    </a>
                  </div>
                )}
                {resume.personalInfo.linkedin && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Linkedin size={14} />
                    <a href={resume.personalInfo.linkedin} target="_blank" rel="noreferrer">
                      LinkedIn
                    </a>
                  </div>
                )}
                {resume.personalInfo.github && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Github size={14} />
                    <a href={resume.personalInfo.github} target="_blank" rel="noreferrer">
                      GitHub
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Experience */}
            {resume.experience.length > 0 && (
              <div style={{ marginBottom: '32px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>Work Experience</h2>
                {resume.experience.map((exp, i) => (
                  <div key={i} style={{ marginBottom: '16px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: '600', margin: 0 }}>
                      {exp.position || 'Position'} @ {exp.company || 'Company'}
                    </h3>
                    <p style={{ fontSize: '14px', color: '#64748b', margin: '4px 0' }}>
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </p>
                    <p style={{ fontSize: '14px', margin: '4px 0' }}>{exp.description}</p>
                    {exp.achievements && exp.achievements.length > 0 && (
                      <ul style={{ paddingLeft: '20px', margin: '8px 0' }}>
                        {exp.achievements.map((ach, j) => (
                          <li key={j} style={{ fontSize: '14px', color: '#475569' }}>{ach}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Education */}
            {resume.education.length > 0 && (
              <div style={{ marginBottom: '32px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>Education</h2>
                {resume.education.map((edu, i) => (
                  <div key={i} style={{ marginBottom: '12px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: '600', margin: 0 }}>
                      {edu.degree || 'Degree'} in {edu.field || 'Field'}
                    </h3>
                    <p style={{ fontSize: '14px', color: '#64748b', margin: '4px 0' }}>
                      {edu.institution} ({edu.startDate} - {edu.endDate})
                    </p>
                    {edu.gpa && <p style={{ fontSize: '14px', margin: '4px 0' }}>GPA: {edu.gpa}</p>}
                    {edu.honors && <p style={{ fontSize: '14px', margin: '4px 0' }}>Honors: {edu.honors}</p>}
                  </div>
                ))}
              </div>
            )}

            {/* Skills */}
            {resume.skills.length > 0 && (
              <div style={{ marginBottom: '32px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>Skills</h2>
                <ul style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', padding: 0, listStyle: 'none' }}>
                  {resume.skills.map((skill, i) => (
                    <li key={i} style={{
                      background: '#f1f5f9',
                      padding: '6px 12px',
                      borderRadius: '6px',
                      fontSize: '14px'
                    }}>
                      {skill.name} ({skill.level})
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Projects */}
            {resume.projects.length > 0 && (
              <div style={{ marginBottom: '32px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>Projects</h2>
                {resume.projects.map((proj, i) => (
                  <div key={i} style={{ marginBottom: '16px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: '600', margin: 0 }}>
                      {proj.name}
                    </h3>
                    <p style={{ fontSize: '14px', margin: '4px 0' }}>{proj.description}</p>
                    {proj.technologies && (
                      <p style={{ fontSize: '14px', color: '#64748b', margin: '4px 0' }}>
                        Tech: {proj.technologies}
                      </p>
                    )}
                    {proj.link && (
                      <a href={proj.link} target="_blank" rel="noreferrer" style={{ fontSize: '14px', color: '#3b82f6' }}>
                        {proj.link}
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Certifications */}
            {resume.certifications.length > 0 && (
              <div style={{ marginBottom: '32px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>Certifications</h2>
                {resume.certifications.map((cert, i) => (
                  <div key={i} style={{ marginBottom: '12px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: '600', margin: 0 }}>
                      {cert.name}
                    </h3>
                    <p style={{ fontSize: '14px', margin: '4px 0', color: '#64748b' }}>
                      {cert.issuer} • {cert.date} {cert.expiryDate ? ` (valid until ${cert.expiryDate})` : ''}
                    </p>
                    {cert.link && (
                      <a href={cert.link} target="_blank" rel="noreferrer" style={{ fontSize: '14px', color: '#3b82f6' }}>
                        {cert.link}
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Progress Sidebar */}
        {!previewMode && (
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            height: 'fit-content'
          }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>
              Completion Progress
            </h3>
            <div style={{
              background: '#e2e8f0',
              borderRadius: '8px',
              overflow: 'hidden',
              marginBottom: '8px'
            }}>
              <div style={{
                width: `${completionPercentage}%`,
                background: '#667eea',
                height: '12px'
              }} />
            </div>
            <p style={{ fontSize: '14px', color: '#475569', margin: 0 }}>
              {completionPercentage}% Complete
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeBuilder;
