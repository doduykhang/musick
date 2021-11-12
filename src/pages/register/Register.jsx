import React, { useState } from 'react'
import auth from '../../firebase/auth';
import { createUserWithEmailAndPassword, sendEmailVerification, signOut, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore"; 
import firestore from '../../firebase/firestore';
import './register.scss';
import {MusicNote} from '@material-ui/icons';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [profileName, setProfileName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [gender, setGender] = useState('Male');

    const [message, setMessage] = useState('');

    const signUp = (e) =>{
        e.preventDefault()
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            addDoc(collection(firestore,'user'),{
                profileName: profileName,
                dateOfBirth: dateOfBirth,
                gender: gender
            }).then(()=>{
                sendEmailVerification(auth.currentUser)
                .then(() => {
                    const user = userCredential.user;
                    signOut(auth).then(()=>{
                        setMessage('Please verify your email')
                    })
                })
                .catch((error)=>{
                    setMessage('Error while sending verification email')
                });
            })
            .catch((error)=>{
                setMessage('Unknown error has occured')
            });
        })
        .catch((error) => {
            if(error.code === 'auth/email-already-in-use')
                setMessage('Email is already in use')
            else
                setMessage('Unknown error has occured')
        });
    }

    const signUpWithGoole = () =>{
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // ...
            console.log('success')
            console.log(user)
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
            console.log('fail')
        });
    }

    return (
        <div className='register'>
            <div className='logo'>
                <MusicNote className='icon'/>
                <div>Musick</div>
            </div>
            <div className="title">
                Sign up for free
            </div>
            <button className='sign-up-google' onClick={signUpWithGoole}>Sign up with google</button>
            <div className="or">or</div>
            <div className="title2">
                Sign up with your email address
            </div>
            <form action="">

                <div className='input'>
                    <div>What's your email?</div>
                    <input type="text"  value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                </div>
                <div className='input'>
                    <div>Create a password</div>                
                    <input type="password"  value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                </div>
                <div className='input'>
                    <div>What should we call you?</div>
                    <input type="text"  value={profileName} onChange={(e)=>{setProfileName(e.target.value)}}/>
                </div>
                <div className='input'>
                    <div>What's your date of birth?</div>
                    <input type="date"  value={dateOfBirth} onChange={(e)=>{setDateOfBirth(e.target.value)}}/>
                </div>
                <div className='input'>
                    <div>What's your gender?</div>
                    <select value={gender}
                            onChange={(e)=>setGender(e.target.value)}>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div className="button-wrapper">
                    <button className='sign-up' onClick={signUp}>Sign up</button>
                    {message && 
                    <div className="message">
                        {message}    
                    </div>
                    }
                </div>
            </form>
            
        </div>
    )
}

export default Register
