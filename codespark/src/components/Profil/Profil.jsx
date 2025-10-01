import    {useState} from 'react'
import { useNavigate } from 'react-router-dom';
const Profil =()=>{



const navigate=useNavigate()

  const Go2Editor =()=>{
navigate ('/editor')
  }

const[Tab,setTab]=useState('Profil')


  const renderTabProfil = () => {
    switch (Tab) {
      case 'Profil':
        return <div>

      <div className="profilEDR-tab-content">
        <div className="cardEDR">
          <div className="cardEDR-header">
            <h2 className="cardEDR-title">Profile Information</h2>
            <p className="cardEDR-desc">Update your public profile information</p>
          </div>

          <div className="cardEDR-body">
            <div className="profilEDR-avatar-row">
              <div className="profilEDR-avatar-circle">
                <span className="profilEDR-avatar-letter">
                    {/* {user.username.charAt(0).toUpperCase()} */}
                    </span>
              </div>
              <div>
                <h3 className="profilEDR-username">
                    {/* {user.username} */}
                    </h3>
                <p className="profilEDR-member-date">Member since 
                    {/* {new Date(user.createdAt).toLocaleDateString()} */}
                    </p>
              </div>
            </div>

            <div className="profilEDR-form-grid">
              <div className="profilEDR-field">
                <label htmlFor="username" className="labelEDR">Username</label>
                <input id="username" className="inputEDR"
                //  value={profileForm.username}
                  />
              </div>

              <div className="profilEDR-field">
                <label htmlFor="email" className="labelEDR">Email</label>
                <input id="email" className="inputEDR" type="email"
                //  value={profileForm.email}
                  />
              </div>

              <div className="profilEDR-field">
                <label htmlFor="bio" className="labelEDR">Bio</label>
                <textarea id="bio" className="textareaEDR" rows="3" placeholder="Tell us about yourself...">
                    {/* {profileForm.bio} */}
                    </textarea>
              </div>
            </div>

            <button className="btnEDR-primary" 
            // onclick={handleSaveProfile}
            >Save Changes</button>
          </div>
        </div>
      </div>



        </div>;
      case 'Editor':
        return <div>     
            
            
             <div className="profilEDR-tab-content">
        <div className="cardEDR">
          <div className="cardEDR-header">
            <h2 className="cardEDR-title">Editor Preferences</h2>
            <p className="cardEDR-desc">Customize your coding experience</p>
          </div>
           
          <div className="cardEDR-body">
            <div className="profilEDR-field">
              <label className="labelEDR">Theme</label>
              <div className="profilEDR-btn-row">
                <button className="btnEDR-outline">Dark</button>
                <button className="btnEDR-outline">Light</button>
              </div>
            </div>

            <div className="profilEDR-grid-2">
              <div className="profilEDR-field">
                <label className="labelEDR" htmlFor="font-size">Font Size</label>
                <input id="font-size" type="number" className="inputEDR" min="10" max="24" />
              </div>
              <div className="profilEDR-field">
                <label className="labelEDR" htmlFor="tab-size">Tab Size</label>
                <input id="tab-size" type="number" className="inputEDR" min="1" max="8" />
              </div>
            </div>

            <div className="profilEDR-switch-row">
              <div>
                <label className="labelEDR">Auto Save</label>
                <p className="profilEDR-hint">Automatically save files while you type</p>
              </div>
              <label className="switchEDR">
                <input type="checkbox" />
                <span className="switchEDR-slider"></span>
              </label>
            </div>
          </div>
        </div>
      </div></div>;
      case 'Account':
        return <div><div className="profilEDR-tab-content"
        >
        <div className="profilEDR-card-group">
          <div className="cardEDR">
            <div className="cardEDR-header">
              <h2 className="cardEDR-title">Account Security</h2>
              <p className="cardEDR-desc">Manage your account security settings</p>
            </div>

            <div className="cardEDR-body">
              <div className="profilEDR-field">
                <label htmlFor="current-password" className="labelEDR">Current Password</label>
                <input id="current-password" type="password" className="inputEDR" />
              </div>

              <div className="profilEDR-field">
                <label htmlFor="new-password" className="labelEDR">New Password</label>
                <input id="new-password" type="password" className="inputEDR" />
              </div>

              <div className="profilEDR-field">
                <label htmlFor="confirm-password" className="labelEDR">Confirm New Password</label>
                <input id="confirm-password" type="password" className="inputEDR" />
              </div>

              <button className="btnEDR-outline">Update Password</button>
            </div>
          </div>

          <div className="cardEDR">
            <div className="cardEDR-header">
              <h2 className="cardEDR-title">Data Management</h2>
            </div>
            <div className="cardEDR-body">
              <div className="profilEDR-box profilEDR-box-danger">
                <div>
                  <h4 className="delete-text-profil">Delete Account</h4>
                  <p className="profilEDR-box-desc">Permanently delete your account and all data</p>
                </div>
                <button className="btnEDR-danger">
                  <i className="iconEDR-trash"></i>Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>;
      default:
        return null;
    }
  };






return (
<div className="profilEDR-root">
  <div className="profilEDR-container">
    <div className="profilEDR-header">
      <img 
       onClick={Go2Editor}
       className="back2editor"
      src='back2editor.png' alt='Back to Editor'/>
     
      <div>
        <h1 className="profilEDR-title">Profile Settings</h1>
        <p className="profilEDR-subtitle">Manage your account and preferences</p>
      </div>
    </div>

    <div className="profilEDR-tabs">
      <div className="profilEDR-tabs-list">
    
            <button 
            className={`profilEDR-tab ${Tab === 'Profil' ? 'profilEDR-tab-active' : ''}`}
            // onClick={setTab('Profil')}
            onClick={() => setTab('Profil')}

            >
            <i className="iconEDR-user"></i><span>Profile</span>
            </button>
              
            <button 
            // className="profilEDR-tab "
            className={`profilEDR-tab ${Tab === 'Editor' ? 'profilEDR-tab-active' : ''}`}
            onClick={() => setTab('Editor')}
            >
            <i className="iconEDR-settings"></i><span>Editor</span>
            </button>

            <button 
            className={`profilEDR-tab ${Tab === 'Account' ? 'profilEDR-tab-active' : ''}`}
            onClick={() => setTab('Account')}
            >
            <i className="iconEDR-shield"></i><span>Account</span>
            </button>
       
      </div>

  
{renderTabProfil ()}


      
    </div>
  </div>
</div>

)
}
export  default Profil