import { useNavigate } from "react-router-dom"


const Groups =()=>{


  const navigate=useNavigate()

  const Go2Editor =()=>{
navigate ('/editor')
  }










return (

<div className="GrpScreen">
      <div className="GrpContainer">
        <div className="GrpHeader">
          <div className="GrpHeaderLeft">



                  <img 
       onClick={Go2Editor}
       className="back2editor"
      src='back2editor.png' alt='Back to Editor'/>


            <div>
              <h1 className="GrpTitle">Groups</h1>
              <p className="GrpSubtitle">Collaborate with your team</p>
            </div>
          </div>

          <div className="GrpCreateBtnWrapper">
            <button className="GrpCreateBtn">
              <span className="GrpIconSm GrpIconMargin">＋</span>
              Create Group
            </button>
          </div>
        </div>

        <div className="GrpGrid">
          <div className="GrpCard">
            <div className="GrpCardHeader">
              <div className="GrpCardHeaderText">
                <h3 className="GrpCardTitle">Group Name</h3>
                <p className="GrpMutedText">Group Description</p>
              </div>

              <div className="GrpDropdown">
                                <img
                className="groupSetting"
                 src="GroupSetting.png" 
                 alt="Group Setting"  />
              </div>
            </div>

            <div className="GrpCardFooter">
              <div className="GrpMembersInfo">
                <span className="GrpIconSm GrpMutedText">👥</span>
                <span className="GrpTextSm GrpMutedText">3 members</span>
              </div>

              <span className="GrpBadge">
                <span>⭐</span>
                <span className="GrpCapitalize">owner</span>
              </span>
            </div>
          </div>

          <div className="GrpCard">
            <div className="GrpCardHeader">
              <div className="GrpCardHeaderText">
                <h3 className="GrpCardTitle">Design Team</h3>
                <p className="GrpMutedText">Handles UI/UX designs</p>
              </div>

              <div className="GrpDropdown">
                <img
                className="groupSetting"
                 src="GroupSetting.png" 
                 alt="Group Setting"  />
               
              </div>
            </div>

            <div className="GrpCardFooter">
              <div className="GrpMembersInfo">
                <span className="GrpIconSm GrpMutedText">👥</span>
                <span className="GrpTextSm GrpMutedText">5 members</span>
              </div>

              <span className="GrpBadge">
                <span>👤</span>
                <span className="GrpCapitalize">editor</span>
              </span>
            </div>
          </div>
        </div>

        <div className="GrpEmpty">
            no groups yet create one 

        </div>

        <div className="GrpModal">

          <div className="GrpForm">
            <div className="GrpFormGroup">
              <label for="group-name">Group Name</label>
              <input id="group-name" placeholder="Enter group name" />
            </div>

            <div className="GrpFormGroup">
              <label for="group-description">Description (Optional)</label>
              <textarea
                id="group-description"
                placeholder="Describe your group's purpose"
                rows="3"
              ></textarea>
            </div>

            <div className="GrpFormActions">
              <button className="GrpOutlineBtn">Cancel</button>
              <button className="GrpPrimaryBtn">Create Group</button>
            </div>
          </div>
        </div>
      </div>
    </div>



)




}

export default Groups