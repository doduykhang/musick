import React, { useContext, useState } from 'react'
import "./songListItem.scss"
import { PlaylistContext, SongContext } from '../../App'
import { doc, setDoc, collection } from '@firebase/firestore'
import firestore from '../../firebase/firestore'

const SongListItem = ({song,forwardRef}) => {
    const currentSong = useContext(SongContext);
    const playlistsContext = useContext(PlaylistContext);
    const [menu, setMenu] = useState(false);

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
        setMenu((prev)=>{return !prev});
    }

    const handleAddToPlayList = async (playlistId) =>{
        await setDoc(doc(firestore,'playlists',playlistId,'songs',song.id),{
            foo:'bar'
        })
    }

    return (
        <div className="playlistSong" 
            ref={forwardRef} 
            onDoubleClick={playSong} 
            >
            <div className="info-wrapper">
                <img src={song.image_url} alt="" />
                <div className="info">
                    <div className="title">{song.title}</div>
                </div>
            </div>
            <div className="album">{song.uploader.name}</div>
            {/* .toLocaleDateString("en-US") */}
            <div className="date-added">{song.uploaded_date.toDate().toDateString()}</div>
            <div className="duration">{formatTime(song.duration)}</div>
            <div className="menu-toggle" onClick={openMenu}>...</div>
            {menu && 
                <div className="menu">
                    {playlistsContext.playlists.map((playlist)=>{
                        return (
                            <div onClick={()=>handleAddToPlayList(playlist.id)}>{playlist.name}</div>
                        )
                    })}
                </div>
            }
        </div>
    )
}

export default SongListItem
