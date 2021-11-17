import React, { useEffect, useState } from 'react'
import getUserSongs from '../apis/songs/getUserSongs'

const useUserSongs = (uid,page,lastId) => {
    const [songs, setSongs] = useState([])
    const [hasMore, setHasMore] = useState(true);
    useEffect(async () => {
        const userSongs = await getUserSongs(uid,lastId);
        setSongs((prev)=>{
            return [...prev,...userSongs];
        })
        setHasMore(userSongs.length !== 0);
        
    }, [page])

    return {songs, setSongs, hasMore}

}
export default useUserSongs
