import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom'; 
import LandingPage from './components/LandingPage/LandingPage';
import Login from '../src/components/Auth/Login';
import EditorCode from './components/Editor/EditorPage';
import Profil from './components/Profil/Profil';
import Groups from './components/Groups/Groups';
import './App.css';
function App() {
  return (



    <div className="App">  
          
      <BrowserRouter> 
      <Routes>

 <Route path="/login" element={<Login/>}/>
 <Route path="/" element={<LandingPage/>}/> 
  <Route path="/editor" element={<EditorCode/>}/>
  <Route path="/profil" element={<Profil/>}/>
  <Route path="/groups" element={<Groups/>}/>
</Routes>

     </BrowserRouter>     
    </div>


  );
}

export default App;
