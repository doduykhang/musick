import React, { useState } from 'react'
import './mainFrameComponent.scss'
import Navbar from '../navbar/NavbarComponent';
import Player from '../player/PlayerComponent'
import TopBar from '../topBar/TopBar';


const MainFrameComponent = ({children,user}) => {
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
