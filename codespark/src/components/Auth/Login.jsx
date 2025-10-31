import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitterSquare, faTumblrSquare, faGooglePlusSquare, faGithubSquare } from '@fortawesome/free-brands-svg-icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/global.css';
import { motion, useAnimation } from 'framer-motion';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
const Login = () => {
  const [username, setUsername] = useState('');
  const [password_hash, setPassword] = useState('');
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [isFlipped, setIsFlipped] = useState(false);
  const controls = useAnimation();


  const [Rusername, setRusername] = useState('');
  const [Remail, setRemail] = useState('');

  const [Rpassword_hash, setRpassword] = useState('');



const register = async(e) => {
  e.preventDefault();  // CRITICAL: Prevent form reload

  try {
    // Step 1: Register the user
    const response = await axios.post("http://localhost:3001/register", {
      username: Rusername,
      email: Remail,
      password_hash: Rpassword_hash
    });
    
    console.log("Registration response:", response);

    if (response.status === 200 || response.status === 201) {
      // Step 2: Auto-login immediately after successful registration
      const loginResponse = await axios.post('http://localhost:3001/login', {
        username: Rusername,
        password: Rpassword_hash
      });

      // Step 3: Store token and redirect to editor
      const { token } = loginResponse.data;
      localStorage.setItem('token', token);
      setToken(token);
      
      // Step 4: Clear form fields
      setRusername('');
      setRemail('');
      setRpassword('');
      
      // Step 5: Navigate to editor

      navigate('/editor');
    }
    
  } catch (error) {
    console.log(error);
    alert(error.response?.data?.message || "Registration failed. Please try again.");
  }
}





  const handleFlip = async () => {
    setIsFlipped((prev) => !prev);
    await controls.start({ rotateY: isFlipped ? 0 : 180 });
  };

const [visible, setVisible] = useState(false);
    const [position, setPosition] = useState('center');
    const footerContent = (
        <div>
            <Button label="that's OK!" icon="pi pi-check" onClick={() => setVisible(false)} autoFocus />
        </div>
    );

 const show = () => {
        setPosition('bottom-left');
        setVisible(true);

    };





  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:3001/login', { username,  password: password_hash })
      .then((response) => {
        const { token } = response.data;
        localStorage.setItem('token', token);
        setToken(token);
        if (response.status === 200) navigate('/editor');
      })
      .catch((error) =>{
                console.error('Lllllogin failed:', error)
      show() 
      }

    );
    
  };

  const handleSocialLogin = (platform) => {
    console.log(`Social login with ${platform}`);
    alert(`Social login with ${platform} (functionality not implemented)`);
  };

  const navigate = useNavigate();
  const handleHome = () => navigate('/');







  return (
    <div className="Clogin">


{/* ///the stupid dialog for errors */}

 <div className="card">

            <Dialog 
            header="⚠️⚠️⚠️" 
            visible={visible} position={position} style={{ width: '25vw' ,padding:'0px',fontSize:'small' }} onHide={() => {if (!visible) return; setVisible(false); }} footer={footerContent} draggable={false} resizable={true}>
                <p className="m-0">
                    Please check your Username and your Password
                </p>
            </Dialog>
        </div>



      {/* ----- TITLE BAR ----- */}
      <div className="title-bar">
        <div className="title-bar-left">
          <div className="vscode-icon"></div>
          <span className="title-text">CodeSpark_login.js</span>
        </div>
        <div className="window-controls">
          <button className="control-btn">−</button>
          <button className="control-btn">□</button>
          <button className="control-btn close-btn">×</button>
        </div>
      </div>

      {/* ----- MAIN LAYOUT ----- */}
      <div className="lcontainer">
        {/* Sidebar */}
        <div className="login-sidebar">
          <button className="sidebar-icon">📁</button>
          <button className="sidebar-icon">🔍</button>
          <button className="sidebar-icon active">⚙️</button>
          <button className="sidebar-icon">🐛</button>
        </div>

        {/* Explorer */}
        <div className="file-explorer">
          <div className="explorer-header">Explorer</div>
          <ul className="file-tree">
            <li className="file-item">
              <span className="file-icon">📁</span>
              <span>src</span>
            </li>
            <li className="file-item" style={{ paddingLeft: '20px' }}>
              <span className="file-icon">📄</span>
              <span>Home.js</span>
            </li>
            <li className="file-item active" style={{ paddingLeft: '20px' }}>
              <span className="file-icon">🔐</span>
              <span>login.js</span>
            </li>
            <li className="file-item" style={{ paddingLeft: '20px' }}>
              <span className="file-icon">⚛️</span>
              <span>Contact.jsx</span>
            </li>
            <li className="file-item">
              <span className="file-icon">📄</span>
              <span>package.json</span>
            </li>
            <li className="file-item">
              <span className="file-icon">📄</span>
              <span>README.md</span>
            </li>
          </ul>
        </div>

        {/* Editor */}
        <div className="main-editor">
          <div className="tab-bar">
            <div className="tab">
              <div className="tab-icon"></div>
              <span>login.js</span>
            </div>
          </div>

          <div
            className="editor-content"
            style={{
              backgroundImage: `url('/fibre.jpg')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '100%',
            }}
          >
            {/* Social buttons (left side) */}
            <div className="socialWrapper">
              <button
                style={{ marginBottom: '5px' }}
                type="button"
                className="social-btn"
                onClick={() => handleSocialLogin('Twitter')}
              >
                <FontAwesomeIcon icon={faTwitterSquare} size="4x" className="social-icon twitter" />
              </button>
              <button
                style={{ marginBottom: '5px' }}
                type="button"
                className="social-btn"
                onClick={() => handleSocialLogin('Tumblr')}
              >
                <FontAwesomeIcon icon={faTumblrSquare} size="4x" className="social-icon tumblr" />
              </button>
              <button
                style={{ marginBottom: '5px' }}
                type="button"
                className="social-btn"
                onClick={() => handleSocialLogin('Google+')}
              >
                <FontAwesomeIcon icon={faGooglePlusSquare} size="4x" className="social-icon google" />
              </button>
              <button
                style={{ marginBottom: '5px' }}
                type="button"
                className="social-btn"
                onClick={() => handleSocialLogin('GitHub')}
              >
                <FontAwesomeIcon icon={faGithubSquare} size="4x" className="social-icon github" />
              </button>
            </div>

            {/* ---------- FLIP CARD WRAPPER ---------- */}
            <div
              style={{
                perspective: 1200,
                minWidth: 400,
                minHeight: 500,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
              }}
            >
              <motion.div
                style={{
                  width: '100%',
                  minHeight: 500,
                  position: 'relative',
                  transformStyle: 'preserve-3d',
                }}
                animate={controls}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
              >
                {/* ==== FRONT – LOGIN ==== */}
                <motion.div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backfaceVisibility: 'hidden',
                    background: 'rgba(0, 0, 0, 0.7)',
                    padding: 24,
                    borderRadius: 12,
                    color: '#fff',
                    boxSizing: 'border-box',
                    minWidth: 400,
                  }}
                //   className="login-container"
                >
                  <img
                    style={{ cursor: 'default', display: 'inline-block' }}
                    src="back-home.png"
                    alt="home"
                    width="60"
                    height="60"
                    onClick={handleHome}
                  />
                  <div className="code-comment">// Authentication Module</div>
                  <div className="code-line">function authenticateUser() {'{'}</div>
                  <div className="login-header">
                    <h1 className="login-title">Log In</h1>
                    <p className="login-subtitle">Enter your credentials to continue</p>
                  </div>
                  <form className="form-login-input" onSubmit={handleLogin}>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-input"
                        placeholder="Enter your username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        className="form-input"
                        placeholder="Enter your password"
                        value={password_hash}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <button type="submit" className="login-button">Log In</button>
                  </form>
                  <div className="login-footer">
                    <a href="#">Forgot password?</a> |{' '}
                    <a href="#" onClick={handleFlip}>Create account</a>
                  </div>
                  <div className="code-line" style={{ marginTop: '20px' }}></div>
                </motion.div>

                {/* ==== BACK – SIGN-UP ==== */}
                <motion.div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backfaceVisibility: 'hidden',
                    background: 'rgba(0, 0, 0, 0.7)',
                    padding: 24,
                    borderRadius: 12,
                    color: '#fff',
                    transform: 'rotateY(180deg)',
                    boxSizing: 'border-box',
                    minWidth: 400,
                    minHeight: 500,
                  }}
                  className="login-container"
                >
                  <img
                    style={{ cursor: 'default', display: 'inline-block' }}
                    src="back-home.png"
                    alt="home"
                    width="60"
                    height="60"
                    onClick={handleHome}
                  />
                  <div className="code-comment">// Sign Up Module</div>
                  <div className="code-line">function createUser() {'{'}</div>
                  <div className="login-header">
                    <h1 className="login-title">Sign Up</h1>
                    <p className="login-subtitle">Create a new account</p>
                  </div>
                  <form
                  onSubmit={register}
                  className="form-login-input"
                  >
                    <div className="form-group">
                      <input 
                      type="text" 
                                              value={Rusername}

                      className="form-input" 
                      placeholder="Enter your username" 
                      onChange={(e) => setRusername(e.target.value)}

                      
                      required />
                    </div>
                    <div className="form-group">
                      <input 
                      type="email"
                       className="form-input" 
                       placeholder="Enter your email"
                      onChange={(e) => setRemail(e.target.value)}
                        value={Remail}

                       required />
                    </div>
                    <div className="form-group">
                      <input 
                      type="password" 
                      className="form-input" 
                      placeholder="Enter your password" 
                       onChange={(e) => setRpassword(e.target.value)}
                        value={Rpassword_hash}

                      required />
                    </div>
                    <button
                     type="submit" 
                     className="login-button"
                     
                     
                     >Sign Up</button>
                  </form>
                  <div className="login-footer">
                    <a href="#" onClick={handleFlip}>Back to Login</a>
                  </div>
                  <div className="code-line" style={{ marginTop: '20px' }}></div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* ----- STATUS BAR ----- */}
      <div className="status-bar">
        <div className="status-left">
          <span>Git: main</span>
          <span>UTF-8</span>
          <span>JavaScript</span>
        </div>
        <div className="status-right">
          <span>Ln 15, Col 32</span>
          <span>Spaces: 2</span>
        </div>
      </div>
    </div>
  );
};

export default Login;