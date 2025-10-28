//  {/* <span>👤</span>
//   <span className="GrpCapitalize">editor</span> */}

import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import TypeIt from "typeit";
import axios from "axios";
import NavBar from "../Navbar/NavBar";

const Groups = () => {
  const [groupsList, setGroupsList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupDesc, setGroupDesc] = useState("");
  const [groupsSearch, setGroupsSearch] = useState([]);
  const [joinedGrp, setjoinedGrp] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [input, setinput] = useState("");

  
  
  const deleteGrp = async (xx) => {
       if (!token) {
      console.error("No token found");
      return;
    }
 
    try {
            const decoded = jwtDecode(token);
      const userId = decoded.id;

       await axios.delete(`http://localhost:3001/deleteGrp`, {
      data: {  
        ownerId: userId,
        groupId: xx,
      },
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error) {
      
    }
      fetch();
           getjoinedGrp();

  };





  const leaveGrp = async (x) => {


    try {
      const decoded = jwtDecode(token);
      const userId = decoded.id;

       await axios.delete(`http://localhost:3001/unjoinGrp`, {
      data: {  
        userId: userId,
        groupId: x,
      },
        headers: { Authorization: `Bearer ${token}` },
      });

      

      // console.log(" joined groups are:", res.data.joined);

    } catch (err) {
      console.error("Error fetching joined groups:", err);
    }
      getjoinedGrp();
      groupsSearch.length=0
  };




  const fetch = () => {
    axios
      .get("http://localhost:3001/groups", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setGroupsList(res.data.ownedGroups || []);
      })
      .catch((err) => console.error("Error fetching groups:", err));
  };

  const handleClick = async (groupId) => {
    if (!token) return console.error("No token found");

    const decoded = jwtDecode(token);
    const userId = decoded.id;

    const selectedGroup =
      groupsSearch.find((g) => g.id === groupId) ||
      groupsList.find((g) => g.id === groupId);

    setGroupsSearch((prev) =>
      prev.map((group) => {
        if (group.id === groupId && group.joinState !== "joined") {
          setTimeout(() => {
            setGroupsSearch((innerPrev) =>
              innerPrev.map((g) =>
                g.id === groupId ? { ...g, joinState: "joined" } : g
              )
            );
          }, 700);

          return { ...group, joinState: "waiting" };
        }
        return group;
      })
    );

    // console.log("teklikit")
    try {
      const joinG = {
        groupId: selectedGroup.id,
        groupN: selectedGroup.name,
        userId: userId,
      };
      await axios.post("http://localhost:3001/joinGrp", joinG, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error) {
      console.error("Error joining group:", error);
    }

    getjoinedGrp();
  };

  const getjoinedGrp = async () => {
    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const userId = decoded.id;

      const res = await axios.get(`http://localhost:3001/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Update state with the joined groups
      setjoinedGrp(res.data.joined || []);

      // console.log(" joined groups are:", res.data.joined);
    } catch (err) {
      console.error("Error fetching joined groups:", err);
    }
  };

  useEffect(() => {
    fetch();
    if (!token) {
      console.error("No token found in localStorage");
      return;
    }

    getjoinedGrp();
  }, [token]);

  const handerinput = async (e) => {
    const query = e.target.value;
    setinput(query);

    if (!query.trim()) {
      setGroupsSearch([]); // fasa5 les results if input fere8
      return;
    }

    try {
      const result = await axios.get(`http://localhost:3001/searchGroup`, {
        params: { query },
        headers: { Authorization: `Bearer ${token}` },
      });
      setGroupsSearch(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateGroup = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      const decoded = jwtDecode(token);
      const owner_id = decoded?.id || decoded?.user_id; // depends on your token payload

      // console.log("Decoded token:", decoded);
      // console.log("Owner ID from token:", owner_id);

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

      const res = await axios.get("http://localhost:3001/groups", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setGroupsList(res.data.ownedGroups || []);

      setShowModal(false);
      setGroupName("");
      setGroupDesc("");
    } catch (err) {
      console.error("Error creating group:", err);
    }
    getjoinedGrp()
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
      <div
        style={{
          fontFamily: "monospace",
          padding: "20px",
          color: "limegreen",
          background: "black",
          minHeight: "100vh",
        }}
      >
        <h3>CodeSPARK, System security</h3>
        <h4>Version x, </h4>
        <h4>Ready...</h4>
        <div id="element"></div>
        <p style={{ marginTop: "30px", color: "white" }}>
          Please{" "}
          <a href="/login" style={{ color: "#00ffff" }}>
            go to login page
          </a>{" "}
          to access your groups.
        </p>
      </div>
    );
  }

  //2025-10-09T14:45:12.000Z
  // e9sem o ejbed
  // 0-10  ===2025-10-09
  // 11-16====14:45
  const formatDate = (isoString) => {
    if (!isoString) return "Unknown";

    const date = new Date(isoString); // Convert ISO to Date object
    date.setHours(date.getHours() + 1); // Add 1 hour

    const dateStr = date.toISOString().slice(0, 10); // 📅 YYYY-MM-DD
    const timeStr = date.toISOString().slice(11, 16); // ⏰ HH:MM

    return (
      <>
        📅 {dateStr} <br /> ⏰ {timeStr}
      </>
    );
  };

  const imageOptions = [
    "blue_grp.png",
    "orange_grp.png",
    "green_grp.png",
    "purpul_grp.png",
  ];

  return (
    <div className="GrpScreen">
      <div className="GrpContainer">
        <NavBar />
      </div>

      <div className="GrpContainerg">
        <div className="GrpHeader">
          <div className="GrpHeaderLeft">
            <div>
              <h1 className="GrpTitle">Groups Management</h1>
              <p className="GrpSubtitle">Collaborate with your team</p>
            </div>
          </div>
          <input
            className="searchGrp"
            placeholder="Search For other Groups..."
            type="text"
            value={input}
            onChange={handerinput}
            onFocus={(e) => {
              e.target.style.borderColor = "#4A90E2";
              e.target.style.boxShadow = "0 0 0 3px rgba(74, 144, 226, 0.3)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "#ccc";
              e.target.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.05)";
            }}
          />
          <div className="GrpCreateBtnWrapper">
            <button className="GrpCreateBtn" onClick={() => setShowModal(true)}>
              <span className="GrpIconSm GrpIconMargin">➕</span>
              Create Group
            </button>
          </div>
        </div>
        {groupsSearch.length > 0 && (
          <div className="groups-list">
            <div className="partsgrp">Your search results</div>
            {groupsSearch.map((group) => {
              const randomImage =
                imageOptions[Math.floor(Math.random() * imageOptions.length)];
              const currentState = group.joinState || "join";
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
                        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.3)",
                      }}
                    />
                    <div className="GrpCardHeaderText">
                      <h3 className="GrpCardTitle">{group.name}</h3>
                      <p className="GrpMutedText">{group.description}</p>
                    </div>

                    <button
                      id="join-btnActivation"
                      onClick={() => handleClick(group.id)}
                      className={`join-btn join-btn--${currentState}`}
                    >
                      <span className="join-btn__icon"></span>
                      <span className="join-btn__text">
                        {currentState === "joined"
                          ? "joined"
                          : currentState === "waiting"
                          ? "Please wait..."
                          : "Join"}
                      </span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        <div className="partsgrp">Your Groups</div>

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
                        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.3)",
                      }}
                    />

                    <div className="GrpCardHeaderText">
                      <h3 className="GrpCardTitle">{group.name}</h3>
                      <p className="GrpMutedText">{group.description}</p>
                    </div>
                    <div className="GrpDropdown">
                      <img
                        className="groupSetting trash_setting"
                        src="shredder.png"
                        alt="delete this group"
                        onClick={()=>deleteGrp(group.id)}
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

        {/* {groupsList.length === 0 ? (
          <p>You are not in any groups yet...</p>
        ) : ( */}

        <div className="partsgrp"> You're in These Groups </div>

        {joinedGrp.length === 0 ? (
          <p>your are not in any group...</p>
        ) : (
          <div className="GrpGrid">
            {joinedGrp.map((group) => {
              const randomImage =
                imageOptions[Math.floor(Math.random() * imageOptions.length)];
              console.log("les groupet :", group);
              return (
                <div 
                key={group.group_id} 
                className="GrpCard"
                >
                  <div className="GrpCardHeader">
                    <img
                      src={randomImage}
                      alt="Group icon"
                      width="50"
                      style={{
                        border: "2px solid #ccc",
                        borderRadius: "70%",
                        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.3)",
                      }}
                    />

                    <div className="GrpCardHeaderText">
                      <h3 className="GrpCardTitle">{group.group_name}</h3>
                      {/* magaditech el description fel groups-member table */}

                      {/* saye gaditha */}
                      <p className="GrpMutedText">{group.group_description}</p>
                    </div>
                    <div className="GrpDropdown">
                      <img
                        className="groupSetting"
                        src="GroupSetting.png"
                        alt="leave this group"
                        onClick={() => leaveGrp(group.group_id)} 


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
                      {/* mchet s7i7a walh mana3ref "lleh" */}
                      {formatDate(group.createdAt)}
                      <br />
                    </div>

                    <span className="GrpBadge">
                      <span>⭐</span>
                      <span className="GrpCapitalize">{group.role}</span>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* )} */}

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
                  <button type="submit" className="btn_NewGrp btnCreate_NewGrp">
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
