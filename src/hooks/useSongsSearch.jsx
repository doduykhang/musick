import React, { useEffect, useState } from 'react'
import { getSongs } from '../data/songData'
const useSongsSearch = (query,page,pageSize) => {
    const [loading, setLoading] = useState(true)
    const [hasError, setHasError] = useState(false)
    const [hasMore, setHasMore] = useState(false)
    const [songs, setSongs] = useState([])
    
    useEffect(() => {
        setSongs([]);
    }, [query])

    useEffect(() => {
        const newSongs = getSongs(query,page,pageSize);
        setSongs(prevSongs =>{
            return [...prevSongs,...newSongs];   
        });
        setHasMore(newSongs.length > 0);
    }, [query,page])
    
    return {loading, hasError, songs, hasMore};
}

export default useSongsSearch
