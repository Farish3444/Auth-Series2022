import React,{useState,useEffect} from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import UseRefreshToken from '../hooks/useRefreshToken';
import useAxiosPrivate from '../hooks/useAxiosPrivate';



const Users = () => {

    const [users, setUsers] = useState();
    const navigate = useNavigate();
    const location = useLocation();
    const refresh = UseRefreshToken();
    const axiosPrivate = useAxiosPrivate()

    useEffect(()=>{

        let isMounted = true;
        const controller = new AbortController();

        const getUser = async() =>{

            try{
                const response = await axiosPrivate.get('/user',{
                    signal:controller.signal
                });
                console.log(response.data)   
                isMounted && setUsers(response.data);     
            }catch(err){
                console.log(err)
                navigate('/login',{ state:{from:location},replace:true});
            }
        }

        getUser();

        return ()=>{
            isMounted = false;
            controller.abort();
        }
    },[])

  return (
    <article>
        <h1>users List</h1>
        {
            users?.length ? (
                <ul>
                {
                    users.map((m,i)=>
                        <li key={i}>
                            {m.username}
                        </li>
                    )
                }
                </ul>
            ) : (<p>No Users to Display</p>)
        }
    </article>
  );
}

export default Users