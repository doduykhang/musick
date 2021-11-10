import React, { useEffect, useState, useRef, useCallback } from 'react'
import "./search.scss"
import * as Icons from '@material-ui/icons'
import useSongsSearch from '../../hooks/useSongsSearch'
import DisplayListComponent from "../../components/displayList/DisplayListComponent"
import DisplayGridComponent from "../../components/displayGrid/DisplayGridComponent"
import SongListItem from "../../components/songListItem/SongListItem"
import GridItemComponent from '../../components/girdItem/GridItemComponent'
// import history from '../../history'
import {useParams} from "react-router-dom";
import {useNavigate} from 'react-router-dom';

const Search = (props) => {
    const [query, setQuery] = useState('');
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    let {queryp} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        setQuery(queryp);
    }, [])

    const handleSearch = (e) =>{
        navigate(`/search/`+e.target.value)
        setQuery(e.target.value);
        setPage(1);
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

    const {
        songs,
        hasError,
        hasMore,
        loading
    } = useSongsSearch(query,page,pageSize);

    const handleScrollToEnd = () =>{
        console.log("end")
        if(hasMore)
            setPage(prevPage => prevPage+1);
    }
    

    return (
        <div className="search-wrapper">
            <div className="search-box">
                <Icons.SearchOutlined className="icon"/>
                <input type="text" value={query} onChange={handleSearch}/>
            </div>
            <div className="type">Songs</div>
            <div className="songs-wrapper">
                <DisplayListComponent header={header}>
                    {songs.map(song =>{
                        return (<SongListItem key={song.id} song={song}/>)
                    })}
                </DisplayListComponent>
            </div>
            <div className="type">Playlists</div>
            <div className="playlist-wrapper">
                <DisplayGridComponent>
                    <div className="with-play-button">
                        <GridItemComponent type='playlist'/>
                        <Icons.PlayCircleFilled className="icon"/>
                    </div>
                    <div className="with-play-button">
                        <GridItemComponent type='playlist'/>
                        <Icons.PlayCircleFilled className="icon"/>
                    </div>
                </DisplayGridComponent>
            </div> 
            <div className="type">Albums</div>
            <div className="album-wrapper">
                <DisplayGridComponent>
                    <div className="with-play-button">
                        <GridItemComponent type='album'/>
                        <Icons.PlayCircleFilled className="icon"/>
                    </div>
                    <div className="with-play-button">
                        <GridItemComponent type='album'/>
                        <Icons.PlayCircleFilled className="icon"/>
                    </div>
                </DisplayGridComponent>
            </div> 
            <div className="type">Artists</div>
            <div className="artist-wrapper">
                <DisplayGridComponent>
                    <GridItemComponent type='artist' border='50%'/>
                    <GridItemComponent type='artist' border='50%'/>
                </DisplayGridComponent>
            </div> 
            <div className="type">Profile</div>
            <div className="profile-wrapper">
                <DisplayGridComponent>
                    <GridItemComponent type='profile' border='50%'/>
                    <GridItemComponent type='profile' border='50%'/>
                </DisplayGridComponent>
            </div> 
        </div>
    )
}

export default Search
