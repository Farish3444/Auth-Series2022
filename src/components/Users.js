import React,{useState,useEffect} from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import axios from '../api/axios';
import UseRefreshToken from '../hooks/useRefreshToken';


const Users = () => {

    const [users, setUsers] = useState();
    const navigate = useNavigate();
    const location = useLocation();
    const refresh = UseRefreshToken();

    useEffect(()=>{

        let isMounted = true;
        const controller = new AbortController();

        const getUser = async() =>{

            try{
                const response = await axios.get('/user',{
                    signal:controller.signal
                });
                console.log(response.data)   
                isMounted && setUsers(response.data);     
            }catch(err){
                console.log(err)
            }
        }

        getUser();

        return()=>{
            isMounted = false;
            controller.abort();
        }

    },[])

  return (
    <article>
        <h1>users List</h1>
        { users?.length ?
           ( users.map((user,i)=> <li key={i}>
                {user?.username}
            </li>)): <p>No Users To Display</p>
        }
        <button
        onClick={()=>refresh()}
        >Refresh</button>
    </article>
  );
}

export default Users