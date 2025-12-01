import { useNavigate } from 'react-router-dom';
import '../styles/global.css';
 import { StarsCanvas } from './StarBackground';
import { useRef } from "react";
import 'animate.css'
import { Files,ShieldCheck,Waypoints } from 'lucide-react';
import Particles from './Particles';
import ProfileCard from './ProfileCard'

import LogoLoop from './LogoLoop';


import WordSphere from './WordSphere';



export default function LandingPage() {


const programming_languages = [
  { src: "/programming_languages/c.png", alt: "c#", href: "" },
  { src: "/programming_languages/c++.png", alt: "c++", href: "" },
  { src: "/programming_languages/css.png", alt: "css", href: "" },
  { src: "/programming_languages/go.png", alt: "go", href: "" },
  { src: "/programming_languages/html.png", alt: "html", href: "" },
  { src: "/programming_languages/java.png", alt: "java", href: "" },
  { src: "/programming_languages/js.png", alt: "js", href: "" },
  { src: "/programming_languages/json.png", alt: "json", href: "" },
{ src: "/programming_languages/mysql.png", alt: "mysql", href: "" },
{ src: "/programming_languages/next.png", alt: "next", href: "" },
  { src: "/programming_languages/perl.png", alt: "perl", href: "" },
  { src: "/programming_languages/php.png", alt: "php", href: "" },
  { src: "/programming_languages/postgresql.png", alt: "postgresql", href: "" },
  { src: "/programming_languages/python.png", alt: "python", href: "" },
  { src: "/programming_languages/react.png", alt: "react", href: "" },
  { src: "/programming_languages/redis.png", alt: "redis", href: "" },
  { src: "/programming_languages/ruby.png", alt: "ruby", href: "" },
  { src: "/programming_languages/swift.png", alt: "swift", href: "" },
{ src: "/programming_languages/ts.png", alt: "ts", href: "" },
{ src: "/programming_languages/xml.png", alt: "xml", href: "" },

];







  const videoRef = useRef(null);



  const navigate = useNavigate();

  const handleHome = () => {
    navigate('/');
  };
  
  const handleLogin = () => {
    navigate('/login');
  };





      
  return (
    <div className="screen landing-gradient">







<div 

style={{
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    //zIndex: -5,
    overflow: "hidden",
  }}

>






  
  <Particles
    particleColors={['#ffaf38ff', '#ffffff']}
    particleCount={200}
    particleSpread={10}
    speed={0.5}
    particleBaseSize={100}
    moveParticlesOnHover={true}
    alphaParticles={false}
    disableRotation={false}
  />
</div>






      {/* Star Background */}
      <StarsCanvas />

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
        
        <div className="container animate__fadeOutUp" >

                    <div 
                    // className="features-title animate__animated animate__flipOutY animate__infinite	 animate__slower	3s"
                    >
            Everything You Need to Code
          </div>



          
<div

>
 <section
  className="sphere-section"
  style={{
    position: "relative",
    width: "100%",
    height: "600px",
    overflow: "hidden",
  }}
>
  {/* 🔹 Background Video */}
  <video
    ref={videoRef}
    autoPlay
    muted
    loop
    playsInline
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover",
      zIndex: 0, // background
      opacity: 0.35, // optional: dim it for contrast
    }}
  >
    <source src="/plasma.webm" type="video/webm" />
  </video>

  {/* 🔹 WordSphere in front */}
  <div
    style={{
      position: "relative",
      zIndex: 2,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100%",
      color: "white",
    }}
  >
    <WordSphere />
  </div>
</section>

          <h2 className="features-title">
            Supported Language
          </h2>

 <div style={{ height: '200px', position: 'relative', overflow: 'hidden'}}>
      <LogoLoop
        logos={programming_languages}
        speed={(50)}
        direction="left"
        logoHeight={70}
        gap={20}
        pauseOnHover
        scaleOnHover
        fadeOut
        fadeOutColor="#000000ff"
        ariaLabel="programming_languages"
      />
    </div>




</div>
          <div className="grid grid-cols-3 gap-8">


<ProfileCard

  name="Code Editor"
  title="Integrated Debugging"
  handle="CodeSpark"
  status="Online"
  contactText="Contact Me"
  avatarUrl="/screen.jpg"
  showUserInfo={true}
  enableTilt={true}
  enableMobileTilt={false}
/>



<ProfileCard

  name="Get you Storage"
  title="SaaS"
  handle="CodeSpark"
  status="Online"
  
  avatarUrl="/storage.jpg"
  showUserInfo={true}
  enableTilt={true}
  enableMobileTilt={false}
/>


<ProfileCard

  name="Team Collaboration"
  title="access control"
  handle="CodeSpark"
  status="Online"
  contactText="Contact Me"
  avatarUrl="team.png"
  showUserInfo={true}
  enableTilt={true}
  enableMobileTilt={false}
/>





{/* el card EL 9dima */}

            {/* <div className="feature-card">
                    <div className="feature-icon-wrapper feature-icon-purple">
                      <Shield className="feature-icon" />
                    </div>
                    <h3 className="mb-2">Role-Based Permissions</h3>
                    <p className="text-gray-600">
                      Control access with owner, admin, editor, and viewer roles. Manage who can view, edit, or manage your files and groups.
                    </p>
            </div> */}



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
                <div>
                  <h4 className="feature-title"><Files className="feature-icon" color="#6c0000ff"/>Smart File Management</h4>
                  <p className="feature-description">Organize with nested folders and intuitive file trees.</p>
                </div>
              </div>

              <div className="feature-card blue">
                <div>
                  <h4 className="feature-title"><Waypoints className="feature-icon" color="#6c0000ff"/>Team Collaboration</h4>
                  <p className="feature-description">Real-time editing, roles, and shared access control.</p>
                </div>
              </div>

              <div className="feature-card green">
                <div>
                  <h4 className="feature-title"><ShieldCheck className="feature-icon" color="#6c0000ff"/>Secure & Private</h4>
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
          <button className="btn btn-lg" style={{ backgroundColor: 'white', color: '#2563eb',    position: 'relative',
  zIndex: '9999' }}>
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


