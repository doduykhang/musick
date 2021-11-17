import React, { useContext, useState } from 'react'
import "./navbarComponent.scss"
import * as Icons from '@material-ui/icons'
import { addDoc, collection, doc, getDoc } from '@firebase/firestore';
import firestore from '../../firebase/firestore';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { PlaylistContext, UserContext, PopupContext } from '../../App';
import {
    Link
  } from "react-router-dom";
import UploadSong from '../uploadSong/UploadSong'

const NavbarComponent = () => {
    const playlistContext = useContext(PlaylistContext);
    const userContext = useContext(UserContext);
    const popupContext = useContext(PopupContext);
    const handleCreatePlaylist = async () =>{
        const storage = getStorage();
        var img;
        await getDownloadURL(ref(storage, 'images/default_playlist_image.png'))
        .then((url) => {
            img = url
        })
        .catch((error) => {

        });
        const user = await getDoc(doc(firestore,'users',userContext.user.uid));

        const docRef = await addDoc(collection(firestore, "playlists"), {
            name: "My Playlist #" + (playlistContext.playlists.length+1),
            img_url: img,
            desc: "",
            uploader:{
                name: user.data().display_name,
                uid: userContext.user.uid
            }
        }).then(()=>{
            const newPlaylist = {
                name:"My Playlist #" + (playlistContext.playlists.length+1),
                id:playlistContext.playlists.length+1
            }
            playlistContext.setPlaylists((prev)=>{return [...prev,newPlaylist]})
        });

        
    }

    const handleUploadSong = () =>{
        popupContext.setPopup({
            trigger: true,
            children: <UploadSong/>
        })
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
                                <Link to={'/library'} className="link">
                                    <span className="option">
                                        <Icons.AccessibilityNew/>
                                        <span>Library</span>
                                    </span>
                                </Link>
                                <span className="option" onClick={handleCreatePlaylist}>
                                    <span>Create playlist</span>
                                </span>
                                <span className="option" onClick={handleUploadSong}>
                                    <span>Upload Song</span>
                                </span>
                                <div className="divider"></div>
                                <div className="bottom"> 
                    
                                    <div className='playlist'>
                                        
                                        {playlistContext.playlists.map((playlist)=>{
                                            return(
                                                <Link to={'playlist/'+playlist.id} className="link">
                                                    <div key={playlist.id}>{playlist.name}</div>
                                                </Link>
                                            )
                                        })}
                                    </div>
                                </div>
                            </>
                        }
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default NavbarComponent
