import React, { useContext, useEffect, useState } from 'react'
import { Navigate } from 'react-router'
import DisplayGridComponent from '../../components/displayGrid/DisplayGridComponent'
import DisplayListComponent from '../../components/displayList/DisplayListComponent'
import './library.scss'
import {PlayCircleFilled} from '@material-ui/icons'
import GridItemComponent from '../../components/girdItem/GridItemComponent'
import { getAuth, onAuthStateChanged } from '@firebase/auth'
import {PlaylistContext} from '../../App'
import getUserSongs from '../../apis/songs/getUserSongs'
import SongListItem from '../../components/songListItem/SongListItem'
import useUserSongs from '../../hooks/useUserSongs'

const Library = ({user}) => {
    
    const playlistContext = useContext(PlaylistContext);
    const [lastId, setLastId] = useState('');
    const [page, setPage] = useState(0)
    const {songs, setSongs, hasMore} = useUserSongs(user.uid,page,lastId);
   

    useEffect(() => {
        if(songs.length !== 0)
            setLastId(songs[songs.length-1].id);
    }, [songs])

    

    const handleScrollToBottom = () => {
        if(hasMore)
            setPage(prev=>prev+1)
    }

    const handleDeleteSong = (id) =>{
        setSongs(songs.filter(song=>song.id!==id))
    }

    const header = [
        {
            title:"TITLE",
            flex:4
        },
        {
            title:"ALBUM",
            flex:2
        },
        {
            title:"ADDED DATE",
            flex:2
        },
        {
            title:"DURATION",
            flex:2
        }
    ]

    // if(!user)
    //     return <Navigate to='/login'/>
    return (
        <div className='library'>
            <div className="type">Songs</div>
            <div className="songs-wrapper">
            <DisplayListComponent header={header} onScrollToBottom={handleScrollToBottom}>
                {songs.map(song =>{
                    return (<SongListItem key={song.id} song={song} edit={true} onDeleteSong={handleDeleteSong}/>)
                })}
            </DisplayListComponent>
            </div>
            <div className="type">Playlists</div>
            <div className="playlist-wrapper">
                <DisplayGridComponent>
                    {playlistContext.playlists.map((playlist)=>{
                        return(
                            <div className="with-play-button">
                                <GridItemComponent type='playlist' playlist={playlist}/>
                            </div>
                        )
                    })}
                   
                    
                </DisplayGridComponent>
            </div> 
        </div>
    )
}

export default Library
