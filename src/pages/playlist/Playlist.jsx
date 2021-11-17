import React, { useContext, useEffect, useState } from 'react'
import "./playlist.scss"
import {songs} from '../../data/songData';
import DisplayListComponent from '../../components/displayList/DisplayListComponent';
import SongListItem from '../../components/songListItem/SongListItem';
import { useParams } from 'react-router';
import getPlaylist from '../../apis/playlists/getPlaylist';
import getPlaylistSongs from '../../apis/playlists/getPlaylistSongs';
import { PopupContext } from '../../App';
import UpdatePlaylist from '../../components/updatePlaylist/UpdatePlaylist';

const Playlist = () => {
    let {id} = useParams();
    const [playlist, setPlaylist] = useState();
    const [songs, setSongs] = useState([]);
    const popupContext = useContext(PopupContext);

    useEffect(async () => {
        const list = await getPlaylist(id);
        
        setPlaylist(list);
        const playlistSong = await getPlaylistSongs(id);
        setSongs(playlistSong);
    }, [id])
    const header = [
        {
            title:"TITLE",
            flex:"4"
        },
        {
            title:"UPLOADER",
            flex:"2"
        },
        {
            title:"UPLOADED DATE",
            flex:"2"
        },
        {
            title:"DURATION",
            flex:"2"
        }
    ]


    const handleRemoveSong = (songId) =>{
        setSongs(songs.filter((song)=>{
            return song.id !== songId;
        }))
    }

    const handleOpenUpdatePopup = () =>{
        popupContext.setPopup({
            trigger: true,
            children: <UpdatePlaylist playlist={playlist} onUpdatePlaylist={handleUpdatePlaylist}/>
        })
    }

    const handleUpdatePlaylist = (name,img_url,desc) =>{
        console.log("handleUpdatePlaylist")
        setPlaylist({
            name: name,
            img_url: img_url,
            desc: desc
        })
        popupContext.setPopup({
            trigger: false,
            children: <></>
        })
    }

    return (
        <div className="playlist">
            {playlist &&
            <>
            <div className="top">
                <div className="info-wrapper">
                    <img src={playlist.img_url} alt="" />
                    <div className="info">
                        <div className="type">Playlist</div>
                        <div className="name" onClick={handleOpenUpdatePopup}>{playlist.name}</div>
                        <div className="desc">{playlist.desc}</div>
                    
                    </div>
                </div>
            </div>
            <div className="bottom">
                <DisplayListComponent header={header}>
                    {songs.map(song =>{
                        console.log(song)
                        return(
                            <SongListItem song={song} playlistId={id} onRemoveSong={handleRemoveSong}/>
                            )
                        })}
                </DisplayListComponent>
            </div>
            </>
            }
        </div>
    )
}

export default Playlist
