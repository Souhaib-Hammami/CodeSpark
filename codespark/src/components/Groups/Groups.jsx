              //  {/* <span>👤</span>
              //   <span className="GrpCapitalize">editor</span> */}

import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { jwtDecode } from 'jwt-decode'; 
import TypeIt from "typeit"
import axios from "axios";

const Groups = () => {
  const [groupsList, setGroupsList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupDesc, setGroupDesc] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      console.error("No token found in localStorage");
      return;
    }

fetch()

  }, [token]);


  const fetch =()=>{

    axios
      .get("http://localhost:3001/groups", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setGroupsList(res.data.ownedGroups || []);
      })
      .catch((err) => console.error("Error fetching groups:", err));


  }


  const Go2Editor = () => navigate("/editor");

 const handleCreateGroup = async (e) => {
  e.preventDefault();

  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      return;
    }

    // ✅ Decode the token to get the user ID
    const decoded = jwtDecode(token);
    const owner_id = decoded?.id || decoded?.user_id; // depends on your token payload

    console.log("Decoded token:", decoded);
    console.log("Owner ID from token:", owner_id);

    if (!owner_id) {
      console.error("No user ID found in token");
      return;
    }

    const now = new Date().toISOString();

    const newGroup = {
      owner_id,
      groupname: groupName,
      description: groupDesc,
      createdAt: now,
    };

    await axios.post("http://localhost:3001/groups", newGroup, {
      headers: { Authorization: `Bearer ${token}` },
    });

    // Handle success
    fetch(); // refresh group list or similar
    setShowModal(false);

  } catch (err) {
    console.error("Error creating group:", err);
  }
};
  
 if (!token) { 
  if (!window._typeit_started) {
      window._typeit_started = true;

    setTimeout(() => {
      new TypeIt("#element", {
        speed: 40,
        cursor: false,
      })
        .type("access main program")
        .pause(500)
        .break()
        .type("access: PERMISSION DENIED.")
        .break()
        .pause(500)
        .type("access main security")
        .pause(500)
        .break()
        .type("access: PERMISSION DENIED.")
        .break()
        .pause(500)
        .type("access security grid")
        .pause(500)
        .break()
        .type("access: PERMISSION DENIED........system lockdown initiated.")
        .go();
    }, 0); // Delay slightly to ensure DOM is ready
  }
    // Show the terminal screen
    return (
      <div style={{ fontFamily: "monospace", padding: "20px", color: "limegreen", background: "black", minHeight: "100vh" }}>
        <h3>CodeSPARK, System security</h3>
        <h4>Version x, </h4>
        <h4>Ready...</h4>
        <div id="element"></div>
        <p style={{ marginTop: "30px", color: "white" }}>
          Please <a href="/login" style={{ color: "#00ffff" }}>go to login page</a> to access your groups.
        </p>
      </div>
    );
  }
   


  //2025-10-09T14:45:12.000Z   
  // e9sem o ejbed
  // 0-10  ===2025-10-09
  // 11-16====14:45
const formatDate = (isoString) => {
  if (!isoString) return 'Unknown';

  const date = new Date(isoString);           // Convert ISO to Date object
  date.setHours(date.getHours() + 1);          // Add 1 hour

  const dateStr = date.toISOString().slice(0, 10);   // 📅 YYYY-MM-DD
  const timeStr = date.toISOString().slice(11, 16);  // ⏰ HH:MM

  return (
    <>
      📅 {dateStr} <br /> ⏰ {timeStr}
    </>
  );
};

const imageOptions = ['blue_grp.png', 'orange_grp.png', 'green_grp.png','purpul_grp.png'];


 

  return (
    
    <div className="GrpScreen">
      <div className="GrpContainer">
        <div className="GrpHeader">
          <div className="GrpHeaderLeft">
            <img
              onClick={Go2Editor}
              className="back2editor"
              src="back2editor.png"
              alt="Back to Editor"
            />
            <div>
              <h1 className="GrpTitle">Groups</h1>
              <p className="GrpSubtitle">Collaborate with your team</p>
            </div>
          </div>

          <div className="GrpCreateBtnWrapper">
            <button
              className="GrpCreateBtn"
              onClick={() => setShowModal(true)}
            >
              <span className="GrpIconSm GrpIconMargin">➕</span>
              Create Group
            </button>
          </div>
        </div>

               {groupsList.length === 0 ? (
          <p>No groups found or still loading...</p>
        ) : (
          <div className="GrpGrid">
            {groupsList.map((group) => {
              const randomImage =
                imageOptions[Math.floor(Math.random() * imageOptions.length)];

              return (
                <div key={group.id} className="GrpCard">
                  <div className="GrpCardHeader">
                    <img 
                    src={randomImage} 
                    alt="Group icon" 
                    width="50"   
                    style={{
                        border: "2px solid #ccc",
                        borderRadius: "70%",
                        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.3)"
                      }}/>
                    <div className="GrpCardHeaderText">
                      <h3 className="GrpCardTitle">{group.name}</h3>
                      <p className="GrpMutedText">{group.description}</p>
                    </div>
                    <div className="GrpDropdown">
                      <img
                        className="groupSetting"
                        src="GroupSetting.png"
                        alt="Group Setting"
                      />
                    </div>
                  </div>

                  <div className="GrpCardFooter">
                    <div className="GrpMembersInfo">
                      <span className="GrpIconSm GrpMutedText">👥</span>
                      <span className="GrpTextSm GrpMutedText">3 members</span>
                    </div>

                    <div>
                      <br />
                      {formatDate(group.createdAt)}
                      <br />
                    </div>

                    <span className="GrpBadge">
                      <span>⭐</span>
                      <span className="GrpCapitalize">owner</span>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {/* 🎯 Modal */}
        {showModal && (
          <div className="modalOverlay_NewGrp">
            <div className="container_NewGrp">
              <div className="header_NewGrp">
                <h2 className="title_NewGrp">Create New Group</h2>
                <p className="desc_NewGrp">
                  Create a new group to collaborate with your team.
                </p>
              </div>

              <form onSubmit={handleCreateGroup}>
                <div className="formGroup_NewGrp">
                  <label className="label_NewGrp" htmlFor="group-name">
                    Group Name
                  </label>
                  <input
                    id="group-name"
                    className="input_NewGrp"
                    placeholder="Enter group name"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                    required
                    maxLength={15}
                  />
                </div>

                <div className="formGroup_NewGrp">
                  <label className="label_NewGrp" htmlFor="group-description">
                    Description <span className="optional-tag">(Optional)</span>
                  </label>
                  <textarea
                    id="group-description"
                    className="textarea_NewGrp"
                    placeholder="Describe your group's purpose"
                    value={groupDesc}
                    onChange={(e) => setGroupDesc(e.target.value)}
                  ></textarea>
                </div>

                <div className="actions_NewGrp">
                  <button
                    type="button"
                    className="btn_NewGrp btnCancel_NewGrp"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn_NewGrp btnCreate_NewGrp"
                  >
                    Create Group
                  </button>
                </div>
              </form>
            </div>
          </div>
        
        )}
      </div>
    </div>
  );
};

export default Groups;
