import React, { useEffect, useState } from 'react'
import "./search.scss"
import * as Icons from '@material-ui/icons'
import useSongsSearch from '../../hooks/useSongsSearch'
import DisplayListComponent from "../../components/displayList/DisplayListComponent"
import DisplayGridComponent from "../../components/displayGrid/DisplayGridComponent"
import SongListItem from "../../components/songListItem/SongListItem"
import GridItemComponent from '../../components/girdItem/GridItemComponent'
import {useParams} from "react-router-dom";
import {useNavigate} from 'react-router-dom';
import usePlaylistsSearch from '../../hooks/usePlaylistSearch'

const Search = ({result}) => {
    const [query, setQuery] = useState('');
    const [songPage, setSongPage] = useState(1);
    const [playlistPage, setPlaylistPage] = useState(1);
    const [lastSongId, setLastSongId] = useState('');
    const [lastPlaylistId, setLastPlaylistId] = useState('')
    const [tempQuery, setTempQuery] = useState('')
    let {queryp} = useParams();
    const navigate = useNavigate();

    const {
        songs,
        hasMoreSong
    } = useSongsSearch(query,songPage,lastSongId);

    const {
        playlists,
        hasMorePlaylist
    } = usePlaylistsSearch(query,playlistPage,lastPlaylistId);

    const handleSearch = (e) =>{
        if (e.key === 'Enter') {
            console.log('key enter')
            setQuery(tempQuery)
            setSongPage(1);
            setPlaylistPage(1);
            setLastSongId('');
            setLastPlaylistId('');

            navigate('../search/'+tempQuery);
        }else{
            setTempQuery(e.target.value);
        }
        
        
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

    useEffect(() => {
        if(queryp){
            setQuery(queryp);
            setTempQuery(queryp)
        }    
    }, [])

    useEffect(() => {
        if(songs.length !== 0)
            setLastSongId(songs[songs.length-1].id);
    }, [songs])

    useEffect(() => {
        if(playlists.length !== 0)
            setLastPlaylistId(playlists[playlists.length-1].id);
    }, [playlists])

    const handleScrollToEnd = () =>{
        // console.log("end")
        if(hasMoreSong)
            setSongPage(prevPage => prevPage+1);
    }

    const handleScrollToEndPlaylist = () =>{
        // console.log("end")
        if(hasMorePlaylist)
            setPlaylistPage(prevPage => prevPage+1);
    }

    return (
        <div className="search-wrapper">
            <div className="search-box">
                <Icons.SearchOutlined className="icon"/>
                <input type="text" value={tempQuery} onKeyDown={handleSearch} onChange={(e)=>{setTempQuery(e.target.value)}}/>
            </div>
            {result && (
                <>
                <div className="type">Songs</div>
                <div className="">
                    <DisplayListComponent header={header} onScrollToBottom={handleScrollToEnd}>
                        {songs.map(song =>{
                            return (<SongListItem key={song.id} song={song}/>)
                        })}
                    </DisplayListComponent>
                </div>
                <div className="type">Playlists</div>
                <div className="playlist-wrapper">
                    <DisplayGridComponent onScrollToBottom={handleScrollToEndPlaylist}>
                        {playlists.map((playlist)=>{
                            return(
                                <div className="with-play-button">
                                    <GridItemComponent type='playlist' playlist={playlist}/>
                                    <Icons.PlayCircleFilled className="icon"/>
                                </div>
                            )
                        })}
                    </DisplayGridComponent>
                </div> 
                </>
            )
            }
        </div>
    )
}

export default Search
