// Share.jsx
import { useState } from 'react';

const Share = ({ SelectedFileName, visibility, setVisibility, props }) => {

  
  const [selectedGroups, setSelectedGroups] = useState(new Set());

  const toggleGroup = (groupId) => {
    setSelectedGroups(prev => {
      const newSet = new Set(prev);
      if (newSet.has(groupId)) {
        newSet.delete(groupId);
      } else {
        newSet.add(groupId);
      }
      return newSet;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedGroupNames = props
      .filter((item, index) => selectedGroups.has(item.id || index))
      .map((item) => item.name);
    
    console.log('Sharing with groups:', selectedGroupNames);
    alert(`File shared successfully with:\n${selectedGroupNames.join('\n')}`);
    
    setSelectedGroups(new Set());
    setVisibility(false);
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
                        selectedGroups.has(item.id || index) ? 'selected' : ''
                      }`}
                      onClick={() => toggleGroup(item.id || index)}
                    >
                      <span className="groupName_sharefiles">{item.name}</span>
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