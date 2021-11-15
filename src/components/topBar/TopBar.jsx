import React, { useEffect, useState } from 'react';
import './topBar.scss';
import {Link} from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { getStorage, ref, getDownloadURL } from "firebase/storage";


const TopBar = ({user}) => {
    const [avatar, setAvatar] = useState('')
    const [opacity, setOpacity] = useState(0); 

    const isUser = (src) =>{
        const handleSignOut = ()=>{
            const auth = getAuth();
            signOut(auth).then(() => {
              // Sign-out successful.
            }).catch((error) => {
              // An error happened.
            });
        }
    
        const handleClick = () =>{
            opacity === 0 ? 
            setOpacity(1) :
            setOpacity(0)
        }

    
        return(
            <div className='top-bar user'>
                <img src={src} onClick={handleClick}/>
                <div className="dropdown-items" style={{opacity:opacity}}>
                    <button onClick={handleSignOut}>Profile</button>
                    <button onClick={handleSignOut}>Sign out</button>
                </div>
            </div>
        )
    }

    useEffect(() => {
        const storage = getStorage();
        getDownloadURL(ref(storage, 'images/default_profile_picture.png'))
        .then((url) => {
            setAvatar(url);
        })
        .catch((error) => {
        // Handle any errors
        });
    }, [])

    if(user)
        return isUser(avatar);
    else 
        return isNotUser();
}

const isNotUser = () =>{
    return(
        <div className='top-bar'>
            <Link to='/register' className='link'>
                <button>Sign up</button>
            </Link>
            <Link to='/login' className='link'>
                <button>Sign in</button>
            </Link>
        </div>
    )
}



export default TopBar
