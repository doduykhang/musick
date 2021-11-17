import { collection, query, where, getDocs } from "firebase/firestore";  
import firestore from "../../firebase/firestore";
import { documentId } from 'firebase/firestore'

const getPlaylistThatSongIsIn = async ({songId,playlistIds}) =>{
    console.log(songId)
    console.log(playlistIds)
    const q = query(
        collection(firestore, "playlists_songs"), 
        where('song_id','==',songId), 
        where('playlist_id','in',playlistIds)
    );
    const querySnapshot = await getDocs(q);

    const result = [];
    querySnapshot.forEach((doc) => {    
        result.push(doc.data())
    });
    
    return result.map(({playlist_id})=>playlist_id);
}

export default getPlaylistThatSongIsIn;
