import React,{useState} from 'react'
import axios from '../api/axios';
import useAuth from './useAuth';


const UseRefreshToken = () => {

    const { setAuth } = useAuth();

    const refresh = async()=>{
        const response = await axios.get('/refresh',{withCredentials:true});
        setAuth(prev =>{
            return {...prev,accessToken:response.data.accessToken}
        })
    }

  return (
    <div>
        useRefreshToken
    </div>
  )
}

export default UseRefreshToken