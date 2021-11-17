import React, { useEffect, useState } from 'react'
import searchSongs from '../apis/songs/searchSongs'
import { getSongs } from '../data/songData'
const useSongsSearch = (query,page,lastId) => {
    const [loading, setLoading] = useState(true)
    const [hasError, setHasError] = useState(false)
    const [hasMoreSong, setHasMoreSong] = useState(false)
    const [songs, setSongs] = useState([])
    
    useEffect(() => {
        setSongs([]);
    }, [query])

    useEffect(async () => {
        if(query){
            const newSongs = await searchSongs(query,lastId)
            setSongs(prevSongs =>{
                return [...prevSongs,...newSongs];   
            });
            setHasMoreSong(newSongs.length !== 0);
        }
    }, [query,page])
    
    return {loading, hasError, songs, hasMoreSong};
}

export default useSongsSearch
