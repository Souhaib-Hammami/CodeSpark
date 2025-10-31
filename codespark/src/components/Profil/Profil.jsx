import NavBar from '../Navbar/NavBar'; 
import { useState, useEffect } from "react";
import GetUserInfos from './Profile/GetUserInfos';
import UpdateUserInfos from '../Profil/Profile/UpdateUserInfo.jsx';
import { jwtDecode } from 'jwt-decode'; 

const Profil = () => {
  const [userName, setusername] = useState("");
  const [emAil, setemail] = useState("");
  const [bIo, setbio] = useState("");
  const [pw, setpw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [currentPw, setCurrentPw] = useState("");
  const [Tab, setTab] = useState('Profil');

  const { userInfo, loading, error } = GetUserInfos(); 

  useEffect(() => {
    if (userInfo) {
      setusername(userInfo.username || "");
      setemail(userInfo.email || "");
      setbio(userInfo.bio || "");
    }
  }, [userInfo]);

  // --- Save general profile changes ---
  const saveProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const decoded = jwtDecode(token);
      const userId = decoded.id;

      await UpdateUserInfos({
        userId,
        username: userName,
        email: emAil,
        bio: bIo,
      });

      alert("✅ Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("❌ Failed to update profile.");
    }
  };
const updatePassword = async () => {
  if (!currentPw || !pw || !confirmPw) {
    alert("⚠️ Please fill in all password fields.");
    return;
  }

  if (pw !== confirmPw) {
    alert("⚠️ New password and confirmation do not match.");
    return;
  }

  try {
    const token = localStorage.getItem("token");
    const decoded = jwtDecode(token);
    const userId = decoded.id;

    const res = await UpdateUserInfos({
      userId,
      password_hash: pw,
      current_password: currentPw,
    });

    // Since UpdateUserInfos returns response.data, check the data directly
    if (res.success) {  // ← Check res.success instead of res.status
      alert("✅ Password updated successfully!");
      setCurrentPw("");
      setpw("");
      setConfirmPw("");
      return;
    }

    alert("❌ Unexpected server response.");
  } catch (error) {
    console.error("Error updating password:", error);
    
    if (error.response?.status === 401) {
      alert("❌ Current password is incorrect.");
    } else if (error.response?.status === 400) {
      alert("⚠️ Current password is required to change your password.");
    } else {
      alert("❌ Failed to update password.");
    }
  }
};









  // --- Render tabs ---
  const renderTabProfil = () => {
    switch (Tab) {
      case 'Profil':
        if (loading) return <div>Loading...</div>;
        if (error) return <div>Error: {error}</div>;
        if (!userInfo) return <div>No user data</div>;

        return (
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
                      {userInfo.username?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h3 className="profilEDR-username">{userInfo.username}</h3>
                    <p className="profilEDR-member-date">
                      Member since: 🍼{new Date(userInfo.createdAt).toDateString()}
                    </p>
                  </div>
                </div>

                <div className="profilEDR-form-grid">
                  <div className="profilEDR-field">
                    <label htmlFor="username" className="labelEDR">Username</label>
                    <input 
                      id="username" 
                      className="inputEDR" 
                      value={userName} 
                      onChange={(e) => setusername(e.target.value)}
                    />
                  </div>

                  <div className="profilEDR-field">
                    <label htmlFor="email" className="labelEDR">Email</label>
                    <input 
                      id="email" 
                      className="inputEDR"
                      type="email" 
                      value={emAil} 
                      onChange={(e) => setemail(e.target.value)}
                    />
                  </div>

                  <div className="profilEDR-field bio-field">
                    <label htmlFor="bio" className="labelEDR">Bio</label>
                    <textarea 
                      id="bio" 
                      className="textareaEDR" 
                      rows="3"
                      placeholder="Tell us about yourself..."
                      value={bIo}
                      onChange={(e) => setbio(e.target.value)}
                    ></textarea>
                  </div>
                </div>

                <button 
                  className="btnEDR-primary bio-field"
                  onClick={saveProfile}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        );

      case 'Editor':
        return (
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
          </div>
        );

      case 'Account':
        return (
          <div className="profilEDR-tab-content">
            <div className="profilEDR-card-group">
              <div className="cardEDR">
                <div className="cardEDR-header">
                  <h2 className="cardEDR-title">Account Security</h2>
                  <p className="cardEDR-desc">Manage your account security settings</p>
                </div>
                <div className="cardEDR-body">
                  <div className="profilEDR-field">
                    <label htmlFor="current-password" className="labelEDR">Current Password</label>
                    <input 
                      id="current-password"
                      type="password" 
                      className="inputEDR" 
                      value={currentPw}
                      onChange={(e) => setCurrentPw(e.target.value)}
                    />
                  </div>

                  <div className="profilEDR-field">
                    <label htmlFor="new-password" className="labelEDR">New Password</label>
                    <input 
                      id="new-password" 
                      type="password" 
                      className="inputEDR"
                      value={pw}
                      onChange={(e) => setpw(e.target.value)} 
                    />
                  </div>

                  <div className="profilEDR-field">
                    <label htmlFor="confirm-password" className="labelEDR">Confirm New Password</label>
                    <input 
                      id="confirm-password" 
                      type="password" 
                      className="inputEDR" 
                      value={confirmPw}
                      onChange={(e) => setConfirmPw(e.target.value)} 
                    />
                  </div>

                  <button className="btnEDR-outline" onClick={updatePassword}>
                    Update Password
                  </button>
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
                      <i className="iconEDR-trash"></i> Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <NavBar />
      <div className="profilEDR-root"> 
        <div className="profilEDR-container">
          <div className="profilEDR-header">
            <div>
              <h1 className="profilEDR-title">Profile Settings</h1>
              <p className="profilEDR-subtitle">Manage your account and preferences</p>
            </div>
          </div>

          <div className="profilEDR-tabs">
            <div className="profilEDR-tabs-list">
              <button
                className={`profilEDR-tab ${Tab === 'Profil' ? 'profilEDR-tab-active' : ''}`}
                onClick={() => setTab('Profil')}
              >
                <i className="iconEDR-user"></i>
                <span>Profile</span>
              </button>

              <button
                className={`profilEDR-tab ${Tab === 'Editor' ? 'profilEDR-tab-active' : ''}`}
                onClick={() => setTab('Editor')}
              >
                <i className="iconEDR-settings"></i>
                <span>Editor</span>
              </button>

              <button
                className={`profilEDR-tab ${Tab === 'Account' ? 'profilEDR-tab-active' : ''}`}
                onClick={() => setTab('Account')}
              >
                <i className="iconEDR-shield"></i>
                <span>Account</span>
              </button>
            </div>

            {renderTabProfil()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profil;
