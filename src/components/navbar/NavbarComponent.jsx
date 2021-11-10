import React from 'react'
import "./navbarComponent.scss"
import * as Icons from '@material-ui/icons'
import {
    Link
  } from "react-router-dom";

const NavbarComponent = () => {
    return (
        <div className="wrapper">

            <div className="navbar">
                <div className="top">
                    <div className="logo">
                        <Icons.MusicNote/>
                        <span>Musick</span>
                    </div>
                    <div className="option-wrapper">
                        <Link to='/' className="link">
                            <span className="option">
                                <Icons.HomeOutlined/>
                                    <span>Home</span>
                            </span>
                        </Link>
                        <span className="option">
                            <Icons.SearchOutlined/>
                            <span>Search</span>
                        </span>
                        <span className="option">
                            <Icons.AccessibilityNew/>
                            <span>Library</span>
                        </span>
                    </div>
                </div>
                <div className="bottom"> 
                    
                </div>
            </div>
        </div>
    )
}

export default NavbarComponent
