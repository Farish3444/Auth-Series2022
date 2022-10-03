import React from 'react'
import Users from './Users';
import { Link } from 'react-router-dom';

const Admin = () => {
  return (
    <div>
        <h1>Admin Page</h1>
        <br />
        <Users />
        <div className='flexGrow'>
          <Link to='/'>Home</Link>
        </div>
    </div>
  )
}

export default Admin