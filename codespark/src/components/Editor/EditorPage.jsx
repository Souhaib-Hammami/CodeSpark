import { useNavigate } from 'react-router-dom';
import Editor from '@monaco-editor/react';



const EditorPage =()=>{


const navigate =useNavigate()


const Go2Home =()=>{
navigate('/')
}

const Go2Profil=()=>{
    navigate('/profil')
}

const Go2Groups=()=>{
    navigate('/groups')
}
 


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
        
        <div className="-EDR-top-nav">
            <div className="-EDR-nav-left">
          <div 
          className="logo"
         onClick={Go2Home}
          >
            <img className='logo-icon' src="./logo.png" alt="no logo" /> 
            <span className="logo-text">Code Spark</span>
          </div>
            </div>
            <div className="-EDR-nav-right">
                <button 
                onClick={Go2Groups}
                className="-EDR-nav-btn">
                    <svg className="-EDR-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                    <span>Groups</span>
                </button>
                <button 
                onClick={Go2Profil}
                className="-EDR-nav-btn"
                >
                    <svg className="-EDR-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="3"></circle>
                        <path d="M12 1v6m0 6v6"></path>
                        <path d="M5.64 5.64l4.24 4.24m4.24 4.24l4.24 4.24"></path>
                        <path d="M5.64 18.36l4.24-4.24m4.24-4.24l4.24-4.24"></path>
                    </svg>
                    <span>Profile</span>
                </button>
                <button className="-EDR-nav-btn">
                    <svg className="-EDR-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                        <polyline points="16 17 21 12 16 7"></polyline>
                        <line x1="21" y1="12" x2="9" y2="12"></line>
                    </svg>
                    <span>Logout</span>
                </button>
            </div>
        </div>

        <div className="-EDR-main-content">
             <div className="-EDR-file-sidebar">
                <div className="-EDR-sidebar-header">
                    <div className="-EDR-sidebar-title">Explorer</div>
                    <button className="-EDR-new-file-btn">+ New File</button>
                </div>
                <div className="-EDR-file-list">
                    <div className="-EDR-file-item -EDR-active">
                        <div className="-EDR-file-icon -EDR-html">H</div>
                        <span>index.html</span>
                    </div>
                    <div className="-EDR-file-item">
                        <div className="-EDR-file-icon -EDR-css">C</div>
                        <span>style.css</span>
                    </div>
                    <div className="-EDR-file-item">
                        <div className="-EDR-file-icon -EDR-js">J</div>
                        <span>script.js</span>
                    </div>



                </div>
            </div>

            <div className="-EDR-editor-area">
                <div className="-EDR-tab-bar">
                    <div className="-EDR-tab -EDR-active">
                        <span className="-EDR-tab-name">index.html</span>
                        <span className="-EDR-unsaved-indicator"></span>
                        <span className="-EDR-tab-close">×</span>
                    </div>
                    <div className="-EDR-tab">
                        <span className="-EDR-tab-name">style.css</span>
                        <span className="-EDR-tab-close">×</span>
                    </div>
                    <div className="-EDR-tab">
                        <span className="-EDR-tab-name">script.js</span>
                        <span className="-EDR-tab-close">×</span>
                    </div>
                </div>

                <div className="-EDR-editor-toolbar">
                    <span className="-EDR-toolbar-filename">index.html</span>
                    <div className="-EDR-toolbar-actions">
                        <button className="-EDR-toolbar-btn">
                            <svg className="-EDR-toolbar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="18" cy="5" r="3"></circle>
                                <circle cx="6" cy="12" r="3"></circle>
                                <circle cx="18" cy="19" r="3"></circle>
                                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                            </svg>
                            <span>Share</span>
                        </button>
                        <button className="-EDR-toolbar-btn">
                            <svg className="-EDR-toolbar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                                <polyline points="17 21 17 13 7 13 7 21"></polyline>
                                <polyline points="7 3 7 8 15 8"></polyline>
                            </svg>
                            <span>Save</span>
                        </button>
                    </div>
                </div>

                <div className="-EDR-code-editor">
                    <Editor 
                    height="90vh" 
                    defaultLanguage="javascript"
                     defaultValue="// some comment" 
                       theme="dracula"
                    beforeMount={(monaco) => {
                        monaco.editor.defineTheme('dracula', draculaTheme);
                    }}
                     />;
                </div>

              <div className="-EDR-welcome-screen">
                    <div className="-EDR-welcome-icon">
<img src="./logo.png" alt="no logo"  />
                    </div>
                    <h2 className="-EDR-welcome-title">Welcome to Code Spark</h2>
                    <p className="-EDR-welcome-text">Create a new file or select an existing one to start coding</p>
                </div>
                </div>
 </div> </div> 
)

}

export default EditorPage

