import React, { useEffect, useState } from 'react'
import searchPlaylists from '../apis/playlists/searchPlaylists'

const usePlaylistsSearch = (query,page,lastId) => {
    const [loading, setLoading] = useState(true)
    const [hasError, setHasError] = useState(false)
    const [hasMorePlaylist, setHasMorePlaylist] = useState(false)
    const [playlists, setPlaylists] = useState([])
    
    useEffect(() => {
        setPlaylists([]);
    }, [query])

    useEffect(async () => {
        if(query){
            const newPlaylists = await searchPlaylists(query,lastId)
            console.log(newPlaylists);
            setPlaylists(prev =>{
                return [...prev,...newPlaylists];   
            });
            setHasMorePlaylist(newPlaylists.length !== 0);
        }
    }, [query,page])
    
    return {loading, hasError, playlists, hasMorePlaylist};
}

export default usePlaylistsSearch
