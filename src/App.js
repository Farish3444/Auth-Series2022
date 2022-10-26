import { Route,Routes } from 'react-router-dom';
import Login from './api/Login';
import Layout from './components/Layout';
import PracticeArea from './PracticeArea';
import Register from './Register';
import LinkPage from './components/LinkPage';
import Unauthorized from './components/Unauthorized';
import Missing from './components/Missing';
import Home from './components/Home';
import Admin from './components/Admin';
import Editor from './components/Editor';
import Lounge from './components/Lounge';
import RequireAuth from './components/RequireAuth';
import PersistLogin from './components/PersistLogin';


function App() {

  const ROLES = {
    'User':2001,
    'Editor':1984,
    'Admin':5150
  }

  return (
   <Routes>
      <Route path='/' element={<Layout />}>
        
        {/* PUBLIC ROUTES */}
      <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="linkpage" element={<LinkPage />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* PROTECTED ROUTES */}
<Route element={<PersistLogin />}>
    <Route element={<RequireAuth alllowedRoles={[ROLES.User,ROLES.Editor,ROLES.Admin]} />}>   
        <Route path="/" element={<Home />} />       
    </Route>      

      <Route element={<RequireAuth alllowedRoles={[ROLES.Editor]} />}>
        <Route path="editor" element={<Editor />} />    
      </Route>

      <Route element={<RequireAuth  alllowedRoles={[ROLES.Admin]}/>}>
        <Route path="admin" element={<Admin />} />   
      </Route>

    <Route element={<RequireAuth alllowedRoles={[ROLES.Admin]} />}>
    <Route path="lounge" element={<Lounge />} />    
    </Route>  
</Route>

        <Route path='*'  element={<Missing />} />

      </Route> 
   </Routes>
  );
}

export default App;