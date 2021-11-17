import React, { useContext, useState } from 'react'
import "./songListItem.scss"
import { PlaylistContext, PopupContext, SongContext } from '../../App'
import { doc, setDoc, collection } from '@firebase/firestore'
import firestore from '../../firebase/firestore'
import PopupComponent from '../popup/PopupComponent'
import AddToPlaylistComponent from '../addToPlaylist/AddToPlaylistComponent'
import SongOperrationComponent from '../songOperation/SongOperrationComponent'

const SongListItem = ({song,playlistId,onRemoveSong,edit,onDeleteSong}) => {
    const currentSong = useContext(SongContext);
    const popupContext = useContext(PopupContext);

    const formatTime = (value) =>{
        let minute = Math.floor(value / 60);
        let second = Math.floor(value % 60);
        let formattedMinute = minute.toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false
        })

        let formattedSecond = second.toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false
        })

        return formattedMinute+":"+formattedSecond;
    }

    const playSong = () =>{
        currentSong.setCurrentSong({
            audioUrl: song.audio_url,
            imageUrl: song.image_url,
            title: song.title,
            uploader: song.uploader.name
        });
        console.log(currentSong)
    }

    const openMenu = () =>{
        popupContext.setPopup({
            trigger:true,
            children:<SongOperrationComponent 
                        song={song} 
                        playlistId={playlistId} 
                        onRemoveSong={onRemoveSong} 
                        edit={edit}
                        onDeleteSong={onDeleteSong}/>
        })
    }

    return (
        <div className="playlistSong"  
            onDoubleClick={playSong} 
            >
            
            <div className="info-wrapper">
                <img src={song.image_url} alt="" />
                <div className="info">
                    <div className="title">{song.title}</div>
                </div>
            </div>
            <div className="album">{song.uploader.name}</div>
            <div className="date-added">{song.uploaded_date.toDate().toDateString()}</div>
            <div className="duration">{formatTime(song.duration)}</div>
            <div className="menu-toggle" onClick={openMenu}>...</div>
        </div>
    )
}

export default SongListItem
