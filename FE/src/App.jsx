import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Download, 
  ExternalLink, 
  Award, 
  BookOpen, 
  Briefcase, 
  Cpu, 
  Mail, 
  MessageSquare,
  ChevronRight,
  FileText
} from 'lucide-react';

const API_BASE = import.meta.env.DEV ? 'http://localhost:5000' : '';

// --- INTRO ANIMATION COMPONENT ---
const IntroAnimation = ({ onComplete }) => {
  const words = ["MUQTADA HASBY ABDALLA", "CLOUD ENGINEEER", "BACKEND DEVELOPER", "DATA ENGINEER"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index >= words.length) {
      const timer = setTimeout(() => {
        onComplete();
      }, 600);
      return () => clearTimeout(timer);
    }

    const wordTimer = setTimeout(() => {
      setIndex(prev => prev + 1);
    }, 400);

    return () => clearTimeout(wordTimer);
  }, [index]);

  return (
    <div className="intro-container">
      <div className="intro-grid"></div>
      <div className="intro-glow"></div>
      <div className="intro-text-wrapper">
        <AnimatePresence mode="wait">
          {index < words.length && (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 1.05 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <h1 className="intro-title gradient-accent-text">{words[index]}</h1>
              <p className="intro-subtitle">Initialize Portfolio Engine v2.0</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// --- APP COMPONENT ---
function App() {
  const [showIntro, setShowIntro] = useState(() => {
    const visited = sessionStorage.getItem('visited');
    return !visited;
  });

  const [portfolioData, setPortfolioData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('skills');
  const [selectedCert, setSelectedCert] = useState(null);

  // Fetch compiled data
  useEffect(() => {
    fetch(`${API_BASE}/api/portfolio-data`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch portfolio data');
        return res.json();
      })
      .then(json => {
        if (json.success) {
          setPortfolioData(json.data);
        } else {
          throw new Error(json.message || 'Error occurred');
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleIntroComplete = () => {
    sessionStorage.setItem('visited', 'true');
    setShowIntro(false);
  };

  const getSocialIcon = (name) => {
    switch (name.toLowerCase()) {
      case 'linkedin': 
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
            <rect width="4" height="12" x="2" y="9"/>
            <circle cx="4" cy="4" r="2"/>
          </svg>
        );
      case 'github':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github">
            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
            <path d="M9 18c-4.51 2-5-2-7-2"/>
          </svg>
        );
      case 'instagram':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram">
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
          </svg>
        );
      default:
        return <ExternalLink size={20} />;
    }
  };

  if (showIntro) {
    return <IntroAnimation onComplete={handleIntroComplete} />;
  }

  if (loading) {
    return (
      <div className="intro-container">
        <div className="intro-glow"></div>
        <p className="intro-subtitle">Syncing Data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="intro-container" style={{ gap: '20px' }}>
        <h2 style={{ color: 'red' }}>Initialization Failed</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()} className="btn-primary">
          Try Again
        </button>
      </div>
    );
  }

  const { profile, skills, experience, projects, education, certifications } = portfolioData;

  // Formatter for Certification Click
  const handleCertClick = (cert) => {
    if (cert.image_url) {
      setSelectedCert(cert);
    } else if (cert.link_public_profile) {
      window.open(cert.link_public_profile, '_blank');
    }
  };

  return (
    <div className="container">
      {/* 🚀 HERO SECTION */}
      <section className="hero-grid">
        <div className="hero-info">
          <span className="hero-subtitle">Welcome to my space</span>
          <h1 className="hero-name gradient-text">{profile.name}</h1>
          <h2 className="gradient-accent-text" style={{ fontSize: '1.5rem', fontWeight: 600 }}>{profile.title}</h2>
          <p className="hero-quote">"{profile.quote}"</p>
          <div className="hero-socials">
            {profile.social_links && profile.social_links.map((link, idx) => (
              <a 
                key={idx} 
                href={link.url} 
                target="_blank" 
                rel="noreferrer" 
                className="social-link" 
                title={link.name}
              >
                {getSocialIcon(link.name)}
              </a>
            ))}
          </div>
        </div>
        <div className="hero-avatar-wrapper">
          <div className="hero-avatar-glow"></div>
          <img src={profile.avatar_url} alt={profile.name} className="hero-avatar" />
        </div>
      </section>

      {/* 💎 ABOUT ME */}
      <section className="about-section glass-card">
        <h2 className="section-title gradient-accent-text">About Me</h2>
        <p className="about-desc">{profile.about_me?.description}</p>
        {profile.cv_download_url && (
          <a href={profile.cv_download_url} target="_blank" rel="noreferrer" className="btn-primary">
            <Download size={18} /> Download CV
          </a>
        )}
      </section>

      {/* 🏷️ TABS NAVIGATION */}
      <div className="tabs-navigation">
        {[
          { id: 'skills', label: 'Skills & Experience', icon: <Cpu size={16} /> },
          { id: 'education', label: 'Education', icon: <BookOpen size={16} /> },
          { id: 'projects', label: 'Projects', icon: <Briefcase size={16} /> },
          { id: 'certifications', label: 'Certifications', icon: <Award size={16} /> }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* 🌀 ACTIVE TAB CONTENT */}
      <main style={{ minHeight: '400px' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
          >
            {/* TAB: SKILLS & EXPERIENCE */}
            {activeTab === 'skills' && (
              <div className="skills-experience-layout">
                {/* Skills Grid */}
                <div className="skills-wrapper">
                  {skills && Object.entries(skills).map(([category, items]) => (
                    <div key={category} className="skills-category glass-card">
                      <h3 className="skills-category-title">
                        {category.replace('_', ' & ').toUpperCase()}
                      </h3>
                      <div className="skills-list">
                        {items.map((skill, sIdx) => (
                          <span key={sIdx} className="skill-tag">{skill}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Experience Timeline */}
                <div>
                  <h3 className="timeline-title gradient-accent-text">Community & Professional Experience</h3>
                  <div className="timeline">
                    {experience && experience.map((exp, idx) => (
                      <div key={idx} className="timeline-item">
                        <div className="timeline-dot"></div>
                        <div className="timeline-card glass-card">
                          <div className="timeline-header">
                            <div>
                              <h4 className="timeline-role">{exp.title}</h4>
                              <span className="timeline-company">{exp.company}</span>
                            </div>
                            <span className="timeline-date">{exp.date}</span>
                          </div>
                          <p className="timeline-desc">{exp.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB: EDUCATION */}
            {activeTab === 'education' && (
              <div className="education-sections">
                {/* Formal Education */}
                <div>
                  <h3 className="education-column-title gradient-accent-text">Formal Education</h3>
                  {education?.formal && education.formal.map((edu, idx) => (
                    <div key={idx} className="education-card glass-card">
                      <h4 className="education-institution">{edu.institution}</h4>
                      <p className="education-degree">{edu.degree}</p>
                      <span className="education-period">{edu.period}</span>
                    </div>
                  ))}
                </div>

                {/* Non-Formal Education */}
                <div>
                  <h3 className="education-column-title gradient-accent-text">Non-Formal & Bootcamps</h3>
                  {education?.non_formal && education.non_formal.map((edu, idx) => (
                    <div key={idx} className="education-card glass-card">
                      <h4 className="education-institution">{edu.program}</h4>
                      <p className="education-degree">{edu.path}</p>
                      <span className="education-period">{edu.period}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: PROJECTS */}
            {activeTab === 'projects' && (
              <div className="projects-grid">
                {projects?.projects && projects.projects.map((proj, idx) => (
                  <div key={idx} className="project-card glass-card">
                    <h3 className="project-title">{proj.title}</h3>
                    <div className="project-tech">
                      {proj.tech && proj.tech.map((t, tIdx) => (
                        <span key={tIdx} className="project-tech-badge">{t}</span>
                      ))}
                    </div>
                    <p className="project-desc">{proj.desc}</p>
                  </div>
                ))}
              </div>
            )}

            {/* TAB: CERTIFICATIONS */}
            {activeTab === 'certifications' && (
              <div className="certifications-grid">
                {certifications?.certifications && certifications.certifications.map((cert, idx) => {
                  const isClickable = cert.image_url || cert.link_public_profile;
                  return (
                    <div 
                      key={idx} 
                      className={`cert-card glass-card ${isClickable ? 'clickable' : ''}`}
                      onClick={() => handleCertClick(cert)}
                    >
                      <div>
                        <div className="cert-icon-wrapper">
                          <Award size={32} />
                        </div>
                        <h3 className="cert-title">{cert.title}</h3>
                        <p className="cert-issuer">{cert.issuer}</p>
                      </div>
                      
                      <div className="cert-footer">
                        <span className="cert-date">{cert.date || 'Active credential'}</span>
                        {cert.image_url && (
                          <span className="cert-link">
                            View Certificate <FileText size={14} />
                          </span>
                        )}
                        {!cert.image_url && cert.link_public_profile && (
                          <span className="cert-link">
                            Verify Credential <ExternalLink size={14} />
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* ✉️ CONTACT ME SECTION */}
      <section className="contact-section">
        <div className="contact-card glass-card">
          <h2 className="contact-title gradient-accent-text">Contact Me</h2>
          <p className="contact-subtitle">I'm currently looking for new opportunities and collaborations. Let's build something scalable together!</p>
          <div className="contact-buttons">
            <a 
              href={`https://wa.me/6281234567890?text=Halo%20Muqtada%2C%20saya%20melihat%20portofolio%20Anda%20dan%20tertarik%20untuk%20berkolaborasi.`} 
              target="_blank" 
              rel="noreferrer" 
              className="btn-primary"
            >
              <MessageSquare size={18} /> Chat via WhatsApp
            </a>
            <a 
              href="mailto:muqtadahasby@gmail.com" 
              className="btn-secondary"
            >
              <Mail size={18} /> Send an Email
            </a>
          </div>
        </div>
      </section>

      {/* 👣 FOOTER */}
      <footer className="footer">
        <p className="footer-text">
          &copy; {new Date().getFullYear()} Muqtada Hasby Abdalla. Engineered with Node.js & React.
        </p>
      </footer>

      {/* 🖼️ CERTIFICATE LIGHTBOX MODAL */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div 
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCert(null)}
          >
            <motion.div 
              className="modal-content"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="modal-close" onClick={() => setSelectedCert(null)}>X</button>
              <img src={selectedCert.image_url} alt={selectedCert.title} className="modal-image" />
              <div className="modal-caption">
                <h3 className="modal-cert-title">{selectedCert.title}</h3>
                <p className="modal-cert-issuer">{selectedCert.issuer}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
