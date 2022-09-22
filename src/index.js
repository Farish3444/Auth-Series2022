import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {AuthProvider} from './api/Context/AuthProvider';
import {BrowserRouter,Route,Routes} from 'react-router-dom';


ReactDOM.render(
  <React.StrictMode>
<BrowserRouter>
  <AuthProvider>
    <Routes>
       <Route  path="/*" element={<App />} />
    </Routes>   
  </AuthProvider>  
</BrowserRouter>  
  </React.StrictMode>,
  document.getElementById('root')
);