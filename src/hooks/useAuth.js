import React,{useContext} from 'react';
import AuthContext from '../api/Context/AuthProvider';


const useAuth = () => {
  return  useContext(AuthContext)
}

export default useAuth