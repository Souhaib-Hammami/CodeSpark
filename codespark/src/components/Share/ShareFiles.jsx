// Share.jsx
import { useState } from 'react';
import axios from "axios";
import { jwtDecode } from "jwt-decode";
const Share = ({ SelectedFileName, visibility, setVisibility, props }) => {

  
  const [selectedGroups, setSelectedGroups] = useState(new Set());
//console.log(props)
  const toggleGroup = (group_id) => {
    setSelectedGroups(prev => {
      const newSet = new Set(prev);
      if (newSet.has(group_id)) {
        newSet.delete(group_id);
      } else {
        newSet.add(group_id);
      }
      return newSet;
    });
  };



const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const token = localStorage.getItem("token");
    if (!token) return alert("No token found!");
    const decoded = jwtDecode(token);
    const userId = decoded.id;

    const selectedGroupsData = props.filter(item =>
      selectedGroups.has(item.group_id)
    );

    const groupIds = selectedGroupsData.map(item => item.group_id);
    const selectedGroupNames = selectedGroupsData.map(item => item.group_name);

    await axios.post(
      "http://localhost:3001/shareFiles",
      {
        userId,
        selectedFile: SelectedFileName,
        groupIds
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    console.log("Sharing with groups:", selectedGroupNames);
    alert(`File shared successfully with:\n${selectedGroupNames.join('\n')}`);

    setSelectedGroups(new Set());
    setVisibility(false);

  } catch (error) {
    console.error("Error sharing file:", error);
    alert("Error sharing file!");
  }
};


  const handleCancel = () => {
    setSelectedGroups(new Set());
    setVisibility(false);
  };

  const closeModalOnOverlay = (e) => {
    if (e.target.classList.contains('modalOverlay_sharefiles')) {
      handleCancel();
    }
  };

  return (
    visibility && (
      <div className="modalOverlay_sharefiles" onClick={closeModalOnOverlay}>
        <div className="container_sharefiles">
          <div className="header_sharefiles">
            <h2 className="title_sharefiles">
              Share Your: <span className="filename_sharefiles">/{SelectedFileName}</span>
            </h2>
            <p className="desc_sharefiles">
              Share your file to collaborate with your team.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="formGroup_sharefiles">
              <label className="label_sharefiles">
                Select Groups to Share With
              </label>

              <div className="groupList_sharefiles">
                {props.length > 0 ? (
                  props.map((item, index) => (
                    <div
                      key={item.id || index}
className={`groupItem_sharefiles ${
  selectedGroups.has(item.group_id) ? 'selected' : ''
}`}

                     onClick={() => toggleGroup(item.group_id)}

                    >
                      <span className="groupName_sharefiles">{item.group_name}</span>
                      <div className="checkIcon_sharefiles">
                        <svg viewBox="0 0 24 24" fill="none" stroke="#667eea" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="noGroups_sharefiles">No groups available to share.</div>
                )}
              </div>
            </div>

            <div className="actions_sharefiles">
              <button
                type="button"
                className="btn_sharefiles btnCancel_sharefiles"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="btn_sharefiles btnCreate_sharefiles"
                disabled={selectedGroups.size === 0}
              >
                {selectedGroups.size === 0 
                  ? 'Select at least one group' 
                  : `Share with ${selectedGroups.size} group${selectedGroups.size > 1 ? 's' : ''}`
                }
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default Share;