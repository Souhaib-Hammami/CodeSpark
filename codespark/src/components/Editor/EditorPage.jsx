// For security reasons, browsers 
// do not allow reading arbitrary local file paths
//  directly (like "C:/Users/.../file.txt") 
// using client-side React/JavaScript.



import { useEffect,useState,useRef  } from 'react';
import Editor from '@monaco-editor/react';
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'; 
import IconGenerator from '../IconGenerator/IconGenerator'
import Share from '../Share/ShareFiles.jsx'
import NavBar from '../Navbar/NavBar'; 
import { ContextMenu } from 'primereact/contextmenu';
        
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';       







const EditorPage =()=>{
  const cm = useRef(null); // Reference for ContextMenu


const [token, setToken] = useState(localStorage.getItem("token"));
const [DataListFiles, setDataListFiles] = useState([]);
const [isVisible, setIsVisible] = useState(true);
const [selectedFilename, setSelectedFilename] = useState('');
const [NextRenameMEFileName, setNextRenameMEFileName] = useState('');
const [showShareModel, setshowShareModel] = useState(false);
const [shareData, setShareData] = useState(null); // <-- place to store fetch response
const [joinedGrp, setjoinedGrp] = useState([]);
const [localFilePath, setlocalFilePath] = useState("");
const [fileContent, setFileContent] = useState("");
const [File_idFromsql, setFile_idFromsql] = useState("");
const [renamingFile, setRenamingFile] = useState(null);   // file currently being renamed
const [newFileName, setNewFileName] = useState("");       // temporary name while typing



const saveFile = async () => {
  if (!token) return alert("Please log in first!");
  if (!selectedFilename) return alert("No file selected!");

  try {
    const decoded = jwtDecode(token);
    const userId = decoded.id;

    const res = await axios.post(
      "http://localhost:3001/saveFile",
      {
        user_id: userId,
        filename: selectedFilename,
        content: fileContent
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (res.data.success) {
      console.log(" File saved:", selectedFilename);
      alert("File saved successfully!");


    } else {
      alert("Failed to save file");
    }
  } catch (err) {
    console.error("Save failed:", err);
    alert("Error saving file");
  }
};




const handleRenameConfirm = async (oldFilename) => {
  const trimmedName = newFileName.trim();
  if (!trimmedName || trimmedName === oldFilename) {
    setRenamingFile(null);
    return;
  }

  try {
    const decoded = jwtDecode(token);
    const userId = decoded.id;

    const res = await axios.post(
      "http://localhost:3001/renameFile",
      {
        user_id: userId,
        oldName: oldFilename,
        newName: trimmedName
      },
      { headers: { Authorization: `Bearer ${token}` } }
      

    );



    if (res.data.success) {
      // Update UI instantly
      setDataListFiles((prev) =>
        prev.map((f) => (f === oldFilename ? trimmedName : f))
      );

      if (selectedFilename === oldFilename) {
        setSelectedFilename(trimmedName);
      }

      localStorage.setItem("lastOpenedFile", trimmedName);
    }


  } catch (err) {
    console.error("Rename failed:", err);
    alert("Rename failed!");
  } finally {
    setRenamingFile(null);
  }
};







 const items = [
    {
      label: 'Rename',
      icon: 'pi pi-pencil',
      command: () => {
        // Add rename logic here later
             setRenamingFile(selectedFilename); // start rename mode
      setNewFileName(selectedFilename);  // fill input with old name
        console.log('Rename clicked for:', selectedFilename);
      }
    }
  ];




  useEffect(() => {
    if (File_idFromsql) {
      geFileContent();
    }
  }, [File_idFromsql]);

  const LocalFileDetailReader = async (filename) => {
    try {
      const decoded = jwtDecode(token);
      const userId = decoded.id;
      const filePath = `users_files/createdBy_${userId}/${filename}`;
      
      console.log(filePath);
      setlocalFilePath(filePath); // This triggers the useEffect above
      return filePath;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getLocalFileContent = async () => {
    try {
      const response = await axios.post('http://localhost:3001/getLocalFileContent', {
        filepath: localFilePath
      });
      
      setFileContent(response.data);
      console.log("File content loaded:", response.data);
    } catch (err) {
      console.error(err);
    }
  };




  const geFileContent = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/getFileContent/${File_idFromsql}`, {

      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

 console.log("File content loaded:", response.data);
      setFileContent(response.data);
     
    } catch (err) {
      console.error(err);
    }
  };

const handleGetFile_4Groups =async()=>{

try 
   {
      const decoded = jwtDecode(token);
      const userId = decoded.id;
      const res = await axios.get(`http://localhost:3001/handleGetFile_4Groups/${userId}`,
        {
        headers: { Authorization: `Bearer ${token}` },
        }
        );
        console.log("last",res.data.data)
      //  setShareData(res.data.data)
setjoinedGrp(res.data.data)

    }

catch (err){    
  console.error("Error fetching file-group list:", err);
}

}











useEffect(() => {
  if (!showShareModel && token) {
    // When modal closes, refresh the file tree
    handleGetFile_4Groups();

  }
}, [showShareModel]);




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
const ownedGroups = (res.data.join_your_groups || []).map(g => ({
  group_id: g.group_id,
  group_name: g.group_name,
}));

const joinedGroups = (res.data.joined_from_others_groups || []).map(g => ({
  group_id: g.group_id,
  group_name: g.group_name,
}));

setShareData([...ownedGroups, ...joinedGroups]);
    console.log("setsharedata : " , shareData )

    // Log the data directly from response (not from state, which updates asynchronously)
    // console.log("The joined groups are:", res.data.joined);

  } catch (err) {
    console.error("Error fetching joined groups:", err);
  }
};




  useEffect(() => {
    if (!token) {
      console.error("No token found in localStorage");
      return;
    }

handleGetFile_4Groups()

handleGetFiles()  




getjoinedGrp();


  }, [token]);




