import React, { useState } from 'react'
import './mainFrameComponent.scss'
import Navbar from '../navbar/NavbarComponent';
import Player from '../player/PlayerComponent'
import TopBar from '../topBar/TopBar';
import { getAuth, onAuthStateChanged } from "firebase/auth";

const MainFrameComponent = ({children}) => {
    const [user, setUser] = useState(null);
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        setUser(user);
        // ...
    } else {
        // User is signed out
        // ...
        setUser(null);
    }
    });

    return (
        <div className="mainFrame">
            <Navbar user={user}/>
            <Player/>
            <TopBar user={user}/>
            <div className="content">
                {children}
            </div>
        </div>
    )
}

export default MainFrameComponent
