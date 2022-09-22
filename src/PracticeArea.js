import React,{useState,useEffect,useRef} from 'react'
import axios from './api/axios';
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/register';

const PracticeArea = () => {

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName,setValidName] = useState(false);
    const [userFocus,setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd,setMatchPwd] = useState('');
    const [validMatch,setValidMatch] = useState('')

    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);


    useEffect(()=>{
        userRef.current.focus();
        console.log('practice way',user)
    },[])

    useEffect(()=>{
        setValidName(USER_REGEX.test(user));
    },[user]);

    useEffect(()=>{
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    },[pwd,matchPwd])

    useEffect(()=>{
        setErrMsg('')
    },[user, pwd, matchPwd])

    const handleSubmit= async(e)=>{
        e.preventDefault();
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);

        if(!v1 || !v2){
            setErrMsg('Invalid Entry')
            return;
        }

        try{
            const response = await axios.post(
                REGISTER_URL,
                JSON.stringify({user,pwd}),
                {
                    headers:{"Content-Type":"application/json"},
                    withCredentials:true
                }
            );
            setUser("");
            setPwd("");
            setMatchPwd("");
        }
        catch(err){
            if(!err?.response){setErrMsg("No server Response")}
            else if (err.response?.status === 409){setErrMsg("Username Taken")}
            else{setErrMsg("Registration Failed")}
        }
    }

  return (

   <>
    
    {
        success ? (
<section>
    <h1>Success!</h1>
        <p>
            <a href="#">Sign In</a>
        </p>
</section>
        ) : (
    <section>
            <p ref={errRef} 
            aria-live="assertive" 
            className={errMsg ? "errmsg":'offscreen'}>
                {errMsg}
            </p>
         <h1>Register</h1>
     
         <form onSubmit={handleSubmit}>
         
         <label htmlFor='username'>
             Username
         <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
         <FontAwesomeIcon icon={faTimes} className={validName || !user ? "hide" : "invalid"} />
         </label>
         
         <input 
             type='text'
             id='username'
             aria-invalid={validName ? "false" : "true" }
             aria-describedby="uidnote"
             autoComplete="off"
             required
             value={user}
             ref={userRef}
             onChange={e =>setUser(e.target.value)}
             onFocus={()=>setUserFocus(true)}
             onBlur={()=>setUserFocus(false)}
         />
             <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                                 <FontAwesomeIcon icon={faInfoCircle} />
                                 8 to 24 characters.<br />
                                 Must include uppercase and lowercase letters, a number and a special character.<br />
                                 Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
             </p>
     
             <label htmlFor="password">
                                 Password:
                                 <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
                                 <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hide" : "invalid"} />
                             </label>
                             <input
                                 type="password"
                                 id="password"
                                 onChange={(e) => setPwd(e.target.value)}
                                 value={pwd}
                                 required
                                 aria-invalid={validPwd ? "false" : "true"}
                                 aria-describedby="pwdnote"
                                 onFocus={() => setPwdFocus(true)}
                                 onBlur={() => setPwdFocus(false)}
                             />
                             <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                                 <FontAwesomeIcon icon={faInfoCircle} />
                                 8 to 24 characters.<br />
                                 Must include uppercase and lowercase letters, a number and a special character.<br />
                                 Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                             </p>
             <label htmlFor='confirm_pwd'>
                 Confirm Password
                 <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
                 <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />
             </label>
     
             <input 
             
             type='password'
             id="confirm_pwd"
             onChange={(e)=>setMatchPwd(e.target.value)}
             value={matchPwd}
             required
             aria-invalid={validMatch ? "false":"true"}
             aria-describedby="confirmnote"
             onFocus={()=>setMatchFocus(true)}
             onBlur={()=>setMatchFocus(false)}
             />
     
             <button disabled={!validName || !validPwd || !validMatch ? true : false}>Sign Up</button>

         </form>
                 <p>
                     Already registered <br/>
                     <span className='line'>
                         <a href='#'>Sign In</a>
                     </span>
                 </p>
         </section>
        )
    }

   </>
  )
}

export default PracticeArea