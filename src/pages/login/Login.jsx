import React, { useState } from 'react'
import auth from '../../firebase/auth';
import { signInWithEmailAndPassword,signOut } from "firebase/auth";
import './login.scss';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const user = auth.currentUser;

    const login = () =>{
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            if(!user.emailVerified){
                console.log('email not verified')
                signOut(auth).then(() => {
                    // Sign-out successful.
                  }).catch((error) => {
                    // An error happened.
                  });
                  
            }
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage)
            // ..
        });
    }

    const loginWithGoole = () =>{

    }

    return (
        <div className='login'>
            <div className="title">Sign in</div>
            <form action="">
                <div className="input">
                    <div>Email</div>
                    <input type="text"  value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                </div>
                <div className="input">
                    <div>Password</div>
                    <input type="password"  value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                </div>
                <button onClick={login}>Login</button>
                <button>Login with google</button>
            </form>
        </div>
    )
}

export default Login
