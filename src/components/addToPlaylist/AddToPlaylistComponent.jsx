import React, { useContext, useEffect, useState } from 'react'
import addToPlayList from '../../apis/songs/addSongToPlaylist';
import getPlaylistThatSongIsIn from '../../apis/songs/getPlaylistThatSongIsIn';
import isSongInPlaylist from '../../apis/songs/isSongInPlaylist';
import removeFromPlaylist from '../../apis/songs/removeFromPlaylist';
import {PlaylistContext, PopupContext} from '../../App'
import './addToPlaylist.scss';

const AddToPlaylistComponent = ({songId,playlistId,onRemoveSong}) => {
    const playlistContext = useContext(PlaylistContext);
    const popupContext = useContext(PopupContext);

    const [playlists, setPlaylists] = useState([]);
    
    useEffect(async () => {
        const playlistIds = playlistContext.playlists.map(({id})=>id)
        const filteredPlaylists = await getPlaylistThatSongIsIn({songId,playlistIds});
        
        setPlaylists(filteredPlaylists);
    }, [])

    const handleAddOrRemove = async (playlistId) =>{
        const songInPlaylist = await isSongInPlaylist({songId,playlistId});
        if(!songInPlaylist){
            await addToPlayList(songId,playlistId)
                .then((doc)=>{
                    setPlaylists((prev)=>{
                        return [...prev,playlistId]
                    })
                });
        }
        else{
            const result  = await removeFromPlaylist(songId,playlistId);
            setPlaylists(playlists.filter((playlist)=>{
                return playlist !== playlistId;
            }))
        }
    }

    const removeFromThisPlayList = async () =>{
        const result  = await removeFromPlaylist(songId,playlistId);
        setPlaylists(playlists.filter((playlist)=>{
            return playlist !== playlistId;
        }))
        popupContext.setPopup({
            trigger: false,
            children:<></>
        })
        onRemoveSong(songId);
    }

    return (
        <div className='addToPlaylist'>
            {playlistId && <div className='remove' onClick={removeFromThisPlayList}>Remove from this playlist</div>}
            {playlistContext.playlists.map((playlist)=>{
                return (
                    playlist.id !== playlistId ?
                    <div className='playlists'>
                        <div>{playlist.name}</div>
                        <input type="checkbox" 
                            checked={playlists.includes(playlist.id)} 
                            onClick={()=>handleAddOrRemove(playlist.id)}
                        />
                        
                    </div>:
                    ''
                )
            })}        
        </div>
    )
}

export default AddToPlaylistComponent
