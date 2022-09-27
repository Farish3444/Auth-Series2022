import { useLocation,Navigate,Outlet } from "react-router-dom";
import useAuth from '../hooks/useAuth';
import React from 'react';


const RequireAuth = ({ alllowedRoles }) => {

    const { auth } = useAuth();
    const location = useLocation();
  

  return (
        auth?.roles?.find(role => alllowedRoles?.includes(role))  ? <Outlet /> 
        : auth?.user ?  
        <Navigate to='/unauthorized' state={{ from: location }} replace /> 
        :     
        <Navigate to='/login' state={{ from: location }} replace /> 
  )
}

export default RequireAuth