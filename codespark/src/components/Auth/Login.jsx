import  {  useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitterSquare, faTumblrSquare, faGooglePlusSquare, faGithubSquare } from '@fortawesome/free-brands-svg-icons';
import { useNavigate } from 'react-router-dom';

import '../styles/global.css'

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (event) => {
        event.preventDefault();
        
        // Simple validation (replace with actual authentication)
        if (username && password) {
            alert(`Welcome, ${username}! Login successful.`);
            // Here you would typically send the credentials to your server
            console.log('Login attempt:', { username, password: '***' });
        } else {
            alert('Please fill in all fields.');
        }
    };

    const handleSocialLogin = (platform) => {
        console.log(`Social login with ${platform}`);
        // Here you would implement actual social login logic
        alert(`Social login with ${platform} (functionality not implemented)`);
    };
const navigate=useNavigate()
const handleHome =()=>{
navigate('/')
}

    return (
        <div className='Clogin'>
            <div className="title-bar">
                <div className="title-bar-left">
                    <div className="vscode-icon"></div>
                    <span className="title-text">CodeSpark_login.js </span>
                </div>
                <div className="window-controls">
                    <button className="control-btn">−</button>
                    <button className="control-btn">□</button>
                    <button className="control-btn close-btn">×</button>
                </div>
            </div>

            <div className="lcontainer">
                <div className="login-sidebar">
                    <button className="sidebar-icon">📁</button>
                    <button className="sidebar-icon">🔍</button>
                    <button className="sidebar-icon active">⚙️</button>
                    <button className="sidebar-icon">🐛</button>
                </div>

                <div className="file-explorer">
                    <div className="explorer-header">Explorer</div>
                    <ul className="file-tree">
                        <li className="file-item">
                            <span className="file-icon">📁</span>
                            <span>src</span>
                        </li>
                        <li className="file-item" style={{paddingLeft: '20px'}}>
                            <span className="file-icon">📄</span>
                            <span>Home.js</span>
                        </li>
                        <li className="file-item active" style={{paddingLeft: '20px'}}>
                            <span className="file-icon">🔐</span>
                            <span>login.js</span>
                        </li>
                        <li className="file-item" style={{paddingLeft: '20px'}}>
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
                        }}>

                          <div className="socialWrapper">
                                               
                                    <button style={{marginBottom: '5px'}}
                                        type="button"
                                        className="social-btn"
                                        onClick={() => handleSocialLogin('Twitter')}
                                    >
                                        <FontAwesomeIcon 
                                            icon={faTwitterSquare} 
                                            size="4x" 
                                            className="social-icon twitter"
                                        />
                                    </button>
                                    <button 
                                    style={{marginBottom: '5px'}}
                                        type="button"
                                        className="social-btn"
                                        onClick={() => handleSocialLogin('Tumblr')}
                                    >
                                        <FontAwesomeIcon 
                                            icon={faTumblrSquare} 
                                            size="4x" 
                                            className="social-icon tumblr"
                                        />
                                    </button>
                                    <button 
                                        style={{marginBottom: '5px'}}
                                        type="button"
                                        className="social-btn"
                                        onClick={() => handleSocialLogin('Google+')}
                                    >
                                        <FontAwesomeIcon 
                                            icon={faGooglePlusSquare} 
                                            size="4x" 
                                            className="social-icon google"
                                        />
                                    </button>
                                    <button
                                        style={{marginBottom: '5px'}} 
                                        type="button"
                                        className="social-btn"
                                        onClick={() => handleSocialLogin('GitHub')}
                                    >
                                        <FontAwesomeIcon 
                                            icon={faGithubSquare} 
                                            size="4x" 
                                            className="social-icon github"
                                        />
                                    </button>
                                </div>
                            <div className="login-container">
                                <img 
                                style={{ cursor: 'default', display: 'inline-block' }} 
                                src="back-home.png" 
                                alt="home" 
                                width="60" 
                                height="60"
                                onClick={handleHome}
                                ></img>

                                <div className="code-comment">// Authentication Module</div>
                                <div className="code-line">function authenticateUser() {`{`}</div>
                            
                                        <div className="login-header">
                                            <h1 className="login-title">Sign In</h1>
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
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required 
                                    />
                                </div>

                                <button type="submit" className="login-button">Sign In</button>
                            </form>

                            <div className="login-footer">
                                <a href="#">Forgot password?</a> | <a href="#">Create account</a>
                            </div>
                        

                            <div className="code-line" style={{marginTop: '20px'}}></div>
                        </div>

                         <div>
                            
                         </div>



                    </div>
                </div>
            </div>

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