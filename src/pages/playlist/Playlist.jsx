import React, { useEffect, useState } from 'react'
import "./playlist.scss"
import {songs} from '../../data/songData';
import DisplayListComponent from '../../components/displayList/DisplayListComponent';
import SongListItem from '../../components/songListItem/SongListItem';
import { useParams } from 'react-router';
import getPlaylist from '../../apis/playlists/getPlaylist';
import getPlaylistSongs from '../../apis/playlists/getPlaylistSongs';
const Playlist = () => {
    let {id} = useParams();
    const [playlist, setPlaylist] = useState();
    const [songs, setSongs] = useState([]);
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
    return (
        <div className="playlist">
            {playlist &&
            <>
            <div className="top">
                <div className="info-wrapper">
                    <img src={playlist.img_url} alt="" />
                    <div className="info">
                        <div className="type">Playlist</div>
                        <div className="name">{playlist.name}</div>
                        <div className="desc">{playlist.desc}</div>
                    
                    </div>
                </div>
            </div>
            <div className="bottom">
                <DisplayListComponent header={header}>
                    {songs.map(song =>{
                        return(
                            <SongListItem song={song}/>
                            )
                        })}
                </DisplayListComponent>
            </div>
            </>
            }
        </div>
    )
    // return (
    //     <div className="playlist">
    //         <div className="top">
    //             <div className="info-wrapper">
    //                 <img src={imgUrl} alt="" />
    //                 <div className="info">
    //                     <div className="type">Playlist</div>
    //                     <div className="name">name fadsfssadfasdfadsfadf</div>
    //                     <div className="desc">desc fadsfssadfasdfadsfadf</div>
                        
    //                 </div>
    //             </div>
    //         </div>
    //         <div className="bottom">
    //             <SongListComponent songs={songs}/>
    //         </div>
    //     </div>
    // )
}

export default Playlist
