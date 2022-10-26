import React,{useState,useEffect} from 'react';
import useRefreshToken from '../hooks/useRefreshToken';
import useAuth from '../hooks/useAuth';
import { Outlet } from 'react-router-dom';


const PersistLogin = () => {
      
    const [isLoading, setisLoading] = useState(false);
    const refresh = useRefreshToken();
    const auth = useAuth();

    useEffect(()=>{
            const verifyRefreshToken = async()=>{
                try{
                    await refresh();
                }
                catch(err){
                    console.log(err)
                }
                finally{
                    setisLoading(false)
                }
            }

                !auth?.accessToken ? verifyRefreshToken(): setisLoading(false)
    },[])

    // useEffect(()=>{
    //     
    // },[isLoading]
    useEffect(()=>{
        console.log(`isLoading : ${isLoading}`)
        console.log(`aT: ${auth.accessToken}`)
    },[isLoading])

    return(
        <React.Fragment>
        {
            isLoading ? 
            <p>LOADING .... .............</p> : <Outlet />
        }
        </React.Fragment>
    )
}

export default PersistLogin