import React,{useState,useContext} from 'react'
import { Link,useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import AuthContext from '../api/Context/AuthProvider';
import useLogout from '../hooks/useLogout';

const Home = () => {

  const {setAuth} = useContext(AuthContext);
  const navigate = useNavigate();
  const logout = useLogout();

  const signOut = async()=>{
      await logout();
      navigate('/linkpage');
  }

  return (
    <section>
     <h1>
        Home Page for all USERS
     </h1>

    <br></br>

    <Link to="/editor">Go to the Editor page</Link>
            <br />
            <Link to="/admin">Go to the Admin page</Link>
            <br />
            <Link to="/lounge">Go to the Lounge</Link>
            <br />
            <Link to="/linkpage">Go to the link page</Link>
            <div className="flexGrow">
                <button onClick={signOut}>Sign Out</button>
            </div>
    </section>
  )
}

export default Home