import React,{useState,useEffect,useRef,useContext} from 'react'
import axios from './axios';
import AuthContext from './Context/AuthProvider';
import useAuth from '../hooks/useAuth';
import { useNavigate,useLocation } from 'react-router-dom';

const Login = () => {

    const { setAuth } = useAuth();
    // useContext(AuthContext);

    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/"

    const userRef = useRef();
    const errRef = useRef();
    const LOGIN_URL = '/auth';

    const [user, setuser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errormsg, setErrorMsg] = useState('');
    const[success,setSuccess] = useState(false);

    useEffect(()=>{
        userRef.current.focus();
    },[]);

    useEffect(()=>{
        setErrorMsg('');
    },[user,pwd])


    const handleSubmit = (e) => {
        e.preventDefault();
        try{
            const response = axios.post(
                LOGIN_URL,
                JSON.stringify({user,pwd}),
                {
                    headers:{ 'Content-Type':'application/json'},
                    withCredentials:true
                }
            ); 
            const accessToken = response?.data?.accessToken
            const roles = response?.data?.roles
            setAuth({user,pwd,roles,accessToken});
            setuser('')
            setPwd('')
            // setSuccess(true)
            navigate(from,{replace:true});
        }catch(err){
            if(!err?.response){
                setErrorMsg('No server Response') 
            }
            else if(err.response?.status === 400){
                setErrorMsg('Missing Username or Password')
            }
            else if(err.response?.status ===401){
                setErrorMsg('Unauthorized')
            } else{
                setErrorMsg('Login Failed')
            }
            errRef.current.focus();
        }
    }

    

    return (
<>
    {
        success ? 
            (<section>
                <h1>
                    SuccessFully Logged In
                </h1>
            </section>) :

            (
    <section>
        <form onSubmit={handleSubmit}>
            <label htmlFor='username'>
                Username:     
            </label>   
            <input 
                type='text'
                id='username'
                ref={userRef}
                required
                value={user}
                onChange={e =>setuser(e.target.value)}
                autoComplete="off"
                />
            <label htmlFor='password'>
                Password    
            </label>
            <input 
                type='password'
                id='password'
                required
                value={pwd}
                onChange={e =>setPwd(e.target.value)}
            />
        <button>
             Sign In
        </button>       
        </form>
    </section>
            )
    }
</>
  )
}

export default Login