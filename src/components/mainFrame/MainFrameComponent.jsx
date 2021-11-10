import React from 'react'
import './mainFrameComponent.scss'
import Navbar from '../navbar/NavbarComponent';
import Player from '../player/PlayerComponent'
const MainFrameComponent = ({children}) => {
    return (
        <div className="mainFrame">
            <Navbar/>
            <Player/>
            <div className="content">
                {children}
            </div>
        </div>
    )
}

export default MainFrameComponent
