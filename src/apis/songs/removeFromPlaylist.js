import { doc, collection, deleteDoc, where, getDocs, query } from "firebase/firestore"; 
import firestore from '../../firebase/firestore'
const removeFromPlaylist = async (songId,playlistId) =>{
    const q = query(
        collection(firestore, "playlists_songs"), 
        where("song_id","==",songId),
        where("playlist_id","==",playlistId)
    ); 

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (document)=>{
        await deleteDoc(doc(firestore,'playlists_songs',document.id));
    })
}

export default removeFromPlaylist