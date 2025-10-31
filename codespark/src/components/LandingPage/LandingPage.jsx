import { Code2, Users, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../styles/global.css';
// import { StarsCanvas } from './StarBackground';

export default function LandingPage() {

  const navigate = useNavigate();

  const handleHome = () => {
    navigate('/');
  };
  
  const handleLogin = () => {
    navigate('/login');
  };
      
  return (
    <div className="screen landing-gradient">
      {/* Star Background */}
      {/* <StarsCanvas /> */}

      <header className="landing-header">
        <div className="container header-section">
          <div 
            className="logo"
            onClick={handleHome}
          >
            <img className='logo-icon' src="./logo.png" alt="no logo" /> 
            <span className="logo-text">Code Spark</span>
          </div>
          <button className="btn btn-primary">
            Get Started
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container text-center">
          <h1 className="hero-title">
            Code Together, Create Better
          </h1>
          <p className="hero-subtitle">
            A powerful online code editor with real-time collaboration, file management, and group sharing capabilities.
          </p>
          <button className="btn btn-primary btn-lg btnimg" 
            onClick={handleLogin}>
            <img className='logo-icon' src="./logo.png" alt="no logo" />
            <span> Start Coding Now</span>
          </button>
        </div>
      </section>

      <section className="features-section">
        <div className="container">
          <h2 className="features-title">
            Everything You Need to Code
          </h2>
          <div className="grid grid-cols-3 gap-8">
            <div className="feature-card">
              <div className="feature-icon-wrapper feature-icon-blue">
                <Code2 className="feature-icon" />
              </div>
              <h3 className="mb-2">Advanced Code Editor</h3>
              <p className="text-gray-600">
                Monaco editor with syntax highlighting for JavaScript, Python, HTML, CSS, and more. Customize themes, font sizes, and preferences.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrapper feature-icon-green">
                <Users className="feature-icon" />
              </div>
              <h3 className="mb-2">Group Collaboration</h3>
              <p className="text-gray-600">
                Create groups, invite members, and collaborate on projects. Share files with your team and work together seamlessly.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrapper feature-icon-purple">
                <Shield className="feature-icon" />
              </div>
              <h3 className="mb-2">Role-Based Permissions</h3>
              <p className="text-gray-600">
                Control access with owner, admin, editor, and viewer roles. Manage who can view, edit, or manage your files and groups.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="feature-benefits">
        <div className="container-benefits">
          <div className="benefits-grid">
            <div className="benefits-content">
              <h2 className="benefits-title">Why choose Code Spark?</h2>
              <p className="benefits-subtitle">
                Built for developers who value collaboration, security, and efficiency. 
                Code Spark combines powerful editing capabilities with seamless team features.
              </p>

              <ul className="benefits-list">
                <li className="benefit-item">
                  <span className="benefit-icon">&#10003;</span>
                  <div className="benefit-text">
                    <span className="benefit-title"> Real-time Sync</span>
                    <p className="benefit-description">Collaborate instantly without losing changes.</p>
                  </div>
                </li>

                <li className="benefit-item">
                  <span className="benefit-icon">&#10003;</span>
                  <div className="benefit-text">
                    <span className="benefit-title">Secure Workspaces</span>
                    <p className="benefit-description">Work securely with encryption and access control.</p>
                  </div>
                </li>

                <li className="benefit-item">
                  <span className="benefit-icon">&#10003;</span>
                  <div className="benefit-text">
                    <span className="benefit-title">Developer Tools</span>
                    <p className="benefit-description">Integrated debugging and version control.</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="features-box">
              <div className="feature-card teal">
                <span className="feature-icon file-icon"></span>
                <div>
                  <h4 className="feature-title">Smart File Management</h4>
                  <p className="feature-description">Organize with nested folders and intuitive file trees.</p>
                </div>
              </div>

              <div className="feature-card blue">
                <span className="feature-icon users-icon"></span>
                <div>
                  <h4 className="feature-title">Team Collaboration</h4>
                  <p className="feature-description">Real-time editing, roles, and shared access control.</p>
                </div>
              </div>

              <div className="feature-card green">
                <span className="feature-icon lock-icon"></span>
                <div>
                  <h4 className="feature-title">Secure & Private</h4>
                  <p className="feature-description">Local-first storage ensures your code stays yours.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-card">
          <h2 className="mb-4">
            Ready to Start Coding?
          </h2>
          <p className="text-xl mb-8" style={{ color: 'rgba(239, 246, 255, 1)' }}>
            Join Code Spark today and experience a better way to code and collaborate.
          </p>
          <button className="btn btn-lg" style={{ backgroundColor: 'white', color: '#2563eb' }}>
            Get Started Free
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>© 2025 Code Spark. Built with React and Monaco Editor.</p>
        </div>
      </footer>
    </div>
  );
}