// console.log(groupsList.map(group => group.name));
const handleGetFiles = async () => {
  if (!token) return console.error("No token found");

  const decoded = jwtDecode(token);
  const userId = decoded.id;

  try {
    const response = await axios.post(
      'http://localhost:3001/getFiles4Editor',
      { userId },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const files = response.data || [];

    const renameMeRegex = /^renameMe(?:\((\d+)\))?\.js$/;
    let maxIndex = -1;

    files.forEach((filename) => {
      const match = filename.match(renameMeRegex);
      if (match) {
        const index = match[1] ? parseInt(match[1], 10) : 0;
        if (index > maxIndex) maxIndex = index;
      }
    });

    const nextFileName =
      maxIndex === -1
        ? 'renameMe.js'
        : maxIndex === 0 && files.includes('renameMe.js')
        ? 'renameMe(1).js'
        : `renameMe(${maxIndex + 1}).js`;

    setDataListFiles(files);
    setNextRenameMEFileName(nextFileName);

    return { files, nextFileName }; 
  } catch (err) {
    console.error("Error loading files:", err);
    return { files: [], nextFileName: "renameMe.js" };
  }
};

const handleCreateFile = async () => {
  if (!token) return console.error("No token found");

  const decoded = jwtDecode(token);
  const userId = decoded.id;

  const { nextFileName } = await handleGetFiles();

  try {
     await axios.post(
      'http://localhost:3001/newfile',
      {
        user_id: userId,
        filename: nextFileName,
        content: "code me please !",
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    
    await handleGetFiles();
  } catch (err) {
    console.error("Error creating file:", err);
    alert(err.response?.data?.error || "Failed to create file");
  }
};



// const saveFile = async () => {
//   if (!token) return console.error("No token found");

//   const decoded = jwtDecode(token);
//   const userId = decoded.id;


//   try {
//      await axios.post(
//       'http://localhost:3001/saveFile',
//       {
//         user_id: userId,
//         filename: selectedFilename,
//         content: newcontent,
//       },
//       { headers: { Authorization: `Bearer ${token}` } }
//     )
//       } catch (err) {
//     console.error("Error saving file:", err);
//   }
// };





console.log("how ell s7I7",NextRenameMEFileName)


const FileDelete=async(filename)=>{
    try {

    if (!token) {
      console.error('No token found');
      alert('Please login first');
      return;
    }

        const confirmed = window.confirm(`Are you sure you want to delete "${filename}"?`);
    if (!confirmed) return; // Cancel if user clicks "Cancel"
    
    const decoded = jwtDecode(token);
    console.log('Decoded token:', decoded); 

    const userId = decoded.id; 

       await axios.delete('http://localhost:3001/deleteFile',

{
      params: {
        filename: filename,
        user_id: userId
      },
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });


    handleGetFiles()    
    } catch (error) {
 console.error('Error creating file:', error);
  }



}

const showsharemodel =()=>{
  setshowShareModel(true)
}

const HideWelcome=()=>{
setIsVisible(false);

}
   


// function logout() {
//     localStorage.removeItem('token');
//     setToken(null); 
//     setDataListFiles([]);
//     setGroupsList([]);
//     setSelectedFilename('');
//    navigate('/login')
// }





// const owner_id = JSON.parse(localStorage.getItem("token"));
// navigate(`/groups/${owner_id}`);


 


const draculaTheme = {
  base: 'vs-dark',
  inherit: true,
  rules: [
    { token: '', foreground: 'f8f8f2', background: '282a36' },
    { token: 'comment', foreground: '6272a4' },
    { token: 'keyword', foreground: 'ff79c6' },
    { token: 'number', foreground: 'bd93f9' },
    { token: 'string', foreground: 'f1fa8c' },
    { token: 'operator', foreground: 'ff79c6' },
    { token: 'identifier', foreground: '50fa7b' },
  ],
  colors: {
    'editor.background': '#282a36',
    'editor.foreground': '#f8f8f2',
    'editorLineNumber.foreground': '#6272a4',
    'editorCursor.foreground': '#f8f8f0',
    'editor.selectionBackground': '#44475a',
    'editor.lineHighlightBackground': '#44475a66',
  },
};




return (

   <div className="-EDR-editor-container">
        
<NavBar />

        <div className="-EDR-main-content">
             <div className="-EDR-file-sidebar">
                <div className="-EDR-sidebar-header">

<div
  style={{


    position: 'relative',
    // backgroundImage: 'linear-gradient(to right, #d1a0005b  51%, #ffa201ff  100%)',
    // background: 'linear-gradient(45deg, #ff9900, #ff1e00ff)',
    color: 'white',
    border: 'none',
    backgroundColor:'white',

    borderRadius: '12px',
    // boxShadow: '0 4px 12px rgba(255, 255, 255, 0.3)', // white shadow
    padding: '16px',
  }}
>
  <svg fill="#ff852eff" height="30px" width="30px" version="1.1" id="Layer_1" viewBox="0 0 512 512" >

<g id="SVGRepo_bgCarrier" strokeWidth="0"/>

<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>

<g id="SVGRepo_iconCarrier"> <g> <g> <g> <path d="M501.438,135.847h-8.449V99.262c0-5.832-4.728-10.562-10.562-10.562H212.181l-22.703-22.239 c-8.444-8.264-19.593-12.815-31.394-12.815H44.865C20.127,53.647,0,73.778,0,98.523v296.662 c0,34.831,28.342,63.169,63.179,63.169h385.642c34.837,0,63.179-28.338,63.179-63.169V146.409 C512,140.577,507.272,135.847,501.438,135.847z M471.866,109.824v26.023H260.311l-26.565-26.023H471.866z M490.877,395.185 c0,23.183-18.866,42.046-42.056,42.046H63.179c-23.19,0-42.056-18.862-42.056-42.046V98.523c0-13.097,10.65-23.753,23.742-23.753 h113.219c6.244,0,12.146,2.41,16.615,6.785l73.909,72.399c1.974,1.934,4.627,3.016,7.391,3.016h234.877V395.185z"/> <path d="M459.193,405.741c5.833,0,10.562-4.729,10.562-10.562v-119.92c0-5.832-4.728-10.562-10.562-10.562 c-5.833,0-10.561,4.729-10.561,10.562v119.92C448.631,401.011,453.359,405.741,459.193,405.741z"/> <path d="M459.193,244.982c5.833,0,10.562-4.729,10.562-10.561v-2.112c0-5.832-4.728-10.562-10.562-10.562 c-5.833,0-10.561,4.729-10.561,10.562v2.112C448.631,240.253,453.359,244.982,459.193,244.982z"/> <path d="M188.377,253.525c-30.814,0-56.446,22.613-61.175,52.116c-3.176-0.567-6.422-0.806-9.69-0.695 c-24.531,0.807-44.147,20.661-44.658,45.193c-0.012,0.551-0.014,1.102-0.006,1.658c0.308,21.566,18.336,39.11,40.188,39.11 h126.508c14.36,0,28.36-5.879,38.407-16.128c9.957-10.159,15.287-23.509,15.006-37.59c-0.277-13.84-5.876-26.808-15.767-36.514 c-9.333-9.161-21.504-14.443-34.49-15.021C231.907,265.917,211.313,253.525,188.377,253.525z M271.835,337.61 c0.168,8.362-3.017,16.31-8.97,22.383c-6.189,6.315-14.472,9.792-23.322,9.792H113.035c-10.369,0-18.923-8.205-19.067-18.28 c-0.004-0.302-0.003-0.604,0.003-0.918c0.273-13.095,11.143-24.099,24.233-24.531c0.28-0.008,0.56-0.014,0.839-0.014 c4.517,0,8.924,1.203,12.794,3.498c3.426,2.033,7.704,1.962,11.061-0.176c3.359-2.14,5.229-5.987,4.836-9.95 c-0.128-1.285-0.192-2.608-0.192-3.933c0-22.515,18.318-40.833,40.833-40.833c16.785,0,31.668,10.07,37.917,25.655 c1.75,4.364,6.18,7.053,10.85,6.579c1.061-0.107,2.126-0.159,3.164-0.159C257.351,306.722,271.495,320.577,271.835,337.61z"/> </g> </g> </g> </g>

</svg> 
<div className="-EDR-sidebar-title ">Your Storage
  
 
  </div>
  
  <button
    onClick={handleCreateFile}
    className="-EDR-new-file-btn"
    style={{
      position: 'absolute',
      bottom: '0.25rem', // Match padding of the container
      right: '0.5rem',  // Match padding of the container
    }}
  >
    + New File
  </button>
</div>
                    
                </div>
      <div className="-EDR-file-list">
               
            {DataListFiles.length === 0 ? (
                <div style={{ color: '#ccc', padding: '10px' }}>No files found</div>
              ) : (
                DataListFiles.map((filename, index) => (

<div
                  onClick={() => {
                    setSelectedFilename(filename);
                    LocalFileDetailReader(filename);
                    getLocalFileContent()     
                  }}
                  onContextMenu={(e) => {
                    e.preventDefault(); // Prevent default browser context menu
                    setSelectedFilename(filename); // Set the selected file
                    cm.current.show(e); // Show PrimeReact context menu
                  }}
                  key={index}
                  className="-EDR-file-item"
                >


                        <IconGenerator filename={filename}/>
                         

                            {renamingFile === filename ? (
    <input
      className="InputLikeNameFile edit-mode"
      value={newFileName}
      autoFocus
      onChange={(e) => setNewFileName(e.target.value)}
      onBlur={() => handleRenameConfirm(filename)}       // When focus lost
      onKeyDown={(e) => {
        if (e.key === "Enter") handleRenameConfirm(filename);
        if (e.key === "Escape") setRenamingFile(null);
      }}
    />
  ) : (
    <div className="InputLikeNameFile">{filename}</div>
  )}

                            {/* <div className='InputLikeNameFile'> {filename}</div> */}

                          <div
                           className="Files-trash-icon"
                           >
                                <div className="trash-box"       
                              onClick={(e) =>{
                            e.stopPropagation() // Prevent file selection when clicking delete
                            FileDelete(filename)}}

                                >
                                  <div className="trash-top"></div>
                                  <div className="trash-btm">
                                    <div className="trash-lines">
                                      <div className="trash-line"></div>
                                      <div className="trash-line"></div>
                                      
                                    </div>
                                  </div>
                                </div>
                                </div>   
                                  {/* <ContextMenu ref={cm}  global model={items} className="my-context-menu" breakpoint="67px" />   the contextMenu fi el page lKol na7i el global                   */}
                                  <ContextMenu ref={cm}  model={items} className="my-context-menu" breakpoint="67px" />                    

              </div>


                   
                 
                ))
              )}
              <div>


                
              </div>
                  <div
                  style={{
              padding:'16px'               
                     }}
                  >
                    <div 
                      style={{
                position: 'relative',
//                backgroundImage: 'linear-gradient(to right, #d1a0005b  51%, #ffa201ff  100%)',
                 backgroundColor:'white',
                color: '#f8f8f2',        // text color
                borderRadius: '12px',
                padding:'1rem',
                    boxShadow: '0 4px 12px rgba(255, 255, 255, 0.3)', // white shadow

                        }}
                      >
                      <svg className="-EDR-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                      </svg>

                        <div className='-EDR-sidebar-title-Storage'> Your groups</div>
                    </div>


                  </div>


{/* aa grp:
renameMe(14).js
aaaa ggggroupe:
renameMe(14).js
aaaa ggggroupe:
renameMe(15).js */}

{/* fixed  */}
<div className="groups&theirFiles-tree">
  {joinedGrp.length === 0 ? (
    <p style={{color:'white'}}>Create a group or join one !</p>
  ) : (
    (() => {
      // Group files by group name
      const grouped = joinedGrp.reduce((acc, item) => {
        if (!acc[item.name]) {
          acc[item.name] = [];
        }
        if (item.filename) {
          acc[item.name].push({
            filename: item.filename,
            file_id: item.file_id       
            // filepath: item.filepath,      
            // uploader_id: item.uploader_id  
          });
        }
        return acc;
      }, {});

          return Object.entries(grouped).map(([groupName, files], index) => (
        <div key={index}>
          <div className="groups&theirFiles-group">
            {groupName}
          </div>
          {files.map((fileObj, fileIndex) => (
            <div 
              key={fileIndex} 
              className="groups&theirFiles-file"
              onClick={() => {

              setSelectedFilename(fileObj.filename);

                setFile_idFromsql(fileObj.file_id)
                geFileContent()
                // console.log("Filename:", fileObj.filename);
                // console.log("Filepath:", fileObj.filepath);

              }}
              style={{ cursor: 'pointer' }} // Add cursor pointer to show it's clickable
            >
              {fileObj.filename}
            </div>
          ))}
        </div>
      ));
    })()
  )}
</div>


{/* This will group all files under the same group name together, giving you:
```
aa grp:
└── renameMe(14).js
aaaa ggggroupe:
├── renameMe(14).js
└── renameMe(15).js */}




                </div>
            </div>

            <div className="-EDR-editor-area">
                <div className="-EDR-tab-bar">
                    <div className="-EDR-tab -EDR-active">
                        <span className="-EDR-tab-name">{selectedFilename}</span>
                        <span className="-EDR-unsaved-indicator">____Live </span>
                        <span className="-EDR-tab-close"></span>
                    </div>


                


                </div>

                <div className="-EDR-editor-toolbar">
                    <span className="-EDR-toolbar-filename">empty span</span>
                    <div className="-EDR-toolbar-actions">
                        <button 
                        className="-EDR-toolbar-btn"
                        // onClick={showsharemodel}
                   
                          onClick={() => {
                            showsharemodel();
                            getjoinedGrp();
                          }}




                        >
                            <svg className="-EDR-toolbar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="18" cy="5" r="3"></circle>
                                <circle cx="6" cy="12" r="3"></circle>
                                <circle cx="18" cy="19" r="3"></circle>
                                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                            </svg>
                            <span
                            // showShareModel, setshowShareModel
                            >Share This File to Group</span>
                        </button>
                        <button 
                        className="-EDR-toolbar-btn"
                         onClick={saveFile}
                        >
                            <svg className="-EDR-toolbar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                                <polyline points="17 21 17 13 7 13 7 21"></polyline>
                                <polyline points="7 3 7 8 15 8"></polyline>
                            </svg>
                            <span>Save</span>
                        </button>
                    </div>
                </div>

                <div onClick={HideWelcome} className="-EDR-code-editor">
                    <Editor 
                    value={fileContent}
                    onChange={(value) => setFileContent(value)}
                    height="90vh" 
                    defaultLanguage="javascript"
                    
                    //  defaultValue="// some comment" 
                       theme="dracula"
                    beforeMount={(monaco) => {
                        monaco.editor.defineTheme('dracula', draculaTheme);
                    }}
                     />;
                </div>


 {isVisible && (
              <div  className="-EDR-welcome-screen">
                    <div className="-EDR-welcome-icon">
                    <img src="./logo.png" alt="no logo"  />
                    </div>
                    <h2 className="-EDR-welcome-title">Welcome to Code Spark</h2>
                    <p className="-EDR-welcome-text">Create a new file or select an existing one to start coding</p>
                </div>
                )}


          </div>
 </div> 



<Share 
SelectedFileName={selectedFilename}  
visibility={showShareModel}  
setVisibility={setshowShareModel}   
props={shareData}
/>

 </div> 
)





}

export default EditorPage

