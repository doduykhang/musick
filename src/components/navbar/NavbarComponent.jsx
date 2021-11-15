import React, { useContext, useState } from 'react'
import "./navbarComponent.scss"
import * as Icons from '@material-ui/icons'
import { addDoc, collection } from '@firebase/firestore';
import firestore from '../../firebase/firestore';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { PlaylistContext, UserContext } from '../../App';
import {
    Link
  } from "react-router-dom";

const NavbarComponent = () => {
    const playlistContext = useContext(PlaylistContext);
    const userContext = useContext(UserContext);
    
    const handleCreatePlaylist = async () =>{
        const storage = getStorage();
        var img;
        await getDownloadURL(ref(storage, 'images/default_playlist_image.png'))
        .then((url) => {
            img = url
        })
        .catch((error) => {

        });
        const docRef = await addDoc(collection(firestore, "playlists"), {
            name: "My Playlist #" + (playlistContext.playlists.length+1),
            img_url: img,
            desc: "",
            uid: userContext.user.uid
        }).then(()=>{
            const newPlaylist = {
                name:"My Playlist #" + (playlistContext.playlists.length+1),
                id:playlistContext.playlists.length+1
            }
            playlistContext.setPlaylists((prev)=>{return [...prev,newPlaylist]})
        });

        
    }

    const handleClickPlaylist = (id) =>{
        // navigate(`/playlist/`+id)
    }

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
                        <Link to='/search' className="link">
                            <span className="option">
                                <Icons.SearchOutlined/>
                                <span>Search</span>
                            </span>
                        </Link>
                        {userContext.user && 
                            <>
                                <span className="option">
                                    <Icons.AccessibilityNew/>
                                    <span>Library</span>
                                </span>
                                <span className="option" onClick={handleCreatePlaylist}>
                                    <span>Create playlist</span>
                                </span>
                                <div>playlist</div>
                                <div className='playlist'>
                                    
                                    {playlistContext.playlists.map((playlist)=>{
                                        return(
                                            <Link to={'playlist/'+playlist.id}>
                                                <div key={playlist.id}>{playlist.name}</div>
                                            </Link>
                                        )
                                    })}
                                </div>
                            </>
                        }
                    </div>
                </div>
                <div className="bottom"> 
                    
                </div>
            </div>
        </div>
    )
}

export default NavbarComponent
