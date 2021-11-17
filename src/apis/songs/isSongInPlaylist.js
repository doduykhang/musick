import { collection, query, where, getDocs } from "firebase/firestore";  
import firestore from "../../firebase/firestore";

const isSongInPlaylist = async ({songId,playlistId}) =>{
    const q = query(
        collection(firestore, "playlists_songs"), 
        where('song_id','==',songId), 
        where('playlist_id','==',playlistId)
    );
    const querySnapshot = await getDocs(q);
    var result;
    querySnapshot.forEach((doc)=>{
        result = doc.data();
    })
    return result
}

export default isSongInPlaylist;
